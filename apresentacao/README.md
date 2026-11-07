# Como farmar aura no Inova Caatinga

Apresentação web 16:9, 19 telas, roteiro total de 15 minutos. Evandro Temperini · Maratona LIINC · Santana do Ipanema/AL · 07/11/2026.

Abra `index.html`. Teclas: setas/espaço (navegar), F (tela cheia), N (notas), T (cronômetro), G (índice).

`apoio.html` oferece exatamente dois documentos em `downloads/`: prompt completo TXT e edital PDF. Os botões buscam os arquivos diretamente no GitHub; os bytes fornecidos foram preservados. Sem QR Code. O texto integral do prompt também pode ser visualizado e copiado; a mensagem curta de ativação não é um terceiro download.

O endereço de download usa a branch existente do repositório, indicada em `config.js` e nos links HTML. Se ela for renomeada, atualize os links.

Foto e logo fornecidos pelo usuário. Sem bibliotecas remotas para execução. Os downloads exigem internet.

## Publicar no Vercel

Importe este repositório e selecione a branch existente. Configure:
- Root Directory: `apresentacao`
- Framework Preset: `Other`
- Build Command: vazio (site estático, sem build)
- Output Directory: `.`

Não é necessário instalar dependências nem definir variáveis de ambiente. GitHub Pages não é utilizado.

O cronômetro de 15 minutos começa automaticamente na primeira entrada no slide 2. Voltar ao slide 2 não reinicia o tempo. O controle T permite pausar e retomar. O tempo aparece em negrito.

Pontuação em quatro telas; cada comparação EVITE/ESCREVA COM CLAREZA em duas telas consecutivas. Temas de redação são agrupamentos do edital, não nomes confirmados de campos do formulário. O TXT de downloads é sincronizado a partir de dist/ após executar scripts/build-agent.py.
