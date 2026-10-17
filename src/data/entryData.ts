export interface PortfolioEntry {
  label: string
  kind: string
  title: string
  lede: string
  role: string
  impact: string
  tags: string[]
  link: string
  linkText: string
}

export const entries = {
  detective: {
    label: 'FLAGSHIP BUILD',
    kind: 'PROJECT · JAN–JUL 2026',
    title: 'Agentic Detective',
    lede: '1st Place + Best Design out of 11 teams. An AI murder mystery that generates unique storylines, characters, and autonomous suspects.',
    role: 'Core engineer with 49 commits. Architected agent memory, guardrails, stress systems, and animations.',
    impact: 'Streamlined a custom MCP voice pipeline to 0.2-second low-latency streaming with intelligent voice selection.',
    tags: ['TypeScript', 'React', 'AI SDK', 'MCP SDK', 'ElevenLabs', 'MongoDB', 'Clerk'],
    link: 'https://github.com/acm-projects/Agentic-Detective',
    linkText: 'Inspect repository',
  },
  squeek: {
    label: 'WINNING BUILD',
    kind: 'PROJECT · ROWDY HACKS XII · 2026',
    title: 'Squeek',
    lede: 'Hackathon-winning anti-scam software designed to give people a fast, understandable second opinion.',
    role: 'Team contributor during a concentrated overnight engineering sprint.',
    impact: 'Converted an urgent human problem into a clear product concept that won at Rowdy Hacks XII.',
    tags: ['AI safety', 'Hackathon winner', 'Team build'],
    link: 'https://devpost.com/edward6109',
    linkText: 'View on Devpost',
  },
  ten: {
    label: 'ACM BUILD',
    kind: 'PROJECT · ACM · 2026',
    title: "They're A Ten, But…",
    lede: 'A party game designed to be understood in seconds and stay varied across repeated rounds.',
    role: 'Built the interaction flow and documented the state-machine architecture.',
    impact: 'A custom “bag of marbles” sampling engine controls repetition while preserving surprise.',
    tags: ['TypeScript', 'Game logic', 'State machines'],
    link: '',
    linkText: '',
  },
  stylemaxx: {
    label: 'HACKUTD BUILD',
    kind: 'PROJECT · HACKUTD · OCT 2025',
    title: 'StyleMaxx',
    lede: 'A machine-learning web app that analyzes facial tones and wardrobes to produce styling recommendations.',
    role: 'Built a K-Means color-analysis pipeline with facial segmentation and seasonal palette classification.',
    impact: 'Created a RAG outfit-similarity engine to match clothing by style and color harmony.',
    tags: ['Python', 'Flask', 'PyTorch', 'Scikit-learn', 'OpenCV', 'Firebase', 'Auth0'],
    link: 'https://devpost.com/edward6109',
    linkText: 'Browse project history',
  },
  fidelity: {
    label: 'WESTLAKE, TX',
    kind: 'FULL STACK SOFTWARE ENGINEER INTERN · JUN–AUG 2026',
    title: 'Fidelity',
    lede: 'Built a real-time enterprise queue monitor that exposes task lifespan for 20+ internal teams.',
    role: 'Developed the dashboard in Java Spring Boot and Angular, with AG Grid filtering, sorting, and pagination for large task datasets.',
    impact: 'Designed RESTful APIs and optimized serialization to feed structured lifespan updates into the interface.',
    tags: ['Java', 'Spring Boot', 'Angular', 'AG Grid', 'REST APIs'],
    link: '',
    linkText: '',
  },
  dynatrace: {
    label: 'REMOTE',
    kind: 'AI ENGINEER (CONTRACT) · FEB–MAY 2026',
    title: 'Promazo — client: Dynatrace',
    lede: 'Engineered an enterprise agentic AI system for 500+ users using Python, Azure, and Copilot Studio.',
    role: 'Built 7 MCP tools with context engineering for research, financial calculations, and deck generation.',
    impact: 'Implemented Human-In-The-Loop checkpoints that cut workflow runtime by 98.2% and unlocked $1M+ in potential revenue.',
    tags: ['Python', 'Azure', 'Copilot Studio', 'MCP', 'HITL'],
    link: '',
    linkText: '',
  },
  texashealth: {
    label: 'DALLAS, TX',
    kind: 'INFORMATION TECHNOLOGY INTERN · JUL–DEC 2025',
    title: 'Texas Health Resources',
    lede: 'Scripted a server monitoring dashboard in HTML, JavaScript, and Bash that reduced query time by 50%.',
    role: 'Resolved 5+ software, network, and hardware tickets each day across 3+ campuses.',
    impact: 'Led a nursing-station technology renovation across 3 departments, improving operating efficiency by 25%.',
    tags: ['HTML', 'JavaScript', 'Bash', 'Networks', 'Hardware'],
    link: '',
    linkText: '',
  },
  ais: {
    label: 'DALLAS, TX',
    kind: 'LECTURER · FEB 2026–PRESENT',
    title: 'AI Society @ UTD',
    lede: 'Designed and delivered 12+ technical workshops across Git, Python, AI, and machine learning.',
    role: 'Lecturer translating technical topics into practical sessions for fellow students.',
    impact: 'Turns hands-on engineering experience into material that helps more builders get started.',
    tags: ['Python', 'Git', 'AI', 'Machine Learning', 'Teaching'],
    link: '',
    linkText: '',
  },
  acm: {
    label: 'DALLAS, TX',
    kind: 'EVENTS OFFICER · SEP 2025–PRESENT',
    title: 'ACM @ UTD',
    lede: 'Planned 8+ events across a semester and increased member engagement by 23%.',
    role: 'Events officer coordinating programming for the UT Dallas computing community.',
    impact: 'Creates consistent entry points for students to meet, learn, and build together.',
    tags: ['Leadership', 'Community', 'Events'],
    link: '',
    linkText: '',
  },
} satisfies Record<string, PortfolioEntry>

export type EntryKey = keyof typeof entries
