"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  checkCredentials,
  createSession,
  destroySession,
  getClientIpHash,
  isLoginBlocked,
  recordFailedLogin,
  requireAdmin,
} from "@/app/lib/admin-auth";
import { COTACAO_LIMITES, isTipoCotacao } from "@/app/lib/cotacoes-tipos";
import { createCotacao, deleteCotacao } from "@/app/lib/cotacoes";
import { isOrcamentoStatus, isUuid, updateStatus } from "@/app/lib/orcamentos";

export interface FormState {
  error?: string;
  ok?: boolean;
}

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function login(
  _previous: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
  const email = text(formData, "email");
  const password = text(formData, "password");
  const ipHash = await getClientIpHash();

  if (await isLoginBlocked(ipHash)) {
    return { error: "Muitas tentativas. Aguarde 15 minutos." };
  }

  if (!email || !password || !checkCredentials(email, password)) {
    await recordFailedLogin(ipHash);
    return { error: "E-mail ou senha inválidos." };
  }

  await createSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

export async function changeStatus(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = text(formData, "id");
  const status = text(formData, "status");

  if (!isUuid(id) || !isOrcamentoStatus(status)) return;

  await updateStatus(id, status);
  revalidatePath("/admin");
  revalidatePath(`/admin/orcamentos/${id}`);
}

export async function addCotacao(
  _previous: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const tipo = text(formData, "tipo");
  const item = text(formData, "item");
  const fornecedor = text(formData, "fornecedor");
  const quantidade = Number(text(formData, "quantidade") || "1");
  const preco = Number(text(formData, "preco").replace(",", "."));
  const link = text(formData, "link");
  const observacoes = text(formData, "observacoes");
  const orcamentoId = text(formData, "orcamentoId");

  if (!isTipoCotacao(tipo) || item.length < 2 || fornecedor.length < 2) {
    return { error: "Informe tipo, item e fornecedor." };
  }

  if (
    item.length > COTACAO_LIMITES.item ||
    fornecedor.length > COTACAO_LIMITES.fornecedor ||
    link.length > COTACAO_LIMITES.link ||
    observacoes.length > COTACAO_LIMITES.observacoes
  ) {
    return { error: "Um campo ultrapassou o limite permitido." };
  }

  if (!Number.isInteger(quantidade) || quantidade < 1 || quantidade > 9999) {
    return { error: "Quantidade inválida." };
  }

  if (!Number.isFinite(preco) || preco < 0 || preco > 99_999_999.99) {
    return { error: "Preço inválido." };
  }

  if (link && !/^https?:\/\//i.test(link)) {
    return { error: "O link deve começar com http:// ou https://." };
  }

  if (orcamentoId && !isUuid(orcamentoId)) {
    return { error: "Orçamento inválido." };
  }

  await createCotacao({
    tipo,
    item,
    fornecedor,
    quantidade,
    precoUnitario: Math.round(preco * 100) / 100,
    link: link || null,
    observacoes: observacoes || null,
    orcamentoId: orcamentoId || null,
  });

  revalidatePath("/admin/cotacoes");
  return { ok: true };
}

export async function removeCotacao(formData: FormData): Promise<void> {
  await requireAdmin();
  await deleteCotacao(text(formData, "id"));
  revalidatePath("/admin/cotacoes");
}
