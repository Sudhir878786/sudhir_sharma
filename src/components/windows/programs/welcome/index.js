import React from "react";
import Window from "../../../common/window";
import "./css/header.css";
import "./css/footer.css";
import "./css/about.css";
import "./css/blog.css";
import "./css/contact.css";
import "./css/home.css";
import "./css/main.css";
import "./css/portfolio.css";
import "./css/service.css";
import "./css/testimonials.css";

const WINDOW_MOBILE_MIN_SIZE = {
    width: 320,
    height: 570,
};

const WINDOW_MIN_SIZE =
    "ontouchstart" in window ? WINDOW_MOBILE_MIN_SIZE : undefined;

const Welcome = (props) => {

    const handleCloseWindow = () => {
        localStorage.setItem("sawWelcomeMessage", "1");
    };

    return (
        <Window {...props} minSize={WINDOW_MIN_SIZE} onClose={handleCloseWindow}>

      <div>

        <meta name="description" content="A clean, beautiful and responsive portfolio template for Developers! using only Html, CSS, and JavaScript" />
        <meta name="author" content="Puskar Adhikari" />
        <title>Puskar Adhikari | Frot-End Developer</title>
        <link href="./css/header.css" rel="stylesheet" />
        <link href="./css/main.css" rel="stylesheet" />
        <link href="./css/home.css" rel="stylesheet" />
        <link href="./css/about.css" rel="stylesheet" />
        <link href="./css/service.css" rel="stylesheet" />
        <link href="./css/portfolio.css" rel="stylesheet" />
        <link href="./css/testimonials.css" rel="stylesheet" />
        <link href="./css/testimonials.css" rel="stylesheet" />
        <link href="css/blog.css" rel="stylesheet" />
        <link href="css/contact.css" rel="stylesheet" />
        <link href="css/footer.css" rel="stylesheet" />
        <header>
          <div className="container">
            <div className="row">
              <div className="brand-name">
                <a href="/" className="logo">Puskar</a>
              </div>
              <div className="hamburger">
                <i className="fa fa-bars" />
              </div>
              <div className="navbar">
                <ul>
                  <li><a href="#home" className="active">Home</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#services">Services</a></li>
                  <li><a href="#portfolio">Portfolio</a></li>
                  <li><a href="#blog">Blog</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
        </header>
        <section className="home" id="home">
          <div className="container">
            <div className="row full-screen">
              <div className="home-content">
                <div className="block">
                  <h6>Hi, my name is</h6>
                  <h1>Puskar Adhikari</h1>
                  <h3>I build things for the web</h3>
                  <div className="cv-btn">
                    <a href="https://drive.google.com/uc?id=1Ii5Sv-p4BfSlnrIsJZ2az-rtdn0iH6nx&export=download">Donwload CV</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="about" id="about">
          <div className="container">
            <div className="row">
              <div className="title">
                <h1>About Me</h1>
                <p>Know more about me</p>
              </div>
            </div>
            <div className="row">
              <div className="about-content">
                <div className="row">
                  <div className="img">
                    <img src="img/me.png" alt="me" />
                  </div>
                  <div className="text">
                    <h4>I'm Puskar Adhikari</h4>
                    <h6>A <span>Web developer</span> and <span>front-end engineer</span> living and working in
                      Kathmandu, Nepal
                    </h6>
                    <p>I'm passionate about creating and developing clean, unique, elegant products. I specialize in
                      building Websites for small to medium size business. I keep my code clean, readable, modular and
                      well refactored. I enjoy working with complex user interfaces
                    </p>
                    <div className="skills">
                      <h6>Here are My few Tech Stack I've been working:</h6>
                      <div className="skills-list">
                        <ul className="fa-ul">
                          <li><span className="fa-li"><i className="fas fa-check-square" /></span>JavaScript</li>
                          <li><span className="fa-li"><i className="fas fa-check-square" /></span>HTML5</li>
                          <li><span className="fa-li"><i className="fas fa-check-square" /></span>CSS/SCSS</li>
                          <li><span className="fa-li"><i className="fas fa-check-square" /></span>React JS</li>
                          <li><span className="fa-li"><i className="fas fa-check-square" /></span>Next.JS</li>
                        </ul>
                        <ul className="fa-ul">
                          <li><span className="fa-li"><i className="fas fa-check-square" /></span>Version Control</li>
                          <li><span className="fa-li"><i className="fas fa-check-square" /></span>UI/UX Design</li>
                          <li><span className="fa-li"><i className="fas fa-check-square" /></span>CSS/SCSS</li>
                          <li><span className="fa-li"><i className="fas fa-check-square" /></span>Firebase</li>
                          <li><span className="fa-li"><i className="fas fa-check-square" /></span>Adobe XD</li>
                        </ul>
                      </div>
                    </div>
                    <div className="social">
                      <a href><i className="fa fa-facebook" /></a>
                      <a href><i className="fa fa-twitter" /></a>
                      <a href><i className="fa fa-instagram" /></a>
                      <a href><i className="fa fa-github" /></a>
                      <a href><i className="fa fa-linkedin" /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div></section>
        <section className="services" id="services">
          <div className="container">
            <div className="row">
              <div className="title text-center">
                <h1>Services</h1>
              </div>
            </div>
            <div className="row">
              <div className="service-content">
                <div className="box">
                  <div className="icon"><i className="fa fa-laptop" /></div>
                  <h5>Web Design</h5>
                  <p>From single landing pages to a fully-blown eCommerce store,
                    I'll create a design that fits you and your business.
                  </p>
                </div>
                <div className="box">
                  <div className="icon"><i className="fa fa-code" /></div>
                  <h5>Web Development</h5>
                  <p>I create fully scalable and economically viable web
                    applications that boost your business.
                  </p>
                </div>
                <div className="box">
                  <div className="icon"><i className="fas fa-palette" /></div>
                  <h5>UI/UX Design</h5>
                  <p>Powerful UI/UX is the key to higher user adoption rates, and
                    easier onboarding. By taking the following elements, I conduct
                    initial research and craft the design.
                  </p>
                </div>
                <div className="box">
                  <div className="icon"><i className="fas fa-wallet" /></div>
                  <h5>Business Application</h5>
                  <p>I take an innovation-led approach to business application
                    services that make use of emerging technology and
                    software-as-a-service.
                  </p>
                </div>
                <div className="box">
                  <div className="icon"><i className="fa fa-mobile" /></div>
                  <h5>Apps Interfac</h5>
                  <p>To match the pace, I give my best to design eye-catching
                    designs and prominent user-interfaces.
                  </p>
                </div>
                <div className="box">
                  <div className="icon"><i className="fa fa-rocket" /></div>
                  <h5>SEO</h5>
                  <p>SEO is a critical component of online marketing. I use a
                    combination of the latest onsite and off-site strategies to
                    produce top results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="portfolio" id="portfolio">
          <div className="container">
            <div className="row">
              <div className="title text-center">
                <h1>Latest Works</h1>
              </div>
            </div>
            <div className="row">
              <div className="filter-btn">
                <ul id="filterBtn">
                  <li className="active" data-target="all">All</li>
                  <li data-target="web">Web Design</li>
                  <li data-target="app">App Interface</li>
                  <li data-target="ui">UI/UX</li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="gallery">
                <div className="item" data-id="web">
                  <div className="inner">
                    <img src="./img/portfolio/web.jpg" alt="portfolio" />
                    <div className="overlay">
                      <span className="fa fa-plus" />
                      <h4>Web Design</h4>
                    </div>
                  </div>
                </div>
                <div className="item" data-id="web">
                  <div className="inner">
                    <img src="./img/portfolio/web2.png" alt="portfolio" />
                    <div className="overlay">
                      <span className="fa fa-plus" />
                      <h4>Web Design</h4>
                    </div>
                  </div>
                </div>
                <div className="item" data-id="app">
                  <div className="inner">
                    <img src="./img/portfolio/app.png" alt="portfolio" />
                    <div className="overlay">
                      <span className="fa fa-plus" />
                      <h4>App Interface</h4>
                    </div>
                  </div>
                </div>
                <div className="item" data-id="app">
                  <div className="inner">
                    <img src="./img/portfolio/app2.png" alt="portfolio" />
                    <div className="overlay">
                      <span className="fa fa-plus" />
                      <h4>App Interface</h4>
                    </div>
                  </div>
                </div>
                <div className="item" data-id="ui">
                  <div className="inner">
                    <img src="./img/portfolio/ui2.png" alt="portfolio" />
                    <div className="overlay">
                      <span className="fa fa-plus" />
                      <h4>UI/UX Design</h4>
                    </div>
                  </div>
                </div>
                <div className="item" data-id="ui">
                  <div className="inner">
                    <img src="./img/portfolio/ui3.png" alt="portfolio" />
                    <div className="overlay">
                      <span className="fa fa-plus" />
                      <h4>UI/UX Design</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="message">
          <div className="container">
            <div className="row align-items-center">
              <div className="message-text">
                <h2>My inbox is always open. Whether you have a question or just want to say hi or want to hire me, I'll try my best to get back to you!</h2>
              </div>
              <div className="button ">
                <a href>Get In Touch</a>
              </div>
            </div>
          </div>
        </section>
        <section className="testimonials">
          <div className="container">
            <div className="row">
              <div className="title text-center">
                <h1>Testimonials</h1>
              </div>
            </div>
            <div className="row">
              <div className="testimonials-content">
                <div className="testimonials-box">
                  <div className="testimonials-img">
                    <div className="test-img">
                      <img src="./img/testimonials/1.jpeg" alt="testmonials1"/>
                    </div>
                    <div className="testimonials-text">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, aliquam. Corrupti molestias quae culpa accusamus magni accusantium itaque dolore soluta.</p>
                      <h6>Mosh Hamedani</h6>
                      <p>Software Engineer</p>
                    </div>
                  </div>
                  <div className="testimonials-img">
                    <div className="test-img">
                      <img src="./img/testimonials/2.jpg" alt="testmonials2" />
                    </div>
                    <div className="testimonials-text">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, aliquam. Corrupti molestias quae culpa accusamus magni accusantium itaque dolore soluta.</p>
                      <h6>Kyle Simpson</h6>
                      <p>JavaScript Engineer</p>
                    </div>
                  </div>
                  <div className="testimonials-img">
                    <div className="test-img">
                      <img src="./img/testimonials/3.jpg"  alt="testmonials3"/>
                    </div>
                    <div className="testimonials-text">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, aliquam. Corrupti molestias quae culpa accusamus magni accusantium itaque dolore soluta.</p>
                      <h6>Ryan Florence</h6>
                      <p>ReactJS Engineer</p>
                    </div>
                  </div>
                  <div className="testimonials-img">
                    <div className="test-img">
                      <img src="./img/testimonials/4.jpg" alt="testmonials4"/>
                    </div>
                    <div className="testimonials-text">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, aliquam. Corrupti molestias quae culpa accusamus magni accusantium itaque dolore soluta.</p>
                      <h6>Amelia Madyson</h6>
                      <p>Front-End Developer</p>
                    </div>
                  </div>
                </div>
                <div className="slider" />
              </div>
            </div>
          </div>
        </section>
        <section className="blog" id="blog">
          <div className="container">
            <div className="row">
              <div className="title text-center">
                <h1>Latest Blogs</h1>
              </div>
            </div>
            <div className="row">
              <div className="blog-content">
                <div className="blog-box">
                  <div className="blog-img">
                    <img src="./img/blogs/1.jpg" alt="blogs1"/>
                  </div>
                  <div className="blog-text">
                    <div className="blog-info">
                      <span>May 3, 2020</span>
                      <span>Version Control</span>
                    </div>
                    <h3>Why every developer uses Git.</h3>
                    <p>Git allows us to have a “version” of a project which shows the changes that were made to the code over time, and allows us to backtrack if necessary and undo the changes.</p>
                    <a href="https://devpuskar.netlify.app/blogs/04git">Read More</a>
                  </div>
                </div>
                <div className="blog-box">
                  <div className="blog-img">
                    <img src="./img/blogs/2.png" alt="blogs1" />
                  </div>
                  <div className="blog-text">
                    <div className="blog-info">
                      <span>May 1, 2020</span>
                      <span>Web Development</span>
                    </div>
                    <h3>JavaScript Promises</h3>
                    <p>Before we use promises, our code was full of confusing callback tricks and asynchronous. Switching to promises made our code easier to read, understand, and test.</p>
                    <a href="https://devpuskar.netlify.app/blogs/03jspromises">Read More</a>
                  </div>
                </div>
                <div className="blog-box">
                  <div className="blog-img">
                    <img src="./img/blogs/3.jpg" alt="blogs1" />
                  </div>
                  <div className="blog-text">
                    <div className="blog-info">
                      <span>April 27, 2020</span>
                      <span>Programming</span>
                    </div>
                    <h3>Why we don’t need a degree to be a Developer.</h3>
                    <p>That's right. You don’t need a degree to be a developer. Whilst university is definitely the right path for some people, it is not right for everyone.</p>
                    <a href="https://devpuskar.netlify.app/blogs/01developerdegree">Read More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="contact" id="contact">
          <div className="container">
            <div className="row">
              <div className="title text-center">
                <h1>Get In Touch</h1>
              </div>
            </div>
            <div className="row">
              <div className="contact-form">
                <div className="row">
                  <div className="contact-text">
                    <h2>Drop Me message</h2>
                    <p>My inbox is always open I'll try my best to get back to you!</p>
                  </div>
                </div>
                <div className="row space-between">
                  <div className="col-6">
                    <input type="text" className="form-control" name placeholder="Name" />
                  </div>
                  <div className="col-6">
                    <input type="text" className="form-control" name placeholder="Email" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <textarea className="form-control" placeholder="Your Message" defaultValue={""} />
                  </div>
                </div>
                <div className="row">
                  <div className="button btn">
                    <a href="https://drive.google.com/uc?id=1Ii5Sv-p4BfSlnrIsJZ2az-rtdn0iH6nx&export=download">Get In Touch</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer>
          <div className="container">
            <div className="row">
              <div className="footer-logo">Puskar</div>
              <div className="social-link">
                <a href><i className="fa fa-facebook" /></a>
                <a href><i className="fa fa-instagram" /></a>
                <a href><i className="fa fa-twitter" /></a>
                <a href><i className="fa fa-linkedin" /></a>
                <a href><i className="fa fa-github" /></a>
              </div>
            </div>
          </div>
        </footer>
        <section className="copyright">
          <div className="container">
            <p>© <span id="year" /> | Designed and Developed By Puskar Adhikari. | All rights reserved.</p>
          </div>
        </section>
        <div className="lightbox hide">
          <span className="close-lightbox fa fa-close" />
          <img src alt="portfolio" />
        </div>
        </div>
        </Window>
    );
};

export default Welcome;
