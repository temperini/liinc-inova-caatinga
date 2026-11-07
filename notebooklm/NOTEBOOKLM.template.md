# Agente Inova Caatinga AL no Gemini Notebook (NotebookLM)

Funciona no plano **gratuito ou pago**. O agente completo entra no caderno como **fonte**, junto com o **PDF do edital**, e você manda uma mensagem para ele rodar a partir dela. Leva uns 3 minutos.

> **Aviso:** ferramenta independente de apoio, sem vínculo oficial com o Sebrae ou a Fapeal. Não garante aprovação. As notas do agente são **estimativas**.

## Modo completo (recomendado): o agente inteiro como fonte

**1. Crie um caderno novo** em [notebooklm.google.com](https://notebooklm.google.com) (hoje também chamado de Gemini Notebook). Dica: **um caderno por projeto**.

**2. Adicione o PDF do edital como fonte (obrigatório).** *Adicionar fonte → PDF*, com o **Edital nº 03/2026 – Inova Caatinga Alagoas**. Se não tiver o arquivo, baixe aqui: [EDITAL-03-2026-INOVA-CAATINGA-ALAGOAS.pdf](https://github.com/temperini/liinc-inova-caatinga/raw/main/plugins/inova-caatinga/skills/inova-caatinga/edital/EDITAL-03-2026-INOVA-CAATINGA-ALAGOAS.pdf). **Deixe "EDITAL" no nome do arquivo.** Não adicione notícias, outros editais nem outras edições do Inova Caatinga: para as regras, só vale o edital de Alagoas.

**3. Adicione o agente completo como fonte.** Baixe [{{FULL_NAME}}](https://github.com/temperini/liinc-inova-caatinga/raw/main/dist/{{FULL_NAME}}) ({{N_FULL}} caracteres, sem cortes) e envie em *Adicionar fonte → arquivo*. Ele traz todas as instruções, a triagem, os critérios, o catálogo de objeções do avaliador, os modelos de resposta e o roteiro de entrevista. **Não renomeie o arquivo.**

**4. (Opcional, ajuda o NotebookLM a "obedecer" a fonte) Cole a instrução curta nas configurações do chat.** No painel do chat, abra *configurações (engrenagem) → Personalizado* e cole o bloco abaixo. Depois **salve**. (Os nomes dos botões podem variar um pouco.)

```
{{CURTA}}
```

**5. Se tiver, adicione os arquivos do seu projeto** como fontes (documentos, apresentações, planilhas, textos). Você também pode começar do zero.

**6. Envie esta mensagem no chat para ativar o agente:**

```
{{ATIVACAO}}
```

### Como saber se deu certo
O agente responde com **boas-vindas**, confirma que **encontrou o PDF do edital** (com número, data e prazo lidos nele) e mostra **4 opções numeradas**. Se ele **resumir o arquivo do agente** em vez de começar, envie: *"Não resuma. Atue como o agente descrito na fonte e responda só com a mensagem de boas-vindas."* Se disser que não achou o edital, volte ao passo 2.

## Modo compacto (alternativa): instruções no campo do chat
Use se o modo completo não funcionar bem no seu caso. O campo de personalização aceita **até 10.000 caracteres**; o texto abaixo tem {{N_CHARS}}. Cole em *configurações do chat → Personalizado*, mantenha o PDF do edital como fonte (passo 2) e envie a mensagem de ativação (passo 6). Se quiser mais profundidade, adicione também o agente completo (passo 3).

```
{{INSTRUCOES}}
```

## O que muda no NotebookLM
- **Ele responde com base nas fontes do caderno.** Para as regras, a fonte é o PDF do edital.
- **O chat não navega na web.** Para mercado, ciência, regulação e concorrentes, use *Descobrir fontes* ou a pesquisa na web do NotebookLM para **importar fontes confiáveis** (órgãos oficiais, institutos de pesquisa, universidades, legislação) e peça ao agente para usá-las. Sem fonte, o agente marca `[EVIDÊNCIA NECESSÁRIA]`.
- **Ficha do Projeto:** a cada marco o agente entrega um resumo. **Salve como Nota** no caderno (e, se quiser, converta a nota em fonte) para retomar depois.
- **As instruções do chat valem para o caderno todo** e podem afetar também outros recursos do NotebookLM (resumos, áudio). Se isso atrapalhar, use outro caderno para esses usos.

## Se algo não funcionar
- **O agente trata o arquivo como um texto a resumir:** use a mensagem do passo "Como saber se deu certo" e confira se a instrução curta (passo 4) foi salva.
- **A resposta ignora a regra "só o edital":** lembre com *"Responda sobre o edital apenas com o PDF, citando item e página."*
- **O agente diz que "não consegue responder":** peça *"Redija o texto com base nas minhas respostas e nas fontes, marcando o que faltar com [PREENCHER]."*
- **Limite de uso do plano gratuito:** o NotebookLM limita o uso por período e por plano. Se atingir, aguarde a renovação ou use um plano pago.

## Limitações
- Este guia foi **montado e simulado**, mas **ainda não foi testado dentro do NotebookLM**. O NotebookLM foi feito para responder **sobre** as fontes, não para ser guiado por elas como instruções; por isso o modo completo usa a instrução curta e uma mensagem de ativação firme. Confirme o primeiro uso com os testes de [`tests/casos-de-teste.md`](tests/casos-de-teste.md).
- O PDF é a fonte oficial. Se houver adendo ou retificação, adicione o novo documento ao caderno e avise o agente, que tratará o que você informar como "não verificado".
- A restrição "só o edital para as regras" é uma **instrução**, não uma trava técnica.
