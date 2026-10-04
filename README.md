# HelpPC
Landing page apresentando meus serviços e facilitando para receber orçamentos.

## SEO e domínio

As páginas têm títulos, descrições e URLs canônicas próprios. O sitemap e as URLs
absolutas dos dados estruturados dependem da variável `NEXT_PUBLIC_SITE_URL`.
Quando o domínio público estiver definido, configure essa variável no ambiente de
produção com a URL completa, por exemplo `https://seudominio.com.br` (sem `/` no
final). Depois, envie `https://seudominio.com.br/sitemap.xml` ao Google Search
Console e valide a propriedade do domínio. O site não inclui endereço físico porque
essa informação não está cadastrada no projeto.

## Catálogo comercial

Serviços, preços, combos, diferenciais, contatos e links contextualizados de
WhatsApp ficam centralizados em `app/lib/catalogo-comercial.ts`. Para incluir ou
alterar uma oferta, atualize as coleções tipadas nesse arquivo; combos apontam para
serviços por `id`, e os itens herdados dos planos são resolvidos automaticamente.
A página inicial lê apenas os destaques configurados ali; `/servicos` apresenta o
catálogo completo. Confira `CATALOGO-COMERCIAL.md` para os valores e pendências de
validação antes de publicar alterações comerciais.
