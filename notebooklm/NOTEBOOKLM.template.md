# Agente Inova Caatinga AL no Gemini Notebook (NotebookLM)

Funciona no plano **gratuito ou pago**. Você só precisa de **3 coisas**: o **PDF do edital**, o **Prompt 1** (instruções do chat) e o **Prompt 2** (para ativar). Leva uns 3 minutos.

> **Aviso:** ferramenta independente de apoio, sem vínculo oficial com o Sebrae ou a Fapeal. Não garante aprovação. As notas do agente são **estimativas**.

## Passo a passo

**1. Crie um caderno novo** em [notebooklm.google.com](https://notebooklm.google.com) (hoje também chamado de Gemini Notebook). Dica: **um caderno por projeto**.

**2. Adicione o PDF do edital como fonte (obrigatório).** Use *Adicionar fonte → PDF* e envie o **Edital nº 03/2026 – Inova Caatinga Alagoas**. Se não tiver o arquivo, baixe aqui: [EDITAL-03-2026-INOVA-CAATINGA-ALAGOAS.pdf](https://github.com/temperini/liinc-inova-caatinga/raw/main/plugins/inova-caatinga/skills/inova-caatinga/edital/EDITAL-03-2026-INOVA-CAATINGA-ALAGOAS.pdf). **Deixe "EDITAL" no nome do arquivo.** Não adicione notícias, outros editais nem outras edições do Inova Caatinga: o agente deve consultar só o edital de Alagoas para as regras.

**3. Cole o Prompt 1 nas instruções do chat.** No painel do chat, abra o ícone de **configurações** (engrenagem ou "Configurar chat"), escolha **Personalizado** (*Custom*) e cole o bloco abaixo. Depois **salve**. (Os nomes dos botões podem mudar um pouco; o limite do campo é de 10.000 caracteres e este texto tem {{N_CHARS}}.)

**Prompt 1: Instruções do agente (cole no campo de personalização do chat)**

```
{{INSTRUCOES}}
```

**4. (Opcional, recomendado) Adicione o manual do agente como segunda fonte.** Envie o arquivo [BASE-DO-AGENTE-INOVA-CAATINGA.txt](https://github.com/temperini/liinc-inova-caatinga/raw/main/dist/BASE-DO-AGENTE-INOVA-CAATINGA.txt) (*Adicionar fonte → arquivo*). Ele traz o roteiro de entrevista, o catálogo de objeções do avaliador e os modelos de resposta. Sem ele o agente funciona, mas com menos profundidade.

**5. Se tiver, adicione os arquivos do seu projeto** como fontes (documentos, apresentações, planilhas, textos). Você também pode começar do zero.

**6. Envie o Prompt 2 no chat para ativar:**

```
{{ATIVACAO}}
```

## Como saber se deu certo
O agente responde com **boas-vindas**, diz que **encontrou o PDF do edital** (com número, data e prazo lidos nele) e mostra **4 opções numeradas**. Se ele disser que não encontrou o edital, volte ao passo 2.

## O que muda no NotebookLM
- **Ele responde com base nas fontes do caderno.** Para as regras, a fonte é o PDF do edital.
- **O chat não navega na web.** Para mercado, ciência, regulação e concorrentes, use *Descobrir fontes* ou a pesquisa na web do NotebookLM para **importar fontes confiáveis** (órgãos oficiais, institutos de pesquisa, universidades, legislação) e peça ao agente para usá-las. Sem fonte, o agente marca `[EVIDÊNCIA NECESSÁRIA]`.
- **Ficha do Projeto:** a cada marco o agente entrega um resumo. **Salve como Nota** no caderno para retomar depois.
- **Estas instruções valem para o caderno todo**, e podem afetar também o que você gerar em outras áreas do NotebookLM (como resumos e áudio). Se isso atrapalhar, use outro caderno para esses usos.

## Se algo não funcionar
- **O campo não aceita o texto inteiro:** cole o Prompt 1 como **primeira mensagem do chat** e envie. Depois envie o Prompt 2. (Nesse caminho as instruções podem se perder em conversas longas; reenvie se necessário.)
- **A resposta ignora a regra de "só o edital":** lembre o agente com *"Responda sobre o edital apenas com o PDF, citando item e página."*
- **O agente diz que "não consegue responder":** peça *"Redija o texto com base nas minhas respostas e nas fontes, marcando o que faltar com [PREENCHER]."*
- **Limite de uso do plano gratuito:** o NotebookLM limita o uso por período e por plano. Se atingir o limite, aguarde a renovação ou use um plano pago.

## Limitações
- Este guia foi **montado e simulado**, mas **ainda não foi testado dentro do NotebookLM**. Confirme o primeiro uso com os testes de [`tests/casos-de-teste.md`](tests/casos-de-teste.md).
- O PDF é a fonte oficial. Se houver adendo ou retificação, adicione o novo documento ao caderno e avise o agente, que tratará o que você informar como "não verificado".
- A restrição "só o edital para as regras" é uma **instrução**, não uma trava técnica.
