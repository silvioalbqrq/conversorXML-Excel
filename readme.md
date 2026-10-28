# 📊 Conversor XML para Excel (NFe 55 & NFCe 65) Pro

Aplicação web corporativa para conversão, consolidação e análise de arquivos **XML de Nota Fiscal Eletrônica (NFe - Modelo 55)** e **Nota Fiscal de Consumidor Eletrônica (NFCe - Modelo 65)** para planilhas **Excel (.xlsx)**.

---

## 🛡️ Segurança e Privacidade (100% Client-Side)

Nenhum arquivo XML é enviado para servidores externos. O processamento, a validação DOM e a construção da planilha ocorrem **exclusivamente na memória do navegador do usuário** via JavaScript. Todas as bibliotecas são servidas do próprio repositório (pasta `vendor/`), sem CDN.

---

## 🚀 Destaques

- **Entrada automática:** ao selecionar arquivos, uma pasta (ou arrastar pastas), ZIP ou RAR, os XMLs são extraídos e processados na hora — sem botão extra.
- **ZIP e RAR nativos:** ZIP via JSZip; RAR via UnRAR compilado para WebAssembly, carregado sob demanda.
- **Situação da nota:** lê `protNFe/cStat` (autorizada, cancelada, denegada) e eventos de cancelamento (`tpEvento 110111`). Canceladas/denegadas ficam **fora dos totais** e aparecem marcadas na planilha.
- **Entrada x Saída:** lê `ide/tpNF`; o painel mostra saídas e entradas separadas, usando o **vNF** (total da nota) — não a soma dos itens.
- **Reforma Tributária:** extração de **CST IBS/CBS** e **cClassTrib** sem fallback para o CST do ICMS.
- **Rastreabilidade:** colunas de **Arquivo** (origem, inclusive "lote.zip → 123.xml"), **Chave de Acesso** e **Série** vêm marcadas por padrão.
- **Exportação ExcelJS:** moeda contábil (`R$`), data como data real (ordenável), cabeçalho congelado, autofiltro e zebrado.
- **Exporta o que está na tela:** a busca ativa também filtra o arquivo exportado.
- **Agrupamento por produto:** consolida por emitente + código + unidade (não soma kg com un) e ignora canceladas.
- **Seletor de colunas:** 29 colunas disponíveis, 27 marcadas por padrão.
- **Transparência:** XML inválido, arquivo que não é NFe/NFCe e duplicidade por chave geram aviso nominal — nada é descartado em silêncio.
- **Deduplicação por chave de acesso**, com contagem por lote.

---

## 📋 Colunas Suportadas

1. **Arquivo** *(origem do XML)*
2. **Situação** *(Autorizada / Cancelada / Denegada / Sem protocolo)*
3. **Tipo NF** *(Entrada / Saída)*
4. **Modelo** *(55 ou 65)*
5. **Número NF**
6. **Série**
7. **Data Emissão** *(data real no Excel)*
8. **Chave de Acesso**
9. **CNPJ Emitente**
10. **Razão Social Emitente**
11. **CPF/CNPJ Destinatário**
12. **Nome Destinatário**
13. **Item** *(Sequência nItem)*
14. **Código Produto** *(Original preservado)*
15. **Descrição Produto**
16. **NCM**
17. **CFOP**
18. **Unidade**
19. **Quantidade**
20. **Valor Unitário**
21. **Desconto**
22. **Valor Total Item**
23. **Total Item (s/ impostos)**
24. **Total da Nota (vNF)**
25. **CST/CSOSN ICMS**
26. **CST PIS**
27. **CST COFINS**
28. **CST IBS/CBS**
29. **cClassTrib**

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 / JavaScript ES6+**
- **Tailwind CSS** (Play CDN servido localmente em `vendor/tailwind.js`)
- **ExcelJS v4.3.0** — geração de planilhas `.xlsx`
- **JSZip 3.10.1** — leitura de ZIP
- **node-unrar-js 2.0.2 (WASM)** — leitura de RAR
- **Lucide Icons 0.344.0** — ícones vetoriais

As versões estão fixas em `vendor/`. Para atualizar, substitua os arquivos mantendo os mesmos nomes.

---

## ▶️ Rodar localmente

O RAR usa `import()` de módulo + WebAssembly, então precisa de HTTP (não abra por `file://`):

```bash
python -m http.server 8000
# abra http://localhost:8000/
```

---

## 🌐 Publicação no GitHub Pages

```bash
git add index.html readme.md vendor
git commit -m "feat: situação da nota, vNF, entrada/saída, ZIP/RAR e libs locais"
git push origin main
```

---

## ⚠️ Limites conhecidos

- Um XML de **evento de cancelamento** só marca a nota se a nota estiver na mesma sessão (ou for carregada depois, pois a chave fica registrada).
- Não há suporte a NFS-e, CT-e ou SAT — apenas NFe (55) e NFCe (65).
- Arquivo compactado **dentro** de outro compactado não é extraído; os XMLs de dentro do segundo arquivo são listados como ignorados.
- RAR com senha não é suportado.
