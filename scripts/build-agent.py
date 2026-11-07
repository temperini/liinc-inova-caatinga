#!/usr/bin/env python3
"""Gera o AGENT.md (agente portátil, arquivo único) a partir da skill.

Uso:
    python3 scripts/build-agent.py            # gera AGENT.md na raiz
    python3 scripts/build-agent.py --check    # falha se AGENT.md estiver desatualizado

Fonte de verdade: plugins/inova-caatinga/skills/inova-caatinga/
Não edite o AGENT.md à mão: edite a skill e rode este script.
"""
import re
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILL_DIR = ROOT / "plugins" / "inova-caatinga" / "skills" / "inova-caatinga"
OUT = ROOT / "AGENT.md"

REPO = "temperini/liinc-inova-caatinga"
BRANCH = "main"
RAW = f"https://raw.githubusercontent.com/{REPO}/{BRANCH}/plugins/inova-caatinga/skills/inova-caatinga"

# Ordem dos arquivos embutidos (o texto integral do edital NÃO é embutido por tamanho).
EMBED = [
    "references/resumo-edital.md",
    "references/elegibilidade-vedacoes.md",
    "references/criterios-e-notas.md",
    "references/formulario-e-respostas.md",
    "references/avaliador-objecoes.md",
    "references/entrevista-diagnostico.md",
    "references/pesquisa-e-evidencias.md",
]

PREAMBLE = f"""# AGENTE INOVA CAATINGA ALAGOAS — instruções completas para a IA

**LEIA ESTE ARQUIVO INTEIRO ANTES DE RESPONDER.** Este documento define o agente que você vai ser nesta conversa. Depois de ler tudo, **responda somente com a mensagem de boas-vindas da seção 4**, sem resumir este arquivo e sem comentar sobre ele. Se você não conseguiu ler o arquivo inteiro, diga isso ao usuário e peça que ele cole o conteúdo na conversa.

**Como este arquivo está organizado**
- As seções 1 a 9 abaixo são o **comportamento do agente**.
- Sempre que o texto citar um arquivo `references/…`, ele está **incluído mais abaixo neste mesmo documento**, na seção "ARQUIVO: references/…".
- **Texto integral do edital:** não está embutido por causa do tamanho. Está no repositório e **é a única fonte além do resumo embutido** para regras do edital:
  - Transcrição (texto): {RAW}/references/edital-03-2026.md
  - PDF oficial: {RAW}/edital/EDITAL-03-2026-INOVA-CAATINGA-ALAGOAS.pdf
  - **Se você consegue abrir links**, abra a transcrição quando precisar confirmar o texto literal ou quando o resumo não responder. **Se não consegue**, use apenas o resumo embutido, **diga ao usuário que sua consulta ao edital é parcial** e, para dúvidas que o resumo não cobre, peça que ele cole o trecho do edital. **Nunca responda sobre o edital de memória.**
- Onde o texto diz "esta skill" ou "arquivos desta skill", entenda: **este documento e os dois links acima**.

---

"""


def strip_frontmatter(text: str) -> str:
    return re.sub(r"\A---\n.*?\n---\n", "", text, count=1, flags=re.S)


def build() -> str:
    skill = strip_frontmatter((SKILL_DIR / "SKILL.md").read_text(encoding="utf-8"))
    parts = [PREAMBLE, skill.strip(), "\n"]
    for rel in EMBED:
        body = (SKILL_DIR / rel).read_text(encoding="utf-8").strip()
        parts.append(f"\n\n---\n\n# ARQUIVO: {rel}\n\n{body}\n")
    parts.append("\n\n---\n\n**FIM DO ARQUIVO.** Agora responda somente com a mensagem de boas-vindas (seção 4).\n")
    return "".join(parts)


def build_zip() -> Path:
    """ZIP da skill (pasta `inova-caatinga/` na raiz do zip), para upload manual."""
    dist = ROOT / "dist"
    dist.mkdir(exist_ok=True)
    out = dist / "inova-caatinga-skill.zip"
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        for f in sorted(SKILL_DIR.rglob("*")):
            if f.is_file():
                info = zipfile.ZipInfo(f"inova-caatinga/{f.relative_to(SKILL_DIR).as_posix()}", date_time=(2026, 10, 8, 0, 0, 0))
                info.compress_type = zipfile.ZIP_DEFLATED
                info.external_attr = 0o644 << 16
                z.writestr(info, f.read_bytes())
    return out


NLM_DIR = ROOT / "notebooklm"
NLM_LIMIT = 10_000  # limite do campo de personalização do chat do NotebookLM
NLM_OUT = ROOT / "NOTEBOOKLM.md"
BASE_OUT = ROOT / "dist" / "BASE-DO-AGENTE-INOVA-CAATINGA.txt"
BASE_FILES = [
    "references/elegibilidade-vedacoes.md",
    "references/criterios-e-notas.md",
    "references/formulario-e-respostas.md",
    "references/avaliador-objecoes.md",
    "references/entrevista-diagnostico.md",
    "references/pesquisa-e-evidencias.md",
]


def build_notebooklm() -> tuple[str, str]:
    """Retorna (guia NOTEBOOKLM.md, texto da fonte BASE DO AGENTE)."""
    instr = (NLM_DIR / "instrucoes-do-chat.txt").read_text(encoding="utf-8").strip()
    if len(instr) > NLM_LIMIT:
        raise SystemExit(f"instrucoes-do-chat.txt tem {len(instr)} caracteres (limite {NLM_LIMIT}).")
    ativ = (NLM_DIR / "ativacao.txt").read_text(encoding="utf-8").strip()
    guide = (NLM_DIR / "NOTEBOOKLM.template.md").read_text(encoding="utf-8")
    guide = (guide.replace("{{INSTRUCOES}}", instr)
                  .replace("{{ATIVACAO}}", ativ)
                  .replace("{{N_CHARS}}", f"{len(instr):,}".replace(",", ".")))
    head = (
        "BASE DO AGENTE — INOVA CAATINGA AL (manual de método)\n\n"
        "Esta fonte é o MANUAL DE MÉTODO do agente (perguntas, triagem, critérios, objeções, "
        "formatos de resposta e pesquisa). NÃO é a fonte das regras do edital: para regras, prazos, "
        "valores, critérios e documentos, vale SOMENTE o PDF do Edital nº 03/2026. "
        "Em conflito com o PDF, vale o PDF.\n"
    )
    parts = [head]
    for rel in BASE_FILES:
        parts.append(f"\n\n==========\nSEÇÃO: {rel}\n==========\n\n" + (SKILL_DIR / rel).read_text(encoding="utf-8").strip() + "\n")
    return guide, "".join(parts)


def main() -> int:
    content = build()
    guide, base = build_notebooklm()
    if "--check" in sys.argv:
        ok = True
        for path, new in ((OUT, content), (NLM_OUT, guide), (BASE_OUT, base)):
            cur = path.read_text(encoding="utf-8") if path.exists() else ""
            if cur != new:
                print(f"{path.relative_to(ROOT)} está desatualizado. Rode: python3 scripts/build-agent.py")
                ok = False
        if ok:
            print("AGENT.md, NOTEBOOKLM.md e a base do agente estão em dia.")
        return 0 if ok else 1
    OUT.write_text(content, encoding="utf-8")
    NLM_OUT.write_text(guide, encoding="utf-8")
    (ROOT / "dist").mkdir(exist_ok=True)
    BASE_OUT.write_text(base, encoding="utf-8")
    print(f"NOTEBOOKLM.md gerado; BASE-DO-AGENTE: {len(base):,} caracteres")
    words = len(content.split())
    print(f"AGENT.md gerado: {len(content):,} caracteres, ~{words:,} palavras (~{int(len(content)/3.6):,} tokens estimados)")
    z = build_zip()
    print(f"ZIP da skill gerado: {z.relative_to(ROOT)} ({z.stat().st_size:,} bytes)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
