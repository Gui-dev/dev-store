# Regras para Testes E2E Frontend (Cypress)

## Configuração
- **Cypress**: Execute `pnpm test:e2e` ou `cypress run`
- **Modo interativo:** `cypress open`

## Tech Stack
- **Ferramenta:** Cypress (Test Runner).
- **Linguagem:** TypeScript.
- **Ambiente:** Navegadores reais (Electron, Chromium, Firefox).

## Estratégia de Teste
- **Foco:** Jornadas do usuário (User Flows) e fluxos críticos (Login, Checkout, Cadastro).
- **Isolamento:** Diferente do unitário, aqui testamos a integração real.
- **Seletores:** Priorize `cy.getByRole`, `cy.getByText` ou `cy.getByPlaceholder` (foco em acessibilidade). Evite seletores CSS genéricos como `div > span`.
- **Rotas protegidas:** Use `beforeEach` para fazer login via API ou UI.

## Nomenclatura e Diretório
- **Localização:** Mesmo diretório do arquivo/página testada
- **Extensão:** `.e2e.cy.ts`
- **Nome:** Nome da pasta onde está o arquivo
- **Exemplo:** 
  - `src/app/products/page.tsx` → `src/app/products/products.e2e.cy.ts`
  - `src/app/login/page.tsx` → `src/app/login/login.e2e.cy.ts`

## Padrões de Código
- **Navegação:** Use `cy.visit('/')` com caminhos relativos.
- **Asserções:** Use `.should('be.visible')`, `.should('contain')`, `expect()`.
- **Ações:** Sempre use `.click()`, `.type()`, `.clear()` encadeados.
- **Hooks:** Use `beforeEach()` para setups comuns (como limpar estado ou fazer login).

### Custom Commands Disponíveis
- `cy.getByRole(role, options)` - Acessibilidade
- `cy.getByLabelText(text)` - Labels de formulário
- `cy.getByPlaceholderText(text)` - Inputs
- `cy.getByText(text)` - Conteúdo

## O que EVITAR
- **Hardcoded Waits:** Nunca use `cy.wait(3000)`. O Cypress tem auto-waiting; se precisar, use esperas baseadas em estado (ex: `should()`).
- **Dependência de Dados:** Tente fazer com que o teste crie seus próprios dados ou limpe o estado para não quebrar em execuções consecutivas.
- **Seletores frágeis:** Evite dependência de classes CSS que mudam frequentemente.
