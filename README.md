# Atlas Analyst Dashboard

A professional analyst dashboard for **Atlas**, a production-grade agentic AI research system.

This dashboard provides a secure, evaluation-aware interface for running AI-driven market analyses and reviewing structured executive results including evaluation scores, verdicts, latency, and technical output.

This repository is intended as a professional showcase demonstrating disciplined frontend architecture layered on top of a production cloud backend.

---

## Live Deployment

- Dashboard: https://atlas.commandercoconut.com
- Backend API (token-gated): https://api-atlas.commandercoconut.com

Access is invitation-only via expiring Bearer tokens validated by the backend.

---

## Overview

Atlas transforms a single research topic into a structured executive market brief through:

- Planning
- Parallel research
- Retrieval
- Synthesis
- Automated evaluation

This dashboard presents those results in a structured analyst workflow rather than a conversational chatbot interface.

---

## Features

- Submit research topics to the Atlas backend
- Secure Bearer-token authentication
- Executive summary display
- PASS / WARN / FAIL evaluation badge
- Evaluation score breakdown
- Latency reporting
- Live API health status indicator
- Collapsible technical JSON view
- Downloadable structured output (JSON)

---

## Security Model

- No secrets stored in frontend code
- No API keys embedded in the application
- Authentication handled via per-invite Bearer tokens
- Backend enforces expiration, revocation, and rate limiting
- CORS restricted to production domain

---

## Tech Stack

- React + TypeScript
- Vite
- React Admin
- Material UI (MUI)

---

## Architecture (High Level)

```
User
↓
Dashboard UI (Static Hosting)
↓
HTTPS
↓
Atlas API (AWS ECS Fargate)
↓
Agentic Research Pipeline
↓
Evaluated Executive Report
```


---

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Create a .env file in the project root

```
VITE_ATLAS_API_URL=http://localhost:8000
```

### 3. Run development server

```
npm run dev
```

| Variable             | Description                       |
| -------------------- | --------------------------------- |
| `VITE_ATLAS_API_URL` | Base URL of the Atlas backend API |



## Project Goals
### This repository is intentionally focused on:

- Evaluation-aware AI workflows
- Clean UX over agentic backend systems
- Clear system observability
- Production-minded engineering practices

### Non-goals include:

- Chat UI patterns
- Heavy visualization layers
- Public unauthenticated access


## License

MIT License

Copyright (c) 2026 John Sentz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



