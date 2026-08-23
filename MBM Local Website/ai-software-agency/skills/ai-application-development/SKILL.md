---
name: ai-application-development
description: >
  Production AI application development, LLM integrations, RAG pipelines, AI agents,
  tool calling, structured generation, and evaluation frameworks. Activate when the approved
  architecture includes LLMs, AI APIs, RAG, agentic workflows, or AI-native product behavior in Phase 13.
---

# Skill: AI Application Development (Layer 2 AI Capability)

## Purpose
Governs the architectural execution and implementation of AI-native applications, LLM pipelines, Retrieval-Augmented Generation (RAG), agentic workflows, and model integrations during Phase 13.

*Note: This skill focuses on application-level AI software engineering, agentic architecture, prompt engineering, and evaluation. Provider-specific API details (e.g. OpenAI/Anthropic specific SDK syntax) belong in their respective Layer 3 technology skills.*

---

## Core AI Application Patterns

### 1. Structured Generation & Schema Enforcement
- Always request structured outputs (JSON schemas, Pydantic models, Zod validation) for programmatic processing.
- Validate LLM outputs at system boundaries; implement automatic retry/re-prompting loops when output validation fails.
- Never rely on plain unstructured text parsing for critical data extraction.

### 2. Tool Calling & Agentic Loop Control
- Enforce strict typing and documentation on all functions exposed to AI agents as tools.
- Implement explicit iteration limits on agent loops (e.g. `max_iterations = 10`) to prevent infinite execution loops.
- Implement human-in-the-loop (HITL) authorization checks for state-mutating tools (e.g. deleting data, sending emails, processing payments).

### 3. RAG Architecture & Vector Search
- **Chunking Strategy:** Choose semantic, sentence, or fixed-size chunking with overlap appropriate for the document type.
- **Embedding & Storage:** Store embeddings with scalar metadata in vector databases (PostgreSQL `pgvector`, Qdrant, Pinecone).
- **Retrieval Optimization:** Implement hybrid search (dense vector + sparse keyword search) and re-ranking for high-precision retrieval.
- **Context Injection:** Format retrieved context clearly in prompts with explicit source attributions and anti-hallucination instructions.

### 4. Prompt Engineering & Version Control
- System prompts must specify explicit persona, role boundaries, output format constraints, and safety guidelines.
- Treat prompts as code: store in dedicated prompt template files with version control (not scattered inline string literals).
- Enforce context window bounds; truncate or summarize chat histories before exceeding token limits.

### 5. AI Evaluation, Observability & Fallbacks
- Log LLM calls (input prompts, system messages, outputs, token counts, latency, cost) using observability tools (LangSmith, Helicone, OpenTelemetry).
- Implement fallback strategies:
  - Multi-model fallbacks (primary model -> secondary backup model on timeout or rate limit).
  - Graceful degradation when AI services are degraded or offline.
- Guard against prompt injection attacks by separating untrusted user input from system instructions.
