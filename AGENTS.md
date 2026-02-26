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
| `pnpm test -- --run` | Executar todos os testes uma vez |
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
- **Linter/Formatter:** Biome

---

## Estrutura de Diretórios

```
src/
├── app/           # Next.js App Router pages
├── components/    # Componentes React
├── hooks/         # Custom hooks
├── lib/           # Utilitários e bibliotecas
├── utils/         # Funções auxiliares
└── http/          # Chamadas de API
```

---

## Convenções de Código

### TypeScript
- Usar TypeScript em todo o código
- Evitar `any` sem justificativa clara
- Definir interfaces/types para todas as props e dados
- Usar generics quando apropriado

### Imports
- Usar imports absolutos com path aliases (`@/*` → `./src/*`)
- Organizar: externos > internos > relativos
- Biome organiza imports automaticamente (`pnpm lint`)

### Naming Conventions
| Tipo | Convenção | Exemplo |
|------|-----------|---------|
| Componentes | PascalCase | `Header.tsx`, `ProductCard.tsx` |
| Hooks | camelCase + prefixo `use` | `useCart.ts`, `useAuth.ts` |
| Utilitários | camelCase | `formatCurrency.ts` |
| Arquivos de teste | `.spec.tsx` | `header.spec.tsx` |
| Constantes | SCREAMING_SNAKE_CASE | `MAX_ITEMS`, `API_BASE_URL` |

### Componentes
1. Preferir Server Components; usar "use client" apenas quando necessário
2. UI em `/components`, hooks em `/hooks`, utils em `/lib` ou `/utils`
3. Não colocar regra de negócio em componentes visuais
4. Separar responsabilidades claramente

### Error Handling
- Tratar estados loading e error em chamadas assíncronas
- Usar Error Boundaries para componentes React
- Nunca expor variáveis sensíveis no client
- Validar dados de entrada em funções utilitárias

### CSS/Tailwind
- Usar classes Tailwind para estilização
- Manter classes ordenadas (Biome sorted classes enabled)
- Evitar inline styles
- Usar design tokens/constants para valores repetidos

---

## Testes Unitários

### Configuração
- **Framework:** Vitest
- **Library:** @testing-library/react
- **Matchers:** @testing-library/jest-dom
- **Mocks:** `vi.mock('next/navigation')`, `vi.mock('next/image')`
- **API Mocks:** MSW (Mock Service Worker) - não usar mock global no fetch

### MSW (Mock Service Worker)
- Arquivos em `test/handlers.ts` e `test/msw-setup.ts`
- Handler existente: `/api/products/featured`
- Adicionar novo handler:

```typescript
// test/handlers.ts
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/sua-rota', () => {
    return HttpResponse.json({ data: 'seu mock' })
  }),
]
```

- Sobrescrever resposta em testes específicos:

```typescript
it('should handle error', async () => {
  server.use(
    http.get('/api/products/featured', () => {
      return HttpResponse.json({ products: [] })
    })
  )
  // seu teste
})
```

### Estrutura
- Localização: junto ao componente testado
- Nome: `[component-name].spec.tsx`
- Estrutura: `describe('<Component />')` + `it('should...')`

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
- Testar o que o usuário não vê

---

## Boas Práticas

### Geral
1. PRs pequenos, focados e com build passando
2. Evitar estado global desnecessário
3. Evitar complexidade e código morto
4. Priorizar clareza, simplicidade e consistência

### Next.js
1. Data fetching no server (Server Components)
2. Usar Server Actions para mutations
3. Static generation (SSG) quando possível
4. API Routes para backend simples

### Segurança
1. Não expor variáveis sensíveis no client
2. Validar inputs no server
3. Usar environment variables para secrets

---

## Referências

- Testing Guidelines: `docs/TESTING_GUIDELINE.md`
- Biome Config: `biome.json`
- TSConfig: `tsconfig.json`
