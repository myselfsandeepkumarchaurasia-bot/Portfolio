# Sandeep Kumar Chaurasiya — AI Engineering Portfolio & Interactive Lab Platform

> **AI Engineer • Generative AI Specialist • Data Scientist**  
> Location: Mahrajganj, Uttar Pradesh, India  
> Contact: +91-8887952726 / +91-8587078177 | [myselfsandeepkumarchaurasia@gmail.com](mailto:myselfsandeepkumarchaurasia@gmail.com)  
> LinkedIn: [linkedin.com/in/sandeep-kumar-chaurasiya-08b596302](https://www.linkedin.com/in/sandeep-kumar-chaurasiya-08b596302)

---

## 1. Project Overview

This repository houses the production-ready personal portfolio, interactive engineering lab, and technical demonstration platform for **Sandeep Kumar Chaurasiya**.

Rather than simply listing skills, this platform operates as **proof-of-work**—providing recruiters, hiring managers, CTOs, and developers with live, interactive access to:
- **Grounded AI Assistant:** Ask questions about Sandeep's verified background with source citations and strict zero-hallucination guardrails.
- **Document RAG Lab:** Test document ingestion, recursive semantic chunking, dense vector embeddings (`all-MiniLM-L6-v2`), ChromaDB vector search, and context augmentation.
- **Agentic AI Playground:** Inspect LangGraph-inspired state machines, task planning, and dynamic tool calling (Python REPL, Vector Search, Relational SQL).
- **Voice AI Interface:** Real-time Speech-to-Text and Text-to-Speech grounded in portfolio knowledge.
- **SQL Analytics Lab:** Execute live analytical queries against relational tables with execution timing.
- **Python Sandbox:** Safely execute algorithms, chunking routines, and ML classification metrics.
- **Machine Learning Benchmarks:** Interactive hyperparameter tuning, confusion matrix generation, and ROC-AUC evaluation.
- **HR & Workforce BI Dashboard:** Power BI-style interactive metrics with dynamic department and fiscal year slicers.
- **Interactive Technology Graph:** Clickable architectural hierarchy mapping Python to GenAI, ML, Cloud, and Backend nodes.
- **Developer Terminal Mode & Command Palette:** Global `Ctrl+K` command hub and `~` terminal console.

---

## 2. System Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                 Client Layer (React SPA / Vite)             │
│  - Recruiter View / Technical View Modes                    │
│  - Interactive AI Labs & Visual State Machines              │
│  - Command Palette (Ctrl+K) & CLI Terminal (~)              │
└──────────────────────────────┬──────────────────────────────┘
                               │ REST / JSON
┌──────────────────────────────▼──────────────────────────────┐
│           Backend Application Server (FastAPI / Node)        │
│  - Grounding Engine & Citations Generator                   │
│  - Safe In-Memory Relational SQL Sandbox                    │
│  - Python AST Sandbox Execution                             │
│  - Pydantic Schema Validation & Rate Limiting               │
└──────────────┬───────────────────────────────┬──────────────┘
               │                               │
┌──────────────▼─────────────┐   ┌─────────────▼──────────────┐
│  Generative AI Services    │   │      Data & Storage        │
│  - Gemini 3.8 Flash SDK    │   │  - ChromaDB Vector Store   │
│  - Ollama Local Models     │   │  - PostgreSQL / SQLite DB  │
│  - LangGraph State Machine │   │  - S3 / Local Artifacts    │
└────────────────────────────┘   └────────────────────────────┘
```

---

## 3. Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, Motion.
- **Backend:** Node.js Express & Python FastAPI modular patterns.
- **Generative AI & LLMs:** `@google/genai` (Gemini 3.8 Flash), LangChain, LangGraph, Ollama (Llama 3, Mistral), Hugging Face sentence-transformers (`all-MiniLM-L6-v2`).
- **Vector Databases:** ChromaDB, FAISS.
- **Machine Learning & Data Science:** Scikit-learn, Pandas, NumPy, SMOTE, Matplotlib.
- **Analytics & BI:** Power BI concepts, DAX, Star Schema, SQL Window Functions & CTEs.
- **DevOps & Cloud:** Docker, AWS (EC2, S3), Linux, CI/CD.

---

## 4. REST API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/system/status` | Returns live AI assistant, RAG, Agent, and backend health status |
| `GET` | `/api/profile` | Returns Sandeep's verified identity, contacts, and career metrics |
| `POST` | `/api/chat` | Queries Sandeep AI assistant with grounded context and verified citations |
| `POST` | `/api/rag/query` | Executes chunking, vector similarity scoring, and context synthesis |
| `POST` | `/api/agent/run` | Runs LangGraph stateful agent trace with tool selection and validator |
| `POST` | `/api/sql/execute` | Safely evaluates read-only SQL queries against sample tables |
| `POST` | `/api/python/execute` | Executes Python code in isolated sandbox and captures stdout |
| `POST` | `/api/resume/analyze` | Benchmark resume text against AI / ML roles and identifies keyword gaps |
| `POST` | `/api/contact` | Validates and submits direct inquiries |

---

## 5. Local Setup & Development

### Prerequisites
- Node.js 18+ and npm
- (Optional for Python scripts) Python 3.10+

### Installation
```bash
git clone https://github.com/sandeepchaurasiya/sandeep-ai-portfolio.git
cd sandeep-ai-portfolio

# Install dependencies
npm install

# Start the full-stack development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 6. Docker Deployment

```bash
# Build and run containers
docker-compose up --build -d
```

---

## 7. Streamlit Standalone Demos

For running the standalone Python Streamlit prototypes:
```bash
pip install streamlit pandas scikit-learn langchain chromadb

# Run RAG PDF Chat demo
streamlit run streamlit/rag_demo.py

# Run Churn ML demo
streamlit run streamlit/ml_demo.py

# Run Analytics demo
streamlit run streamlit/analytics_demo.py
```

---

## 8. Author & Verification

**Sandeep Kumar Chaurasiya**  
AI Engineer • Generative AI Specialist • Data Scientist  
Location: Mahrajganj, Uttar Pradesh, India  
Email: [myselfsandeepkumarchaurasia@gmail.com](mailto:myselfsandeepkumarchaurasia@gmail.com)  
Phone: +91 8887952726 / +91 8587078177  
LinkedIn: [linkedin.com/in/sandeep-kumar-chaurasiya-08b596302](https://www.linkedin.com/in/sandeep-kumar-chaurasiya-08b596302)
