export const portfolio = {
  personal: {
    name: '[YOUR NAME]',
    role: 'Full-Stack Developer & Digital Creator',
    tagline: 'I build modern web applications, digital experiences, and creative technology projects.',
    location: '[YOUR CITY, COUNTRY]',
    bio: 'I’m a developer and creator focused on building polished digital products, useful tools, and engaging technology content. Replace this placeholder with your own story.',
    avatar: '/profile-placeholder.svg',
    resume: '/resume.pdf',
    stats: [
      {label:'Projects Completed', value:'25+'},
      {label:'Technologies', value:'15+'},
      {label:'Experience', value:'2+ yrs'},
      {label:'Collaborations', value:'10+'}
    ]
  },
  socials: [
    {label:'GitHub', href:'https://github.com/yourusername'},
    {label:'LinkedIn', href:'https://linkedin.com/in/yourusername'},
    {label:'Instagram', href:'https://instagram.com/yourusername'},
    {label:'YouTube', href:'https://youtube.com/@yourchannel'}
  ],
  skills: {
    Frontend:['HTML','CSS','JavaScript','TypeScript','React','Next.js','Tailwind CSS'],
    Backend:['Node.js','Express','REST API','Authentication','Database'],
    Database:['MongoDB','PostgreSQL','Firebase'],
    Tools:['Git','GitHub','VS Code','Docker','Vercel'],
    'AI / Automation':['AI APIs','Chatbots','Automation','AI-powered applications']
  },
  projects:[
    {title:'ChistyHub', category:'Web Apps', description:'A modern technology and tutorial platform for sharing practical developer content.', tech:['Next.js','TypeScript','Tailwind CSS','Node.js'], image:'/project-placeholder.svg', demo:'https://example.com', github:'https://github.com/yourusername/chistyhub'},
    {title:'AI Assistant', category:'AI', description:'A conversational productivity assistant powered by modern AI APIs.', tech:['Next.js','TypeScript','AI APIs'], image:'/project-placeholder.svg', demo:'https://example.com', github:'https://github.com/yourusername/ai-assistant'},
    {title:'Instagram Welcome Bot', category:'Automation', description:'An automation project designed to welcome and assist members in social groups.', tech:['Node.js','API','Automation'], image:'/project-placeholder.svg', demo:'https://example.com', github:'https://github.com/yourusername/instagram-bot'},
    {title:'Developer Toolkit', category:'Tools', description:'A collection of small utilities that make everyday development workflows faster.', tech:['React','TypeScript','Tailwind CSS'], image:'/project-placeholder.svg', demo:'https://example.com', github:'https://github.com/yourusername/dev-toolkit'}
  ],
  experience:[
    {position:'Full-Stack Developer', company:'[YOUR COMPANY / FREELANCE]', date:'[2025 — Present]', description:'Build and maintain responsive web products, APIs, integrations, and creator-focused tools.', tech:['Next.js','TypeScript','Node.js']},
    {position:'Tech Creator', company:'[YOUR CHANNEL / BRAND]', date:'[2024 — Present]', description:'Create tutorials, experiments, and practical technology content for an online audience.', tech:['YouTube','Instagram','AI Tools']}
  ],
  services:[
    ['Full-Stack Web Development','End-to-end web applications built for performance, usability, and maintainability.'],
    ['Frontend Development','Responsive interfaces with thoughtful UX, accessibility, and polished interactions.'],
    ['Backend Development','Secure APIs, authentication, server logic, and database integrations.'],
    ['API Development','Clean REST APIs and integrations designed around real product requirements.'],
    ['AI Integration','Practical AI features, assistants, and API-powered workflows.'],
    ['Automation','Automate repetitive workflows and connect tools through reliable integrations.'],
    ['Bot Development','Purpose-built bots and assistants for communities and digital workflows.'],
    ['Website Optimization','Performance, SEO, accessibility, and conversion-focused improvements.']
  ],
  stack:['React','Next.js','TypeScript','JavaScript','Node.js','Python','MongoDB','PostgreSQL','Git','GitHub','Docker','Firebase','Vercel'],
  testimonials:[
    {quote:'[PLACEHOLDER] Replace this with a genuine client, teammate, or collaborator testimonial.',name:'[CLIENT NAME]',role:'[ROLE / COMPANY]'},
    {quote:'[PLACEHOLDER] Add another authentic testimonial here when available.',name:'[CLIENT NAME]',role:'[ROLE / COMPANY]'}
  ]
} as const;
