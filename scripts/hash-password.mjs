// Gera o valor de ADMIN_PASSWORD_HASH.
// Uso: node scripts/hash-password.mjs "sua senha forte"
import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];

if (!password || password.length < 12) {
  console.error('Uso: node scripts/hash-password.mjs "senha com 12+ caracteres"');
  process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);

console.log(`scrypt$${salt.toString("hex")}$${hash.toString("hex")}`);
