# 📊 Conversor XML para Excel (NFe 55 & NFCe 65) Pro

Aplicação web corporativa de alta performance para conversão, consolidação e análise de arquivos **XML de Nota Fiscal Eletrônica (NFe - Modelo 55)** e **Nota Fiscal de Consumidor Eletrônica (NFCe - Modelo 65)** para planilhas **Excel (.xlsx)**.

---

## 🛡️ Segurança e Privacidade (100% Client-Side)

Nenhum arquivo XML é enviado para servidores externos. O processamento, a validação DOM e a construção da planilha ocorrem **exclusivamente na memória do navegador do usuário** via JavaScript.

---

## 🚀 Destaques da Última Atualização

- **Suporte Nativo à Reforma Tributária:** Extração e formatação automática dos novos campos **CST IBS/CBS** (3 dígitos) e **cClassTrib** (Classificação Tributária).
- **Exportação Nativa ExcelJS:** Planilhas geradas com formatação de moeda contábil (`R$`), cabeçalho corporativo customizado, zebrado de linhas e congelamento de painel (painel fixo na 1ª linha).
- **Agrupamento de Produtos Únicos:** Opção de alternar entre o detalhamento linha a linha por item da nota ou a consolidação agrupada por código de produto (com soma de quantidade e valores).
- **Seletor Dinâmico de Colunas:** Escolha exatamente quais das 25 colunas disponíveis serão exportadas para a planilha final.
- **PAGINAÇÃO E PREVIEW:** Tabela de pré-visualização interativa com suporte à paginação (25, 50 ou 100 itens por página).
- **Deduplicação Inteligente:** Identifica e ignora arquivos XML duplicados com base na Chave de Acesso.

---

## 📋 Colunas Suportadas

1. **Modelo** *(55 ou 65)*
2. **Número NF**
3. **Série**
4. **Data Emissão**
5. **Chave de Acesso**
6. **CNPJ Emitente**
7. **Razão Social Emitente**
8. **CPF/CNPJ Destinatário**
9. **Nome Destinatário**
10. **Item** *(Sequência nItem)*
11. **Código Produto** *(Original preservado)*
12. **Descrição Produto**
13. **NCM**
14. **CFOP**
15. **Unidade**
16. **Quantidade**
17. **Valor Unitário**
18. **Desconto**
19. **Valor Total Item**
20. **Valor Líquido Item**
21. **CST/CSOSN ICMS**
22. **CST PIS**
23. **CST COFINS**
24. **CST IBS/CBS**
25. **cClassTrib**

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 / JavaScript ES6+**
- **Tailwind CSS** (via CDN com extensão de tema escuro/corporativo)
- **ExcelJS v4.3.0** (Geração avançada de planilhas .xlsx)
- **Lucide Icons** (Ícones vetoriais)

---

## 🌐 Publicação no GitHub Pages

Para atualizar seu site online no GitHub:

```bash
git add index.html README.md
git commit -m "feat: atualiza conversor com ExcelJS, suporte a IBS/CBS, agrupamento e seletor de colunas"
git push origin main