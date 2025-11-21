import React from 'react';
import CinematicAboutSection from '../AboutSection/CinematicAbout';
import CinematicProjectsGallery from '../ProjectsSection/CinematicGallery';

// Sample data for About section
const aboutData = {
  heroImage: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800&h=1000&fit=crop", // Developer at work
  narrationTexts: [
    "In a world driven by technology, one developer emerged with a vision to transform ideas into reality. Armed with code, creativity, and an unwavering passion for innovation.",
    "From cloud architectures to AI-powered solutions, every project tells a story of dedication, problem-solving, and pushing the boundaries of what's possible.",
    "This is not just a journey of writing code—it's a quest to build the future, one line at a time."
  ],
  characterStats: [
    {
      icon: "⚡",
      title: "Years of Experience",
      description: "7+ years crafting enterprise solutions and leading development teams"
    },
    {
      icon: "🏆",
      title: "Projects Delivered",
      description: "50+ successful projects across cloud, web, and mobile platforms"
    },
    {
      icon: "🚀",
      title: "Technologies Mastered",
      description: "Full-stack expertise in modern frameworks and cloud services"
    },
    {
      icon: "💡",
      title: "Innovation Focus",
      description: "Constantly exploring AI, machine learning, and emerging technologies"
    }
  ]
};

// Sample projects data
const projectsData = [
  {
    title: "NEBULA CLOUD",
    genre: "Enterprise Infrastructure",
    description: "A revolutionary cloud platform engineered for hyper-scale distributed computing. Features advanced auto-scaling, real-time monitoring, and multi-region failover capabilities that power Fortune 500 enterprises.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=1200&fit=crop",
    techStack: ["Azure", "Kubernetes", "Terraform", "Go", "Prometheus"],
    onClick: () => console.log('Clicked Nebula Cloud')
  },
  {
    title: "QUANTUM AI",
    genre: "Machine Learning Platform",
    description: "Next-generation AI analytics engine powered by deep learning algorithms. Processes millions of data points in real-time to deliver predictive insights and autonomous decision-making capabilities.",
    image: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=800&h=1200&fit=crop",
    techStack: ["TensorFlow", "Python", "PyTorch", "React", "PostgreSQL"],
    onClick: () => console.log('Clicked Quantum AI')
  },
  {
    title: "APEX SERVICES",
    genre: "Microservices Architecture",
    description: "High-performance microservices ecosystem built on event-driven architecture. Handles 10M+ requests daily with sub-100ms latency across global regions. Complete with service mesh and API gateway.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=1200&fit=crop",
    techStack: ["Node.js", "GraphQL", "Redis", "RabbitMQ", "Docker"],
    onClick: () => console.log('Clicked Apex Services')
  },
  {
    title: "FORGE PIPELINE",
    genre: "DevOps Automation",
    description: "Enterprise-grade CI/CD automation suite that revolutionizes software delivery. Zero-downtime deployments, automated testing, and infrastructure as code—deploying to production 50+ times per day.",
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=1200&fit=crop",
    techStack: ["Jenkins", "GitLab", "Ansible", "AWS", "Python"],
    onClick: () => console.log('Clicked Forge Pipeline')
  },
  {
    title: "TITAN DATA",
    genre: "Big Data Platform",
    description: "Massive-scale data warehouse processing petabytes of information daily. Real-time ETL pipelines, advanced analytics, and machine learning integration for business intelligence at enterprise scale.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=1200&fit=crop",
    techStack: ["Snowflake", "Apache Spark", "Kafka", "Airflow", "Scala"],
    onClick: () => console.log('Clicked Titan Data')
  },
  {
    title: "VELOCITY MOBILE",
    genre: "Cross-Platform Experience",
    description: "Award-winning mobile application delivering seamless experiences across iOS and Android. Offline-first architecture, real-time sync, and stunning animations—5-star rated with 1M+ downloads.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=1200&fit=crop",
    techStack: ["React Native", "TypeScript", "Firebase", "Redux", "Swift"],
    onClick: () => console.log('Clicked Velocity Mobile')
  }
];

const FullCinematicPortfolio = () => {
  return (
    <>
      <CinematicAboutSection 
        heroImage={aboutData.heroImage}
        narrationTexts={aboutData.narrationTexts}
        characterStats={aboutData.characterStats}
      />
      
      <CinematicProjectsGallery 
        projects={projectsData}
      />
    </>
  );
};

export default FullCinematicPortfolio;
