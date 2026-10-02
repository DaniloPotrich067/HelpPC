'use client';
import React from "react";

export default function Contato(){
    // 1. Mova o useState para dentro do componente
    const [file, setFile] = React.useState<File | null>(null);

    // 2. Mova as funções de manipulação para dentro do componente
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Exemplo de como pegar os outros campos do formulário facilmente
        const formData = new FormData(event.currentTarget);

        if (file) {
            formData.append("file", file);

            // Aqui você envia o formData para sua API (ex: fetch('/api/contato', { method: 'POST', body: formData }))
            console.log("Dados prontos para envio:");
            console.log("Nome:", formData.get("name"));
            console.log("Arquivo:", formData.get("file"));
        } else {
            alert("Por favor, anexe um arquivo antes de enviar o formulário.");
        }
    };

    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-6">Contato</h1>
            <p className="text-lg mb-4">Entre em contato conosco através do formulário abaixo:</p>
            <form className="w-full max-w-md bg-white p-8 rounded shadow-md" onSubmit={handleSubmit} method="POST">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nome:</label>
                    <input type="text" id="name" name="name" className="w-full px-3 py-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="number" className="block text-gray-700 font-bold mb-2">Telefone:</label>
                    <input type="tel" id="number" name="number" className="w-full px-3 py-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Mensagem:</label>
                    <textarea id="message" name="message" rows={4} className="w-full px-3 py-2 border rounded" required></textarea>
                </div>

                {/* Campo de anexo estilizado e posicionado antes do botão */}
                <div className="mb-6">
                    <label htmlFor="file" className="block text-gray-700 font-bold mb-2">Anexo:</label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        onChange={handleFileChange}
                        required
                    />
                    {file && <p className="text-xs text-green-600 mt-1">✔ {file.name}</p>}
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                    Enviar
                </button>
            </form>
            <p className="text-sm text-gray-500 mt-4">* Todos os campos são obrigatórios.</p>
        </div>
    )
}
