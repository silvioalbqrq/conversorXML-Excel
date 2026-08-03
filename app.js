document.addEventListener('DOMContentLoaded', () => {
    const xmlInput = document.getElementById('xml-input');
    const dropZone = document.getElementById('drop-zone');
    const statusPanel = document.getElementById('status-panel');
    const fileCountText = document.getElementById('file-count-text');
    const btnExport = document.getElementById('btn-export');

    let parsedRows = [];

    // Drag and Drop Handling
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('border-blue-500', 'bg-blue-50/50');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('border-blue-500', 'bg-blue-50/50');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-blue-500', 'bg-blue-50/50');
        if (e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    });

    xmlInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFiles(e.target.files);
        }
    });

    async function handleFiles(files) {
        const xmlFiles = Array.from(files).filter(file => file.name.toLowerCase().endsWith('.xml'));
        
        if (xmlFiles.length === 0) {
            alert('Por favor, selecione apenas arquivos XML válidos.');
            return;
        }

        parsedRows = [];
        const parser = new DOMParser();

        for (const file of xmlFiles) {
            try {
                const text = await file.text();
                const xmlDoc = parser.parseFromString(text, 'text/xml');
                const data = parseNFeXML(xmlDoc);
                parsedRows.push(...data);
            } catch (err) {
                console.error(`Erro ao ler arquivo ${file.name}:`, err);
            }
        }

        if (parsedRows.length > 0) {
            // --- CLASSIFICAÇÃO / ORDENAÇÃO POR NOTA E ITEM ---
            // Ordena por: 1º Número da NF, 2º Série e 3º Número do Item
            parsedRows.sort((a, b) => {
                const nNFDiff = Number(a['Número NF']) - Number(b['Número NF']);
                if (nNFDiff !== 0) return nNFDiff;

                const serieDiff = Number(a['Série']) - Number(b['Série']);
                if (serieDiff !== 0) return serieDiff;

                return Number(a['Item']) - Number(b['Item']);
            });

            fileCountText.textContent = `${xmlFiles.length} arquivo(s) XML processado(s) (${parsedRows.length} itens extraídos e classificados)`;
            statusPanel.classList.remove('hidden');
            statusPanel.classList.add('flex');
        } else {
            alert('Não foi possível extrair dados válidos dos XMLs fornecidos.');
        }
    }

    function parseNFeXML(xmlDoc) {
        const rows = [];
        const nfeProc = xmlDoc.getElementsByTagName('nfeProc')[0] || xmlDoc;
        const infNFe = nfeProc.getElementsByTagName('infNFe')[0];

        if (!infNFe) return rows;

        // Chave e Identificação da Nota
        const chave = infNFe.getAttribute('Id')?.replace('NFe', '') || '';
        const ide = infNFe.getElementsByTagName('ide')[0];
        const mod = getXmlVal(ide, 'mod'); // 55 (NFe) ou 65 (NFCe)
        const nNF = getXmlVal(ide, 'nNF');
        const serie = getXmlVal(ide, 'serie');
        const dhEmi = getXmlVal(ide, 'dhEmi') || getXmlVal(ide, 'dEmi');

        // Emitente
        const emit = infNFe.getElementsByTagName('emit')[0];
        const emitCNPJ = getXmlVal(emit, 'CNPJ') || getXmlVal(emit, 'CPF');
        const emitNome = getXmlVal(emit, 'xNome');

        // Destinatário
        const dest = infNFe.getElementsByTagName('dest')[0];
        const destCNPJ = dest ? (getXmlVal(dest, 'CNPJ') || getXmlVal(dest, 'CPF')) : 'Consumidor Final';
        const destNome = dest ? getXmlVal(dest, 'xNome') : 'Consumidor Final';

        // Itens da Nota Fiscal
        const detList = infNFe.getElementsByTagName('det');
        for (let i = 0; i < detList.length; i++) {
            const det = detList[i];
            const prod = det.getElementsByTagName('prod')[0];
            const imposto = det.getElementsByTagName('imposto')[0];

            // 1. CST / CSOSN do ICMS
            let cstIcms = '';
            if (imposto) {
                const icmsContainer = imposto.getElementsByTagName('ICMS')[0];
                if (icmsContainer && icmsContainer.children.length > 0) {
                    const icmsGroup = icmsContainer.children[0];
                    cstIcms = getXmlVal(icmsGroup, 'CST') || getXmlVal(icmsGroup, 'CSOSN');
                }
            }

            // 2. CST PIS & COFINS
            let cstPis = '';
            let cstCofins = '';
            if (imposto) {
                const pisContainer = imposto.getElementsByTagName('PIS')[0];
                if (pisContainer && pisContainer.children.length > 0) {
                    cstPis = getXmlVal(pisContainer.children[0], 'CST');
                }
                const cofinsContainer = imposto.getElementsByTagName('COFINS')[0];
                if (cofinsContainer && cofinsContainer.children.length > 0) {
                    cstCofins = getXmlVal(cofinsContainer.children[0], 'CST');
                }
            }

            // 3. Reforma Tributária: CST IBS / CBS e cClassTrib
            let cstIbsCbs = '';
            let cClassTrib = '';
            if (imposto) {
                const ibsCbsContainer = imposto.getElementsByTagName('IBS')[0] || 
                                         imposto.getElementsByTagName('CBS')[0] || 
                                         imposto.getElementsByTagName('IBSCBS')[0];
                if (ibsCbsContainer) {
                    cstIbsCbs = getXmlVal(ibsCbsContainer, 'CST');
                    cClassTrib = getXmlVal(ibsCbsContainer, 'cClassTrib');
                }
                if (!cClassTrib) {
                    cClassTrib = getXmlVal(prod, 'cClassTrib') || getXmlVal(imposto, 'cClassTrib');
                }
            }

            rows.push({
                'Modelo': mod,
                'Número NF': parseInt(nNF || '0', 10),
                'Série': parseInt(serie || '0', 10),
                'Data Emissão': dhEmi ? new Date(dhEmi).toLocaleString('pt-BR') : '',
                'Chave de Acesso': chave,
                'CNPJ Emitente': emitCNPJ,
                'Razão Social Emitente': emitNome,
                'CPF/CNPJ Destinatário': destCNPJ,
                'Nome Destinatário': destNome,
                'Item': parseInt(det.getAttribute('nItem') || '0', 10),
                'Código Produto': getXmlVal(prod, 'cProd'),
                'Descrição Produto': getXmlVal(prod, 'xProd'),
                'NCM': getXmlVal(prod, 'NCM'),
                'CFOP': getXmlVal(prod, 'CFOP'),
                'Unidade': getXmlVal(prod, 'uCom'),
                'Quantidade': parseFloat(getXmlVal(prod, 'qCom') || 0),
                'Valor Unitário': parseFloat(getXmlVal(prod, 'vUnCom') || 0),
                'Valor Total Item': parseFloat(getXmlVal(prod, 'vProd') || 0),
                'CST/CSOSN ICMS': cstIcms,
                'CST PIS': cstPis,
                'CST COFINS': cstCofins,
                'CST IBS/CBS': cstIbsCbs,
                'cClassTrib': cClassTrib
            });
        }

        return rows;
    }

    function getXmlVal(parent, tagName) {
        if (!parent) return '';
        const el = parent.getElementsByTagName(tagName)[0];
        return el ? el.textContent : '';
    }

    btnExport.addEventListener('click', () => {
        if (parsedRows.length === 0) return;

        const worksheet = XLSX.utils.json_to_sheet(parsedRows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "XML_Convertidos");

        // Ajustar largura das colunas automaticamente
        const max_width = parsedRows.reduce((w, r) => {
            return Object.keys(r).map((key, i) => {
                const value = r[key] ? r[key].toString() : '';
                return Math.max(w[i] || 10, value.length, key.length);
            });
        }, []);
        worksheet['!cols'] = max_width.map(w => ({ wch: w + 2 }));

        const now = new Date().toISOString().slice(0, 10);
        XLSX.writeFile(workbook, `Relatorio_XML_${now}.xlsx`);
    });
});
