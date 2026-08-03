# 📊 Conversor XML para Excel (NFe 55 & NFCe 65)

Aplicação web corporativa desenvolvida para conversão e consolidação em lote de arquivos **XML de Nota Fiscal Eletrônica (NFe - Modelo 55)** e **Nota Fiscal de Consumidor Eletrônica (NFCe - Modelo 65)** para planilhas **Excel (.xlsx)**.

---

## 🛡️ Segurança e Privacidade (100% Client-Side)

Diferente de ferramentas de conversão online convencionais, **nenhum arquivo XML é enviado para servidores externos**. 

Todo o processamento, leitura e geração das planilhas em Excel ocorrem **exclusivamente no navegador Web do próprio usuário** (via JavaScript). Isso garante conformidade com a LGPD e sigilo absoluto sobre os dados fiscais da sua empresa ou cliente.

---

## 🚀 Principais Recursos

- **Processamento em Lote:** Selecione ou arraste dezenas/centenas de arquivos XML de uma só vez.
- **Suporte Híbrido:** Reconhece e unifica documentos NFe (Modelo 55) e NFCe (Modelo 65).
- **Extração Completa dos Itens:** Detalhamento por item de produto com quantidades, valores unitários e totais.
- **Detalhamento Tributário Avançado:**
  - CST / CSOSN do ICMS (Simples Nacional e Regime Normal).
  - CST de PIS e COFINS.
  - **Reforma Tributária:** Suporte nativo aos novos campos de CST IBS/CBS e `cClassTrib` (Código de Classificação Tributária).
- **Exportação Otimizada:** Planilha gerada no formato `.xlsx` com colunas autoajustáveis e datas formatadas.

---

## 📋 Colunas Geradas no Excel

A planilha exportada conterá a seguinte estrutura consolidada:

1. **Modelo** *(55 ou 65)*
2. **Número NF**
3. **Série**
4. **Data Emissão**
5. **Chave de Acesso**
6. **CNPJ Emitente**
7. **Razão Social Emitente**
8. **CPF/CNPJ Destinatário**
9. **Nome Destinatário**
10. **Item** *(Número sequencial do produto)*
11. **Código Produto**
12. **Descrição Produto**
13. **NCM**
14. **CFOP**
15. **Unidade**
16. **Quantidade**
17. **Valor Unitário**
18. **Valor Total Item**
19. **CST/CSOSN ICMS**
20. **CST PIS**
21. **CST COFINS**
22. **CST IBS/CBS**
23. **cClassTrib**

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 & JavaScript (ES6+):** Processamento assíncrono DOMParser para parsing de XML.
- **[Tailwind CSS](https://tailwindcss.com/):** Interface moderna, responsiva e alinhada a padrões corporativos.
- **[SheetJS (xlsx)](https://sheetjs.com/):** Geração client-side de arquivos Excel nativos.
- **[Lucide Icons](https://lucide.dev/):** Conjunto de ícones vetoriais leves.

---

## 🌐 Como Executar o Projeto

### Localmente
Não é necessário instalar nenhuma dependência ou servidor Web (Node.js/Python).
1. Clone este repositório:
   ```bash
   git clone [https://github.com/silvioalbqrq/conversorXML-Excel.git](https://github.com/silvioalbqrq/conversorXML-Excel.git)