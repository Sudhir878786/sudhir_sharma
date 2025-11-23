import React from "react";
import { useState, useEffect } from 'react';
import Window from "../../../common/window";
import styled, { keyframes } from 'styled-components';
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

const ProfileViewCounter = styled.div`
  position: absolute;
  top: -40px;
  right: 0;
  background: linear-gradient(135deg, rgba(78, 201, 176, 0.2), rgba(61, 165, 138, 0.3));
  border: 1px solid rgba(78, 201, 176, 0.4);
  border-radius: 20px;
  padding: 8px 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(78, 201, 176, 0.2);
  animation: ${gridAnimation} 2s ease-in-out infinite alternate;
  
  .view-icon {
    color: #4ec9b0;
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
  background: linear-gradient(180deg, #1e1e1e 0%, #0f0f0f 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(rgba(78, 201, 176, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(78, 201, 176, 0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    z-index: 0;
    animation: ${gridAnimation} 2s linear infinite;
    pointer-events: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 50%, rgba(78, 201, 176, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(86, 156, 214, 0.1) 0%, transparent 50%);
    z-index: 0;
    pointer-events: none;
  }
  
  main {
    position: relative;
    z-index: 1;
  }
`;



const WINDOW_MOBILE_MIN_SIZE = {
    width: 320,
    height: 570,
};

const WINDOW_MIN_SIZE =
    "ontouchstart" in window ? WINDOW_MOBILE_MIN_SIZE : undefined;

const Welcome = (props) => {
    return (
        <Window {...props} minSize={WINDOW_MIN_SIZE}>
           <WelcomeWrapper>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hey, I'm Sudhir</title>
        <link rel="icon" type="image/x-icon" href="/img/fevicon.png?" />
        <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" />
    
        
        <main>
          <header id="header">
            <div className="overlay overlay-lg">
              <img src={require("./img/shapes/square.png")} className="shape square" alt="square shape rawquesh" />
              <img src={require("./img/shapes/circle.png")} className="shape circle" alt="circle shape rawquesh" />
              <img src={require("./img/shapes/half-circle.png")} className="shape half-circle1" alt="half circle shape rawquesh" />
              <img src={require("./img/shapes/half-circle.png")} className="shape half-circle2" alt="half circle shape rawquesh" />
              <img src={require("./img/shapes/x.png")} className="shape xshape" alt="shapes rawquesh" />
              <img src={require("./img/shapes/wave.png")} className="shape wave wave1" alt="wave shape rawquesh" />
              <img src={require("./img/shapes/wave.png")} className="shape wave wave2" alt="wave shape rawquesh" />
              <img src={require("./img/shapes/triangle.png")} className="shape triangle" alt="triangle shape rawquesh" />
              <img src={require("./img/shapes/points1.png")} className="points points1" alt="points rawquesh" />
            </div>
            <nav>
              <div className="container">
                <div className="logo" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                  <img 
                    src="https://www.kali.org/images/kali-dragon-icon.svg" 
                    alt="Kali Dragon Logo" 
                    style={{
                      width: '50px',
                      height: '50px',
                      filter: 'brightness(0) saturate(100%) invert(76%) sepia(13%) saturate(1586%) hue-rotate(119deg) brightness(93%) contrast(91%)'
                    }}
                  />
                  <span style={{
                    color: '#4ec9b0',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    textShadow: '0 0 10px rgba(78, 201, 176, 0.5)',
                    letterSpacing: '2px'
                  }}>SUDHIR</span>
                </div>
                <div className="links">
                  <ul>
                    <li>
                      <a href="#header">Home</a>
                    </li>
                    <li>
                      <a href="#services">Services</a>
                    </li>
                    <li>
                      <a href="#about">About</a>
                    </li>
                    <li>
                      <a href="#testimonials">Testimonials</a>
                    </li>
                    <li>
                      <a href="#contact">Contact</a>
                    </li>
                    <li>
                      <a href="mailto:sudhirsharma@iitbhilai.ac.in" className="active">Hire me</a>
                    </li>
                  </ul>
                </div>
                <div className="hamburger-menu">
                  <div className="bar" />
                </div>
              </div>
            </nav>
            {/* Main section  */}
            <div className="header-content">
              <div className="container grid-2">
                <div className="column-1">
                  <h1 className="header-title">Sudhir Sharma</h1>
                  <div className="text">
                    <p>Hello, I'm Sudhir, AI/ML & Search Systems Engineer.</p>
                    <div className="small-desc">
                      Expert in building RAG pipelines, semantic search engines, vector databases (FAISS, ChromaDB), and scalable AI integrations using LangChain, OpenAI APIs. Backend specialist with Spring Boot, PySpark, and distributed systems. Competitive programmer with deep expertise in algorithms and data structures.
                    </div>
                  </div>
                  <a href="./img/12041500.pdf" target="_blank" className="btn">Download CV</a>
                </div>
                <div className="column-2 image" style={{position: 'relative'}}>
                  <ProfileViewCounter>
                    <span className="view-icon">👁️</span>
                    <img 
                      src="https://komarev.com/ghpvc/?username=Sudhir878786&label=Profile%20views&color=6805D3&style=flat" 
                      alt="Profile Views" 
                      style={{height: '20px', marginLeft: '5px'}}
                    />
                  </ProfileViewCounter>
                  <img src={require("./img/shapes/points2.png")} className="points points2" alt="points rawquesh" />
                  <img src={require("./img/Person.png")} className="img-element z-index" alt="main logo rawquesh" />
                </div>
              </div>
            </div>
          </header>
          {/* Services section  */}
          <section className="services section" id="services">
            <div className="container">
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
          <section style={{background: 'linear-gradient(180deg, #0f0f0f 0%, #1a1a1a 100%)', padding: '80px 0'}}> 
            <div className="container">
              <div className="section-header" style={{marginBottom: '60px'}}>
                <h3 className="title" data-title="My Journey">Professional Experience</h3>
                <p className="text" style={{maxWidth: '700px', margin: '20px auto 0', textAlign: 'center'}}>
                  From building AI-powered search systems to architecting scalable distributed platforms, here's my professional journey.
                </p>
              </div>
            </div>
            <div className="fullWidth eight columns">
              <ul className="cbp_tmtimeline">
                <li>
                  <div className="cbp_tmicon cbp_tmicon-phone" style={{
                    background: 'linear-gradient(135deg, #4ec9b0, #3da58a)',
                    boxShadow: '0 0 30px rgba(78, 201, 176, 0.4)'
                  }}>
                    <img src={require("./img/services/image.png")} alt="SDE at MAQ Software" className="profile-icon" />
                  </div>
                  <div className="cbp_tmlabel wow fadeInRight animated" style={{
                    background: 'linear-gradient(145deg, rgba(78, 201, 176, 0.08), rgba(78, 201, 176, 0.03))',
                    border: '1px solid rgba(78, 201, 176, 0.2)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
                  }}>
                    <h3 style={{
                      color: '#4ec9b0',
                      fontSize: '1.5rem',
                      marginBottom: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <span>💼</span> Software Development Engineer
                    </h3>
                    <div className="date" style={{
                      background: 'rgba(78, 201, 176, 0.15)',
                      padding: '8px 15px',
                      borderRadius: '20px',
                      display: 'inline-block',
                      marginBottom: '10px'
                    }}>
                      <i className="fa fa-calendar" style={{marginRight: '8px'}} />April 2024 - Present
                    </div>
                    <h4 style={{color: '#569cd6', marginBottom: '20px'}}>
                      <i className="fa fa-flag" style={{marginRight: '8px'}} />MAQ Software, Hyderabad, Telangana
                    </h4>
                    
                    <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                      <div style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        padding: '15px',
                        borderRadius: '8px',
                        borderLeft: '3px solid #4ec9b0'
                      }}>
                        <strong style={{color: '#4ec9b0', display: 'block', marginBottom: '8px'}}>
                          🚀 Scalable Application Development
                        </strong>
                        <p style={{margin: 0, lineHeight: '1.6'}}>
                          Architected and developed enterprise-grade applications using <strong>Spring Boot</strong>, <strong>.NET</strong>, and <strong>PySpark</strong> to automate data ingestion from multiple databases. Created semantic models optimizing data pipelines for 10+ clients, reducing processing time by 40%.
                        </p>
                      </div>

                      <div style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        padding: '15px',
                        borderRadius: '8px',
                        borderLeft: '3px solid #569cd6'
                      }}>
                        <strong style={{color: '#569cd6', display: 'block', marginBottom: '8px'}}>
                          📊 Data Pipeline & Modeling Excellence
                        </strong>
                        <p style={{margin: 0, lineHeight: '1.6'}}>
                          Built and optimized complex data pipelines with <strong>PySpark</strong> and <strong>SQL</strong>, creating semantic models for Power BI visualization. Improved reporting performance by 60% through advanced query optimization and Spark job tuning.
                        </p>
                      </div>

                      <div style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        padding: '15px',
                        borderRadius: '8px',
                        borderLeft: '3px solid #dcdcaa'
                      }}>
                        <strong style={{color: '#dcdcaa', display: 'block', marginBottom: '8px'}}>
                          🔍 Automated Quality Assurance
                        </strong>
                        <p style={{margin: 0, lineHeight: '1.6'}}>
                          Developed automated tools using NLP techniques to detect discrepancies and grammatical errors in Power BI reports, ensuring 99.5% data integrity and improving stakeholder communication quality.
                        </p>
                      </div>

                      <div style={{
                        marginTop: '10px',
                        padding: '12px',
                        background: 'rgba(78, 201, 176, 0.1)',
                        borderRadius: '6px'
                      }}>
                        <strong style={{color: '#4ec9b0', fontSize: '0.9rem'}}>Tech Stack:</strong>
                        <span style={{marginLeft: '10px', color: '#dcdcaa'}}>
                          Spring Boot • .NET • Python • PySpark • SQL • C • Power BI
                        </span>
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="cbp_tmicon cbp_tmicon-screen" style={{
                    background: 'linear-gradient(135deg, #569cd6, #4178be)',
                    boxShadow: '0 0 30px rgba(86, 156, 214, 0.4)'
                  }}>
                    <img src={require("./img/portfolio/ik.png")} alt="Backend Engineer at InterviewKickstart" className="profile-icon" />
                  </div>
                  <div className="cbp_tmlabel wow fadeInRight animated" style={{
                    background: 'linear-gradient(145deg, rgba(86, 156, 214, 0.08), rgba(86, 156, 214, 0.03))',
                    border: '1px solid rgba(86, 156, 214, 0.2)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
                  }}>
                    <h3 style={{
                      color: '#569cd6',
                      fontSize: '1.5rem',
                      marginBottom: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <span>🧠</span> Backend Engineer
                    </h3>
                    <div className="date" style={{
                      background: 'rgba(86, 156, 214, 0.15)',
                      padding: '8px 15px',
                      borderRadius: '20px',
                      display: 'inline-block',
                      marginBottom: '10px'
                    }}>
                      <i className="fa fa-calendar" style={{marginRight: '8px'}} />August 2023 - August 2024
                    </div>
                    <h4 style={{color: '#4ec9b0', marginBottom: '20px'}}>
                      <i className="fa fa-flag" style={{marginRight: '8px'}} />InterviewKickstart, Remote
                    </h4>
                    
                    <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                      <div style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        padding: '15px',
                        borderRadius: '8px',
                        borderLeft: '3px solid #569cd6'
                      }}>
                        <strong style={{color: '#569cd6', display: 'block', marginBottom: '8px'}}>
                          💻 Algorithmic Challenge Platform
                        </strong>
                        <p style={{margin: 0, lineHeight: '1.6'}}>
                          Designed and deployed <strong>100+ algorithmic challenges</strong> covering Arrays, Trees, Dynamic Programming, and Graphs using <strong>Swift</strong>, <strong>Node.js</strong>, and <strong>Python</strong>. Challenges used by 5000+ students preparing for FAANG interviews.
                        </p>
                      </div>

                      <div style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        padding: '15px',
                        borderRadius: '8px',
                        borderLeft: '3px solid #dcdcaa'
                      }}>
                        <strong style={{color: '#dcdcaa', display: 'block', marginBottom: '8px'}}>
                          👥 Technical Leadership & Mentorship
                        </strong>
                        <p style={{margin: 0, lineHeight: '1.6'}}>
                          Led open-source projects and mentored a team of 10 engineers, guiding <strong>50+ juniors</strong> across <strong>40+ projects</strong>. Improved team code quality by 45% through systematic reviews and best practices training.
                        </p>
                      </div>

                      <div style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        padding: '15px',
                        borderRadius: '8px',
                        borderLeft: '3px solid #4ec9b0'
                      }}>
                        <strong style={{color: '#4ec9b0', display: 'block', marginBottom: '8px'}}>
                          ✅ Quality Assurance & Code Review
                        </strong>
                        <p style={{margin: 0, lineHeight: '1.6'}}>
                          Developed comprehensive test suites and reviewed code for interns, ensuring 95% test coverage and optimal time/space complexity. Created automated testing framework reducing review time by 30%.
                        </p>
                      </div>

                      <div style={{
                        marginTop: '10px',
                        padding: '12px',
                        background: 'rgba(86, 156, 214, 0.1)',
                        borderRadius: '6px'
                      }}>
                        <strong style={{color: '#569cd6', fontSize: '0.9rem'}}>Tech Stack:</strong>
                        <span style={{marginLeft: '10px', color: '#dcdcaa'}}>
                          Swift • Node.js • Python • Data Structures • Algorithms • Git
                        </span>
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="cbp_tmicon cbp_tmicon-mail" style={{
                    background: 'linear-gradient(135deg, #dcdcaa, #b8a965)',
                    boxShadow: '0 0 30px rgba(220, 220, 170, 0.4)'
                  }}>
                    <img src={require("./img/portfolio/image.png")} alt="Software Developer Intern at Cloudcraftz.AI" className="profile-icon" />
                  </div>
                  <div className="cbp_tmlabel wow fadeInRight animated" style={{
                    background: 'linear-gradient(145deg, rgba(220, 220, 170, 0.08), rgba(220, 220, 170, 0.03))',
                    border: '1px solid rgba(220, 220, 170, 0.2)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
                  }}>
                    <h3 style={{
                      color: '#dcdcaa',
                      fontSize: '1.5rem',
                      marginBottom: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <span>🤖</span> Software Developer Intern (AI/ML)
                    </h3>
                    <div className="date" style={{
                      background: 'rgba(220, 220, 170, 0.15)',
                      padding: '8px 15px',
                      borderRadius: '20px',
                      display: 'inline-block',
                      marginBottom: '10px'
                    }}>
                      <i className="fa fa-calendar" style={{marginRight: '8px'}} />May 2023 - July 2023
                    </div>
                    <h4 style={{color: '#569cd6', marginBottom: '20px'}}>
                      <i className="fa fa-flag" style={{marginRight: '8px'}} />Cloudcraftz.AI, Kolkata
                    </h4>
                    
                    <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                      <div style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        padding: '15px',
                        borderRadius: '8px',
                        borderLeft: '3px solid #dcdcaa'
                      }}>
                        <strong style={{color: '#dcdcaa', display: 'block', marginBottom: '8px'}}>
                          🔍 Semantic Search Engine Development
                        </strong>
                        <p style={{margin: 0, lineHeight: '1.6'}}>
                          Developed production-ready semantic search features using <strong>ChromaDB</strong> and <strong>Typesense</strong> vector databases with embedding models. Improved search relevance by 75% compared to traditional keyword search, handling 10K+ queries/day.
                        </p>
                      </div>

                      <div style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        padding: '15px',
                        borderRadius: '8px',
                        borderLeft: '3px solid #4ec9b0'
                      }}>
                        <strong style={{color: '#4ec9b0', display: 'block', marginBottom: '8px'}}>
                          ☁️ Cloud Deployment & LLM Integration
                        </strong>
                        <p style={{margin: 0, lineHeight: '1.6'}}>
                          Built and deployed an Algolia-like semantic search application using <strong>OpenAI APIs</strong> and <strong>LLMs</strong> on <strong>Google Cloud Platform (GCP)</strong>. Implemented RAG (Retrieval-Augmented Generation) for context-aware search with 90% accuracy.
                        </p>
                      </div>

                      <div style={{
                        marginTop: '10px',
                        padding: '12px',
                        background: 'rgba(220, 220, 170, 0.1)',
                        borderRadius: '6px'
                      }}>
                        <strong style={{color: '#dcdcaa', fontSize: '0.9rem'}}>Tech Stack:</strong>
                        <span style={{marginLeft: '10px', color: '#4ec9b0'}}>
                          Python • ChromaDB • Typesense • OpenAI API • LangChain • GCP
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* About section */}
      <section className="about section" id="about">
        <div className="container">
          <div className="section-header">
            <h3 className="title" data-title="Who Am I">About me</h3>
          </div>
          <div className="section-body grid-2">
            <div className="column-1">
              <h3 className="title-sm">Hello, I'm Sudhir 👋</h3>
              <p className="text" style={{marginBottom: '20px'}}>
                I'm an <strong style={{color: '#4ec9b0'}}>AI/ML & Search Systems Engineer</strong> with a unique blend of expertise across three critical domains:
              </p>
              
              <div style={{
                background: 'linear-gradient(135deg, rgba(78, 201, 176, 0.1), rgba(86, 156, 214, 0.1))',
                border: '1px solid rgba(78, 201, 176, 0.3)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '25px'
              }}>
                <h4 style={{color: '#4ec9b0', marginBottom: '15px', fontSize: '1.1rem'}}>
                  🤖 AI/ML & Intelligent Search
                </h4>
                <p style={{marginBottom: '10px', lineHeight: '1.8'}}>
                  Building production-grade RAG pipelines, semantic search engines with vector databases (FAISS, ChromaDB), and AI integrations using LangChain, OpenAI APIs. Specialized in embedding models, similarity search, and LLM-powered applications.
                </p>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, rgba(86, 156, 214, 0.1), rgba(220, 220, 170, 0.1))',
                border: '1px solid rgba(86, 156, 214, 0.3)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '25px'
              }}>
                <h4 style={{color: '#569cd6', marginBottom: '15px', fontSize: '1.1rem'}}>
                  ⚙️ Backend & Distributed Systems
                </h4>
                <p style={{marginBottom: '10px', lineHeight: '1.8'}}>
                  Architecting scalable microservices and distributed systems with Spring Boot, PySpark, .NET. Expert in building data pipelines, REST APIs, SQL optimization, and cloud-native deployments on GCP and Azure.
                </p>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, rgba(220, 220, 170, 0.1), rgba(78, 201, 176, 0.1))',
                border: '1px solid rgba(220, 220, 170, 0.3)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '25px'
              }}>
                <h4 style={{color: '#dcdcaa', marginBottom: '15px', fontSize: '1.1rem'}}>
                  🧠 Competitive Programming & Algorithms
                </h4>
                <p style={{marginBottom: '10px', lineHeight: '1.8'}}>
                  Deep expertise in data structures and algorithms with 550+ problems solved. Specialized in dynamic programming, graph algorithms, and optimizing code for performance. Mentor to 50+ developers on algorithmic problem-solving.
                </p>
              </div>

              <div style={{
                marginTop: '25px',
                padding: '15px',
                background: 'rgba(78, 201, 176, 0.05)',
                borderLeft: '4px solid #4ec9b0',
                borderRadius: '4px'
              }}>
                <p style={{margin: 0, fontStyle: 'italic', color: '#4ec9b0'}}>
                  💡 "I bridge the gap between cutting-edge AI research and production-ready scalable systems."
                </p>
              </div>

              <h3 className="title-sm" style={{marginTop: '40px', marginBottom: '20px'}}>Technical Expertise</h3>
              <div className="skills">
                <div className="skill">
                  <h3 className="skill-title">Python & AI/ML</h3>
                  <div className="skill-bar">
                    <div className="skill-progress" data-progress="95%" style={{ width: '95%' }} />
                  </div>
                </div>
                <div className="skill">
                  <h3 className="skill-title">LangChain & RAG Systems</h3>
                  <div className="skill-bar">
                    <div className="skill-progress" data-progress="92%" style={{ width: '92%' }} />
                  </div>
                </div>
                <div className="skill">
                  <h3 className="skill-title">C++ & Algorithms</h3>
                  <div className="skill-bar">
                    <div className="skill-progress" data-progress="90%" style={{ width: '90%' }} />
                  </div>
                </div>
                <div className="skill">
                  <h3 className="skill-title">Spring Boot & Microservices</h3>
                  <div className="skill-bar">
                    <div className="skill-progress" data-progress="85%" style={{ width: '85%' }} />
                  </div>
                </div>
                <div className="skill">
                  <h3 className="skill-title">SQL & Database Design</h3>
                  <div className="skill-bar">
                    <div className="skill-progress" data-progress="95%" style={{ width: '95%' }} />
                  </div>
                </div>
                <div className="skill">
                  <h3 className="skill-title">PySpark & Big Data</h3>
                  <div className="skill-bar">
                    <div className="skill-progress" data-progress="88%" style={{ width: '88%' }} />
                  </div>
                </div>
                <div className="skill">
                  <h3 className="skill-title">.NET & Cloud (GCP/Azure)</h3>
                  <div className="skill-bar">
                    <div className="skill-progress" data-progress="78%" style={{ width: '78%' }} />
                  </div>
                </div>
                <div className="skill">
                  <h3 className="skill-title">MERN Stack & Full Stack</h3>
                  <div className="skill-bar">
                    <div className="skill-progress" data-progress="82%" style={{ width: '82%' }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="column-2 image">
              <img src={require("./img/shapes/points4.png")} className="points" alt="" />
              <img src={require("./img/Person.png")} className="z-index" alt="Sudhir Sharma" />
            </div>
          </div>
        </div>
      </section>

      {/* Records */}
      <section className="records">
        <div className="overlay overlay-sm">
          <img src="./img/shapes/square.png" alt="" className="shape square1" />
          <img src="./img/shapes/square.png" alt="" className="shape square2" />
          <img src="./img/shapes/circle.png" alt="" className="shape circle" />
          <img src="./img/shapes/half-circle.png" alt="" className="shape half-circle" />
          <img src="./img/shapes/wave.png" alt="" className="shape wave wave1" />
          <img src="./img/shapes/wave.png" alt="" className="shape wave wave2" />
          <img src="./img/shapes/x.png" alt="" className="shape xshape" />
          <img src="./img/shapes/triangle.png" alt="" className="shape triangle" />
        </div>
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
      <section className="testimonials section" id="testimonials">
      <div className="container">
        <div className="section-header">
          <h3 className="title" data-title="What People Say">Testimonials</h3>
        </div>
        <div className="testi-content grid-2">
          <div className="column-1 reviews">
            <div className="swiper-container">
              <div className="swiper-wrapper">
                <div className="swiper-slide review">
                  <i className="fas fa-quote-left quote" />
                  <div className="rate">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                  </div>
                  <p className="review-text">
                    Sudhir is a highly talented and professional developer. His ability to solve complex problems using scalable technologies like Spring Boot, PySpark, and SQL is remarkable. I highly recommend working with him.
                  </p>
                </div>
                <div className="swiper-slide review">
                  <i className="fas fa-quote-left quote" />
                  <div className="rate">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                  </div>
                  <p className="review-text">
                    Sudhir's expertise in backend development is unparalleled. He worked closely with our team to deliver a scalable solution, always going the extra mile. His work ethic and communication skills are top-notch.
                  </p>
                </div>
                <div className="swiper-slide review">
                  <i className="fas fa-quote-left quote" />
                  <div className="rate">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                  </div>
                  <p className="review-text">
                    We were impressed with Sudhir's ability to quickly understand our requirements and deliver a high-quality data pipeline solution using PySpark. Highly recommend his services!
                  </p>
                </div>
                <div className="swiper-slide review">
                  <i className="fas fa-quote-left quote" />
                  <div className="rate">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                  </div>
                  <p className="review-text">
                    Sudhir is not just a developer, but a problem-solver. He has a deep understanding of backend systems and always delivers ahead of schedule. A pleasure to work with!
                  </p>
                </div>
              </div>
              <div className="review-nav swiper-button-prev">
                <i className="fas fa-long-arrow-alt-left" />
              </div>
              <div className="review-nav swiper-button-next">
                <i className="fas fa-long-arrow-alt-right" />
              </div>
            </div>
          </div>
          <div className="column-2 image">
            <img src={require("./img/testi.svg").default} alt="" className="img-element" />
          </div>
        </div>
      </div>
    </section>
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
                      <p className="info-text">India</p>
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
          {/* Hire me */}
          <section className="hireme" id="hireme">
            <div className="container">
              <h3 className="title">Let's talk about a project</h3>
              <p className="text">
                As a first step, I ask that you provide some details about what
                you’re looking for. This information helps me start to understand
                your business and what you are trying to achieve, so when we set up
                an initial consultation, we’re ready to talk shop.
              </p>
              <a href="mailto:sudhirsharma@iitbhilai.ac.in" className="btn">Hire me</a>
            </div>
          </section>
        </main>
        <footer className="footer">
          <div className="container">
            <div className="grid-4">
              <div className="grid-4-col footer-about">
                <h3 className="title-sm">About</h3>
                <p className="text">
                  A passionate Mobile App and Full Stack Web Developer having an
                  experience of building Mobile and Web applications.
                </p>
              </div>
              <div className="grid-4-col footer-links">
                <h3 className="title-sm">Links</h3>
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
                <h3 className="title-sm">Services</h3>
                <ul>
                  <li>
                    <a>Web development</a>
                  </li>
                  <li>
                    <a>App development </a>
                  </li>
                  <li>
                    <a>WordPress</a>
                  </li>
                  <li>
                    <a>Database/Backend</a>
                  </li>
                </ul>
              </div>
              <div className="grid-4-col footer-newstletter">
                <h3 className="title-sm">Subscribe</h3>
                <p className="text">
                  Subscribe to me for the latest update and if I am available for
                  work.
                </p>
                <form action="https://formsubmit.co/sudhirsharma@iitbhilai.ac.in" method="POST">
                  <div className="footer-input-wrap">
                    <input type="hidden" name="_template" defaultValue="table" />
                    <input type="hidden" name="_subject" defaultValue="Subscribe" />
                    <input required name="email" type="email" className="footer-input" placeholder="Email" />
                    <button type="submit" className="input-arrow">
                      <i className="fas fa-angle-right" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="bottom-footer">
              <div className="copyright">
                <p className="text">Copyright©2024 All rights reserved</p>
              </div>
              <div className="followme-wrap">
                <div className="followme">
                  <h3>Follow me</h3>
                  <span className="footer-line" />
                  <div className="social-media">
                    <a href="https://x.com/SUDHIRSHAR61219" target="_blank">
                      <i className="fab fa-twitter" />
                    </a>
                    <a href="https://www.linkedin.com/in/sudhirsharma87/" target="_blank">
                      <i className="fab fa-linkedin-in" />
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
        </Window>
    );
};

export default Welcome;
