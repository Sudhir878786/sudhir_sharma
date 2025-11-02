import React from "react";
import { useState } from 'react';
import Window from "../../../common/window";
import "./css/style.css";
import "./css/exp.css";



const WINDOW_MOBILE_MIN_SIZE = {
    width: 320,
    height: 570,
};

const WINDOW_MIN_SIZE =
    "ontouchstart" in window ? WINDOW_MOBILE_MIN_SIZE : undefined;

const Welcome = (props) => {
  const [activeFilter, setActiveFilter] = useState('*');

  // Function to change filter
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  // Function to determine if a project should be shown based on the filter
  const shouldDisplay = (filterClass) => {
    return activeFilter === '*' || activeFilter === filterClass;
  };
    return (
        <Window {...props} minSize={WINDOW_MIN_SIZE}>
           <div>
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
                <div className="logo">
                  <img src={require("./img/shapes/me.png")} alt="Logo" />
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
                      <a href="#portfolio">Portfolio</a>
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
                    <p>Hello, I'm Sudhir, Software Developer.</p>
                    <div className="small-desc">
                      Specializing in scalable applications with Spring Boot, .NET, and PySpark. Skilled in mobile and web development using Flutter, ReactJS, and NodeJS. Proficient in data modeling and visualization with Power BI and SQL.
                    </div>
                  </div>
                  <a href="./img/12041500.pdf" target="_blank" className="btn">Download CV</a>
                </div>
                <div className="column-2 image">
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
                  The services i can provide as a developer to your company or
                  business.
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
                    <h3 className="title-sm">AI &amp; Machine Learning</h3>
                    <p className="text">
                      Skilled in developing AI-driven tools like IntervuPro.AI using LLMs, GPT, Langchain, and TensorFlow for intelligent automation.
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
                      <h3 className="title-sm">Database/Backend</h3>
                      <p className="text">
                        I can work with NodeJS and ExpressJS for creating REST-API,
                        Firestore, MongoDB, and NoSQL for database
                      </p>
                      <a href="mailto:sudhirsharma@iitbhilai.ac.in" className="btn small">Hire me</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Experience */} 
          <section> 
            <div className="fullWidth eight columns">
              <ul className="cbp_tmtimeline">
                <li>
                  <div className="cbp_tmicon cbp_tmicon-phone">
                    <img src={require("./img/services/image.png")} alt="SDE at MAQ Software" className="profile-icon" />
                  </div>
                  <div className="cbp_tmlabel wow fadeInRight animated">
                    <h3>Software Development Engineer</h3>
                    <div className="date">
                      <i className="fa fa-calendar" />April 2024 - Present
                    </div>
                    <h4><i className="fa fa-flag" />MAQ Software, Hyderabad, Telangana</h4>
                    <p className="projectParagraph">
                      <strong>Scalable Application Development:</strong> Developed a scalable application using Spring Boot, .NET, C, and PySpark to automate data ingestion from multiple databases, creating semantic models in SQL and PySpark to optimize data pipelines.<br />
                      <strong>Data Pipeline &amp; Modeling:</strong> Built and optimized data pipelines with PySpark and SQL, creating semantic models for data visualization in Power BI, and improving reporting performance through advanced SQL queries and Spark job tuning.<br />
                      <strong>Automated Discrepancy and Grammatical Error Detection:</strong> Developed automated tools to detect discrepancies and grammatical errors in Power BI reports, ensuring data integrity and improving communication with stakeholders.<br />
                      <strong>Technology Stack:</strong> Leveraged Spring Boot, .NET, C, Python, SQL, and PySpark to deliver high-performance applications for data analysis and reporting.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="cbp_tmicon cbp_tmicon-screen">
                    <img src={require("./img/portfolio/ik.png")} alt="Backend Engineer at InterviewKickstart" className="profile-icon" />
                  </div>
                  <div className="cbp_tmlabel wow fadeInRight animated">
                    <h3>Backend Engineer</h3>
                    <h4><i className="fa fa-flag" />InterviewKickstart, Remote</h4>
                    <div className="date"><i className="fa fa-calendar" />August 2023 - August 2024</div>
                    <p className="projectParagraph">
                      <strong>Algorithmic Challenges:</strong> Crafted and deployed algorithmic challenges on Arrays, Trees, Dynamic Programming, and Graphs using Swift, Node.js, and Python.<br />
                      <strong>Team Leadership:</strong> Led open-source projects and mentored a team of 10, guiding 50+ juniors across 40+ projects.<br />
                      <strong>Code Review:</strong> Developed test cases and reviewed code for interns, ensuring accuracy, efficiency, and optimal problem-solving.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="cbp_tmicon cbp_tmicon-mail">
                    <img src={require("./img/portfolio/image.png")} alt="Software Developer Intern at Cloudcraftz.AI" className="profile-icon" />
                  </div>
                  <div className="cbp_tmlabel wow fadeInRight animated">
                    <h3>Software Developer Intern</h3>
                    <h4><i className="fa fa-flag" />Cloudcraftz.AI, Kolkata</h4>
                    <div className="date"><i className="fa fa-calendar" />May 2023 - July 2023</div>
                    <p className="projectParagraph">
                      <strong>Semantic Search:</strong> Developed semantic search features using ChromaDB and Typesense vector databases and embedding models to enhance search capabilities.<br />
                      <strong>GCP Deployment:</strong> Built and deployed a production app for semantic search, similar to Algolia, using OpenAI and LLMs on Google Cloud Platform (GCP).
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

    <section className="portfolio section" id="portfolio">
      <div className="background-bg">
        <div className="overlay overlay-sm">
          <img src={require("./img/shapes/half-circle.png")} className="shape half-circle1" alt="" />
          <img src={require("./img/shapes/half-circle.png")} className="shape half-circle2" alt="" />
          <img src={require("./img/shapes/square.png")} className="shape square" alt="" />
          <img src={require("./img/shapes/wave.png")} className="shape wave" alt="" />
          <img src={require("./img/shapes/circle.png")} className="shape circle" alt="" />
          <img src={require("./img/shapes/triangle.png")} className="shape triangle" alt="" />
          <img src={require("./img/shapes/x.png")} className="shape xshape" alt="" />
        </div>
      </div>
      <div className="container">
        <div className="section-header">
          <h3 className="title" data-title="My works">Portfolio</h3>
        </div>
        <div className="section-body">
          {/* Filter Buttons */}
          <div className="filter">
            <button className={`filter-btn ${activeFilter === '*' ? 'active' : ''}`} onClick={() => handleFilterChange('*')}>
              All
            </button>
            <button className={`filter-btn ${activeFilter === 'python' ? 'active' : ''}`} onClick={() => handleFilterChange('python')}>
              Python Projects
            </button>
            <button className={`filter-btn ${activeFilter === 'react' ? 'active' : ''}`} onClick={() => handleFilterChange('react')}>
              Web Projects
            </button>
            <button className={`filter-btn ${activeFilter === 'llm' ? 'active' : ''}`} onClick={() => handleFilterChange('llm')}>
              LLM Projects
            </button>
            <button className={`filter-btn ${activeFilter === 'ML' ? 'active' : ''}`} onClick={() => handleFilterChange('ML')}>
              ML
            </button>
          </div>

          {/* Projects Grid */}
          <div className="grid">
            {/* PythonCF Project */}
            {shouldDisplay('python') && (
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/Sudhir878786/pythoncf">
                <div className="grid-item python">
                  <div className="gallery-image">
                    <img src={require('./img/portfolio/pythoncff.jpg')} alt="PythonCF" />
                    <div className="img-overlay">
                      <div className="plus" />
                      <div className="img-description">
                        <h3>PythonCF</h3>
                        <h5>View on GitHub</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            )}

            {/* IntervuPro.AI Project */}
            {shouldDisplay('llm') && (
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/Sudhir878786/IntervuPro.AI">
                <div className="grid-item llm">
                  <div className="gallery-image">
                    <img src={require('./img/portfolio/intervuepro.jpg')} alt="IntervuPro.AI"/>
                    <div className="img-overlay">
                      <div className="plus" />
                      <div className="img-description">
                        <h3>IntervuPro.AI</h3>
                        <h5>View on GitHub</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            )}

            {/* Resume Ranker Project */}
            {shouldDisplay('llm') && (
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/Sudhir878786/Resume_Ranker_LLM">
                <div className="grid-item llm">
                  <div className="gallery-image">
                    <img src={require('./img/portfolio/resumerank.jpg')} alt="Resume Ranker" />
                    <div className="img-overlay">
                      <div className="plus" />
                      <div className="img-description">
                        <h3>Resume Ranker</h3>
                        <h5>View on GitHub</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            )}

            {/* IIT Bhilai Lost and Found App */}
            {shouldDisplay('react') && (
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/Sudhir878786/IIT-Bhilai-Lost-and-Found">
                <div className="grid-item react">
                  <div className="gallery-image">
                    <img src={require('./img/portfolio/landf.jpg')} alt="IIT Bhilai Lost and Found" />
                    <div className="img-overlay">
                      <div className="plus" />
                      <div className="img-description">
                        <h3>IIT Bhilai Lost and Found</h3>
                        <h5>View on GitHub</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            )}

            {/* Dynamic Circuit Quantum ML Project */}
            {shouldDisplay('ML') && (
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/Sudhir878786/Dynamic-Circuit-Quantum-ML">
                <div className="grid-item ML">
                  <div className="gallery-image">
                    <img src={require("./img/portfolio/quantumml.jpg")} alt="Dynamic Circuit Quantum ML" />
                    <div className="img-overlay">
                      <div className="plus" />
                      <div className="img-description">
                        <h3>Dynamic-Circuit-Quantum-ML</h3>
                        <h5>View on GitHub</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            )}

            {/* Covid-19 Tweets Visualization Dashboard */}
            {shouldDisplay('ML') && (
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/Sudhir878786/Covid-19-Tweets-Visualization-Dashboard-DS501">
                <div className="grid-item ML">
                  <div className="gallery-image">
                    <img src={require("./img/portfolio/covid.jpg")} alt="Covid-19 Tweets Visualization Dashboard" />
                    <div className="img-overlay">
                      <div className="plus" />
                      <div className="img-description">
                        <h3>Covid-19 Tweets Visualization Dashboard</h3>
                        <h5>View on GitHub</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            )}

            {/* Metamask Snap Project */}
            {shouldDisplay('react') && (
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/Sudhir878786/MetaMask_Snap-1">
                <div className="grid-item react">
                  <div className="gallery-image">
                    <img src={require("./img/portfolio/metamask.jpg")} alt="Metamask Snap" />
                    <div className="img-overlay">
                      <div className="plus" />
                      <div className="img-description">
                        <h3>Metamask Snap</h3>
                        <h5>View Demo</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            )}

            {/* Bitcoin Scrapper Project */}
            {shouldDisplay('python') && (
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/Sudhir878786/bitcoin-scrapper">
                <div className="grid-item python">
                  <div className="gallery-image">
                    <img src={require("./img/portfolio/bitcoin.jpg")} alt="Bitcoin Scrapper" />
                    <div className="img-overlay">
                      <div className="plus" />
                      <div className="img-description">
                        <h3>Bitcoin Scrapper</h3>
                        <h5>View Demo</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            )}

            {/* The Pixel Snappers Project */}
            {shouldDisplay('react') && (
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/Sudhir878786/thepixelsnappers">
                <div className="grid-item react">
                  <div className="gallery-image">
                    <img src={require("./img/portfolio/tps.png")} alt="The Pixel Snappers" />
                    <div className="img-overlay">
                      <div className="plus" />
                      <div className="img-description">
                        <h3>The Pixel Snappers</h3>
                        <h5>View Demo</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            )}

            {/* Weather App Project */}
            {shouldDisplay('react') && (
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/Sudhir878786/Weather_Web_App">
                <div className="grid-item react">
                  <div className="gallery-image">
                    <img src={require("./img/portfolio/weathre.png")} alt="Weather App" />
                    <div className="img-overlay">
                      <div className="plus" />
                      <div className="img-description">
                        <h3>Weather App</h3>
                        <h5>View Demo</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            )}
          </div>
        </div>
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
              <h3 className="title-sm">Hello, I'm Sudhir</h3>
              <p className="text">
                A Software Development Engineer with expertise in building scalable applications and solutions. I specialize in Java Spring Boot, Python, PySpark, SQL, and Power BI. I have experience in backend development, data analytics, and building efficient cloud-deployed applications.
              </p>
              <div className="skills">
                <div className="skill">
                  <h3 className="skill-title">Python</h3>
                  <div className="skill-bar">
                    <div className="skill-progress" data-progress="95%" style={{ width: '95%' }} />
                  </div>
                </div>
                <div className="skill">
                  <h3 className="skill-title">Langchain</h3>
                  <div className="skill-bar">
                    <div className="skill-progress" data-progress="90%" style={{ width: '90%' }} />
                  </div>
                </div>
                <div className="skill">
                  <h3 className="skill-title">C++</h3>
                  <div className="skill-bar">
                    <div className="skill-progress" data-progress="90%" style={{ width: '90%' }} />
                  </div>
                </div>
                <div className="skill">
                  <h3 className="skill-title">.NET</h3>
                  <div className="skill-bar">
                    <div className="skill-progress" data-progress="70%" style={{ width: '70%' }} />
                  </div>
                </div>
                <div className="skill">
                  <h3 className="skill-title">SQL</h3>
                  <div className="skill-bar">
                    <div className="skill-progress" data-progress="95%" style={{ width: '95%' }} />
                  </div>
                </div>
                <div className="skill">
                  <h3 className="skill-title">Spring Boot</h3>
                  <div className="skill-bar">
                    <div className="skill-progress" data-progress="75%" style={{ width: '75%' }} />
                  </div>
                </div>
                <div className="skill">
                  <h3 className="skill-title">PySpark</h3>
                  <div className="skill-bar">
                    <div className="skill-progress" data-progress="88%" style={{ width: '88%' }} />
                  </div>
                </div>
                <div className="skill">
                  <h3 className="skill-title">MERN Stack</h3>
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
                    <a href="#portfolio">Portfolio</a>
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
      </div>
      
      
        </Window>
    );
};

export default Welcome;
