import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPool } from "@/app/lib/db";

const SESSION_TTL_SECONDS = 8 * 60 * 60;
const MAX_FAILED_ATTEMPTS = 5;
const ATTEMPT_WINDOW_MINUTES = 15;
const IS_PRODUCTION = process.env.NODE_ENV === "production";

// O prefixo __Host- exige Secure, então só vale em produção (HTTPS).
const COOKIE_NAME = IS_PRODUCTION ? "__Host-helppc_admin" : "helppc_admin";

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET ausente ou menor que 32 caracteres.");
  }

  return secret;
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

/** Hash do IP do cliente (HMAC): serve para limitar abuso sem guardar o IP. */
export async function getClientIpHash(): Promise<string> {
  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "desconhecido";
  return sign(`ip:${ip}`);
}

/**
 * Formato de ADMIN_PASSWORD_HASH: scrypt:<salt hex>:<hash hex>.
 * Gere com: node scripts/hash-password.mjs
 */
function verifyPassword(password: string, stored: string | undefined): boolean {
  // Separador ":" evita a expansão de "$" do .env; "$" segue aceito (Vercel).
  const [scheme, saltHex, hashHex] = (stored ?? "").trim().split(/[:$]/);
  const valid = scheme === "scrypt" && !!saltHex && !!hashHex;

  // Sempre executa o scrypt, para não vazar por tempo se a configuração é válida.
  const expected = Buffer.from(valid ? hashHex : "00", "hex");
  const derived = scryptSync(
    password,
    Buffer.from(valid ? saltHex : "00", "hex"),
    expected.length || 64,
  );

  return valid && derived.length === expected.length && timingSafeEqual(derived, expected);
}

export async function isLoginBlocked(ipHash: string): Promise<boolean> {
  const pool = getPool();
  await pool.query(
    `DELETE FROM admin_login_attempts WHERE created_at < now() - interval '1 day'`,
  );
  const { rows } = await pool.query<{ total: string }>(
    `SELECT count(*) AS total FROM admin_login_attempts
     WHERE ip_hash = $1 AND created_at > now() - make_interval(mins => $2)`,
    [ipHash, ATTEMPT_WINDOW_MINUTES],
  );
  return Number(rows[0].total) >= MAX_FAILED_ATTEMPTS;
}

export async function recordFailedLogin(ipHash: string): Promise<void> {
  await getPool().query(`INSERT INTO admin_login_attempts (ip_hash) VALUES ($1)`, [
    ipHash,
  ]);
}

export function checkCredentials(email: string, password: string): boolean {
  const expectedEmail = process.env.ADMIN_EMAIL ?? "";
  const emailOk = safeEqual(
    email.trim().toLowerCase(),
    expectedEmail.trim().toLowerCase(),
  );
  const passwordOk = verifyPassword(password, process.env.ADMIN_PASSWORD_HASH);
  return emailOk && passwordOk && expectedEmail.length > 0;
}

export async function createSession(): Promise<void> {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = String(expiresAt);

  (await cookies()).set(COOKIE_NAME, `${payload}.${sign(`session:${payload}`)}`, {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function destroySession(): Promise<void> {
  (await cookies()).delete(COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  if (!value) return false;

  const [payload, signature] = value.split(".");
  if (!payload || !signature) return false;
  if (!safeEqual(signature, sign(`session:${payload}`))) return false;

  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && expiresAt > Date.now() / 1000;
}

/** Use em toda página, Server Action e route handler do painel. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }
}
