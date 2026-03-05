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
| `pnpm test` | Executar testes unitários em watch mode (Vitest) |
| `pnpm test run` | Executar todos os testes uma vez |
| `pnpm test run src/components/Header.spec.tsx` | Executar teste específico |
| `pnpm test run --coverage` | Executar com coverage |
| `pnpm test:e2e` | Executar testes E2E (Cypress) |
| `cypress open` | Abrir Cypress em modo interativo |

**Nota:** Use `pnpm test run` (não `pnpm test -- --run`) para executar testes uma vez.

### Lint e Format
| Comando | Descrição |
|---------|-----------|
| `pnpm lint` | Verificar erros com Biome |
| `pnpm format` | Formatar código com Biome |

**Biome Config:** `quoteStyle: single`, `indentWidth: 2`, `lineWidth: 80`, `useSortedClasses: error` (Tailwind class sorting enabled) |

---

## Tech Stack
- **Framework:** Next.js 16 (App Router) | **Linguagem:** TypeScript | **Estilização:** Tailwind CSS 4
- **Testes:** Vitest + React Testing Library | **Linter/Formatter:** Biome | **Validação:** Zod

---

## Estrutura de Diretórios
```
src/
├── app/           # Next.js App Router pages
├── components/    # Componentes React
├── contexts/      # Contextos React
├── types/         # Tipos customizados
├── utils/         # Funções auxiliares
└── http/          # Chamadas de API
```

## Convenções de Código

### TypeScript
- Usar TypeScript em todo o código
- Evitar `any` sem justificativa clara
- Definir interfaces/types para todas as props e dados
- Usar generics quando apropriado

### Imports
- Usar imports absolutos com path aliases (`@/*` → `./src/*`)
- Biome organiza imports automaticamente (`pnpm lint`)

### Naming Conventions
| Tipo | Convenção | Exemplo |
|------|-----------|---------|
| Componentes | PascalCase | `Header.tsx`, `ProductCard.tsx` |
| Hooks | camelCase + prefixo `use` | `useCart.ts`, `useAuth.ts` |
| Utilitários | camelCase | `formatCurrency.ts` |
| Arquivos de teste | `.spec.tsx` (componentes), `.spec.ts` (hooks/utils) | `header.spec.tsx`, `useCart.spec.ts` |
| Constantes | SCREAMING_SNAKE_CASE | `MAX_ITEMS`, `API_BASE_URL` |

### Componentes
1. Preferir Server Components; usar "use client" apenas quando necessário
2. UI em `/components`, hooks em `/hooks`, utils em `/utils`
3. Não colocar regra de negócio em componentes visuais
4. Usar Server Actions para mutations (colocar em `actions/`)

### Validação | Error Handling
- Usar **Zod** para validação de dados (schema validation)
- Validar dados de entrada em API routes e Server Actions
- Exemplo: `const schema = z.object({ email: z.string().email() })`
- Tratar estados loading e error em chamadas assíncronas
- Usar Error Boundaries para componentes React
- Nunca expor variáveis sensíveis no client
- Sempre usar try/catch em operações assíncronas

### CSS/Tailwind
- Usar classes Tailwind para estilização
- Manter classes ordenadas (Biome sorted classes enabled)
- Evitar inline styles
- Usar design tokens/constants para valores repetidos
- Usar `clsx` e `cn` (from `lib/utils`) para conditional className merging

---

## Testes Unitários

### Configuração
- **Framework:** Vitest | **Library:** @testing-library/react | **Matchers:** @testing-library/jest-dom
- **Mocks:** `vi.mock('next/navigation')`, `vi.mock('next/image')` | **API Mocks:** MSW (não mock global no fetch)

### MSW (Mock Service Worker)
- Arquivos em `test/handlers.ts` e `test/msw-setup.ts`
- Configuração global: `test/msw-setup.ts` - importado automaticamente pelo Vitest
- Adicionar handler: `http.get('/api/rota', () => HttpResponse.json({ data }))`
- Sobrescrever em testes: `server.use(http.get('/api/rota', () => ...))`

### Estrutura
- Localização: junto ao componente testado | Nome: `[component-name].spec.tsx` | Estrutura: `describe('<Component />')` + `it('should...')`

### Queries (Prioridade)
1. `getByRole` - Acessibilidade
2. `getByLabelText` - Formulários
3. `getByText` - Conteúdo
4. `getByTestId` - Último recurso

### Estratégia
- Testar comportamento, não implementação
- Usar user-event para interações
- Testar estados: vazio, carregamento, erro, sucesso

### O que EVITAR
- Detalhes de implementação (funções internas)
- waitFor com tempos fixos
- Seletores frágeis (CSS path)

---

## Boas Práticas

### Geral
- PRs pequenos, focados e com build passando
- Evitar estado global desnecessário
- Evitar complexidade e código morto
- Priorizar clareza, simplicidade e consistência

### Next.js
- Data fetching no server (Server Components)
- Usar Server Actions para mutations
- Static generation (SSG) quando possível
- API Routes para backend simples

### Segurança
- Não expor variáveis sensíveis no client
- Validar inputs no server
- Usar environment variables para secrets

### Environment Variables
- Variáveis públicas: `NEXT_PUBLIC_*` disponíveis no client
- Variáveis privadas: apenas no server (API routes, Server Actions)
- Nunca fazer commit de `.env.local` ou `.env.production`
- Usar `.env.example` para documentar variáveis necessárias

---

## Referências
- Testing: `docs/TESTING_GUIDELINE.md` | E2E: `docs/TESTING_E2E_GUIDELINE.md` | Commits: `docs/skills/COMMITS_GUIDELINE.md`
- Biome: `biome.json` | TSConfig: `tsconfig.json`
