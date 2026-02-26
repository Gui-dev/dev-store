# AGENTS.md - Diretrizes para Agentes de Código

## Comandos

### Desenvolvimento
| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Iniciar dev server (Next.js) |
| `pnpm build` | Build de produção |
| `pnpm start` | Iniciar server em produção |

### Testes
| Comando | Descrição |
|---------|-----------|
| `pnpm test` | Executar todos os testes unitários (Vitest) |
| `pnpm test -- --run` | Executar todos os testes uma vez (sem watch) |
| `pnpm test -- --run <arquivo>` | Executar teste específico |
| `pnpm test -- --run --coverage` | Executar com coverage |

### Lint e Format
| Comando | Descrição |
|---------|-----------|
| `pnpm lint` | Verificar erros com Biome |
| `pnpm format` | Formatar código com Biome |

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS 4
- **Testes Unitários:** Vitest + React Testing Library + jest-dom
- **Testes E2E:** Cypress
- **Linter/Formatter:** Biome

---

## Regras de Código

### Estrutura de Diretórios
```
src/
├── app/           # Next.js App Router pages
├── components/   # Componentes React
├── hooks/        # Custom hooks
├── lib/          # Utilitários e bibliotecas
├── utils/        # Funções auxiliares
└── http/         # Chamadas de API
```

### Componentes
1. Preferir Server Components. Usar "use client" apenas quando necessário
2. UI em `/components`, hooks em `/hooks`, utils em `/lib` ou `/utils`
3. Não colocar regra de negócio diretamente em componentes visuais
4. Separar responsabilidades claramente

### TypeScript
1. Usar TypeScript em todo o código
2. Evitar `any` sem justificativa clara
3. Definir interfaces/types para todas as props e dados
4. Usar generics quando apropriado

### Imports
1. Usar imports absolutos com path aliases (configurados em tsconfig)
2. Organizar imports: externos > internos > relativos
3. Biome configurado para organizar imports automaticamente (`pnpm lint`)

### Naming Conventions
| Tipo | Convenção | Exemplo |
|------|-----------|---------|
| Componentes | PascalCase | `Header.tsx`, `ProductCard.tsx` |
| Hooks | camelCase com prefixo `use` | `useCart.ts`, `useAuth.ts` |
| Utilitários | camelCase | `formatCurrency.ts`, `validateEmail.ts` |
| Arquivos de teste | Mesmo nome + `.spec.tsx` | `header.spec.tsx` |
| Constantes | SCREAMING_SNAKE_CASE | `MAX_ITEMS`, `API_BASE_URL` |

### Error Handling
1. Tratar loading e erro em chamadas assíncronas
2. Usar Error Boundaries para componentes React
3. Never expose sensitive variables to client
4. Validar dados de entrada em funções utilitárias

### CSS/Tailwind
1. Usar classes Tailwind para estilização
2. Manter classes ordenadas (Biome sorted classes enabled)
3. Evitar inline styles
4. Usar design tokens/constants para valores repetidos

---

## Testes Unitários

### Configuração
- **Framework:** Vitest
- **Library:** @testing-library/react
- **Matchers:** @testing-library/jest-dom
- **Mocks:** `vi.mock('next/navigation')`, `vi.mock('next/image')`

### Estrutura
- Localização: junto ao componente testado
- Nome: `[component-name].spec.tsx` ou `[component-name].test.tsx`
- Estrutura: `describe('<Component />')` + `it('should...')`

### Queries (Prioridade)
1. `getByRole` - Acessibilidade
2. `getByLabelText` - Formulários
3. `getByText` - Conteúdo
4. `getByTestId` - Último recurso

### Estratégia
- Testar comportamento, não implementação
- Usar user-event para interações
- Mockar dependências externas (APIs, módulos Next.js)
- Testar estados: vazio, carregamento, erro, sucesso

### O que EVITAR
- Detalhes de implementação (funções internas)
- waitFor com tempos fixos
- Seletores frágeis (CSS path)
- Testar o que o usuário não vê

---

## Testes E2E (Cypress)

### Configuração
- Execute `pnpm test:e2e` ou `cypress run`
- Modo interativo: `cypress open`

### Estrutura
- Localização: mesmo diretório do arquivo/página testada
- Extensão: `.e2e.cy.ts`
- Nome: nome da pasta onde está o arquivo
- Exemplo: `src/app/products/page.tsx` → `src/app/products/products.e2e.cy.ts`

### Seletores (Prioridade)
1. `cy.getByRole` - Acessibilidade
2. `cy.getByLabelText` - Labels de formulário
3. `cy.getByPlaceholderText` - Inputs
4. `cy.getByText` - Conteúdo

### Padrões
- Usar `cy.visit()` com caminhos relativos
- Asserções: `should('be.visible')`, `should('contain')`
- Sempre usar `cy.get()` encadeado
- Hooks: `beforeEach()` para setups

### O que EVITAR
- `cy.wait()` com tempos fixos
- Seletores CSS genéricos (`div > span`)
- Dependência entre testes
- Dados hardcoded que podem mudar

---

## Boas Práticas

### Geral
1. PRs devem ser pequenos, focados e com build passando
2. Evitar estado global desnecessário
3. Evitar complexidade desnecessária e código morto
4. Priorizar clareza, simplicidade e consistência

### Next.js
1. Data fetching no server (Server Components)
2. Usar Server Actions para mutations
3.静态生成 (SSG) quando possível
4. API Routes para backend simples

### Segurança
1. Não expor variáveis sensíveis no client
2. Validar inputs no server
3. Usar environment variables para secrets

---

## Referências

- Testing Guidelines: @docs/TESTING_GUIDELINE.md
- E2E Guidelines: @docs/TESTING_E2E_GUIDELINE.md
- Biome Config: biome.json
- TSConfig: tsconfig.json
