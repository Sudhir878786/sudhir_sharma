import React from "react";
import { useState, useEffect, useRef } from 'react';
import Window from "../../../common/window";
import styled, { keyframes, css } from 'styled-components';
import "./css/style.css";
import "./css/exp.css";

const gridAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(40px);
  }
`;

const pulseAnimation = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
`;

const ProfileViewCounter = styled.div`
  position: absolute;
  top: -40px;
  right: 0;
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  padding: 8px 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: ${gridAnimation} 2s ease-in-out infinite alternate;
  
  .view-icon {
    color: #007acc;
    font-size: 18px;
  }
  
  img {
    display: block;
  }
  
  @media (max-width: 768px) {
    top: -35px;
    right: 10px;
    padding: 6px 12px;
    
    .view-icon {
      font-size: 14px;
    }
    
    img {
      height: 16px !important;
    }
  }
`;

const WelcomeWrapper = styled.div`
  background: transparent;
  position: relative;
  overflow: hidden;
  
  /* Remove the pseudo elements that block the 3D background */
  
  main {
    position: relative;
    z-index: 1;
  }
`;

// ========== 3D PROJECT SLIDER STYLES ==========
const cardHover = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const ProjectsSection = styled.section`
  padding: 80px 0;
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
  position: relative;
  overflow: hidden;
`;

const ProjectsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const ProjectsHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const ProjectsTitle = styled.h2`
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  font-family: Georgia, serif;
  color: #1a1a1a;
  margin-bottom: 15px;
  
  &::before {
    content: attr(data-title);
    display: block;
    font-size: clamp(0.8rem, 2vw, 1rem);
    color: #007acc;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: 10px;
  }
`;

const autoScroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-330px * 6));
  }
`;

const ProjectsSlider = styled.div`
  display: flex;
  gap: 30px;
  padding: 20px 10px 40px;
  animation: ${autoScroll} 30s linear infinite;
  will-change: transform;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
  
  &:hover {
    animation-play-state: paused;
  }
`;

const ProjectsSliderWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  position: relative;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 100px;
    height: 100%;
    z-index: 2;
    pointer-events: none;
    
    @media (max-width: 768px) {
      width: 40px;
    }
  }
  
  &::before {
    left: 0;
    background: linear-gradient(to right, #f8f9fa, transparent);
  }
  
  &::after {
    right: 0;
    background: linear-gradient(to left, #f8f9fa, transparent);
  }
`;

const ProjectCard3D = styled.div`
  min-width: 300px;
  max-width: 320px;
  flex-shrink: 0;
  height: 400px;
  background: #fff;
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 1500px;
  
  @media (max-width: 768px) {
    min-width: 75vw;
    max-width: 85vw;
    height: 360px;
  }
  
  @media (max-width: 480px) {
    min-width: 80vw;
    max-width: 90vw;
    height: 340px;
  }
  
  &:hover {
    transform: translateY(-20px) scale(1.05) rotateY(5deg) rotateX(3deg);
    box-shadow: 
      0 40px 80px rgba(0, 122, 204, 0.2),
      0 0 0 2px rgba(0, 122, 204, 0.15);
    z-index: 10;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(0, 122, 204, 0.1) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    transition: 0.5s;
    z-index: 2;
  }
  
  &:hover::after {
    animation: ${shimmer} 0.8s ease-out;
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  
  @media (max-width: 768px) {
    height: 180px;
  }
  
  @media (max-width: 480px) {
    height: 160px;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${ProjectCard3D}:hover & img {
    transform: scale(1.1);
  }
`;

const ProjectContent = styled.div`
  padding: 20px;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const ProjectTagline = styled.span`
  display: inline-block;
  background: linear-gradient(135deg, #007acc, #0056b3);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-family: Georgia, serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
`;

const ProjectName = styled.h3`
  font-size: clamp(1.1rem, 3vw, 1.3rem);
  font-family: Georgia, serif;
  color: #1a1a1a;
  margin: 0 0 10px 0;
  font-weight: 600;
`;

const ProjectDescription = styled.p`
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  color: #666;
  line-height: 1.6;
  font-family: Georgia, serif;
  margin: 0 0 15px 0;
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const TechTag = styled.span`
  background: #f0f7ff;
  color: #007acc;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-family: monospace;
`;

const ViewAllLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
  padding: 12px 30px;
  background: #007acc;
  color: white;
  border-radius: 30px;
  font-family: Georgia, serif;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: #005f99;
    transform: translateX(5px);
    box-shadow: 0 10px 30px rgba(0, 122, 204, 0.3);
  }
  
  i {
    transition: transform 0.3s ease;
  }
  
  &:hover i {
    transform: translateX(5px);
  }
`;

// Featured Projects Data - Using exact same projects from CinematicPortfolio
const featuredProjects = [
  {
    title: "MELODEXA",
    tagline: "Listen Together, Anywhere",
    description: "Collaborative music streaming with real-time sync, rooms, and Spotify-like UI.",
    image: "portfolio/syncano.jpg",
    techStack: ["Flask", "Socket.IO", "Redis", "JavaScript"],
    link: "https://github.com/Sudhir878786/Syncano"
  },
  {
    title: "Screenwise.ai",
    tagline: "Undetectable Screen Overlay",
    description: "Invisible window overlay tool for screen sharing with 99% invisibility to Zoom, Discord, and browsers.",
    image: "portfolio/screenwise.jpg",
    techStack: ["Electron", "React", "TypeScript", "OpenAI"],
    link: "https://github.com/Sudhir878786/Screenwise.ai"
  },
  {
    title: "MAQ Software Mobile",
    tagline: "Enterprise Data Solutions",
    description: "Mobile app for MAQ Software employees - AI-powered Microsoft Fabric migration and analytics platform.",
    image: "portfolio/maqsoftware.jpg",
    techStack: ["Android", "Java", "Material Design"],
    link: "https://github.com/Sudhir878786/MAQSoftware"
  },
  {
    title: "IntervuPro.AI",
    tagline: "AI Interview Platform",
    description: "AI-powered interview preparation platform with intelligent feedback and personalized coaching.",
    image: "portfolio/intervuepro.jpg",
    techStack: ["LLM", "AI", "Python", "React", "NLP"],
    link: "https://github.com/Sudhir878786/IntervuPro.AI"
  },
  {
    title: "Resume Ranker",
    tagline: "Smart ATS System",
    description: "Intelligent resume ranking system powered by LLM to analyze resumes against job descriptions.",
    image: "portfolio/resumerank.jpg",
    techStack: ["LLM", "Python", "NLP", "AI", "FastAPI"],
    link: "https://github.com/Sudhir878786/Resume_Ranker_LLM"
  },
  {
    title: "PythonCF",
    tagline: "Competitive Programming",
    description: "Python toolkit for Codeforces with automated testing and solution templates.",
    image: "portfolio/pythoncff.jpg",
    techStack: ["Python", "Algorithms", "CLI", "Automation"],
    link: "https://github.com/Sudhir878786/pythoncf"
  }
];

const WINDOW_MOBILE_MIN_SIZE = {
    width: 320,
    height: 570,
};

const WINDOW_MIN_SIZE =
    "ontouchstart" in window ? WINDOW_MOBILE_MIN_SIZE : undefined;

const Welcome = (props) => {
    const { standalone, children, ...windowProps } = props;

    const content = (
        <WelcomeWrapper>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hey, I'm Sudhir</title>
        <link rel="icon" type="image/x-icon" href="/img/fevicon.png?" />
        <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" />
    
        
        <main>
          <header id="header" style={{background: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
            <nav style={{padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '10px'}}>
                <div className="logo" style={{fontFamily: 'monospace', fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: '#000', fontWeight: 'bold'}}>
                  Sudhir Sharma
                </div>
                <div className="links" style={{position: 'static', transform: 'none', background: 'transparent', height: 'auto', width: 'auto', display: 'block'}}>
                  <ul style={{display: 'flex', gap: 'clamp(10px, 3vw, 30px)', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
                    <li><a href="#header" style={{color: '#000', fontSize: 'clamp(0.85rem, 2vw, 1rem)', padding: 0, fontFamily: 'Georgia, serif'}}>Home</a></li>
                    <li><a href="#about" style={{color: '#000', fontSize: 'clamp(0.85rem, 2vw, 1rem)', padding: 0, fontFamily: 'Georgia, serif'}}>About</a></li>
                    <li><a href="#projects" style={{color: '#000', fontSize: 'clamp(0.85rem, 2vw, 1rem)', padding: 0, fontFamily: 'Georgia, serif'}}>Projects</a></li>
                    <li><a href="#contact" style={{color: '#000', fontSize: 'clamp(0.85rem, 2vw, 1rem)', padding: 0, fontFamily: 'Georgia, serif'}}>Contact</a></li>
                  </ul>
                </div>
                <div className="date-time" style={{fontFamily: 'monospace', fontSize: 'clamp(0.85rem, 2vw, 1rem)', color: '#000', display: window.innerWidth < 768 ? 'none' : 'block'}}>
                  {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                </div>
            </nav>
            
            <div className="header-content" style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 20px', marginTop: '0'}}>
                <div className="image-container" style={{marginBottom: '18px'}}>
                    <img src={require("./img/Person.png")} alt="Sudhir Sharma" style={{width: '250px', height: 'auto', filter: 'grayscale(100%)', borderRadius: '0', display: 'block', boxShadow: 'none', border: 'none', background: 'transparent'}} />
                </div>
                <div className="intro-text" style={{fontFamily: 'Georgia, serif', fontSize: '1.4rem', color: '#666', marginBottom: '8px', letterSpacing: '0.5px'}}>
                    Hello! I'm
                </div>
                <h1 className="main-title" style={{fontSize: '6rem', fontWeight: '300', color: '#000', margin: '0 0 18px 0', letterSpacing: '-2px', lineHeight: '0.95', fontFamily: 'Georgia, serif'}}>
                    Sudhir
                </h1>
                
                <div className="badges" style={{display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', justifyContent: 'center'}}>
                    <a href="https://www.linkedin.com/in/sudhirsharma87/" target="_blank" rel="noopener noreferrer" className="linkedin-icon"><i className="fab fa-linkedin"></i></a>
                    <span className="open-to-work-badge">
                        <span className="pulse-dot"></span> Open to Work
                    </span>
                    <div style={{color: '#555', fontSize: '0.9rem', fontFamily: 'Georgia, serif'}}>sudhirsharma@iitbhilai.ac.in</div>
                </div>
                
                <div className="details" style={{display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '900px', marginTop: '45px', borderTop: '1px solid #e5e5e5', paddingTop: '18px', fontFamily: 'Georgia, serif', color: '#555', fontSize: 'clamp(0.85rem, 2vw, 1rem)', flexWrap: 'wrap', gap: '10px'}}>
                    <div>AI/ML Engineer</div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                      <i className="fas fa-map-marker-alt" style={{color: '#007acc', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'}}></i>
                      Hyderabad, Telangana, India
                    </div>
                </div>
            </div>
          </header>
          {/* Services section  */}
          <section className="services section" id="services" style={{paddingTop: '40px'}}>
            <div className="container">
              {/* Profile View Counter */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '25px',
                marginTop: '-20px'
              }}>
                <div style={{
                  background: '#f8f9fa',
                  border: '1px solid #e0e0e0',
                  borderRadius: '30px',
                  padding: '12px 25px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)'
                }}>
                  <i className="fas fa-eye" style={{ color: '#007acc', fontSize: '20px' }}></i>
                  <span style={{ fontFamily: 'Georgia, serif', color: '#555', fontSize: '0.95rem' }}>Profile Views:</span>
                  <img 
                    src="https://komarev.com/ghpvc/?username=Sudhir878786&style=flat-square&color=blue" 
                    alt="Visitor Count" 
                    style={{ height: '24px', display: 'block' }} 
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              </div>
              
              <div className="section-header">
                <h3 className="title" data-title="What I Do">Services</h3>
                <p className="text">
                  Specialized services in AI/ML systems, backend architecture, and algorithmic solutions for your business needs.
                </p>
              </div>
              <div className="cards">
                <div className="card-wrap">
                  <img src={require("./img/shapes/points3.png")} className="points points1 points-sq" alt="points square rawquesh" />
                  <div className="card" data-card="Web">
                    <div className="card-content z-index">
                      <img src={require("./img/services/web.png")} className="icon" alt="web development showcase rawquesh" />
                      <h3 className="title-sm">Web Development</h3>
                      <p className="text">
                        Experienced in building dynamic and responsive websites using MERN stack, including full-stack applications.
                      </p>
                      <a href="mailto:sudhirsharma@iitbhilai.ac.in" className="btn small">Hire me</a>
                    </div>            </div>
                </div>
                <div className="card-wrap">
                  <div className="card" data-card="AI">
                    <div className="card-content z-index">
                      <img src={require("./img/services/AI.png")} className="icon" alt="ai development" />
                      <h3 className="title-sm">AI/ML & Search Systems</h3>
                      <p className="text">
                        Building RAG pipelines, semantic search engines with vector databases (FAISS, ChromaDB), and AI integrations using LangChain, OpenAI APIs, and cloud-native deployments.
                      </p>
                      <a href="mailto:sudhirsharma@iitbhilai.ac.in" className="btn small">Hire me</a>
                    </div>
                  </div>
                </div>
                <div className="card-wrap">
                  <div className="card" data-card="App">
                    <div className="card-content z-index">
                      <img src={require("./img/services/android.png")} className="icon" alt="android development showcase rawquesh" />
                      <h3 className="title-sm">Android App</h3>
                      <p className="text">
                        I can build various types of android apps for your needs
                        like social media apps, online stores, shopping apps, and
                        payment systems.
                      </p>
                      <a href="mailto:sudhirsharma@iitbhilai.ac.in" className="btn small">Hire me</a>
                    </div>
                  </div>
                </div>
                
                <div className="card-wrap">
                  <div className="card" data-card="Store">
                    <div className="card-content z-index">
                      <img src={require("./img/services/online-store100.png")} className="icon" alt="online store showcase rawquesh" />
                      <h3 className="title-sm">Online Store</h3>
                      <p className="text">
                        I can build your online store with the latest technologies
                        like WordPress/WooCommerce, React, and Flutter.
                      </p>
                      <a href="mailto:sudhirsharma@iitbhilai.ac.in" className="btn small">Hire me</a>
                    </div>
                  </div>
                </div>
                <div className="card-wrap">
                  <img src={require("./img/shapes/points3.png")} className="points points2 points-sq" alt="" />
                  <div className="card" data-card="DB">
                    <div className="card-content z-index">
                      <img src={require("./img/services/database.png")} className="icon" alt="database Backend showcase rawquesh" />
                      <h3 className="title-sm">Backend & Distributed Systems</h3>
                      <p className="text">
                        Building scalable microservices and distributed systems with Spring Boot, PySpark, SQL, .NET. Expert in data pipelines, REST APIs, and cloud deployments.
                      </p>
                      <a href="mailto:sudhirsharma@iitbhilai.ac.in" className="btn small">Hire me</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Experience */} 
          <section style={{background: '#fafafa', padding: '60px 0'}}> 
            <div className="container" style={{maxWidth: '98rem', padding: '0 4rem', margin: '0 auto'}}>
              <div className="section-header" style={{marginBottom: '50px'}}>
                <h3 className="title" data-title="My Journey">Professional Experience</h3>
                <p className="text" style={{maxWidth: '700px', margin: '15px auto 0', textAlign: 'center', color: '#666'}}>
                  From building AI-powered search systems to architecting scalable distributed platforms, here's my professional journey.
                </p>
              </div>
            
              <div className="fullWidth eight columns">
                <ul className="cbp_tmtimeline">
                <li>
                  <div className="cbp_tmicon cbp_tmicon-phone" style={{
                    background: '#ffffff',
                    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
                    border: '2px solid #e0e0e0'
                  }}>
                    <img src={require("./img/services/image.png")} alt="SDE at MAQ Software" className="profile-icon" />
                  </div>
                  <div className="cbp_tmlabel wow fadeInRight animated" style={{
                    background: '#ffffff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                  }}>
                    <h3 style={{
                      color: '#333',
                      fontSize: '1.5rem',
                      marginBottom: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <span>💼</span> Software Development Engineer
                    </h3>
                    <div className="date" style={{
                      background: '#f5f5f5',
                      border: '1px solid #e0e0e0',
                      padding: 'clamp(6px, 2vw, 8px) clamp(10px, 3vw, 15px)',
                      borderRadius: '20px',
                      display: 'inline-block',
                      marginBottom: '10px',
                      color: '#555',
                      fontSize: 'clamp(0.75rem, 2vw, 0.9rem)'
                    }}>
                      <i className="fa fa-calendar" style={{marginRight: '8px'}} />April 2024 - Present
                    </div>
                    <h4 style={{color: '#007acc', marginBottom: '15px', fontFamily: 'Georgia, serif'}}>
                      <i className="fa fa-flag" style={{marginRight: '8px'}} />MAQ Software, Hyderabad, Telangana
                    </h4>
                    
                    <p style={{margin: 0, lineHeight: '1.8', color: '#555', fontFamily: 'Georgia, serif', fontSize: '0.95rem', marginBottom: '15px'}}>
                      Architected and developed enterprise-grade applications using Spring Boot, .NET, and PySpark to automate data ingestion from multiple databases. Built and optimized complex data pipelines with PySpark and SQL, creating semantic models for Power BI visualization. Developed automated tools using NLP techniques to detect discrepancies and grammatical errors in Power BI reports, ensuring 99.5% data integrity. Improved reporting performance by 60% through advanced query optimization and reduced processing time by 40% for 10+ clients.
                    </p>
                    
                    <div style={{padding: '10px 15px', background: '#f8f8f8', borderRadius: '6px', borderLeft: '3px solid #007acc'}}>
                      <strong style={{color: '#333', fontSize: '0.85rem', fontFamily: 'Georgia, serif'}}>Tech Stack:</strong>
                      <span style={{marginLeft: '10px', color: '#666', fontSize: '0.85rem', fontFamily: 'Georgia, serif'}}>
                        Spring Boot • .NET • Python • PySpark • SQL • C • Power BI
                      </span>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="cbp_tmicon cbp_tmicon-screen" style={{
                    background: '#ffffff',
                    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
                    border: '2px solid #e0e0e0'
                  }}>
                    <img src={require("./img/portfolio/ik.png")} alt="Backend Engineer at InterviewKickstart" className="profile-icon" />
                  </div>
                  <div className="cbp_tmlabel wow fadeInRight animated" style={{
                    background: '#ffffff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                  }}>
                    <h3 style={{
                      color: '#333',
                      fontSize: '1.5rem',
                      marginBottom: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <span>🧠</span> Backend Engineer
                    </h3>
                    <div className="date" style={{
                      background: '#f5f5f5',
                      border: '1px solid #e0e0e0',
                      padding: 'clamp(6px, 2vw, 8px) clamp(10px, 3vw, 15px)',
                      borderRadius: '20px',
                      display: 'inline-block',
                      marginBottom: '10px',
                      color: '#555',
                      fontSize: 'clamp(0.75rem, 2vw, 0.9rem)'
                    }}>
                      <i className="fa fa-calendar" style={{marginRight: '8px'}} />August 2023 - August 2024
                    </div>
                    <h4 style={{color: '#007acc', marginBottom: '15px', fontFamily: 'Georgia, serif'}}>
                      <i className="fa fa-flag" style={{marginRight: '8px'}} />InterviewKickstart, Remote
                    </h4>
                    
                    <p style={{margin: 0, lineHeight: '1.8', color: '#555', fontFamily: 'Georgia, serif', fontSize: '0.95rem', marginBottom: '15px'}}>
                      Designed and deployed 100+ algorithmic challenges covering Arrays, Trees, Dynamic Programming, and Graphs using Swift, Node.js, and Python. Led open-source projects and mentored a team of 10 engineers, guiding 50+ juniors across 40+ projects. Developed comprehensive test suites and reviewed code for interns, ensuring 95% test coverage and optimal complexity. Challenges used by 5000+ students preparing for FAANG interviews, improving team code quality by 45%.
                    </p>
                    
                    <div style={{padding: '10px 15px', background: '#f8f8f8', borderRadius: '6px', borderLeft: '3px solid #007acc'}}>
                      <strong style={{color: '#333', fontSize: '0.85rem', fontFamily: 'Georgia, serif'}}>Tech Stack:</strong>
                      <span style={{marginLeft: '10px', color: '#666', fontSize: '0.85rem', fontFamily: 'Georgia, serif'}}>
                        Swift • Node.js • Python • Data Structures • Algorithms • Git
                      </span>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="cbp_tmicon cbp_tmicon-mail" style={{
                    background: '#ffffff',
                    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
                    border: '2px solid #e0e0e0'
                  }}>
                    <img src={require("./img/portfolio/image.png")} alt="Software Developer Intern at Cloudcraftz.AI" className="profile-icon" />
                  </div>
                  <div className="cbp_tmlabel wow fadeInRight animated" style={{
                    background: '#ffffff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                  }}>
                    <h3 style={{
                      color: '#333',
                      fontSize: '1.5rem',
                      marginBottom: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <span>🤖</span> Software Developer Intern (AI/ML)
                    </h3>
                    <div className="date" style={{
                      background: '#f5f5f5',
                      border: '1px solid #e0e0e0',
                      padding: 'clamp(6px, 2vw, 8px) clamp(10px, 3vw, 15px)',
                      borderRadius: '20px',
                      display: 'inline-block',
                      marginBottom: '10px',
                      color: '#555',
                      fontSize: 'clamp(0.75rem, 2vw, 0.9rem)'
                    }}>
                      <i className="fa fa-calendar" style={{marginRight: '8px'}} />May 2023 - July 2023
                    </div>
                    <h4 style={{color: '#007acc', marginBottom: '15px', fontFamily: 'Georgia, serif'}}>
                      <i className="fa fa-flag" style={{marginRight: '8px'}} />Cloudcraftz.AI, Kolkata
                    </h4>
                    
                    <p style={{margin: 0, lineHeight: '1.8', color: '#555', fontFamily: 'Georgia, serif', fontSize: '0.95rem', marginBottom: '15px'}}>
                      Developed production-ready semantic search features using ChromaDB and Typesense vector databases with embedding models. Built and deployed an Algolia-like semantic search application using OpenAI APIs and LLMs on Google Cloud Platform (GCP). Implemented RAG (Retrieval-Augmented Generation) for context-aware search with 90% accuracy, improving search relevance by 75% and handling 10K+ queries/day.
                    </p>
                    
                    <div style={{padding: '10px 15px', background: '#f8f8f8', borderRadius: '6px', borderLeft: '3px solid #007acc'}}>
                      <strong style={{color: '#333', fontSize: '0.85rem', fontFamily: 'Georgia, serif'}}>Tech Stack:</strong>
                      <span style={{marginLeft: '10px', color: '#666', fontSize: '0.85rem', fontFamily: 'Georgia, serif'}}>
                        Python • ChromaDB • Typesense • OpenAI API • LangChain • GCP
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
              </div>
            </div>
          </section>

          {/* About section */}
      <section className="about section" id="about">
        <div className="container">
          <div className="section-header">
            <h3 className="title" data-title="Who Am I">About me</h3>
          </div>
          <div className="section-body">
            <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <img 
                  src={require("./img/Person.png")} 
                  alt="Sudhir Sharma" 
                  style={{
                    width: '180px', 
                    height: '180px', 
                    borderRadius: '50%', 
                    objectFit: 'cover',
                    border: '4px solid #007acc',
                    boxShadow: '0 8px 24px rgba(0, 122, 204, 0.2)'
                  }} 
                />
              </div>
              
              <h3 className="title-sm" style={{ textAlign: 'center', marginBottom: '20px' }}>Hello, I'm Sudhir 👋</h3>
              
              <p className="text" style={{
                fontSize: '1.1rem',
                lineHeight: '1.9',
                color: '#444',
                textAlign: 'center',
                fontFamily: 'Georgia, serif'
              }}>
                I'm an <strong style={{color: '#007acc'}}>AI/ML & Search Systems Engineer</strong> passionate about building intelligent systems that make a difference. With expertise in RAG pipelines, semantic search engines, and LLM-powered applications using LangChain and OpenAI APIs, I create production-grade AI solutions.
              </p>
              
              <p className="text" style={{
                fontSize: '1.1rem',
                lineHeight: '1.9',
                color: '#444',
                textAlign: 'center',
                fontFamily: 'Georgia, serif',
                marginTop: '20px'
              }}>
                Beyond AI, I architect scalable backend systems with Spring Boot, PySpark, and .NET, deploying cloud-native solutions on GCP and Azure. With 550+ algorithmic problems solved and mentoring 50+ developers, I bridge the gap between cutting-edge research and production-ready systems.
              </p>
              
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                marginTop: '30px',
                flexWrap: 'wrap'
              }}>
                <span style={{
                  background: '#f0f7ff',
                  color: '#007acc',
                  padding: '8px 20px',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontFamily: 'Georgia, serif'
                }}>AI/ML Engineer</span>
                <span style={{
                  background: '#f0f7ff',
                  color: '#007acc',
                  padding: '8px 20px',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontFamily: 'Georgia, serif'
                }}>Backend Architect</span>
                <span style={{
                  background: '#f0f7ff',
                  color: '#007acc',
                  padding: '8px 20px',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontFamily: 'Georgia, serif'
                }}>Problem Solver</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Records */}
      <section className="records">
        <div className="container">
          <div className="wrap">
            <div className="record-circle">
              <h2 className="number add-plus" data-num={70}>70</h2>
              <h4 className="sub-title">Projects</h4>
            </div>
          </div>
          <div className="wrap">
            <div className="record-circle active">
              <h2 className="number add-plus" data-num={15}>15</h2>
              <h4 className="sub-title">Happy Clients</h4>
            </div>
          </div>
          <div className="wrap">
            <div className="record-circle">
              <h2 className="number add-plus" data-num={550}>550</h2>
              <h4 className="sub-title">Work Hour</h4>
            </div>
          </div>
          <div className="wrap">
            <div className="record-circle">
              <h2 className="number add-perc" data-num={98}>96</h2>
              <h4 className="sub-title">Success rate</h4>
            </div>
          </div>
        </div>
      </section>
          {children}
          
          {/* Contact */}
          <section className="contact" id="contact">
            <div className="container">
              <div className="contact-box">
                <div className="contact-info">
                  <h3 className="title">Get in touch</h3>
                  <p className="text">
                    Reach out to discuss your project or just to say hi. I'm always open to new opportunities.
                  </p>
                  <div className="information-wrap">
                    <div className="information">
                      <div className="contact-icon">
                        <i className="fas fa-map-marker-alt" />
                      </div>
                      <p className="info-text">Hyderabad, Telangana, India</p>
                    </div>
                    <div className="information">
                      <div className="contact-icon">
                        <i className="fas fa-paper-plane" />
                      </div>
                      <p className="info-text">sudhirsharma@iitbhilai.ac.in</p>
                    </div>
                  </div>
                </div>
                <div className="contact-form">
                  <form action="https://formsubmit.co/sudhirsharma@iitbhilai.ac.in" method="POST">
                    <h3 className="title">Contact me</h3>
                    <input type="hidden" name="_template" defaultValue="table" />
                    <input type="hidden" name="_subject" defaultValue="Contact Inquiry" />
                    <div style={{width: '100%'}}>
                      <div className="row">
                        <input className="contact-input" placeholder="First Name" type="text" name="fname" required />
                        <input className="contact-input" placeholder="Last Name" type="text" name="lname" required />
                      </div>
                      <div className="row">
                        <input className="contact-input" placeholder="Phone" type="text" name="phone" required />
                        <input className="contact-input" placeholder="Email" type="email" name="email" required />
                      </div>
                    </div>
                    <div className="row">
                      <textarea className="contact-input textarea" placeholder="Message" name="message" required defaultValue={""} />
                    </div>
                    <button type="submit" className="btn">Send</button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="footer">
          <div className="container">
            <div className="grid-4">
              <div className="grid-4-col footer-about">
                <h3 className="title-sm">Sudhir Sharma</h3>
                <p className="text">
                  AI/ML Engineer specializing in building scalable applications, data pipelines, and intelligent systems.
                </p>
              </div>
              <div className="grid-4-col footer-links">
                <h3 className="title-sm">Quick Links</h3>
                <ul>
                  <li>
                    <a href="#services">Services</a>
                  </li>
                  <li>
                    <a href="#about">About</a>
                  </li>
                  <li>
                    <a href="#contact">Contact</a>
                  </li>
                </ul>
              </div>
              <div className="grid-4-col footer-links">
                <h3 className="title-sm">Expertise</h3>
                <ul>
                  <li>
                    <a>AI/ML Engineering</a>
                  </li>
                  <li>
                    <a>Full Stack Development</a>
                  </li>
                  <li>
                    <a>Data Engineering</a>
                  </li>
                  <li>
                    <a>Cloud Solutions</a>
                  </li>
                </ul>
              </div>
              <div className="grid-4-col footer-newstletter">
                <h3 className="title-sm">Stay Updated</h3>
                <p className="text">
                  Subscribe for updates on new projects and availability.
                </p>
                <form action="https://formsubmit.co/sudhirsharma@iitbhilai.ac.in" method="POST">
                  <div className="footer-input-wrap">
                    <input type="hidden" name="_template" defaultValue="table" />
                    <input type="hidden" name="_subject" defaultValue="Subscribe" />
                    <input required name="email" type="email" className="footer-input" placeholder="Your email" />
                    <button type="submit" className="input-arrow">
                      <i className="fas fa-arrow-right" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="bottom-footer">
              <div className="copyright">
                <p className="text">© 2024 Sudhir Sharma. All rights reserved.</p>
              </div>
              <div className="followme-wrap">
                <div className="followme">
                  <h3>Follow</h3>
                  <span className="footer-line" />
                  <div className="social-media">
                    <a href="https://x.com/SUDHIRSHAR61219" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-twitter" />
                    </a>
                    <a href="https://www.linkedin.com/in/sudhirsharma87/" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-linkedin-in" />
                    </a>
                    <a href="https://github.com/Sudhir878786" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-github" />
                    </a>
                  </div>
                </div>
                <div className="back-btn-wrap">
                  <a href="#" className="back-btn">
                    <i className="fas fa-chevron-up" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      
        </WelcomeWrapper>
    );

    if (standalone) {
        return content;
    }

    return (
        <Window {...windowProps} minSize={WINDOW_MIN_SIZE}>
            {content}
        </Window>
    );
};

export default Welcome;
