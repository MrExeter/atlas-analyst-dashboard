# Atlas Analyst Dashboard

A professional analyst dashboard for **Atlas**, a production-grade agentic AI research system.

This dashboard provides a clean interface for running AI-driven market analyses and reviewing structured results including evaluation scores, verdicts, latency, and technical output.

This repository is intended as a professional showcase demonstrating evaluation-aware AI system UX.

---

## Overview

Atlas transforms a single research topic into a structured executive market brief through:

- Planning
- Parallel research
- Retrieval
- Synthesis
- Automated evaluation

This dashboard focuses on presenting those results in a clear, analyst-friendly workflow rather than functioning as a chatbot UI.

---

## Features

- Submit research topics to the Atlas backend
- Executive summary display
- PASS / WARN / FAIL evaluation badge
- Evaluation score breakdown
- Latency reporting
- Live API health status indicator
- Collapsible technical JSON view
- Downloadable structured output (JSON)

---

## Tech Stack

- React + TypeScript
- Vite
- React Admin
- Material UI (MUI)

---

## Architecture (High Level)
```
User Topic
↓
Dashboard UI
↓
Atlas API
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

### 2. Create a `.env` file in the project root
```bash
VITE_ATLAS_API_URL=http://localhost:8000
VITE_ATLAS_API_KEY=replace_me
```

### 3. Run development server
```bash
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_ATLAS_API_URL` | Base URL of the Atlas backend API (e.g. `http://localhost:8000`) |
| `VITE_ATLAS_API_KEY` | API key used to authenticate requests from the dashboard |

## Project Goals

### This repository is intentionally focused on:

- Clear system observability
- Evaluation-aware AI workflows
- Clean architecture and separation of concerns
- Production-minded engineering practices

### Non-goals include:

- Complex frontend frameworks
- Chat UI patterns
- Heavy visualization layers

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


