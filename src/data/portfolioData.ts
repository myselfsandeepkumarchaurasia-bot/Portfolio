import { ExperienceItem, ProjectItem, SkillItem, EducationItem, AssessmentQuestion } from '../types/portfolio';

export const PROFILE_DATA = {
  name: 'Sandeep Kumar Chaurasiya',
  title: 'AI Engineer • Generative AI Specialist • Data Scientist',
  tagline: 'Building Intelligent AI Systems, Agentic Workflows, Data Products & Production-Ready Applications.',
  bio: 'AI Engineer & Data Scientist with 5+ years of IT engineering experience and 4+ years of professional training experience. Specializes in end-to-end Generative AI pipelines, LangChain/LangGraph agentic architectures, local inference RAG with Ollama & ChromaDB, machine learning predictive models, and enterprise data analytics.',
  location: 'Mahrajganj, Uttar Pradesh, India',
  phonePrimary: '8887952726',
  phoneSecondary: '8587078177',
  email: 'myselfsandeepkumarchaurasia@gmail.com',
  linkedInUrl: 'https://www.linkedin.com/in/sandeep-kumar-chaurasiya-08b596302',
  githubUrl: 'https://github.com/sandeepchaurasiya',
  metrics: [
    { label: 'IT Experience', value: '5+', sub: 'Years in Production & Dev' },
    { label: 'Technical Training', value: '4+', sub: 'Years Mentoring & Labs' },
    { label: 'AI & Data Stack', value: '25+', sub: 'Frameworks & Tools' },
    { label: 'Production Models', value: '18+', sub: 'Deployed Solutions' },
  ],
  philosophies: [
    {
      title: 'Ground Truth over Hallucination',
      description: 'Prioritize rigorous retrieval-augmented pipelines with explicit source citations and verifiable chunking over speculative generation.',
    },
    {
      title: 'Agentic Workflows with Deterministic Guardrails',
      description: 'Design multi-step LangGraph agents where state transitions, tool routing, and validation steps are strictly inspectable.',
    },
    {
      title: 'Full-Stack Model Sovereignty',
      description: 'Support hybrid inference—combining low-latency cloud APIs (Gemini) with privacy-preserving local models (Ollama, Hugging Face).',
    },
  ],
};

export const SKILLS_DATA: SkillItem[] = [
  // Generative AI
  { name: 'LangChain', category: 'Generative AI', level: 'Core Expertise', projectsCount: 8, featuredIn: ['Local RAG PDF Chat', 'Doc Intel Agent'], description: 'Chains, memory abstraction, retrieval QA, prompt orchestrations' },
  { name: 'LangGraph', category: 'Generative AI', level: 'Core Expertise', projectsCount: 6, featuredIn: ['AI Agent for Document Intelligence'], description: 'Cyclic state machines, conditional branching, human-in-the-loop agentic flows' },
  { name: 'RAG Architecture', category: 'Generative AI', level: 'Core Expertise', projectsCount: 9, featuredIn: ['Local RAG PDF Chat', 'Knowledge Base Search'], description: 'Hybrid search, semantic chunking, re-ranking, source citation verification' },
  { name: 'Ollama & Local LLMs', category: 'Generative AI', level: 'Advanced', projectsCount: 5, featuredIn: ['Local RAG PDF Chat', 'Offline AI Lab'], description: 'Local quantized model orchestration (Llama 3, Mistral, DeepSeek, Qwen)' },
  { name: 'Hugging Face', category: 'Generative AI', level: 'Advanced', projectsCount: 6, featuredIn: ['Local RAG PDF Chat'], description: 'Sentence-transformers, embedding models, tokenizers, open weights' },
  { name: 'ChromaDB & FAISS', category: 'Generative AI', level: 'Core Expertise', projectsCount: 7, featuredIn: ['Local RAG PDF Chat', 'Vector Query Engine'], description: 'Vector indices, cosine/dot-product similarity, metadata filtering' },
  { name: 'Prompt Engineering', category: 'Generative AI', level: 'Core Expertise', projectsCount: 12, featuredIn: ['All AI Deployments'], description: 'Few-shot, Chain-of-Thought, ReAct framing, structured JSON schemas' },
  { name: 'MCP (Model Context Protocol)', category: 'Generative AI', level: 'Advanced', projectsCount: 3, featuredIn: ['Enterprise Tool Connectors'], description: 'Standardized context and tool interfaces for LLMs' },

  // AI Agents
  { name: 'Agentic AI Workflows', category: 'AI Agents', level: 'Core Expertise', projectsCount: 6, featuredIn: ['AI Agent for Document Intelligence'], description: 'Autonomous planning, dynamic tool selection, reflection, output validation' },
  { name: 'Tool Calling & Function Calling', category: 'AI Agents', level: 'Core Expertise', projectsCount: 7, featuredIn: ['Doc Intel Agent', 'Sandeep AI Bot'], description: 'JSON schema validation, parameter extraction, deterministic execution' },
  { name: 'State Management & Memory', category: 'AI Agents', level: 'Advanced', projectsCount: 5, featuredIn: ['LangGraph Workflows'], description: 'Short-term context windows, persistent checkpointing, conversation graphs' },

  // Machine Learning
  { name: 'Python', category: 'Programming', level: 'Core Expertise', projectsCount: 22, featuredIn: ['All Projects'], description: 'Core language for AI, data pipelines, backend APIs, and automation scripts' },
  { name: 'Scikit-learn', category: 'Machine Learning', level: 'Core Expertise', projectsCount: 10, featuredIn: ['Customer Churn Prediction', 'Predictive Pipelines'], description: 'Classification, regression, clustering, ensemble models, cross-validation' },
  { name: 'Pandas & NumPy', category: 'Machine Learning', level: 'Core Expertise', projectsCount: 18, featuredIn: ['Data Analytics Lab', 'Churn Engine'], description: 'High-throughput data manipulation, vectorization, exploratory data analysis' },
  { name: 'PyTorch & TensorFlow', category: 'Machine Learning', level: 'Advanced', projectsCount: 5, featuredIn: ['Neural Architectures'], description: 'Deep learning modeling, tensor operations, custom training loops' },
  { name: 'MLflow & DVC', category: 'Machine Learning', level: 'Proficient', projectsCount: 4, featuredIn: ['Production MLOps'], description: 'Experiment tracking, model registry, dataset versioning' },
  { name: 'NLP & OCR', category: 'Machine Learning', level: 'Advanced', projectsCount: 6, featuredIn: ['Local RAG PDF Chat'], description: 'Text preprocessing, TF-IDF, tokenization, Tesseract OCR for scanned docs' },

  // Data Analytics
  { name: 'Power BI & DAX', category: 'Data Analytics', level: 'Core Expertise', projectsCount: 11, featuredIn: ['HR & Attrition Analysis'], description: 'Enterprise dashboards, calculated measures, star schemas, Power Query' },
  { name: 'SQL', category: 'Programming', level: 'Core Expertise', projectsCount: 16, featuredIn: ['HR Analytics', 'Data Pipelines'], description: 'Complex joins, Window Functions, CTEs, subqueries, schema optimization' },
  { name: 'Advanced Excel', category: 'Data Analytics', level: 'Core Expertise', projectsCount: 14, featuredIn: ['Reporting Automation'], description: 'VLOOKUP/XLOOKUP, pivot tables, data modeling, macro-driven workflows' },
  { name: 'Data Pipeline & ETL', category: 'Data Analytics', level: 'Core Expertise', projectsCount: 8, featuredIn: ['Zen Solutions', 'Aptus IT Solution'], description: 'Automated data extraction, cleaning, transformation, and warehouse staging' },

  // Backend & Cloud
  { name: 'FastAPI & Flask', category: 'Cloud & DevOps', level: 'Core Expertise', projectsCount: 12, featuredIn: ['AI Backend Services'], description: 'Async endpoints, Pydantic validation, OpenAPI documentation, middleware' },
  { name: 'AWS (EC2, S3, RDS)', category: 'Cloud & DevOps', level: 'Advanced', projectsCount: 7, featuredIn: ['Production Deployments'], description: 'Cloud compute provisioning, object storage for artifacts, managed databases' },
  { name: 'Docker', category: 'Cloud & DevOps', level: 'Advanced', projectsCount: 8, featuredIn: ['Containerized Labs'], description: 'Multi-stage container builds, docker-compose orchestration, environment isolation' },
  { name: 'Linux & Bash', category: 'Cloud & DevOps', level: 'Core Expertise', projectsCount: 15, featuredIn: ['Server Ops & CI/CD'], description: 'Shell scripting, server management, log monitoring, cron schedules' },
  { name: 'Git & GitHub', category: 'Developer Tools', level: 'Core Expertise', projectsCount: 20, featuredIn: ['Version Control'], description: 'Branching strategies, code reviews, automated actions, releases' },

  // Computer Vision & Embedded IoT
  { name: 'OpenCV', category: 'Computer Vision & IoT', level: 'Advanced', projectsCount: 5, featuredIn: ['STEMROBO Innovation Labs'], description: 'Image processing, edge detection, video stream frame extraction' },
  { name: 'Arduino & Raspberry Pi', category: 'Computer Vision & IoT', level: 'Advanced', projectsCount: 9, featuredIn: ['IoT Innovation Labs'], description: 'Microcontroller programming, sensor telemetry, edge computing' },
  { name: 'ESP32 & micro:bit', category: 'Computer Vision & IoT', level: 'Advanced', projectsCount: 7, featuredIn: ['Robotics Workshops'], description: 'Wireless sensor nodes, firmware deployment, educational robotics' },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'local-rag-pdf-chat',
    title: 'Local RAG PDF Chat Application',
    category: 'Generative AI',
    tagline: 'Privacy-first, zero-cloud-cost document intelligence engine with local LLMs',
    problem: 'Enterprises and researchers dealing with sensitive PDFs cannot risk data leakage to external commercial LLMs, yet need rapid semantic retrieval over scanned and digital documents.',
    solution: 'Engineered a 100% locally-hosted RAG pipeline utilizing Ollama for quantized LLM inference, Hugging Face sentence-transformers for vector embeddings, ChromaDB for high-dimensional vector search, and integrated OCR for scanned pages.',
    architecture: 'Document Ingestion → OCR / PDF Parser → Recursive Text Splitter → Hugging Face Embeddings → ChromaDB Vector Store → Top-K Similarity Search → Context Augmentation → Local Ollama LLM → Grounded Streaming Response with Exact Page Citations.',
    technologies: ['Python', 'LangChain', 'Ollama (Llama 3 / Mistral)', 'ChromaDB', 'Hugging Face', 'Streamlit', 'Tesseract OCR'],
    features: [
      'Multi-format PDF ingestion with automated fallback to OCR for scanned images',
      'Configurable chunk size & chunk overlap with semantic boundary preservation',
      'Exact page-level citation generator showing snippet excerpts in UI',
      'Completely air-gapped local execution without transmitting tokens to external APIs',
      'Sub-second retrieval over multi-hundred page technical manuals',
    ],
    githubUrl: 'https://github.com/sandeepchaurasiya/local-rag-pdf-chat',
    technicalDetails: {
      pipeline: ['PDF Text Extractor', 'RecursiveCharacterTextSplitter (chunk: 800, overlap: 150)', 'all-MiniLM-L6-v2 Embeddings', 'ChromaDB Vector Index', 'Context Synthesizer'],
      modelsUsed: ['all-MiniLM-L6-v2', 'Ollama Llama-3-8B-Instruct', 'Mistral-7B-v0.2'],
      performanceMetric: '94% Answer Groundedness on internal eval set; 420ms retrieval latency',
      keyChallenge: 'Handling noisy PDF formatting and tables without losing semantic continuity across page borders.',
    },
  },
  {
    id: 'ai-agent-doc-intelligence',
    title: 'AI Agent for Document Intelligence',
    category: 'Agentic AI',
    tagline: 'Multi-step autonomous reasoning graph with dynamic tool routing and validation',
    problem: 'Single-prompt RAG fails when complex questions require cross-referencing multiple document sections, quantitative calculations, or verification against external criteria.',
    solution: 'Designed an agentic workflow using LangGraph featuring a stateful Planner, dynamic Tool Router, specialized tools (Vector Search, Mathematical Calculator, Schema Validator), and a Response Reflector to eliminate hallucinations.',
    architecture: 'User Query → LangGraph Planner Node → Router Decision → Parallel Tool Execution (ChromaDB Search / Python REPL Calculator) → State Aggregation → Validator Node → Final Grounded Answer.',
    technologies: ['Python', 'LangGraph', 'LangChain', 'FastAPI', 'Pydantic', 'OpenAI-compatible APIs / Gemini', 'Vector Store'],
    features: [
      'Stateful cyclic graph with conditional edges based on tool execution outcomes',
      'Dynamic routing between vector retrieval, quantitative computation, and direct synthesis',
      'Strict Pydantic output schema validation preventing malformed answers',
      'Detailed execution trace logging every node transition and tool invocation',
      'Graceful fallbacks when specific tools return empty results',
    ],
    githubUrl: 'https://github.com/sandeepchaurasiya/ai-agent-doc-intelligence',
    technicalDetails: {
      pipeline: ['LangGraph StateGraph', 'Planner Router Node', 'Tool Dispatcher', 'Evaluation & Checkpoint', 'Synthesizer'],
      modelsUsed: ['Gemini 3.8 Flash', 'OpenAI GPT-4o-mini', 'Local Llama 3 Agent'],
      performanceMetric: 'Zero malformed responses across 500+ test queries; 98.2% tool routing accuracy',
      keyChallenge: 'Preventing infinite loops during agent tool retries while ensuring comprehensive reasoning.',
    },
  },
  {
    id: 'customer-churn-prediction',
    title: 'Customer Churn Prediction Engine',
    category: 'Machine Learning',
    tagline: 'End-to-end predictive machine learning pipeline with production explainability',
    problem: 'A subscription-based service was experiencing untracked customer attrition leading to severe recurring revenue degradation.',
    solution: 'Built an end-to-end predictive machine learning pipeline with exploratory data analysis, outlier remediation, SMOTE balancing, feature selection, model benchmarking (Random Forest vs XGBoost vs Logistic Regression), and deployed an inference REST API.',
    architecture: 'Raw Telemetry Ingestion → Pandas ETL & Imputation → Feature Scaling & Encoding → SMOTE Class Balancing → Random Forest Classifier → Model Evaluation & Threshold Tuning → Flask API / Streamlit Dashboard.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn', 'Flask', 'AWS EC2'],
    features: [
      'Thorough EDA identifying top 4 churn drivers (tenure, contract type, payment method, support tickets)',
      'Class imbalance handling achieving high Recall on at-risk churners without overwhelming false positives',
      'Real-time prediction API accepting customer parameters and returning churn probability score',
      'Feature importance attribution giving customer success teams direct actionable interventions',
      'Interactive risk simulator allowing managers to test pricing/retention discounts',
    ],
    githubUrl: 'https://github.com/sandeepchaurasiya/customer-churn-prediction',
    technicalDetails: {
      pipeline: ['Data Preprocessing', 'Feature Importance Analysis', 'Ensemble Classification', 'Confusion Matrix Evaluation', 'REST Serving'],
      modelsUsed: ['Random Forest Classifier', 'Logistic Regression', 'Gradient Boosting'],
      performanceMetric: 'ROC-AUC: 0.89, Precision: 0.84, Recall: 0.87 on positive churn class',
      keyChallenge: 'Severe class imbalance (18% churn rate) resolved using combined SMOTE and cost-sensitive loss weighting.',
    },
  },
  {
    id: 'hr-workforce-analytics',
    title: 'HR & Workforce Attrition Analytics',
    category: 'Data Analytics',
    tagline: 'Enterprise BI suite with automated SQL pipelines and executive KPIs',
    problem: 'Executive leadership lacked centralized visibility into organizational attrition trends, department turnover velocity, and compensation correlation.',
    solution: 'Designed and deployed an enterprise Power BI dashboard supported by robust SQL ETL transformations, star schema relational modeling, and sophisticated DAX calculations.',
    architecture: 'Operational Database → SQL Extraction & Cleaning Views → Power Query ETL → Star Schema Data Model → DAX KPI Engine → Interactive Power BI Executive Dashboard.',
    technologies: ['Power BI', 'SQL Server / PostgreSQL', 'DAX', 'Power Query', 'Advanced Excel', 'Data Modeling'],
    features: [
      'Dynamic multi-dimensional slicing by Department, Job Role, Experience Band, and Gender',
      'Automated attrition rate calculation with month-over-month and year-over-year pacing',
      'Correlation heatmaps linking compensation quartile, overtime frequency, and departure probability',
      'Executive KPI summary card deck with drill-through detail views for department heads',
      'Exportable reports configured for scheduled management briefings',
    ],
    githubUrl: 'https://github.com/sandeepchaurasiya/hr-attrition-analytics',
    technicalDetails: {
      pipeline: ['SQL Extraction Views', 'Star Schema Fact-Dimension Model', 'DAX Measures', 'Visual Formatting', 'Automated Refresh'],
      modelsUsed: ['Analytical Modeling', 'Cohort Analysis', 'Survival Curve Projection'],
      performanceMetric: 'Report refresh time reduced from 25 minutes manual Excel to 12-second automated pipeline',
      keyChallenge: 'Standardizing inconsistent historical data formats across multiple disparate HR records systems.',
    },
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'aptus-it-solution',
    company: 'Aptus IT Solution',
    role: 'Data Science / AI Engineer',
    period: 'May 2025 – Present',
    location: 'India',
    type: 'Full-Time',
    responsibilities: [
      'Architect and build production Generative AI solutions leveraging LangChain, LangGraph, RAG pipelines, and Ollama for internal document processing.',
      'Develop machine learning classification and regression systems including customer churn prediction and sales forecasting models.',
      'Implement vector databases (ChromaDB, FAISS) with custom chunking and embedding pipelines for sub-second retrieval accuracy.',
      'Construct scalable backend microservices using FastAPI, Flask, and AWS cloud compute (EC2, S3) with secure REST endpoints.',
      'Collaborate with product and leadership teams to transform exploratory data insights into interactive Power BI dashboards and SQL pipelines.',
    ],
    technologies: ['LangChain', 'LangGraph', 'RAG', 'Ollama', 'Hugging Face', 'ChromaDB', 'Python', 'Scikit-learn', 'FastAPI', 'AWS', 'Power BI', 'SQL'],
    keyOutcomes: [
      'Engineered an enterprise RAG query service reducing documentation search time by 65%.',
      'Delivered predictive churn model saving an estimated 14% at-risk revenue in early pilot.',
    ],
  },
  {
    id: 'stemrobo-technologies',
    company: 'STEMROBO Technologies Pvt. Ltd.',
    role: 'Innovation Engineer',
    period: 'Jun 2024 – Mar 2025',
    location: 'India',
    type: 'Full-Time',
    responsibilities: [
      'Designed and delivered high-impact innovation programs covering AI, Machine Learning, Python, Robotics, and IoT for students and tech educators.',
      'Built automated data collection scripts and reporting dashboards using Python, Excel, and Power BI to evaluate program metrics.',
      'Integrated embedded platforms (Arduino, Raspberry Pi, ESP32, micro:bit) with computer vision and sensor telemetry.',
      'Authored hands-on technical curriculum, project guides, and lab exercises on artificial intelligence and coding.',
    ],
    technologies: ['Python', 'Machine Learning', 'OpenCV', 'Power BI', 'SQL', 'Arduino', 'Raspberry Pi', 'ESP32', 'Automation'],
    keyOutcomes: [
      'Mentored over 1,200+ students and teachers across hands-on AI and robotics innovation bootcamps.',
      'Developed 15+ interactive hardware-software prototypes integrating sensors with Python data loggers.',
    ],
  },
  {
    id: 'zen-software-solutions-devops',
    company: 'Zen Software Solutions',
    role: 'Data Analyst & DevOps Support',
    period: 'Mar 2022 – May 2024',
    location: 'India',
    type: 'Full-Time',
    responsibilities: [
      'Analyzed system telemetry and operational datasets using SQL, Python, and Power BI to surface platform performance bottlenecks.',
      'Supported automated CI/CD deployment pipelines using Docker, Jenkins, and AWS cloud infrastructure.',
      'Created automated ETL scripts to aggregate logging metrics, database transaction counts, and application error rates.',
      'Managed Linux environments, executed diagnostic shell scripts, and collaborated with engineering on incident post-mortems.',
    ],
    technologies: ['Python', 'SQL', 'Power BI', 'AWS', 'Docker', 'Jenkins', 'Linux', 'Bash', 'Monitoring'],
    keyOutcomes: [
      'Automated daily deployment health check reports, cutting manual monitoring time by 4 hours per week.',
      'Refactored analytical SQL queries reducing dashboard query latency by 35%.',
    ],
  },
  {
    id: 'hallmark-world-school',
    company: 'Hallmark World School',
    role: 'Computer Science Teacher & Mentor',
    period: 'Sep 2018 – Apr 2022',
    location: 'India',
    type: 'Full-Time',
    responsibilities: [
      'Instructed foundational and advanced Computer Science curricula including Python programming, SQL databases, and computational mathematics.',
      'Organized coding competitions, science exhibitions, and robotics workshops fostering practical STEM skills.',
      'Mentored students in building real-world software applications and algorithm problem-solving.',
    ],
    technologies: ['Python', 'SQL', 'C/C++', 'Mathematics', 'Robotics', 'Mentoring'],
    keyOutcomes: [
      'Coached multiple student teams to regional science and innovation awards.',
      'Introduced project-based practical coding curriculum adopted school-wide.',
    ],
  },
  {
    id: 'zen-software-solutions-analyst',
    company: 'Zen Software Solutions',
    role: 'Data Analyst',
    period: 'Nov 2016 – Apr 2018',
    location: 'India',
    type: 'Full-Time',
    responsibilities: [
      'Conducted exploratory data analysis (EDA) on commercial datasets to extract actionable business insights.',
      'Crafted complex SQL queries, aggregations, and joins across transactional tables for weekly KPI reporting.',
      'Built automated Excel modeling templates and visual summaries for senior stakeholders.',
    ],
    technologies: ['Python', 'SQL', 'Excel', 'EDA', 'KPI Reporting', 'Data Cleaning'],
    keyOutcomes: [
      'Standardized KPI reporting pipelines across three operational departments.',
    ],
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: 'MCA (Master of Computer Applications)',
    institution: 'Kurukshetra University',
    location: 'Haryana, India',
    period: 'Pursuing',
    highlights: ['Advanced Software Architecture', 'Machine Learning & Neural Networks', 'Distributed Systems'],
  },
  {
    degree: 'BCA (Bachelor of Computer Applications)',
    institution: 'Mahatma Gandhi Kashi Vidyapith',
    location: 'Varanasi, Uttar Pradesh, India',
    period: 'Completed',
    highlights: ['Software Development & OOP', 'Database Systems & Data Structures', 'Web Technologies & Networking'],
  },
  {
    degree: 'Diploma in Polytechnic CSE (Computer Science & Engineering)',
    institution: 'Board of Technical Education (BTE)',
    location: 'Lucknow, Uttar Pradesh, India',
    period: 'Completed',
    highlights: ['Core Computer Science', 'Data Structures & Algorithms', 'C/C++ & Database Management Systems'],
  },
  {
    degree: 'High School & Intermediate',
    institution: 'MGI Siswa Bajar',
    location: 'Mahrajganj, Uttar Pradesh, India',
    period: 'Completed',
    highlights: ['Mathematics & Science Foundation', 'Academic Excellence'],
  },
];

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'q1',
    category: 'RAG & Vector Search',
    difficulty: 'Intermediate',
    question: 'In a production RAG pipeline, why is Recursive Character Chunking with overlap generally preferred over naive fixed-length chunking?',
    options: [
      'It preserves semantic paragraph and sentence boundaries, avoiding cut-off words and split facts across chunks.',
      'It produces fixed-token vectors that bypass the need for an embedding model.',
      'It encrypts sensitive data during storage in ChromaDB.',
      'It requires zero memory during top-K retrieval.',
    ],
    correctAnswer: 0,
    explanation: 'RecursiveCharacterTextSplitter attempts to split on natural text boundaries (paragraphs, sentences, spaces) before breaking words, while chunk overlap preserves semantic context between adjacent text segments.',
    conceptTested: 'Semantic Text Chunking & Context Preservation',
  },
  {
    id: 'q2',
    category: 'LangGraph & Agents',
    difficulty: 'Advanced',
    question: 'How does LangGraph differ from standard linear LangChain chains when building autonomous AI agents?',
    options: [
      'LangGraph only works with JavaScript while LangChain is Python-only.',
      'LangGraph supports cyclic graphs, conditional routing, and state persistence, enabling agents to loop, self-correct, and retry tools.',
      'LangGraph does not support vector databases or embeddings.',
      'LangGraph eliminates the need for an LLM.',
    ],
    correctAnswer: 1,
    explanation: 'LangGraph allows cyclical computation where an agent can inspect tool outputs, determine if they are insufficient, and branch conditionally back to the planner or another tool, unlike linear DAG chains.',
    conceptTested: 'Cyclic Graph Workflows & Multi-Step Reasoning',
  },
  {
    id: 'q3',
    category: 'Machine Learning',
    difficulty: 'Intermediate',
    question: 'When evaluating a customer churn model on a dataset with 85% non-churn and 15% churn, why is Accuracy an unreliable metric?',
    options: [
      'Accuracy cannot be calculated on binary classification problems.',
      'A naive model predicting "No Churn" for every customer would achieve 85% accuracy while identifying 0% of actual churners.',
      'Accuracy is only applicable to unsupervised clustering algorithms.',
      'Accuracy changes based on the number of features in the dataset.',
    ],
    correctAnswer: 1,
    explanation: 'In imbalanced datasets, accuracy leads to the "accuracy paradox". Precision, Recall, and F1-Score (or ROC-AUC) specifically evaluate how well the minority class (churners) is detected.',
    conceptTested: 'Evaluation Metrics for Imbalanced Datasets',
  },
  {
    id: 'q4',
    category: 'SQL & Data Engineering',
    difficulty: 'Intermediate',
    question: 'Which SQL construct is best suited to calculate a 3-month rolling average of monthly sales for each department without collapsing rows?',
    codeSnippet: 'SELECT dept_id, month, sales, AVG(sales) OVER (PARTITION BY dept_id ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) as rolling_avg FROM department_sales;',
    options: [
      'GROUP BY with HAVING clause',
      'Window Function with OVER (PARTITION BY ... ORDER BY ... ROWS BETWEEN ...)',
      'INNER JOIN with UNION ALL',
      'CROSS APPLY with Subquery',
    ],
    correctAnswer: 1,
    explanation: 'Window functions compute aggregate values across a set of table rows related to the current row while preserving the individual row details in the result set.',
    conceptTested: 'SQL Window Functions & Analytical Partitioning',
  },
  {
    id: 'q5',
    category: 'Generative AI & LLMs',
    difficulty: 'Advanced',
    question: 'What is the primary role of ReAct (Reasoning + Acting) prompting in modern Agentic architectures?',
    options: [
      'To compile Python code to WebAssembly.',
      'To force the LLM to alternate between generating explicit thoughts/reasoning and issuing actionable tool invocations.',
      'To train smaller neural networks using reinforcement learning.',
      'To reduce the temperature of the model to absolute zero.',
    ],
    correctAnswer: 1,
    explanation: 'ReAct prompting interleaves "Thought", "Action" (tool execution), and "Observation" steps, allowing models to deduce what information is needed, fetch it, and reflect before answering.',
    conceptTested: 'ReAct Prompting & Agentic Reasoning Loops',
  },
  {
    id: 'q6',
    category: 'FastAPI & Architecture',
    difficulty: 'Beginner',
    question: 'What built-in feature of FastAPI provides automatic interactive API documentation and runtime schema validation?',
    options: [
      'Swagger UI / OpenAPI integration powered by Pydantic models.',
      'Docker Compose orchestration.',
      'NumPy array broadcasting.',
      'Webpack bundler plugins.',
    ],
    correctAnswer: 0,
    explanation: 'FastAPI uses Pydantic for data parsing and validation, which automatically generates compliant OpenAPI JSON specifications rendered via Swagger UI at /docs.',
    conceptTested: 'Pydantic Data Validation & OpenAPI Generation',
  },
];

export const SAMPLE_SQL_DATABASE = {
  customers: [
    { customer_id: 1, name: 'Aditi Sharma', region: 'North', tier: 'Enterprise', churn_risk: 0.12 },
    { customer_id: 2, name: 'Rajesh Verma', region: 'West', tier: 'SMB', churn_risk: 0.78 },
    { customer_id: 3, name: 'Priya Iyer', region: 'South', tier: 'Enterprise', churn_risk: 0.05 },
    { customer_id: 4, name: 'Vikram Patel', region: 'West', tier: 'Startup', churn_risk: 0.65 },
    { customer_id: 5, name: 'Sunil Rao', region: 'East', tier: 'SMB', churn_risk: 0.34 },
  ],
  orders: [
    { order_id: 101, customer_id: 1, amount: 45000, status: 'Completed', order_date: '2025-01-15' },
    { order_id: 102, customer_id: 1, amount: 62000, status: 'Completed', order_date: '2025-02-10' },
    { order_id: 103, customer_id: 2, amount: 12000, status: 'Refunded', order_date: '2025-01-20' },
    { order_id: 104, customer_id: 3, amount: 98000, status: 'Completed', order_date: '2025-02-18' },
    { order_id: 105, customer_id: 4, amount: 15000, status: 'Completed', order_date: '2025-03-01' },
    { order_id: 106, customer_id: 5, amount: 28000, status: 'Completed', order_date: '2025-03-12' },
  ],
  employees: [
    { emp_id: 201, name: 'Sandeep Kumar', department: 'AI & Data', salary: 1450000, experience_years: 5, rating: 4.9 },
    { emp_id: 202, name: 'Ananya Roy', department: 'Engineering', salary: 1100000, experience_years: 3, rating: 4.5 },
    { emp_id: 203, name: 'Kunal Joshi', department: 'Data', salary: 980000, experience_years: 2, rating: 4.2 },
    { emp_id: 204, name: 'Meera Sen', department: 'Engineering', salary: 1600000, experience_years: 6, rating: 4.8 },
  ],
  products: [
    { product_id: 501, name: 'Enterprise RAG Suite', category: 'GenAI', price: 120000, in_stock: 45 },
    { product_id: 502, name: 'Agent Workflow Engine', category: 'Agentic AI', price: 180000, in_stock: 30 },
    { product_id: 503, name: 'Churn Intelligence Platform', category: 'Analytics', price: 75000, in_stock: 60 },
  ],
};
