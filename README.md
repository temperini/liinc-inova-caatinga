# Agente Inova Caatinga AL

Um agente de IA que ajuda você a **escrever, revisar e melhorar a candidatura** ao **Edital nº 03/2026 — Inova Caatinga Alagoas** (Sebrae/AL e Fapeal). Ele trabalha com dois chapéus: **consultor-pesquisador** (ajuda a estruturar e escrever) e **avaliador parceiro** (lê seu projeto como a banca leria e diz, com recomendações, o que melhorar).

> **Aviso:** ferramenta independente de apoio, **sem vínculo oficial** com o Sebrae ou a Fapeal. Ela **não garante aprovação**. A nota que o agente mostra é uma **estimativa** com base nos critérios publicados no edital. O texto oficial é o PDF deste repositório.

---

## Como ativar (escolha o caminho mais fácil para você)

### Caminho 1 — Prompt curto + link (qualquer IA que abra links)
Copie e cole na IA (ChatGPT, Claude, Gemini, DeepSeek etc.):

```
Ative meu agente do Inova Caatinga a partir deste link: https://raw.githubusercontent.com/temperini/liinc-inova-caatinga/main/AGENT.md
Leia o arquivo inteiro antes de responder e siga as instruções dele.
```

⚠️ **Se a IA não abrir links, ela pode dizer que leu sem ter lido.** Se ela não mostrar a mensagem de boas-vindas do agente com as 4 opções, use o Caminho 2.

### Caminho 2 — Copiar e colar (funciona em qualquer IA)
1. Abra o arquivo [`AGENT.md`](AGENT.md) e clique em **Copiar** (ícone no canto superior direito de "Raw").
2. Cole numa conversa nova e envie.
3. O agente responde com as opções iniciais.

O arquivo é longo (cerca de **17 mil tokens**). Se a sua IA reclamar do tamanho, tente em outra ou numa versão paga.

### Caminho 3 — Instalar como plugin/skill (mais completo e automático)

**Claude Code** (terminal ou app desktop):
```
/plugin marketplace add temperini/liinc-inova-caatinga
/plugin install inova-caatinga@liinc-inova-caatinga
```
Depois, é só dizer: *"Quero montar minha candidatura ao Inova Caatinga."* O Claude aciona o agente sozinho. Também dá para chamar com `/inova-caatinga:inova-caatinga`.

**Claude.ai (site e apps):** em *Customize → Plugins → Add marketplace*, cole `temperini/liinc-inova-caatinga`. Alternativa: *Customize → Skills → Upload a skill* com o arquivo [`dist/inova-caatinga-skill.zip`](dist/inova-caatinga-skill.zip).

**ChatGPT / Codex (OpenAI):**
- **Codex (linha de comando):** `codex plugin marketplace add temperini/liinc-inova-caatinga`, e instale pelo diretório de plugins.
- **App desktop do ChatGPT:** adicione o repositório como fonte de plugins (o app lê `.agents/plugins/marketplace.json` e também `.claude-plugin/marketplace.json`).
- **ChatGPT (skills):** envie o arquivo [`dist/inova-caatinga-skill.zip`](dist/inova-caatinga-skill.zip) em *Skills → Create → Upload*. *(Caminho descrito em guias de terceiros; confirme no seu plano.)*

---

## O que o agente faz
1. **Triagem de elegibilidade e vedações** (com item e página do edital).
2. **Entrevista guiada** ou leitura dos arquivos que você enviar (até 3 perguntas por vez).
3. **Pesquisa na web** para problema, mercado, ciência e regulação, **com fonte, ano e grau de confiança**.
4. **Respostas prontas por campo do formulário** do Sebrae Startups e **dossiê de apoio** com evidências.
5. **Revisão do Avaliador a cada versão:** nota estimada por critério (MN, SO, AM, CE, TS), objeções prováveis e **como resolver**.
6. **Checklist final**, consistência entre seções e lista de documentos pós-resultado.
7. **Dúvidas sobre o edital**, sempre com **item e página**.
8. **Ficha do Projeto**: um resumo que você salva e cola numa nova conversa para continuar de onde parou.

## Regras do agente (resumo)
- **Sobre o edital:** só os arquivos deste repositório. Nada de memória, notícias ou outras edições.
- **Sobre o resto:** pesquisa na web normalmente.
- **Nunca inventa** dados, fontes, clientes, cartas ou parcerias; marca `[EVIDÊNCIA NECESSÁRIA]`.
- **Não ajuda a inflar, omitir ou fraudar** nada (nem bonificações, nem pontuação de tecnologia social).
- **Não promete aprovação.**

---

## Status de compatibilidade

| Onde | Como | Status |
|---|---|---|
| Claude Code | plugin pelo marketplace | **Validado** com `claude plugin validate` (estrutura). Falta testar o comportamento do agente em uso real. |
| Claude.ai | marketplace por link ou ZIP da skill | Descrito na documentação oficial; **a testar** (planos variam). |
| Codex / ChatGPT desktop | marketplace do repositório | Formato segue a documentação oficial da OpenAI; **a testar**. |
| ChatGPT (web) | ZIP da skill | Baseado em guias de terceiros; **a testar**. |
| Gemini, DeepSeek e outras | Caminho 1 ou 2 (`AGENT.md`) | **A testar.** Sem acesso a links, só o Caminho 2 é seguro. |

Os resultados dos testes entram em [`tests/casos-de-teste.md`](tests/casos-de-teste.md).

---

## Estrutura do repositório
```
AGENT.md                          agente portátil, arquivo único (GERADO, não edite à mão)
dist/inova-caatinga-skill.zip     skill compactada para upload manual (GERADO)
.claude-plugin/marketplace.json   catálogo para Claude (e lido pelo app do ChatGPT)
.agents/plugins/marketplace.json  catálogo para Codex/ChatGPT
plugins/inova-caatinga/
  plugin.json                     manifesto portátil
  .claude-plugin/plugin.json      manifesto do Claude
  skills/inova-caatinga/
    SKILL.md                      o agente (orquestrador)
    edital/                       PDF oficial do edital
    references/                   edital em texto, critérios, triagem, revisão etc.
scripts/build-agent.py            gera AGENT.md e o ZIP a partir da skill
tests/                            casos de teste e projetos fictícios
```

## Para quem mantém
- **Fonte de verdade:** `plugins/inova-caatinga/skills/inova-caatinga/`. Depois de editar qualquer arquivo ali, rode:
  ```
  python3 scripts/build-agent.py          # regenera AGENT.md e o ZIP
  python3 scripts/build-agent.py --check  # confere se AGENT.md está em dia
  claude plugin validate ./               # valida marketplace e plugin
  ```
- **Se o edital tiver adendo ou retificação:** coloque o PDF em `skills/inova-caatinga/edital/`, atualize `references/edital-03-2026.md` e `references/resumo-edital.md` (cite a nova versão e a data), aumente a `version` nos dois `plugin.json` e rode o script. O agente só conhece o que estiver no repositório.
- **Os links `raw.githubusercontent.com/.../main/...`** só funcionam depois que o conteúdo estiver na branch `main`.
- **Pendências de publicação:** definir uma **licença** (nenhuma foi escolhida) e um ícone, se quiser listar o plugin em diretórios.

## Limitações conhecidas
- O edital **não informa** os campos e os limites de caracteres do formulário. O agente pede que você cole o que vê na plataforma.
- O PDF original foi transcrito para texto (`references/edital-03-2026.md`) conferido palavra a palavra, mas **em dúvida, vale o PDF**.
- A restrição "consultar só o repositório sobre o edital" é uma **instrução ao modelo**, não uma trava técnica. Por isso há casos de teste para ela.
- O agente não envia nada à plataforma nem acessa contas.
