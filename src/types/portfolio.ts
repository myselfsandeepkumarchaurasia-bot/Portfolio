export interface SkillItem {
  name: string;
  category: 'Generative AI' | 'AI Agents' | 'Machine Learning' | 'Data Analytics' | 'Cloud & DevOps' | 'Programming' | 'Databases' | 'Computer Vision & IoT' | 'Developer Tools';
  level: 'Core Expertise' | 'Advanced' | 'Proficient';
  projectsCount: number;
  featuredIn: string[];
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Generative AI' | 'Agentic AI' | 'Machine Learning' | 'Data Analytics';
  tagline: string;
  problem: string;
  solution: string;
  architecture: string;
  technologies: string[];
  features: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  technicalDetails: {
    pipeline: string[];
    modelsUsed: string[];
    performanceMetric: string;
    keyChallenge: string;
  };
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  responsibilities: string[];
  technologies: string[];
  keyOutcomes: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface AssessmentQuestion {
  id: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  conceptTested: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  citations?: {
    source: string;
    section: string;
    excerpt: string;
  }[];
  isAudio?: boolean;
}

export interface AgentStepTrace {
  step: number;
  node: 'START' | 'Planner' | 'Router' | 'Tool Execution' | 'Validator' | 'Synthesizer';
  action: string;
  toolUsed?: string;
  details: string;
  status: 'pending' | 'active' | 'completed';
  durationMs: number;
}
