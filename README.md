# Projeto: CI com GitHub Actions (`tests-ci`)

## 1) Instalação


### `npm ci` vs `npm install`

- `npm ci`: instalação limpa e reprodutível baseada estritamente em `package-lock.json`. Falha se não houver `package-lock.json`. Ideal para CI/pipelines e para garantir instalações idênticas.
- `npm install`: usado em desenvolvimento para instalar/atualizar dependências; pode alterar o `package-lock.json`.

- Recomendações:
	- Use `npm ci` no CI (o workflow já usa `npm ci`).
	- Use `npm install` localmente quando for adicionar ou atualizar dependências.

## 2) Como rodar (local)

- Rodar testes com saída no terminal :

```bash
npm test
```

- Gerar o relatório JUnit localmente (mesmo formato que o CI produz):

```bash
npm run test:ci
ls -la reports/
```

## 3) Scripts úteis

- `npm test` — roda Mocha com o repórter padrão (console).
- `npm run test:ci` — roda Mocha com `mocha-junit-reporter` e grava `reports/test-results.xml`.

## 4) Como funciona a pipeline (`.github/workflows/tests-ci.yaml`)

O workflow principal está em `.github/workflows/tests-ci.yaml` (nome: "CI - Testes") e contempla três gatilhos principais:

- `push` na branch `main` — execução automática após push.
- `workflow_dispatch` — execução manual pela interface do GitHub (Actions → Run workflow).
- `schedule` — execução agendada via cron (o workflow atual usa `0 18 * * *`, executando diariamente às 18:00 UTC).

Passos executados no job `mocha-tests`:

1. Checkout do repositório via `actions/checkout`.
2. Setup do Node.js via `actions/setup-node`.
3. Instalação das dependências com `npm ci`.
4. Criação da pasta `reports` (local onde o repórter grava o XML).
5. Execução dos testes em modo CI: `npm run test:ci` — gera `reports/test-results.xml`.
6. Upload do arquivo `reports/test-results.xml` como artifact usando `actions/upload-artifact`.

## 5) Onde encontro o relatório no GitHub

Após a execução do workflow (por push, manual ou agendada), abra a run em Actions → clique na execução → procure a seção "Artifacts". O artifact "Relatórios de Testes Mocha" contém a pasta `reports` (incluindo `test-results.xml`).


