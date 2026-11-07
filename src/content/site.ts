/**
 * ─────────────────────────────────────────────────────────────
 *  ALL SITE CONTENT LIVES IN THIS FILE.
 *  Edit text here; the components read from it.
 *  Anything marked `null` is intentionally hidden until verified.
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Trinadha Kumar Achanta",
  displayName: "TRINADHA KUMAR ACHANTA",
  headline: [
    "Data Scientist (AI)",
    "Generative AI & LLMs",
    "Machine Learning",
    "Sportsman",
    "Cricket Captain",
  ],
  rotating: [
    "Data Science & AI",
    "Software Engineering & Distributed Systems",
    "Cloud & Data Engineering",
    "Competitive Sports",
    "Cricket Leadership",
  ],
  intro:
    "I use data science, NLP and large language models to turn messy data and documents into reliable answers. Today I am a Data Scientist at CVS Caremark, improving underwriting accuracy through root cause analysis; before that I built LLM, RAG and semantic search systems at Verizon. Across CVS Caremark, Verizon, Credit Karma, Ford and Anna University I have learned to care as much about accuracy, latency and data quality as about the model itself. Off the keyboard, I captain the Hurricanes cricket club in Massachusetts.",
  location: "Massachusetts, USA",
  email: "trinadh.eng@gmail.com",
  linkedin: "https://www.linkedin.com/in/trinadha-kumar-achanta-ab6442220",
  github: "https://github.com/TrinadhAchanta" as string | null,
  medium: "https://medium.com/@atrinadhachanta" as string | null,
  /**
   * Path of the downloadable resume inside /public (e.g. "/resume.pdf").
   * Kept null until Tri approves which version (the original contains a phone number).
   * While null, the "Resume" button opens an email request instead.
   */
  resumeUrl: null as string | null,
  /**
   * Optional introduction video: a YouTube/Vimeo embed URL (e.g. "https://www.youtube-nocookie.com/embed/VIDEO_ID")
   * or a file in /public (e.g. "/video/intro.mp4"). null hides the video section.
   */
  introVideo: null as string | null,
  /** Portrait photo inside /public, e.g. "/photos/portrait.jpg". null shows an elegant placeholder. */
  portrait: "/photos/portrait.jpg" as string | null,
  siteUrl: "https://trinadha-kumar.vercel.app",
};

export const story = {
  title: "My Story",
  lead: "Engineering, discipline and teamwork, learned in classrooms, on courts and on cricket fields.",
  paragraphs: [
    "My path started in Andhra Pradesh, India, at Sri Talent Vidya Nikethan, where I completed my schooling through 10th standard. At Bhashyam I chose the MPC stream, mathematics, physics and chemistry, and that rigorous foundation in quantitative thinking is still the base of how I approach problems today.",
    "I went on to study Electronics and Communication Engineering at Anna University in Chennai. Coursework in machine learning, algorithms, statistics and pattern recognition pointed me toward data, and my capstone project, a document classification system built with NLP, became an early version of the work I do now. In the same years I represented my university in basketball competitions across India, which taught me to manage training, travel and exams at the same time.",
    "After graduating I worked as a data analyst at Anna University and then as a junior data scientist at Ford Motor Company, building predictive maintenance models on connected-vehicle telemetry and NLP for warranty claims. In 2023 I began a Master of Science in Computer Information Systems at New England College in the United States, interned in data science at Credit Karma, and joined Verizon in Boston, where I built LLM, RAG and semantic search systems for contract analysis. In April 2026 I joined CVS Caremark as a Data Scientist, where I use analytics and root cause analysis to improve the accuracy of underwriting. In September 2026 I also began a PhD in Business and Artificial Intelligence at Belhaven University.",
    "Sport has stayed with me the whole way. Today I captain the Hurricanes, a club cricket team in Massachusetts, and in 2026 we won a championship together. Leading a team on the field and shipping systems at work ask for the same things: preparation, clear communication, trust in the people around you, and calm decisions when the pressure is on.",
  ],
  pillars: [
    { label: "Engineering", text: "Production ML, LLMs and data systems built to be measured and trusted." },
    { label: "Learning", text: "From MPC fundamentals to a PhD in Business and AI." },
    { label: "Sport", text: "University basketball in India, club cricket in Massachusetts." },
    { label: "Leadership", text: "Captain of the Hurricanes; collaborator across engineering teams." },
  ],
};

export type EducationItem = {
  id: string;
  stage: string;
  institution: string;
  level: string;
  field: string | null;
  location: string | null;
  dates: string | null;
  highlight: string;
  details: string[];
  subjects?: { name: string; symbol: string }[];
};

export const education: EducationItem[] = [
  {
    id: "school",
    stage: "Foundation",
    institution: "Sri Talent Vidya Nikethan",
    level: "Schooling through 10th Standard (Class X)",
    field: "Secondary education",
    location: null,
    dates: null,
    highlight: "Where the foundation of my education was built.",
    details: [
      "Completed schooling through 10th standard.",
      "Built the study habits and fundamentals that carried into science and engineering.",
    ],
  },
  {
    id: "intermediate",
    stage: "Science Foundation",
    institution: "Bhashyam",
    level: "Intermediate (Classes XI & XII)",
    field: "MPC: Mathematics, Physics & Chemistry",
    location: null,
    dates: null,
    highlight: "A rigorous mathematics and science track that shaped my analytical thinking.",
    details: [
      "Studied the MPC stream: Mathematics, Physics and Chemistry.",
      "Developed the quantitative reasoning that later underpinned statistics and machine learning.",
    ],
    subjects: [
      { name: "Mathematics", symbol: "∑" },
      { name: "Physics", symbol: "⚛" },
      { name: "Chemistry", symbol: "⚗" },
    ],
  },
  {
    id: "btech",
    stage: "Undergraduate",
    institution: "Anna University",
    level: "Bachelor of Technology",
    field: "Electronics and Communication Engineering",
    location: "Chennai, India",
    dates: "Aug 2016 – May 2020",
    highlight: "Engineering degree alongside university-level basketball representation across India.",
    details: [
      "Relevant coursework: Machine Learning, Data Structures, Algorithms, Database Systems, Statistics, Artificial Intelligence, Pattern Recognition.",
      "Capstone project: developed a document classification system using NLP and machine learning, achieving 91% accuracy on multi-class text categorization.",
      "Represented the university in basketball competitions across India, balancing training and travel with an engineering workload.",
      "Volunteer with Google Developer Student Clubs (GDSC) – Anna University.",
    ],
  },
  {
    id: "ms",
    stage: "Graduate",
    institution: "New England College",
    level: "Master of Science",
    field: "Computer Information Systems",
    location: "Henniker, NH, USA",
    dates: "Jan 2023 – May 2024",
    highlight: "Graduate study in machine learning and data science, GPA 3.8 / 4.0.",
    details: [
      "Specialization: Machine Learning, Data Science, Statistical Analysis, Cloud Computing.",
      "Relevant coursework: Advanced Machine Learning, Natural Language Processing, Deep Learning, Statistical Methods, Data Mining, Big Data Analytics.",
      "GPA: 3.8 / 4.0.",
    ],
  },
  {
    id: "phd",
    stage: "Doctoral · In progress",
    institution: "Belhaven University",
    level: "Doctor of Philosophy (PhD)",
    field: "Business and Artificial Intelligence",
    location: null,
    dates: "Sep 2026 – Present",
    highlight: "Currently pursuing doctoral study at the intersection of business and artificial intelligence.",
    details: [
      "Began PhD studies in Business and Artificial Intelligence in September 2026.",
      "Continuing to learn alongside full-time work as a data scientist.",
    ],
  },
];

export type Role = {
  company: string;
  monogram: string;
  title: string;
  dates: string;
  location: string | null;
  summary: string;
  highlights: { label: string; text: string }[];
  metrics: { value: string; label: string }[];
  /** Business impact headline. Only verified figures; null hides the banner. */
  impact: { headline: string; detail: string } | null;
  stack: string[];
};

export const experience: Role[] = [
  {
    company: "CVS Caremark",
    monogram: "CVS",
    title: "Data Scientist",
    dates: "Apr 2026 – Present",
    location: null,
    summary:
      "Improving the accuracy of underwriting through advanced analytics, error attribution and root cause analysis.",
    highlights: [
      { label: "Underwriting Accuracy", text: "Use advanced analytics, error attribution and root cause analysis to improve the accuracy of underwriting processes and give the business actionable insights for strategic decisions." },
      { label: "Forecast Error Analysis", text: "Form and test hypotheses to pinpoint the factors that contribute to forecasting errors." },
      { label: "Opportunity Discovery", text: "Identify business opportunities through data-driven insights and develop high-impact analytical solutions." },
      { label: "Independent Analysis", text: "Explore data independently and build structured analytical work plans to reach meaningful insights." },
      { label: "Data Storytelling", text: "Communicate analytical solutions and results through clear narratives and visualizations that drive informed business decisions." },
      { label: "Engineering Practices", text: "Apply coding, Git, documentation and quality assurance best practices to analytical work." },
    ],
    metrics: [],
    /** TODO: add verified savings / impact once Tri provides figures. */
    impact: null,
    stack: ["Python", "SQL", "Git", "Root Cause Analysis", "Hypothesis Testing", "Data Visualization"],
  },
  {
    company: "Verizon",
    monogram: "VZ",
    title: "Data Scientist",
    dates: "Jul 2024 – Mar 2026",
    location: "Boston, MA",
    summary:
      "Built production NLP, LLM and semantic-search systems for contract information extraction and legal document processing.",
    highlights: [
      { label: "Contract Information Extraction", text: "Developed and deployed an NLP-based extraction system processing 10K+ legal contracts using transformer models and RAG architectures, achieving 92% accuracy in key information extraction and reducing manual review time by 75%." },
      { label: "LLM Applications & Prompt Engineering", text: "Implemented a production LLM pipeline leveraging GPT-4 and Claude for contract clause identification, entity extraction and document summarization, with optimized prompt engineering reducing error rates by 40%." },
      { label: "Vector Embeddings & Semantic Search", text: "Built a semantic search system using FAISS and sentence transformers for contract similarity analysis across 500K+ documents, enabling rapid retrieval of relevant clauses with 89% precision." },
      { label: "Performance Metrics & Dashboards", text: "Designed an analytics framework tracking extraction accuracy, processing efficiency and system performance KPIs using Python, SQL and Tableau dashboards, giving stakeholders real-time visibility." },
      { label: "ML Model Optimization", text: "Reduced document-processing inference latency by 60% through model quantization, batching strategies and efficient preprocessing, achieving sub-2-second response times." },
      { label: "Data Governance & Quality Assurance", text: "Established data validation and quality assurance systems ensuring 98% data accuracy through automated testing, monitoring and continuous improvement." },
    ],
    metrics: [
      { value: "92%", label: "extraction accuracy" },
      { value: "75%", label: "less manual review" },
      { value: "500K+", label: "documents searchable" },
      { value: "60%", label: "lower latency" },
    ],
    impact: { headline: "75% less manual contract review", detail: "Automated key-information extraction across 10K+ legal contracts at 92% accuracy, with 40% fewer LLM errors and sub-2-second responses." },
    stack: ["Python", "Transformers", "RAG", "GPT-4", "Claude", "FAISS", "Sentence Transformers", "SQL", "Tableau"],
  },
  {
    company: "Credit Karma",
    monogram: "CK",
    title: "Data Science Intern",
    dates: "Jan 2024 – Apr 2024",
    location: "Remote",
    summary:
      "Document classification, text mining and feature engineering for financial documents and customer feedback.",
    highlights: [
      { label: "Document Classification System", text: "Built a multi-class document classification model using BERT and XGBoost processing 50K+ financial documents daily with 94% accuracy, automating document routing and reducing processing time by 65%." },
      { label: "Text Mining & NLP Analysis", text: "Performed large-scale text analysis on customer feedback using spaCy, NLTK and topic modeling (LDA), extracting insights that informed product improvements impacting 2M+ users." },
      { label: "Feature Engineering & Data Pipelines", text: "Designed automated feature engineering pipelines over structured and unstructured data from MongoDB and PostgreSQL, creating 200+ features for ML models." },
      { label: "Model Evaluation & A/B Testing", text: "Validated model performance and business impact with cross-validation, confusion matrices and A/B testing before production deployment." },
      { label: "Data Visualization & Reporting", text: "Created interactive dashboards with Plotly, Seaborn and Tableau to communicate findings to non-technical stakeholders." },
    ],
    metrics: [
      { value: "50K+", label: "documents / day" },
      { value: "94%", label: "classification accuracy" },
      { value: "65%", label: "faster processing" },
      { value: "2M+", label: "users impacted" },
    ],
    impact: { headline: "65% faster document processing", detail: "Automated routing of 50K+ financial documents a day, and customer-feedback insights that informed product improvements for 2M+ users." },
    stack: ["BERT", "XGBoost", "spaCy", "NLTK", "LDA", "MongoDB", "PostgreSQL", "Plotly", "Tableau"],
  },
  {
    company: "Ford Motor Company",
    monogram: "F",
    title: "Junior Data Scientist",
    dates: "Mar 2021 – Nov 2022",
    location: "India",
    summary:
      "Predictive maintenance on connected-vehicle telemetry, NLP for warranty claims and end-to-end ML pipelines on AWS.",
    highlights: [
      { label: "Predictive Analytics for Vehicle Data", text: "Developed predictive maintenance models analyzing telemetry from 2M+ connected vehicles using Random Forest and Gradient Boosting, achieving 87% accuracy in failure prediction." },
      { label: "Natural Language Processing", text: "Implemented NLP for customer review analysis and warranty claim processing using sentiment analysis, named entity recognition and text classification, reducing manual processing by 55%." },
      { label: "Data Mining & Pattern Recognition", text: "Performed exploratory analysis and data mining on large datasets with pandas, NumPy and scikit-learn, identifying patterns and anomalies that led to $2M in cost savings." },
      { label: "ML Pipeline Development", text: "Built end-to-end ML pipelines on AWS (SageMaker, Lambda, S3) for training, evaluation, deployment and monitoring, serving predictions to production applications." },
      { label: "Statistical Modeling", text: "Conducted statistical analysis and hypothesis testing in R and Python to validate business assumptions and support evidence-based decisions." },
      { label: "Stakeholder Communication", text: "Presented findings to cross-functional teams including executives, engineers and business analysts." },
    ],
    metrics: [
      { value: "2M+", label: "connected vehicles" },
      { value: "87%", label: "failure-prediction accuracy" },
      { value: "55%", label: "less manual processing" },
      { value: "$2M", label: "cost savings" },
    ],
    impact: { headline: "$2M in cost savings", detail: "Data mining surfaced patterns and anomalies that saved $2M, alongside 87%-accurate failure prediction for 2M+ connected vehicles and 55% less manual warranty processing." },
    stack: ["Python", "R", "scikit-learn", "Random Forest", "Gradient Boosting", "AWS SageMaker", "AWS Lambda", "S3"],
  },
  {
    company: "Anna University",
    monogram: "AU",
    title: "Data Analyst",
    dates: "Jul 2020 – Feb 2021",
    location: "India",
    summary:
      "Data collection, ETL, SQL and statistical analysis supporting research projects and administrative reporting.",
    highlights: [
      { label: "Data Collection & Processing", text: "Collected, cleaned and processed datasets from multiple sources using Python and SQL, establishing data quality standards and automated ETL workflows." },
      { label: "Exploratory Data Analysis", text: "Performed EDA with pandas, matplotlib and seaborn on student performance, enrollment trends and operational metrics." },
      { label: "SQL Database Management", text: "Designed and optimized SQL queries on MySQL and PostgreSQL supporting research and administrative reporting." },
      { label: "Reporting & Statistics", text: "Automated reports and visualizations in Python and Excel; applied regression, correlation and descriptive statistics to educational data." },
    ],
    metrics: [],
    /** TODO: add verified impact once Tri provides figures. */
    impact: null,
    stack: ["Python", "SQL", "MySQL", "PostgreSQL", "pandas", "matplotlib", "Excel"],
  },
];

export type SkillGroup = { id: string; title: string; blurb: string; items: string[] };

/** Exactly as listed on the resume. No percentages, by design. */
export const skills: SkillGroup[] = [
  { id: "genai", title: "Generative AI & LLMs", blurb: "Retrieval, prompting and evaluation for production LLM systems.", items: ["RAG Architectures", "Vector Embeddings", "Semantic Search", "Prompt Engineering", "LangChain", "OpenAI API", "Model Fine-tuning", "LLM Evaluation"] },
  { id: "nlp", title: "NLP & Document Processing", blurb: "Turning unstructured text into structured, trustworthy data.", items: ["Transformers (BERT, GPT)", "spaCy", "NLTK", "Hugging Face", "Text Classification", "Named Entity Recognition", "Sentiment Analysis", "Topic Modeling"] },
  { id: "ml", title: "Machine Learning & AI", blurb: "Classical and deep learning across supervised and unsupervised problems.", items: ["Supervised / Unsupervised Learning", "Deep Learning", "Neural Networks", "Random Forest", "XGBoost", "SVM", "Regression", "Classification", "Clustering"] },
  { id: "lang", title: "Programming", blurb: "Python first, with R and SQL for analysis and data work.", items: ["Python", "pandas", "NumPy", "scikit-learn", "TensorFlow", "PyTorch", "R (dplyr, ggplot2, caret)", "SQL", "MongoDB"] },
  { id: "cloud", title: "Cloud & MLOps", blurb: "Deploying, tracking and monitoring models in production.", items: ["AWS SageMaker", "AWS Lambda", "Amazon S3", "Amazon EC2", "Amazon RDS", "Model Deployment", "MLflow", "Experiment Tracking", "Model Monitoring"] },
  { id: "data", title: "Data Engineering", blurb: "Pipelines and validation that keep downstream models honest.", items: ["ETL Pipelines", "Data Preprocessing", "Feature Engineering", "Data Validation", "MongoDB", "PostgreSQL", "MySQL", "Data Warehousing"] },
  { id: "viz", title: "Data Visualization", blurb: "Dashboards that make model and business metrics legible.", items: ["Tableau", "Power BI", "Plotly", "Seaborn", "Matplotlib", "Dash", "Interactive Dashboards", "Statistical Reporting"] },
  { id: "stats", title: "Analytics & Statistics", blurb: "Rigor for experiments and evidence-based decisions.", items: ["Statistical Modeling", "Hypothesis Testing", "A/B Testing", "Regression Analysis", "Time Series Analysis", "Experimental Design"] },
  { id: "tools", title: "Development Tools", blurb: "Everyday engineering and collaboration.", items: ["Git", "GitHub", "Jupyter Notebooks", "VS Code", "Docker", "API Development", "Version Control", "Collaborative Workflows"] },
];

/** Featured technologies shown as an icon marquee (keys map to simple-icons in TechIcon.tsx). */
export const featuredTech = ["Python", "PyTorch", "TensorFlow", "Hugging Face", "LangChain", "OpenAI", "scikit-learn", "pandas", "NumPy", "spaCy", "Keras", "Docker", "PostgreSQL", "MongoDB", "MySQL", "MLflow", "Plotly", "Jupyter", "Git", "R"];

export type ProjectCategory = "AI / Generative AI" | "Machine Learning" | "Cloud & MLOps" | "Data Engineering";

export type Project = {
  id: string;
  name: string;
  categories: ProjectCategory[];
  context: string;
  problem: string;
  solution: string;
  contribution: string;
  architecture: string[];
  stack: string[];
  challenges: string;
  impact: string[];
  links: { label: string; href: string }[];
};

export const projectCategories: ProjectCategory[] = ["AI / Generative AI", "Machine Learning", "Cloud & MLOps", "Data Engineering"];

export const projects: Project[] = [
  {
    id: "contract-intelligence",
    name: "Contract Intelligence Platform",
    categories: ["AI / Generative AI", "Machine Learning"],
    context: "Professional work · details generalized",
    problem: "Legal contracts hold critical terms in unstructured text, and reviewing them by hand is slow and hard to scale.",
    solution: "An end-to-end contract analysis system combining retrieval-augmented generation, vector embeddings and LLMs to extract key information.",
    contribution: "Architected the end-to-end system.",
    architecture: ["Document ingestion", "Embedding + vector index", "Retrieval (RAG)", "LLM extraction", "Structured output & review"],
    stack: ["RAG", "Vector Embeddings", "LLMs", "Python"],
    challenges: "Maintaining extraction accuracy across a large, varied corpus of legal documents.",
    impact: ["100K+ legal documents processed", "92% extraction accuracy", "500+ manual hours saved monthly"],
    links: [],
  },
  {
    id: "llm-pipeline",
    name: "Production LLM Pipeline",
    categories: ["AI / Generative AI", "Cloud & MLOps"],
    context: "Professional work · details generalized",
    problem: "Information extraction needed to run reliably at high daily volume, with quality kept in check.",
    solution: "A scalable LLM-based extraction pipeline on AWS with automated quality checks, monitoring and continuous improvement.",
    contribution: "Deployed the pipeline and its quality and monitoring layer.",
    architecture: ["Document queue", "LLM extraction", "Automated quality checks", "Monitoring", "Continuous improvement loop"],
    stack: ["LLMs", "AWS", "Python", "Monitoring"],
    challenges: "Meeting a service-level target at scale while catching quality regressions automatically.",
    impact: ["50K+ documents handled daily", "95% SLA achieved"],
    links: [],
  },
  {
    id: "semantic-search",
    name: "Semantic Search Engine",
    categories: ["AI / Generative AI", "Machine Learning"],
    context: "Professional work · details generalized",
    problem: "Finding relevant clauses across a very large contract corpus with keyword search is slow and imprecise.",
    solution: "An enterprise semantic search system using FAISS and transformer embeddings for instant clause retrieval and similarity analysis.",
    contribution: "Built the search system.",
    architecture: ["Clause segmentation", "Transformer embeddings", "FAISS index", "Similarity retrieval"],
    stack: ["FAISS", "Sentence Transformers", "Python"],
    challenges: "Keeping retrieval fast and precise over a 500K+ document corpus.",
    impact: ["500K+ document corpus", "89% retrieval precision"],
    links: [],
  },
  {
    id: "optimization",
    name: "ML Model Optimization Initiative",
    categories: ["Machine Learning", "Cloud & MLOps"],
    context: "Professional work · details generalized",
    problem: "Document-processing inference was too slow and expensive for interactive use.",
    solution: "Model quantization, caching strategies and efficient batching across the processing pipeline.",
    contribution: "Led the optimization project.",
    architecture: ["Profiling", "Quantization", "Batching", "Caching", "Efficient preprocessing"],
    stack: ["Python", "Model Quantization", "Caching"],
    challenges: "Reducing latency and cost without sacrificing extraction quality.",
    impact: ["60% lower inference latency", "35% lower cloud costs", "Sub-2-second responses"],
    links: [],
  },
  {
    id: "analytics",
    name: "Analytics Dashboard Framework",
    categories: ["Data Engineering"],
    context: "Professional work · details generalized",
    problem: "Stakeholders needed real-time visibility into extraction quality, efficiency and system health.",
    solution: "An analytics framework tracking extraction accuracy, processing efficiency, system performance and business metrics.",
    contribution: "Developed the framework and dashboards.",
    architecture: ["Metric collection", "SQL aggregation", "KPI definitions", "Real-time dashboards"],
    stack: ["Python", "SQL", "Tableau"],
    challenges: "Defining KPIs that are meaningful to both engineers and business stakeholders.",
    impact: ["50+ KPIs tracked", "Real-time visualization for stakeholders"],
    links: [],
  },
  {
    id: "data-quality",
    name: "Data Quality Automation",
    categories: ["Data Engineering"],
    context: "Professional work · details generalized",
    problem: "Extraction pipelines need trustworthy data, and anomalies are costly when caught late.",
    solution: "An automated validation and quality assurance system that detects anomalies across all extraction pipelines.",
    contribution: "Implemented the validation and QA system.",
    architecture: ["Validation rules", "Anomaly detection", "Automated tests", "Monitoring & alerts"],
    stack: ["Python", "Automated Testing", "Monitoring"],
    challenges: "Covering every extraction pipeline without slowing delivery.",
    impact: ["98% data accuracy across pipelines"],
    links: [],
  },
  {
    id: "capstone",
    name: "NLP Document Classification (Capstone)",
    categories: ["Machine Learning"],
    context: "Anna University · B.Tech capstone",
    problem: "Automatically categorize documents into multiple classes from their text.",
    solution: "A document classification system using NLP and machine learning.",
    contribution: "Developed the system as my undergraduate capstone.",
    architecture: ["Text preprocessing", "Feature extraction", "Multi-class classifier", "Evaluation"],
    stack: ["NLP", "Machine Learning", "Python"],
    challenges: "Multi-class text categorization with high accuracy.",
    impact: ["91% accuracy on multi-class text categorization"],
    links: [],
  },
];

export type Certification = {
  title: string;
  issuer: string;
  status: "earned" | "in-progress";
  date: string | null;
  verifyUrl: string | null;
  mark: string;
};

/**
 * From the resume, all marked as planned. Move to `status: "earned"` and add
 * `date` + `verifyUrl` once a credential is issued.
 */
export const certifications: Certification[] = [
  { title: "Microsoft Certified: Azure Data Engineer Associate", issuer: "Microsoft", status: "earned", date: null, verifyUrl: null, mark: "AZ" },
  { title: "Privacy Awareness and HIPAA Privacy Training", issuer: "CVS Health", status: "earned", date: null, verifyUrl: null, mark: "CVS" },
  { title: "AWS Certified Machine Learning – Specialty", issuer: "Amazon Web Services", status: "in-progress", date: null, verifyUrl: null, mark: "AWS" },
  { title: "TensorFlow Developer Certificate", issuer: "Google", status: "in-progress", date: null, verifyUrl: null, mark: "TF" },
  { title: "Professional Data Scientist", issuer: "DataCamp", status: "in-progress", date: null, verifyUrl: null, mark: "DC" },
];

export const sports = {
  basketball: {
    headline: "Representing My University on the Basketball Court",
    description:
      "During my undergraduate years, I had the opportunity to represent my university in basketball competitions across India. The experience strengthened my dedication to teamwork, discipline, resilience, and performing under pressure.",
    points: [
      "University-level basketball representation",
      "Competitions and travel across India",
      "Teamwork and collaboration",
      "Discipline, commitment and dedication",
      "Balancing athletics with an engineering degree",
    ],
  },
  cricket: {
    club: "Massachusetts Hurricanes Cricket Club",
    short: "Hurricanes",
    role: "Captain",
    /** From Tri (2026-11-06). */
    bowling: "Right-arm leg spin & off spin",
    wickets: "Leading wicket-taker for the Hurricanes",
    description:
      "Cricket is one of my biggest passions outside technology. I play competitive club cricket in local and regional tournaments across Massachusetts, and I currently captain the Hurricanes.",
    responsibilities: [
      "Competitive club cricket",
      "Local tournaments",
      "Regional tournaments",
      "Team leadership",
      "Match strategy",
      "Player coordination",
      "On-field decision-making",
      "Motivating and supporting teammates",
    ],
  },
  championship: {
    headline: "2026 Championship — Leading the Hurricanes",
    year: "2026",
    team: "Hurricanes",
    role: "Captain",
    /** TODO: add the official league / tournament name once verified. */
    competition: null as string | null,
    achievement: "Led the Hurricanes to a tournament championship in Massachusetts cricket.",
    story:
      "In 2026, I had the privilege of captaining the Hurricanes through a memorable championship campaign in Massachusetts cricket. Leading the team reinforced my belief in preparation, trust, teamwork, and making confident decisions under pressure.",
  },
};

export const leadership = {
  engineering: {
    title: "Engineering Leadership",
    text: "Solving complex technical problems, building dependable systems, and working across teams.",
    points: [
      "Breaking ambiguous problems into measurable goals",
      "Owning quality: accuracy, latency and data validation",
      "Explaining model results to executives, engineers and analysts",
      "Collaborating with cross-functional stakeholders",
    ],
  },
  sports: {
    title: "Sports Leadership",
    text: "Building team confidence, planning strategies, navigating challenging situations, and motivating players.",
    points: [
      "Setting match plans and adapting them mid-game",
      "Making calm decisions under pressure",
      "Coordinating players and roles",
      "Backing teammates through difficult spells",
    ],
  },
  values: ["Shared goals", "Communication", "Strategic planning", "Adaptability", "Accountability", "Collaboration", "Decisions under pressure", "Consistency", "Respect"],
  statement:
    "Sport taught me that results come from preparation and trust long before match day. I bring the same approach to engineering: plan carefully, communicate clearly, own the outcome, and make sure everyone on the team knows their role and why it matters.",
};

export type Achievement = {
  category: "Academic" | "Engineering" | "Sport" | "Certification";
  title: string;
  detail: string;
  featured?: boolean;
  /** Period shown on the achievement timeline, taken from the resume dates. */
  when: string;
  /** Sort key for the timeline. */
  year: number;
};

export const achievements: Achievement[] = [
  { category: "Sport", title: "2026 Cricket Championship", detail: "Captained the Hurricanes to a tournament championship in Massachusetts cricket.", featured: true, when: "2026", year: 2026.9 },
  { category: "Sport", title: "Captain, Hurricanes", detail: "Leading the Massachusetts Hurricanes Cricket Club in local and regional tournaments.", when: "Current", year: 2026.8 },
  { category: "Academic", title: "GDSC Volunteer", detail: "Volunteer with Google Developer Student Clubs (GDSC) at Anna University.", when: "Anna University", year: 2019.5 },
  { category: "Sport", title: "University Basketball", detail: "Represented Anna University in basketball competitions across India.", when: "2016 – 2020", year: 2018 },
  { category: "Academic", title: "Master of Science · GPA 3.8", detail: "M.S. in Computer Information Systems, New England College, specializing in machine learning and data science.", when: "May 2024", year: 2024.4 },
  { category: "Academic", title: "91% Capstone Accuracy", detail: "NLP document classification system for multi-class text categorization.", when: "2020", year: 2020.3 },
  { category: "Engineering", title: "75% Less Manual Review", detail: "Contract extraction at Verizon with 92% accuracy across 10K+ contracts.", when: "2024 – 2026", year: 2025 },
  { category: "Engineering", title: "500K+ Document Search", detail: "Semantic clause retrieval with FAISS at 89% precision.", when: "2024 – 2026", year: 2025.1 },
  { category: "Engineering", title: "$2M Cost Savings", detail: "Patterns and anomalies found through data mining at Ford.", when: "2021 – 2022", year: 2022 },
  { category: "Engineering", title: "2M+ Users Impacted", detail: "Customer-feedback NLP insights at Credit Karma informing product improvements.", when: "2024", year: 2024.2 },
  { category: "Certification", title: "Azure Data Engineer Associate", detail: "Microsoft Certified: Azure Data Engineer Associate." , when: "Earned", year: 2026.5 },
  { category: "Certification", title: "Certifications in Progress", detail: "AWS ML Specialty, TensorFlow Developer and DataCamp Professional Data Scientist.", when: "In progress", year: 2027 },
];

export type GalleryCategory = "Professional" | "School & University" | "Basketball" | "Cricket" | "Hurricanes Championship" | "Events & Leadership";

export const galleryCategories: GalleryCategory[] = ["Professional", "School & University", "Basketball", "Cricket", "Hurricanes Championship", "Events & Leadership"];

/**
 * Add real photos to /public/photos and list them here.
 * `src: null` renders a placeholder slot. Never use stock images that imply they show Tri.
 */
export const gallery: { category: GalleryCategory; caption: string; src: string | null }[] = [
  { category: "Professional", caption: "Trinadha Kumar Achanta", src: "/photos/portrait.jpg" },
  { category: "School & University", caption: "Anna University", src: null },
  { category: "Basketball", caption: "University basketball team", src: "/photos/basketball-team.jpg" },
  { category: "Cricket", caption: "Hurricanes match day", src: null },
  { category: "Hurricanes Championship", caption: "2026 championship trophy", src: "/photos/hurricanes-trophy.jpg" },
  { category: "Hurricanes Championship", caption: "Team celebration", src: null },
  { category: "Cricket", caption: "On the field", src: null },
  { category: "Events & Leadership", caption: "Events & leadership", src: null },
];

export const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "ai-lab", label: "AI Lab" },
  { id: "certifications", label: "Certifications" },
  { id: "sports", label: "Sports & Leadership" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

/** Animated impact dashboard. Every figure is from the resume. */
export const impactStats: { value: number; prefix?: string; suffix: string; label: string; source: string }[] = [
  { value: 4, suffix: "+", label: "Years in data science & analytics", source: "Resume summary" },
  { value: 500, suffix: "K+", label: "Documents in semantic search", source: "Verizon" },
  { value: 92, suffix: "%", label: "Contract extraction accuracy", source: "Verizon" },
  { value: 75, suffix: "%", label: "Less manual contract review", source: "Verizon" },
  { value: 60, suffix: "%", label: "Lower inference latency", source: "Verizon" },
  { value: 2, prefix: "$", suffix: "M", label: "Cost savings from data mining", source: "Ford" },
  { value: 50, suffix: "K+", label: "Documents classified daily", source: "Credit Karma" },
  { value: 2, suffix: "M+", label: "Connected vehicles analyzed", source: "Ford" },
];

export const cloudStack = ["AWS SageMaker", "AWS Lambda", "Amazon S3", "Amazon EC2", "Amazon RDS", "MLflow", "Docker"];

/** Journey map milestones. City or region level only; no private addresses. */
export const journeyStops: { id: string; place: string; lon: number; lat: number; items: string[] }[] = [
  { id: "india", place: "Andhra Pradesh", lon: 80.6, lat: 16.3, items: ["Home state, where my journey began", "Schooling at Sri Talent Vidya Nikethan", "Intermediate (MPC) at Bhashyam", "Junior Data Scientist, Ford Motor Company, India (2021 – 2022)"] },
  { id: "chennai", place: "Chennai", lon: 80.27, lat: 13.08, items: ["B.Tech, Electronics & Communication Engineering, Anna University (2016 – 2020)", "University basketball", "Data Analyst, Anna University (2020 – 2021)"] },
  { id: "henniker", place: "Henniker, NH", lon: -71.82, lat: 43.18, items: ["M.S. Computer Information Systems, New England College (2023 – 2024), GPA 3.8"] },
  { id: "boston", place: "Boston, MA", lon: -71.06, lat: 42.36, items: ["Data Scientist, Verizon (2024 – 2026)"] },
  { id: "ma", place: "Massachusetts", lon: -72.2, lat: 42.2, items: ["Data Scientist, CVS Caremark (2026 – present)", "PhD, Belhaven University (2026 – present)", "Captain, Hurricanes Cricket Club · 2026 champions"] },
];

/** Sporting milestones timeline. */
export const sportsMilestones: { when: string; title: string; text: string; gold?: boolean }[] = [
  { when: "2016 – 2020", title: "University basketball", text: "Represented the university in basketball competitions across India during my B.Tech years." },
  { when: "Massachusetts", title: "Club cricket", text: "Competing in local and regional cricket tournaments across Massachusetts." },
  { when: "Captain", title: "Leading the Hurricanes", text: "Captaining the Massachusetts Hurricanes Cricket Club: strategy, player coordination and on-field decisions." },
  { when: "2026", title: "Champions", text: "Led the Hurricanes to a tournament championship in Massachusetts cricket.", gold: true },
];

/**
 * Genuine recommendations only. The section stays hidden while this list is empty.
 * Example: { quote: "...", name: "Full Name", role: "Engineering Manager", org: "Company", relation: "Managed Trinadha at Company" }
 */
export const testimonials: { quote: string; name: string; role: string; org: string; relation?: string }[] = [];
