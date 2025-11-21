import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// ========== CINEMATIC ANIMATIONS ==========
const trailerFadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
    filter: brightness(0.3);
  }
  to {
    opacity: 1;
    transform: scale(1);
    filter: brightness(1);
  }
`;

const lightSweep = keyframes`
  0% {
    transform: translateX(-200%) skewX(-15deg);
  }
  100% {
    transform: translateX(200%) skewX(-15deg);
  }
`;

const fogDrift = keyframes`
  0%, 100% {
    transform: translateX(0) translateY(0);
    opacity: 0.4;
  }
  50% {
    transform: translateX(30px) translateY(-20px);
    opacity: 0.6;
  }
`;

const posterReveal = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
    filter: blur(10px) brightness(0.5);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0) brightness(1);
  }
`;

const titleDramatic = keyframes`
  from {
    opacity: 0;
    transform: scale(1.3);
    filter: blur(8px);
    letter-spacing: 0.3em;
  }
  to {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
    letter-spacing: 0.15em;
  }
`;

const glowPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(78, 201, 176, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(78, 201, 176, 0.6);
  }
`;

const particleFloat = keyframes`
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-120px) translateX(20px) rotate(180deg);
    opacity: 0;
  }
`;

// ========== MAIN CONTAINER ==========
const CinematicContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #0a0a0a;
  position: relative;
  overflow: hidden;
  padding: 80px 40px;
  box-sizing: border-box;
  animation: ${trailerFadeIn} 1.5s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

// ========== ATMOSPHERIC EFFECTS ==========
const FogLayer = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(86, 156, 214, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(60px);
  pointer-events: none;
  animation: ${fogDrift} ${props => props.duration || '40s'} ease-in-out infinite;
  top: ${props => props.top || '20%'};
  left: ${props => props.left || '10%'};
  z-index: 0;
`;

const LightRay = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100px) scaleY(0.5);
  }
  50% {
    opacity: 0.3;
    transform: translateX(0) scaleY(1);
  }
  100% {
    opacity: 0;
    transform: translateX(100px) scaleY(0.5);
  }
`;

const VolumetricLight = styled.div`
  position: absolute;
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, 
    transparent 0%, 
    rgba(78, 201, 176, 0.15) 30%, 
    rgba(86, 156, 214, 0.15) 70%, 
    transparent 100%
  );
  filter: blur(2px);
  animation: ${LightRay} ${props => props.duration || '25s'} ease-in-out infinite;
  left: ${props => props.left || '30%'};
  z-index: 0;
  pointer-events: none;
`;

// ========== SECTION HEADER ==========
const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
  position: relative;
  z-index: 2;
`;

const MainTitle = styled.h1`
  font-size: clamp(48px, 8vw, 120px);
  font-weight: 900;
  color: transparent;
  background: linear-gradient(135deg, #ffffff 0%, #4ec9b0 50%, #569cd6 100%);
  background-clip: text;
  -webkit-background-clip: text;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin: 0 0 20px 0;
  font-family: 'Segoe UI', sans-serif;
  animation: ${titleDramatic} 2s cubic-bezier(0.16, 1, 0.3, 1);
  text-shadow: 
    0 0 40px rgba(78, 201, 176, 0.5),
    0 0 80px rgba(86, 156, 214, 0.3);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    animation: ${lightSweep} 3s ease-in-out 0.5s;
  }
`;

const Subtitle = styled.p`
  font-size: clamp(16px, 2vw, 24px);
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.3em;
  text-transform: uppercase;
  font-weight: 300;
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
`;

// ========== PROJECT GRID ==========
const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 50px;
  max-width: 1600px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

// ========== MOVIE POSTER CARD ==========
const PosterCard = styled.div`
  position: relative;
  aspect-ratio: 2/3;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  animation: ${posterReveal} 1.2s cubic-bezier(0.16, 1, 0.3, 1) backwards;
  animation-delay: ${props => props.delay || '0s'};
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  
  &:hover {
    transform: scale(1.05) translateY(-10px);
    z-index: 10;

    img {
      transform: scale(1.15);
      filter: brightness(1.2) contrast(1.1);
    }

    &::before {
      opacity: 0.9;
    }

    &::after {
      opacity: 1;
    }
  }

  /* Vignette */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.8) 100%);
    z-index: 1;
    opacity: 0.6;
    transition: opacity 0.6s ease;
    pointer-events: none;
  }

  /* Light sweep on hover */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    z-index: 3;
    opacity: 0;
    animation: ${lightSweep} 1.5s ease;
    pointer-events: none;
  }

  &:hover::after {
    animation: ${lightSweep} 1.5s ease;
  }
`;

const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  filter: brightness(0.8) contrast(1.05);
`;

const PosterOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0.7) 40%,
    transparent 70%
  );
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  box-sizing: border-box;
  overflow-y: auto;
  max-height: 100%;
  
  &::-webkit-scrollbar {
    width: 3px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(78, 201, 176, 0.5);
    border-radius: 2px;
  }
`;

const PosterTitle = styled.h2`
  font-size: clamp(20px, 2.5vw, 32px);
  font-weight: 900;
  color: #ffffff;
  margin: 0 0 8px 0;
  font-family: 'Segoe UI', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 
    0 0 20px rgba(78, 201, 176, 0.8),
    0 2px 10px rgba(0, 0, 0, 0.9);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  
  ${PosterCard}:hover & {
    transform: scale(1.05);
    text-shadow: 
      0 0 30px rgba(78, 201, 176, 1),
      0 0 60px rgba(86, 156, 214, 0.8),
      0 2px 10px rgba(0, 0, 0, 0.9);
  }
`;

const PosterTagline = styled.p`
  font-size: clamp(11px, 1.2vw, 14px);
  color: rgba(220, 220, 170, 0.9);
  margin: 0 0 12px 0;
  font-family: 'Segoe UI', sans-serif;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 600;
  opacity: 0.8;
  transition: all 0.4s ease;
  
  ${PosterCard}:hover & {
    opacity: 1;
    transform: translateY(-3px);
  }
`;

const PosterDescription = styled.p`
  font-size: clamp(11px, 1vw, 13px);
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.5;
  margin: 0 0 12px 0;
  font-family: 'Segoe UI', sans-serif;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
  
  ${PosterCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CommitsSection = styled.div`
  margin: 0 0 12px 0;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
  
  ${PosterCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CommitsTitle = styled.h4`
  font-size: 11px;
  color: #dcdcaa;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin: 0 0 6px 0;
  font-weight: 700;
  font-family: 'Segoe UI', sans-serif;
`;

const CommitItem = styled.div`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
  margin: 3px 0;
  padding-left: 10px;
  position: relative;
  line-height: 1.3;
  font-family: 'Segoe UI', sans-serif;
  
  &::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: #4ec9b0;
  }
`;

const LoadingText = styled.div`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
  font-family: 'Segoe UI', sans-serif;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
  
  ${PosterCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TechTag = styled.span`
  padding: 3px 10px;
  background: rgba(78, 201, 176, 0.2);
  border: 1px solid rgba(78, 201, 176, 0.4);
  border-radius: 4px;
  font-size: 10px;
  color: #4ec9b0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: 'Segoe UI', sans-serif;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(78, 201, 176, 0.3);
    border-color: rgba(78, 201, 176, 0.6);
    transform: translateY(-2px);
  }
`;

const GlowingEdge = styled.div`
  position: absolute;
  inset: 0;
  border: 2px solid transparent;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(78, 201, 176, 0.5), rgba(86, 156, 214, 0.5)) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: 4;
  pointer-events: none;
  animation: ${glowPulse} 2s ease-in-out infinite;
  
  ${PosterCard}:hover & {
    opacity: 1;
  }
`;

const ParticleContainer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 5;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.5s ease;
  
  ${PosterCard}:hover & {
    opacity: 1;
  }
`;

const Particle = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background: ${props => props.color || '#4ec9b0'};
  border-radius: 50%;
  animation: ${particleFloat} ${props => props.duration || '4s'} ease-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  bottom: ${props => props.bottom || '20%'};
  left: ${props => props.left || '50%'};
  box-shadow: 0 0 10px ${props => props.color || '#4ec9b0'};
`;

// ========== YOUR ACTUAL PROJECTS ==========
const projects = [
  {
    title: "MELODEXA",
    tagline: "Listen Together, Anywhere",
    description: "Collaborative music streaming with real-time sync, rooms, and Spotify-like UI.",
    image: require("../windows/programs/welcome/img/portfolio/syncano.jpg"),
    techStack: ["Flask", "Socket.IO", "Redis", "JavaScript"],
    link: "https://github.com/Sudhir878786/Syncano",
    repo: "Sudhir878786/Syncano",
    topics: ["flask", "socketio", "music", "python"]
  },
  {
    title: "Screenwise.ai",
    tagline: "Undetectable Screen Overlay",
    description: "Invisible window overlay tool for screen sharing with 99% invisibility to Zoom, Discord, and browsers.",
    image: require("../windows/programs/welcome/img/portfolio/screenwise.jpg"),
    techStack: ["Electron", "React", "TypeScript", "OpenAI"],
    link: "https://github.com/Sudhir878786/Screenwise.ai",
    repo: "Sudhir878786/Screenwise.ai",
    topics: ["electron", "react", "typescript", "javascript"]
  },
  {
    title: "MAQ Software Mobile",
    tagline: "Enterprise Data Solutions",
    description: "Mobile app for MAQ Software employees - AI-powered Microsoft Fabric migration and analytics platform.",
    image: require("../windows/programs/welcome/img/portfolio/maqsoftware.jpg"),
    techStack: ["Android", "Java", "Material Design"],
    link: "https://github.com/Sudhir878786/MAQSoftware",
    repo: "Sudhir878786/MAQSoftware",
    topics: ["android", "java", "mobile", "app"]
  },
  {
    title: "IntervuPro.AI",
    tagline: "AI Interview Platform",
    description: "AI-powered interview preparation platform with intelligent feedback and personalized coaching.",
    image: require("../windows/programs/welcome/img/portfolio/intervuepro.jpg"),
    techStack: ["LLM", "AI", "Python", "React", "NLP"],
    link: "https://github.com/Sudhir878786/IntervuPro.AI",
    repo: "Sudhir878786/IntervuPro.AI",
    topics: ["machine-learning", "llm", "interview", "ai"]
  },
  {
    title: "Resume Ranker",
    tagline: "Smart ATS System",
    description: "Intelligent resume ranking system powered by LLM to analyze resumes against job descriptions.",
    image: require("../windows/programs/welcome/img/portfolio/resumerank.jpg"),
    techStack: ["LLM", "Python", "NLP", "AI", "FastAPI"],
    link: "https://github.com/Sudhir878786/Resume_Ranker_LLM",
    repo: "Sudhir878786/Resume_Ranker_LLM",
    topics: ["llm", "resume", "ats", "nlp"]
  },
  {
    title: "PythonCF",
    tagline: "Competitive Programming",
    description: "Python toolkit for Codeforces with automated testing and solution templates.",
    image: require("../windows/programs/welcome/img/portfolio/pythoncff.jpg"),
    techStack: ["Python", "Algorithms", "CLI", "Automation"],
    link: "https://github.com/Sudhir878786/pythoncf",
    repo: "Sudhir878786/pythoncf",
    topics: ["python", "competitive-programming", "codeforces"]
  },
  {
    title: "IIT Bhilai Lost & Found",
    tagline: "Campus App",
    description: "Full-stack application for IIT Bhilai campus with real-time notifications.",
    image: require("../windows/programs/welcome/img/portfolio/landf.jpg"),
    techStack: ["React", "Node.js", "MongoDB", "Express"],
    link: "https://github.com/Sudhir878786/IIT-Bhilai-Lost-and-Found",
    repo: "Sudhir878786/IIT-Bhilai-Lost-and-Found",
    topics: ["react", "nodejs", "mongodb", "full-stack"]
  },
  {
    title: "Quantum ML",
    tagline: "Quantum Computing",
    description: "Dynamic circuit implementation for quantum machine learning algorithms.",
    image: require("../windows/programs/welcome/img/portfolio/quantumml.jpg"),
    techStack: ["Quantum", "Python", "ML", "Qiskit"],
    link: "https://github.com/Sudhir878786/Dynamic-Circuit-Quantum-ML",
    repo: "Sudhir878786/Dynamic-Circuit-Quantum-ML",
    topics: ["quantum-computing", "machine-learning", "qiskit"]
  },
  {
    title: "Covid-19 Dashboard",
    tagline: "Data Visualization",
    description: "Interactive dashboard analyzing Covid-19 tweets with sentiment analysis.",
    image: require("../windows/programs/welcome/img/portfolio/covid.jpg"),
    techStack: ["Python", "Data Science", "Visualization", "NLP"],
    link: "https://github.com/Sudhir878786/Covid-19-Tweets-Visualization-Dashboard-DS501",
    repo: "Sudhir878786/Covid-19-Tweets-Visualization-Dashboard-DS501",
    topics: ["data-science", "visualization", "python", "nlp"]
  },
  {
    title: "MetaMask Snap",
    tagline: "Web3 Extension",
    description: "Custom MetaMask Snap for enhanced blockchain interactions.",
    image: require("../windows/programs/welcome/img/portfolio/metamask.jpg"),
    techStack: ["React", "Web3", "TypeScript", "Blockchain"],
    link: "https://github.com/Sudhir878786/MetaMask_Snap-1",
    repo: "Sudhir878786/MetaMask_Snap-1",
    topics: ["web3", "blockchain", "metamask", "ethereum"]
  },
  {
    title: "Bitcoin Scrapper",
    tagline: "Crypto Analytics",
    description: "Real-time Bitcoin data scraping and analysis tool.",
    image: require("../windows/programs/welcome/img/portfolio/bitcoin.jpg"),
    techStack: ["Python", "Web Scraping", "APIs", "Crypto"],
    link: "https://github.com/Sudhir878786/bitcoin-scrapper",
    repo: "Sudhir878786/bitcoin-scrapper",
    topics: ["python", "web-scraping", "cryptocurrency", "bitcoin"]
  },
  {
    title: "The Pixel Snappers",
    tagline: "Photography Portfolio",
    description: "Professional photography portfolio website with responsive design.",
    image: require("../windows/programs/welcome/img/portfolio/tps.png"),
    techStack: ["React", "CSS3", "Design", "UI/UX"],
    link: "https://github.com/Sudhir878786/thepixelsnappers",
    repo: "Sudhir878786/thepixelsnappers",
    topics: ["react", "photography", "portfolio", "web-design"]
  },
  {
    title: "Weather App",
    tagline: "Real-time Forecasts",
    description: "Weather application with real-time forecasts and location updates.",
    image: require("../windows/programs/welcome/img/portfolio/weathre.png"),
    techStack: ["React", "API Integration", "Geolocation"],
    link: "https://github.com/Sudhir878786/Weather_Web_App",
    repo: "Sudhir878786/Weather_Web_App",
    topics: ["react", "weather", "api", "javascript"]
  },
  {
    title: "Canon Forces",
    tagline: "Daily Codeforces Challenge",
    description: "Daily programming problems from Codeforces with difficulty filters and responsive design.",
    image: require("../windows/programs/welcome/img/portfolio/canonforces.jpg"),
    techStack: ["JavaScript", "Codeforces API", "HTML", "CSS"],
    link: "https://github.com/Sudhir878786/Codeforces-Problem-of-The-Day-CANON-FORCES",
    repo: "Sudhir878786/Codeforces-Problem-of-The-Day-CANON-FORCES",
    topics: ["javascript", "codeforces", "html", "css"]
  }
];

// ========== GITHUB API FUNCTIONS ==========
const fetchGitHubCommits = async (repo) => {
  try {
    console.log('Fetching commits for:', repo);
    const response = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=3`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      console.error(`Failed to fetch commits for ${repo}:`, response.status, response.statusText);
      return [];
    }
    
    const commits = await response.json();
    console.log('Commits fetched:', commits.length);
    
    return commits.map(commit => ({
      message: commit.commit.message.split('\n')[0].substring(0, 50),
      author: commit.commit.author.name,
      date: new Date(commit.commit.author.date).toLocaleDateString()
    }));
  } catch (error) {
    console.error('Error fetching commits for', repo, ':', error);
    return [];
  }
};

// Generate particles for hover effect
const generateParticles = () => {
  const particles = [];
  const colors = ['#4ec9b0', '#569cd6', '#dcdcaa', '#ffffff'];
  
  for (let i = 0; i < 12; i++) {
    particles.push(
      <Particle
        key={i}
        color={colors[Math.floor(Math.random() * colors.length)]}
        duration={`${3 + Math.random() * 3}s`}
        delay={`${Math.random() * 2}s`}
        bottom={`${20 + Math.random() * 60}%`}
        left={`${10 + Math.random() * 80}%`}
      />
    );
  }
  
  return particles;
};

// ========== PROJECT CARD COMPONENT ==========
const ProjectCard = ({ project, index }) => {
  const [commits, setCommits] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [loadingCommits, setLoadingCommits] = useState(false);

  useEffect(() => {
    if (isHovered && commits.length === 0 && !loadingCommits) {
      setLoadingCommits(true);
      fetchGitHubCommits(project.repo).then(data => {
        setCommits(data);
        setLoadingCommits(false);
      });
    }
  }, [isHovered, project.repo, commits.length, loadingCommits]);

  return (
    <PosterCard
      delay={`${index * 0.15}s`}
      onClick={() => window.open(project.link, '_blank')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <PosterImage src={project.image} alt={project.title} />
      <GlowingEdge />
      <ParticleContainer>
        {generateParticles()}
      </ParticleContainer>
      <PosterOverlay>
        <PosterTitle>{project.title}</PosterTitle>
        <PosterTagline>{project.tagline}</PosterTagline>
        <PosterDescription>{project.description}</PosterDescription>
        
        {/* Tech Stack */}
        <TechStack>
          {project.techStack.map((tech, i) => (
            <TechTag key={i}>{tech}</TechTag>
          ))}
        </TechStack>
        
        {/* Recent Commits */}
        <CommitsSection>
          <CommitsTitle>📝 Recent Commits</CommitsTitle>
          {loadingCommits ? (
            <LoadingText>Loading commits...</LoadingText>
          ) : commits.length > 0 ? (
            commits.map((commit, i) => (
              <CommitItem key={i}>
                {commit.message}
              </CommitItem>
            ))
          ) : isHovered ? (
            <LoadingText>No commits found</LoadingText>
          ) : null}
        </CommitsSection>
      </PosterOverlay>
    </PosterCard>
  );
};

// ========== MAIN COMPONENT ==========
const CinematicPortfolio = () => {
  return (
    <CinematicContainer>
      {/* Atmospheric Effects */}
      <FogLayer top="10%" left="5%" duration="35s" />
      <FogLayer top="60%" left="70%" duration="45s" />
      <FogLayer top="40%" left="40%" duration="40s" />
      
      <VolumetricLight left="20%" duration="20s" />
      <VolumetricLight left="60%" duration="28s" />
      <VolumetricLight left="80%" duration="24s" />
      
      {/* Section Header */}
      <SectionHeader>
        <MainTitle>FEATURED WORKS</MainTitle>
        <Subtitle>Projects</Subtitle>
      </SectionHeader>
      
      {/* Projects Grid */}
      <ProjectsGrid>
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </ProjectsGrid>
    </CinematicContainer>
  );
};

export default CinematicPortfolio;
