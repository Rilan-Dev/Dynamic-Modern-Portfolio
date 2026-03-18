// Portfolio Data Configuration
// Edit this file or use the Admin Panel to update your portfolio content dynamically

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  birthday: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
    optimhire: string;
  };
  skills: {
    category: string;
    items: { name: string; level: number }[];
  }[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'web-design' | 'web-development' | 'applications' | 'ai-ml' | 'all';
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
  date: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar?: string;
}

// Default Portfolio Data - Based on Mohammed Rilan's Real Information
export const defaultPortfolioData = {
  profile: {
    name: "Mohammed Rilan J",
    title: "Senior Full Stack & Mobile Developer",
    tagline: "Building enterprise-grade applications with 3+ years of experience",
    bio: "Senior Full Stack & Mobile Developer with 3+ years delivering enterprise-grade applications across e-commerce, mobility, and social platforms. Built 15+ production apps serving 100K+ users with Flutter, Laravel, Next.js, and native Android. Expert in AI-powered features, real-time systems, and cloud-native architectures.\n\nSpecialization: Cross-platform mobile development • Scalable backend APIs • AI/ML integration • DevOps automation",
    email: "mohammedrilan.dev@gmail.com",
    phone: "+971 52 892 3866",
    location: "Karaikal, India",
    website: "https://my-portfolio-rilan2025.web.app",
    birthday: "March 03, 2002",
    social: {
      github: "https://github.com/mohammedrilan",
      linkedin: "https://linkedin.com/in/mohammed-rilan-j",
      twitter: "https://x.com/Mohamme52648903",
      instagram: "https://www.instagram.com/itzz_me_rilu/",
      optimhire: "https://optimhire.com/client/dp/4534103",
    },
    skills: [
      {
        category: "Mobile Development",
        items: [
          { name: "Flutter (Bloc, Provider, GetX)", level: 95 },
          { name: "Kotlin & Native Android", level: 90 },
          { name: "Java", level: 85 },
          { name: "Jetpack Compose", level: 80 },
        ],
      },
      {
        category: "Web Development",
        items: [
          { name: "Next.js & React", level: 90 },
          { name: "Angular", level: 80 },
          { name: "Laravel & PHP", level: 85 },
          { name: "Node.js (Express, NestJS)", level: 85 },
          { name: "TypeScript", level: 90 },
          { name: "Tailwind CSS", level: 88 },
        ],
      },
      {
        category: "Backend & Databases",
        items: [
          { name: "RESTful APIs & GraphQL", level: 90 },
          { name: "MySQL & PostgreSQL", level: 88 },
          { name: "MongoDB", level: 80 },
          { name: "Firebase & Supabase", level: 90 },
          { name: "Redis", level: 75 },
        ],
      },
      {
        category: "AI/ML & DevOps",
        items: [
          { name: "OpenAI API (GPT-4) & Claude", level: 85 },
          { name: "TensorFlow & LangChain", level: 75 },
          { name: "Docker & Kubernetes", level: 80 },
          { name: "AWS (EC2, S3, Lambda)", level: 78 },
          { name: "CI/CD (Jenkins, GitHub Actions)", level: 80 },
        ],
      },
    ],
  } as ProfileData,

  projects: [
    {
      id: "1",
      title: "Mtton – School ERP Dashboard",
      description: "Comprehensive school management system with student tracking, attendance, grades, and administrative tools. Built with Next.js and TypeScript for optimal performance.",
      image: "/images/project-mtton-admin.jpg",
      category: "web-design",
      tags: ["Next.js", "TypeScript", "ERP", "Dashboard"],
      demoUrl: "https://admin.mttonapp.com/",
      featured: true,
      date: "2024-01",
    },
    {
      id: "2",
      title: "Mtton – Student App (Android & iOS)",
      description: "Cross-platform mobile application for students to access schedules, assignments, grades, and communicate with teachers. Available on Google Play Store.",
      image: "/images/project-mtton-student.jpg",
      category: "applications",
      tags: ["Flutter", "Mobile App", "iOS", "Android"],
      demoUrl: "https://play.google.com/store/apps/details?id=com.unicode.mttonstudent",
      featured: true,
      date: "2024-01",
    },
    {
      id: "3",
      title: "Gif Play – GIF Sharing Entertainment App",
      description: "Entertainment mobile application for discovering, creating, and sharing GIFs. Features include trending GIFs, favorites, and social sharing capabilities.",
      image: "/images/project-gifplay.jpg",
      category: "applications",
      tags: ["Flutter", "Entertainment", "Social"],
      featured: true,
      date: "2023-11",
    },
    {
      id: "4",
      title: "Megzy Admin – Laravel PHP Web App",
      description: "Administrative dashboard for Megzy platform built with Laravel PHP. Features user management, content moderation, and analytics.",
      image: "/images/project-megzy-admin.jpg",
      category: "web-development",
      tags: ["Laravel", "PHP", "Admin Dashboard"],
      demoUrl: "https://admin.megzy.in/",
      featured: false,
      date: "2023-09",
    },
    {
      id: "5",
      title: "Megzy User – Flutter Web App",
      description: "User-facing web application built with Flutter Web. Responsive design with smooth animations and optimal user experience.",
      image: "/images/project-megzy-user.jpg",
      category: "web-design",
      tags: ["Flutter Web", "Responsive", "PWA"],
      demoUrl: "https://megzy.in/",
      featured: false,
      date: "2023-08",
    },
    {
      id: "6",
      title: "EStore – Mobile & Web E-commerce",
      description: "Full-featured e-commerce platform with mobile app and web interface. Includes product catalog, cart, checkout, and order management.",
      image: "/images/project-estore.jpg",
      category: "applications",
      tags: ["Flutter", "Django", "E-commerce", "Full Stack"],
      featured: true,
      date: "2023-07",
    },
    {
      id: "7",
      title: "Tamil Matrimonial – Web & Mobile Platform",
      description: "Comprehensive matrimonial platform with matching algorithms, profile management, and communication features. Built with Next.js and Flutter.",
      image: "/images/project-matrimonial.jpg",
      category: "web-development",
      tags: ["Next.js", "Flutter", "Supabase", "Social Platform"],
      demoUrl: "https://weddingnew.com/",
      featured: true,
      date: "2023-05",
    },
    {
      id: "8",
      title: "AI RAG System & Agentic AI",
      description: "Retrieval-Augmented Generation system with intelligent agents for automated document processing and knowledge management.",
      image: "/images/project-ai-rag.jpg",
      category: "ai-ml",
      tags: ["Next.js", "Django", "Python", "OpenAI", "RAG"],
      featured: true,
      date: "2024-02",
    },
    {
      id: "9",
      title: "Cyberbullying Prediction (Text & Images)",
      description: "AI-powered content moderation system that detects cyberbullying in text and images using machine learning models.",
      image: "/images/project-cyberbullying.jpg",
      category: "ai-ml",
      tags: ["Next.js", "Django", "Python", "ML", "TensorFlow"],
      featured: false,
      date: "2024-01",
    },
    {
      id: "10",
      title: "Staro Modular CMS",
      description: "Custom Content Management System with modular architecture. Built with NextJS frontend and Django API backend with PostgreSQL.",
      image: "/images/project-starocms.jpg",
      category: "web-development",
      tags: ["Next.js", "Django", "PostgreSQL", "Supabase", "CMS"],
      demoUrl: "https://starosteelproducts.info",
      featured: false,
      date: "2023-10",
    },
    {
      id: "11",
      title: "Shope CMS",
      description: "E-commerce content management system built with Next.js and Supabase for managing products, orders, and inventory.",
      image: "/images/project-shopecms.jpg",
      category: "web-development",
      tags: ["Next.js", "Supabase", "CMS", "E-commerce"],
      demoUrl: "https://bz.amazetechclans.com",
      featured: false,
      date: "2023-08",
    },
    {
      id: "12",
      title: "DGMS – Data Governance Management System",
      description: "Enterprise data governance platform for managing data policies, compliance, and data quality across organizations.",
      image: "/images/project-dgms.jpg",
      category: "web-development",
      tags: ["Next.js", "Django API", "Enterprise", "Data Governance"],
      featured: false,
      date: "2023-06",
    },
    {
      id: "13",
      title: "Student Management System",
      description: "Comprehensive educational management system with separate apps for Students, Teachers, and Principals. Web dashboard for administrators.",
      image: "/images/project-sms.jpg",
      category: "all",
      tags: ["Next.js", "Django API", "Flutter", "MSSQL", "Education"],
      featured: false,
      date: "2023-04",
    },
    {
      id: "14",
      title: "Textile Fabric Management",
      description: "Inventory and order management system for textile businesses with fabric catalog, order tracking, and supplier management.",
      image: "/images/project-textile.jpg",
      category: "web-development",
      tags: ["Web Development", "Inventory Management"],
      featured: false,
      date: "2023-03",
    },
    {
      id: "15",
      title: "EquiTenant – Property Management",
      description: "Property management platform for landlords and tenants with rent tracking, maintenance requests, and document management.",
      image: "/images/project-equitenant.jpg",
      category: "web-development",
      tags: ["Web Development", "Real Estate"],
      featured: false,
      date: "2023-02",
    },
  ] as Project[],

  experience: [
    {
      id: "1",
      company: "Amaze-Tech Clans Ltd",
      position: "Senior Full Stack Mobile & Web Application Developer",
      location: "Karaikal, India",
      startDate: "April 2023",
      endDate: "",
      current: true,
      description: [
        "Architected and deployed 6+ enterprise applications including multi-vendor e-commerce, ride-hailing, and matrimonial platforms",
        "Reduced API response time by 40% through Redis caching and database optimization",
        "Integrated AI-powered features (recommendation engines, chatbots, content moderation) using OpenAI and custom ML models",
        "Led DevOps implementation with Docker/Kubernetes, achieving 99.5% uptime and automated CI/CD pipelines",
        "Managed cross-functional teams to deliver projects 15% ahead of schedule",
      ],
      technologies: ["Flutter", "Laravel", "Next.js", "Node.js", "MySQL", "PostgreSQL", "Redis", "Firebase", "Docker", "Kubernetes"],
    },
    {
      id: "2",
      company: "Freelance",
      position: "Full Stack App Developer",
      location: "Remote (UAE, India, KSA)",
      startDate: "June 2022",
      endDate: "December 2023",
      current: false,
      description: [
        "Delivered 10+ custom applications for international clients across UAE, India, and KSA markets",
        "Built responsive web platforms with Next.js/Angular and Flutter-based cross-platform mobile apps",
        "Implemented secure payment gateways (Stripe, Razorpay) and OAuth 2.0 authentication systems",
        "Achieved 5-star client ratings with 100% project delivery success rate",
      ],
      technologies: ["Flutter", "Kotlin", "Java", "Firebase", "MySQL", "Next.js", "Angular", "Stripe", "OAuth 2.0"],
    },
  ] as Experience[],

  education: [
    {
      id: "1",
      school: "Karaikal Polytechnic College of Engineering",
      degree: "Diploma",
      field: "Information Technology",
      startDate: "2019",
      endDate: "2022",
      description: "Focused on Software Development, Data structures, Web Development, Cloud Computing and Database Management. Graduated with 80%.",
    },
    {
      id: "2",
      school: "RAAK Engineering & Technologies",
      degree: "Certification",
      field: "Computer Science & Engineering",
      startDate: "2022",
      endDate: "2023",
      description: "Focused on software development, algorithms, data structures, web development, machine learning, and database management.",
    },
    {
      id: "3",
      school: "Thiruvalluvar Higher Secondary School, Ambagarathur",
      degree: "Higher Secondary Certificate (H.S.C)",
      field: "Mathematics, Physics, Computer Science",
      startDate: "2017",
      endDate: "2018",
      description: "Excelled in Mathematics, Physics, and Computer Science.",
    },
    {
      id: "4",
      school: "Sriman Narayanan English School, Thamanagudy",
      degree: "Secondary School Leaving Certificate (S.S.L.C)",
      field: "Science and Mathematics",
      startDate: "2016",
      endDate: "2017",
      description: "Completed with strong performance in science and mathematics.",
    },
  ] as Education[],

  blogPosts: [
    {
      id: "1",
      title: "How I Broke Internet for All My Docker Containers (With Fail2ban) — And Fixed It",
      excerpt: "Recently I managed to cut off internet access for all my Docker containers while trying to harden a server with Fail2ban. What started as a simple security enhancement turned into a debugging adventure.",
      content: "Full article content about Docker networking, Fail2ban configuration, and the solution to restore internet access for containers...",
      image: "/images/blog-docker-fail2ban.jpg",
      category: "DevOps",
      date: "2025-12-06",
      readTime: "6 min read",
      slug: "docker-fail2ban-internet-fix",
    },
    {
      id: "2",
      title: "Design conferences in 2022",
      excerpt: "Veritatis et quasi architecto beatae vitae dicta sunt, explicabo. A look at the most impactful design conferences and what we learned from them.",
      content: "Full article content about design conferences...",
      image: "/images/blog-design-conferences.jpg",
      category: "Design",
      date: "2022-02-23",
      readTime: "1 min read",
      slug: "design-conferences-2022",
    },
  ] as BlogPost[],

  testimonials: [
    {
      id: "1",
      name: "Mohammed Irsath",
      role: "API Developer",
      content: "Delivered robust and well-documented APIs for our application. His integrations were reliable, efficient, and easy to maintain.",
    },
    {
      id: "2",
      name: "Sowmiya",
      role: "Frontend Developer",
      content: "Produced clean, user-friendly interfaces with great attention to UI consistency. Her frontend work improved the overall user experience.",
    },
    {
      id: "3",
      name: "Anbu Elakiya",
      role: "Mobile App Developer",
      content: "Built stable and responsive mobile features that enhanced the app's performance. Always ensured smooth functionality across devices.",
    },
    {
      id: "4",
      name: "Abu Thaagir",
      role: "Frontend Developer",
      content: "Created visually appealing and responsive layouts. His work brought clarity, structure, and improved usability to the product.",
    },
  ] as Testimonial[],

  stats: {
    yearsExperience: 3,
    projectsCompleted: 15,
    activeUsers: "100K+",
    clientRating: "5.0",
  },
};

// Load data from localStorage or use default
export const loadPortfolioData = () => {
  if (typeof window === 'undefined') return defaultPortfolioData;
  
  const saved = localStorage.getItem('portfolioData');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Error parsing portfolio data:', e);
      return defaultPortfolioData;
    }
  }
  return defaultPortfolioData;
};

// Save data to localStorage
export const savePortfolioData = (data: typeof defaultPortfolioData) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolioData', JSON.stringify(data));
  }
};

// Export current data
export const portfolioData = defaultPortfolioData;
