'use client';

import { useState } from 'react';
import type { OpcaoOrcamento } from '@/app/lib/catalogo-comercial';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

type FormularioContatoProps = {
    opcoesServico: readonly OpcaoOrcamento[];
};

export default function FormularioContato({ opcoesServico }: FormularioContatoProps) {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    function handleFileChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const selectedFile = event.target.files?.[0] ?? null;

        setError('');
        setSuccess(false);

        if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
            setError('O arquivo deve ter no máximo 5 MB.');
            event.target.value = '';
            setFile(null);
            return;
        }

        setFile(selectedFile);
    }

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError('');
        setSuccess(false);

        const form = event.currentTarget;
        const formData = new FormData(form);

        if (file) {
            formData.set('file', file);
        } else {
            formData.delete('file');
        }

        setLoading(true);

        try {
            const response = await fetch('/api/orcamentos', {
                method: 'POST',
                body: formData,
            });

            const result = (await response.json().catch(() => null)) as {
                message?: string;
                success?: boolean;
            } | null;

            if (!response.ok || result?.success !== true) {
                throw new Error(
                    result?.message || 'Não foi possível enviar sua solicitação.'
                );
            }

            setSuccess(true);
            setFile(null);
            form.reset();
        } catch (submissionError) {
            setError(
                submissionError instanceof Error
                    ? submissionError.message
                    : 'Não foi possível enviar o orçamento. Tente novamente mais tarde.'
            );
        } finally {
            setLoading(false);
        }
    }

    const gruposServico = [...new Set(opcoesServico.map((opcao) => opcao.grupo))];

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
            <div>
                <label
                    htmlFor="name"
                    className="mb-2 block font-semibold text-gray-800"
                >
                    Nome completo *
                </label>

                <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    minLength={2}
                    maxLength={100}
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-help-pc-primary focus:ring-2 focus:ring-help-pc-primary/20"
                    placeholder="Seu nome"
                />
            </div>

            <div>
                <label
                    htmlFor="phone"
                    className="mb-2 block font-semibold text-gray-800"
                >
                    WhatsApp ou telefone *
                </label>

                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    maxLength={25}
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-help-pc-primary focus:ring-2 focus:ring-help-pc-primary/20"
                    placeholder="(67) 99999-9999"
                />

                <p className="mt-1 text-sm text-gray-500">
                    Usaremos esse número para retornar seu contato.
                </p>
            </div>

            <div>
                <label
                    htmlFor="service"
                    className="mb-2 block font-semibold text-gray-800"
                >
                    Qual serviço você precisa? *
                </label>

                <select
                    id="service"
                    name="service"
                    required
                    defaultValue=""
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-help-pc-primary focus:ring-2 focus:ring-help-pc-primary/20"
                >
                    <option value="" disabled>
                        Selecione um serviço
                    </option>
                    {gruposServico.map((grupo) => (
                        <optgroup key={grupo} label={grupo}>
                            {opcoesServico
                                .filter((opcao) => opcao.grupo === grupo)
                                .map((opcao) => (
                                    <option key={opcao.valor} value={opcao.valor}>
                                        {opcao.rotulo}
                                    </option>
                                ))}
                        </optgroup>
                    ))}
                </select>
                <p className="mt-1 text-sm text-gray-500">
                    Os preços atuais aparecem junto a cada opção. O valor final depende do escopo e das condições do equipamento.
                </p>
            </div>

            <div>
                <label
                    htmlFor="equipment"
                    className="mb-2 block font-semibold text-gray-800"
                >
                    Equipamento
                </label>

                <select
                    id="equipment"
                    name="equipment"
                    defaultValue=""
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-help-pc-primary focus:ring-2 focus:ring-help-pc-primary/20"
                >
                    <option value="">Selecione, se aplicável</option>
                    <option value="Computador desktop">Computador desktop</option>
                    <option value="Notebook">Notebook</option>
                    <option value="Impressora">Impressora</option>
                    <option value="Console">Console</option>
                    <option value="Outro">Outro</option>
                </select>
            </div>

            <div>
                <label
                    htmlFor="description"
                    className="mb-2 block font-semibold text-gray-800"
                >
                    Descreva o que você precisa *
                </label>

                <textarea
                    id="description"
                    name="description"
                    rows={5}
                    minLength={10}
                    maxLength={2000}
                    required
                    className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-help-pc-primary focus:ring-2 focus:ring-help-pc-primary/20"
                    placeholder="Conte o que está acontecendo, quais erros aparecem ou qual serviço deseja realizar."
                />

                <p className="mt-1 text-sm text-gray-500">
                    Não precisa conhecer os termos técnicos. Explique com suas palavras.
                </p>
            </div>

            <div>
                <label
                    htmlFor="file"
                    className="mb-2 block font-semibold text-gray-800"
                >
                    Anexo <span className="font-normal text-gray-500">(opcional)</span>
                </label>

                <input
                    type="file"
                    id="file"
                    name="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileChange}
                    className="w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-help-pc-primary-50 file:px-4 file:py-2 file:font-semibold file:text-help-pc-primary hover:file:bg-help-pc-primary-100"
                />

                {file && (
                    <p className="mt-2 break-all text-sm text-gray-600">
                        Arquivo selecionado: {file.name}
                    </p>
                )}

                <p className="mt-1 text-sm text-gray-500">
                    JPG, PNG ou PDF. Tamanho máximo: 5 MB.
                    Você também pode solicitar orçamento sem anexar arquivos.
                </p>
            </div>

            {error && (
                <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    {error}
                </p>
            )}

            {success && (
                <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                    Solicitação enviada com sucesso!
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-help-pc-accent px-4 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-help-pc-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? 'Enviando solicitação...' : 'Solicitar orçamento'}
            </button>

            <p className="text-center text-xs text-gray-500">
                * Campos obrigatórios. O envio dos dados deve seguir a política de privacidade da Help PC.
            </p>
        </form>
    );
}
