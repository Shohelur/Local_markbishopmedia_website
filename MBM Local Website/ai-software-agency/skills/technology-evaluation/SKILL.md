---
name: technology-evaluation
description: >
  Provides structured technology comparison frameworks for evaluating frontend,
  backend, database, hosting, and other technology choices. Activate when
  comparing technology options, evaluating a technology stack, or producing
  technology recommendations with tradeoff analysis.
data_current_as_of: "2026-08"
---

# Skill: Technology Evaluation

> ⚠️ **STALENESS WARNING:** Reference tables in this document reflect technology states
> as of Agency v1.1.0 (2026-08). Always supplement with current research (official docs,
> current release notes) before making final recommendations. Do not rely solely on
> version numbers or provider lists in this file.

## Overview
This skill provides reference knowledge for evaluating common technology choices
across all major categories. It is used during Phase 10-11 (Architecture) and
whenever a technology decision must be made.

## Core Evaluation Rule
Never recommend technology based solely on popularity or familiarity.
Always evaluate against the specific project requirements, infrastructure budget,
and development team capacity gathered in Phase 1.

---

## Frontend Technology Reference

### SPA Frameworks
| Framework | Best For | Watch Out For |
|---|---|---|
| React + Vite | Large teams, complex state, ecosystem breadth | Bundle size, boilerplate |
| Next.js | SEO-critical apps, full-stack, hybrid SSR/SSG | Complexity, Vercel dependency |
| Vue 3 + Vite | Moderate teams, gentle learning curve | Smaller ecosystem than React |
| SvelteKit | Performance-critical, smaller teams | Smaller ecosystem |
| Nuxt 3 | Vue + SSR/SSG | Smaller ecosystem |

### Mobile
| Option | Best For | Watch Out For |
|---|---|---|
| React Native | JS team wanting native mobile | Bridge complexity, native modules |
| Expo | React Native with faster setup | Expo SDK lock-in |
| Flutter | High performance UI, cross-platform | Dart language, app size |
| Native (Swift/Kotlin) | Max performance, platform-specific UX | Two codebases |

---

## Backend Technology Reference

### Node.js
| Framework | Best For | Watch Out For |
|---|---|---|
| Express.js | Simple REST APIs, flexibility | Minimal structure, manual everything |
| Fastify | High-throughput APIs | Less ecosystem than Express |
| NestJS | Enterprise, Angular-like structure | Steep learning curve |
| Hono | Edge/serverless, lightweight | Newer, smaller ecosystem |

### Python
| Framework | Best For | Watch Out For |
|---|---|---|
| FastAPI | AI/ML apps, async APIs, auto docs | Newer, async complexity |
| Django | Full-featured apps, ORM, admin | Monolithic, opinionated |
| Flask | Simple APIs, microservices | Too minimal for large apps |

### Other
| Language/Framework | Best For | Watch Out For |
|---|---|---|
| Go + Gin/Fiber | High throughput, low latency | Verbose, no generics traditionally |
| Rust + Axum | Max performance, systems | Very steep learning curve |
| Java + Spring Boot | Enterprise, large teams | Verbose, heavy |

---

## Database Reference

### Relational
| DB | Best For | Watch Out For |
|---|---|---|
| PostgreSQL | Most applications, default choice | Complex scaling setup |
| MySQL/MariaDB | Web apps, MySQL-experienced teams | Fewer advanced features |
| SQLite | Dev, testing, tiny apps | Not for production scale |

### Document
| DB | Best For | Watch Out For |
|---|---|---|
| MongoDB | Flexible schema, rapid iteration | Joins are complex, consistency |
| Firestore | Firebase ecosystem, real-time sync | Vendor lock-in, query limits |

### Key-Value / Cache
| DB | Best For | Watch Out For |
|---|---|---|
| Redis | Caching, sessions, queues, pub/sub | In-memory only (without persistence config) |
| Memcached | Simple caching | No persistence, fewer features |

### Search
| Tool | Best For | Watch Out For |
|---|---|---|
| Elasticsearch | Full-text search, logs | Resource-heavy, complex |
| Typesense | Simple fast search, self-hosted | Less feature-rich than ES |
| Algolia | Managed search, zero ops | Cost at scale |
| pgvector | Vector search in Postgres | Still maturing |

---

## Authentication Reference

| Option | Best For | Watch Out For |
|---|---|---|
| Auth0 | Managed, fast setup, enterprise | Cost at scale, vendor lock-in |
| Clerk | Modern DX, Next.js integration | Newer, cost at scale |
| Supabase Auth | Open source, Postgres-based | Self-host complexity |
| Firebase Auth | Firebase ecosystem | Google lock-in |
| NextAuth.js | Next.js apps, self-hosted | Config complexity |
| Custom JWT | Full control | Security responsibility, complexity |

---

## Hosting Reference

### PaaS (Easiest Operations)
| Platform | Best For | Watch Out For |
|---|---|---|
| Vercel | Next.js, frontend, JAMstack | Backend limits, cost at scale |
| Railway | Full-stack, easy deployment | Newer, less enterprise |
| Render | Heroku replacement, simple | Cold starts on free tier |
| Fly.io | Global, low-latency apps | CLI-focused, learning curve |

### Cloud (Most Control)
| Platform | Best For | Watch Out For |
|---|---|---|
| AWS | Enterprise, maximum services | Complexity, cost management |
| Google Cloud | AI/ML workloads, BigQuery | Steeper curve than AWS |
| Azure | Microsoft ecosystem | Can be complex |
| DigitalOcean | Simpler VPS/managed DBs | Fewer advanced services |

### Serverless
| Platform | Best For | Watch Out For |
|---|---|---|
| Vercel Functions | Edge functions, Next.js | Execution limits |
| AWS Lambda | Event-driven, scale-to-zero | Cold starts, complexity |
| Cloudflare Workers | Edge, global, fast | Limited runtime |

---

## AI/LLM Provider Reference

| Provider | Models | Best For | Watch Out For |
|---|---|---|---|
| OpenAI | GPT-4o, o1, etc. | General purpose, largest ecosystem | Cost, rate limits, vendor lock-in |
| Anthropic | Claude 3.5+ | Long context, reasoning, safety | Less third-party tooling |
| Google | Gemini 1.5/2.0/3.0 | Multimodal, Google ecosystem | Ecosystem still maturing |
| Mistral | Mistral, Mixtral | European compliance, open source | Smaller ecosystem |
| Self-hosted (Ollama) | LLaMA, Mistral | Privacy, no API costs | Infrastructure burden, capability gap |
