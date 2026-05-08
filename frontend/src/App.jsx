import { useState, useEffect, useRef } from 'react'
import homeImage from './assets/pfp.jpg'
import downloadIcon from './assets/download.png'
import githubIcon from './assets/github.png'
import userIcon from './assets/user.png'
import userGif from './assets/user.gif'
import digitalGIF from './assets/digital-native.gif'
import futureGif from './assets/future.gif'
import aiGif from './assets/ai-image.gif'
import gpsIcon from './assets/gps.png'
import htmlIcon from './assets/progicon/html.png'
import cssIcon from './assets/progicon/css-3.png' 
import jsIcon from './assets/progicon/js.png' 
import reactIcon from './assets/progicon/react.png'
import tailwindIcon from './assets/progicon/tailwind.png'
import tsIcon from './assets/progicon/typescript.png'
import nodeIcon from './assets/progicon/nodejs.png'
import mongoIcon from './assets/progicon/mongodb.png'
import javaIcon from './assets/progicon/java.png'
import gitIcon from './assets/progicon/git.png'
import viteIcon from './assets/progicon/vite.png'
import pyIcon from './assets/progicon/python.png'
import sqlIcon from './assets/progicon/mysql.png'
import phpIcon from './assets/progicon/php.png' 
import sql2Icon from './assets/progicon/sql-server.png'
import mernIcon from './assets/progicon/MERN.png'
import laravelIcon from './assets/progicon/laravel.png'
import t3Icon from './assets/progicon/t3.png'
import emailjs from '@emailjs/browser';
import vercelIcon from './assets/progicon/vercel.png'
import renderIcon from './assets/progicon/render.png'
import './App.css'

// Move static data outside the component to prevent re-creation on every render
const ABOUT_SLIDES = [
  {
    image: userGif,
    title: "Academic Excellence",
    description: "Associate in Computer Technology student at St. Elizabeth Global Skills Institute INC. Consistent honor student since Bulac National High School and Elementary days."
  },
  {
    image: futureGif, 
    title: "Future Aspirations",
    description: "Dedicated to mastering full-stack development and architecting scalable digital solutions for the modern web."
  }, 
  {
    image: digitalGIF,
    title: "Digital Craftsmanship",
    description: "Focused on creating high-performance, accessible, and user-centric web applications using modern frameworks."
  },
  {
    image: aiGif,
    title: "Interactive Development",
    description: "Bringing web interfaces to life with interactive animations and engaging user experiences."
  }
];

// EmailJS Configuration - REPLACE WITH YOUR ACTUAL CREDENTIALS
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function App() {
  const [currentPanel, setCurrentPanel] = useState('home') // Default to 'home'
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [backendStatus, setBackendStatus] = useState('checking')
  const [formData, setFormData] = useState({ user_name: '', user_email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null); // 'success', 'error', null
  const [submittedName, setSubmittedName] = useState('');
  const formRef = useRef(); // Ref for the form element
  const [activeAboutSlide, setActiveAboutSlide] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const nextAboutSlide = () => setActiveAboutSlide((prev) => (prev + 1) % ABOUT_SLIDES.length);
  const prevAboutSlide = () => setActiveAboutSlide((prev) => (prev - 1 + ABOUT_SLIDES.length) % ABOUT_SLIDES.length);

  useEffect(() => {
    const checkStatus = () => {
      // Use environment variables for API endpoints in real scenarios
      const API_URL = import.meta.env.VITE_API_URL || 'https://portfolio-puvo.onrender.com';
      fetch(`${API_URL}/api/hello`)
        .then(res => setBackendStatus(res.ok ? 'online' : 'offline'))
        .catch(() => setBackendStatus('offline'));
    };

    checkStatus(); // Initial check
    const interval = setInterval(checkStatus, 5000); 

    return () => clearInterval(interval);
  }, [])

  // Auto-slide logic for the About section - slides every 4 seconds
  useEffect(() => {
    if (isZoomed) return; // Pause auto-slide when viewing zoomed image
    const timer = setInterval(() => {
      setActiveAboutSlide((prev) => (prev + 1) % ABOUT_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isZoomed]);

  const handleDownload = () => {
    window.print();
  };

  // Professional Scroll Spy: Automatically updates the active navbar link on scroll
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const options = {
      root: null, // use the viewport
      threshold: 0.6, // Requires 60% visibility to mark as active
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Only update if the section is intersecting and has an ID
        if (entry.isIntersecting && entry.target.id) {
          setCurrentPanel(entry.target.id);
        }
      });
    }, options);

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Validate that keys are actually loaded from environment variables
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error("EmailJS Error: Configuration keys are missing! Check your .env file in the frontend folder.");
      setSendStatus('error');
      return;
    }

    setIsSending(true);
    setSendStatus(null);
    const nameToSubmit = formData.user_name;

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then((result) => {
        console.log('SUCCESS!', result.status, result.text);
        setSendStatus('success');
        setSubmittedName(nameToSubmit);
        setFormData({ user_name: '', user_email: '', message: '' }); // Clear form
      }, (error) => {
        // 2. Enhanced error logging for debugging
        console.error('FAILED...', error);
        setSendStatus('error');
      })
      .finally(() => {
        // Auto-clear the status message after 5 seconds
        setTimeout(() => setSendStatus(null), 5000);
        setIsSending(false);
      });
  };
  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth app-background">
      <nav className="fixed top-6 right-10 z-50 flex flex-col items-end">
        {/* Menu Icon Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-4 rounded-full glass-panel text-white transition-all active:scale-90 shadow-lg menu-button-glow z-50`}
          aria-label="Toggle menu"
          style={{ position: 'relative', width: '56px', height: '56px' }}
        >
          <div className="relative w-6 h-4 flex flex-col justify-between items-center mx-auto">
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
          </div>
        </button>

        {/* Dropdown Links */}
        {isMenuOpen && (
          <ul className="mt-4 flex flex-col space-y-1 p-2 shadow-2xl glass-panel-dark animate-in fade-in zoom-in-95 duration-300 min-w-[180px]">
            <li><a href="#home" className={`nav-link ${currentPanel === 'home' ? 'active' : ''}`}>Home</a></li>
            <li><a href="#about" className={`nav-link ${currentPanel === 'about' ? 'active' : ''}`}>About</a></li>
            <li><a href="#stack" className={`nav-link ${currentPanel === 'stack' ? 'active' : ''}`}>Stack</a></li>
            <li><a href="#project" className={`nav-link ${currentPanel === 'project' ? 'active' : ''}`}>Projects</a></li>
            <li><a href="#contact" className={`nav-link ${currentPanel === 'contact' ? 'active' : ''}`}>Contact</a></li>
          </ul>
        )}
      </nav>

      {/* Single Page Sections */}
      <section id="home" className="min-h-screen w-full flex items-center justify-center snap-start px-4 sm:px-10">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 max-w-6xl z-0 animate-in fade-in duration-700">
          {/* Left side: Picture & Info */}
          <div className="flex-1 w-full flex flex-col items-center gap-6">
            <div className="relative inline-block">
              <img 
                src={homeImage} 
                alt="Feature" 
                className="pfp object-cover"
              />
              {/* Active Status Indicator (Messenger Style) */}
              <div 
                className={`absolute bottom-[8%] right-[15%] w-11 h-11 md:w-9 md:h-9 rounded-full border-2 border-white shadow-xl transition-all duration-500 ${
                  backendStatus === 'online' ? 'bg-green-500' : 
                  backendStatus === 'offline' ? 'bg-red-500' : 
                  'bg-amber-500 animate-pulse'
                }`}
                title={`System status: ${backendStatus}`}
              >
                {backendStatus === 'online' && (
                  <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
                )}
              </div>
            </div>
            
            {/* Identity Panel */}
            <div className="glass-panel-dark p-4 flex flex-col gap-3 min-w-[220px] animate-in slide-in-from-bottom-4 duration-1000">
              <div className="flex items-center gap-3">
                <img src={userIcon} alt="User" className="info-icon" />
                <p className="text-sm m-0 font-bold tracking-widest uppercase">Larry M. Lopez</p>
              </div>
              <div className="flex items-center gap-3">
                <img src={gpsIcon} alt="Location" className="info-icon" />
                <p className="text-sm m-0 font-medium">Talavera, Philippines</p>
              </div>
            </div>
          </div>
          
          {/* Right side: Description */}
          <div className="flex-1 text-left glass-panel p-6 md:p-10">
            <h1 className="text-3xl md:text-5xl mb-4 md:mb-6 typing-effect">Hello! I'm Dev/rry.</h1>
            
            <p className="text-base md:text-xl leading-relaxed mb-6 md:mb-8">
             Passionate Full Stack Developer | Aspiring Software Engineer
              Currently refining my craft in the world of Information Technology,
               I am driven by the constant evolution of web technologies. 
               From architecting RESTful APIs to designing intuitive user interfaces, 
               I am committed to mastering the full lifecycle of software development. 
               I don't just write code; I build digital experiences that are fast, 
               secure, and built to scale.
            </p>
            <div className="flex justify-center gap-12 mt-6">
              <div onClick={handleDownload} className="download-cv group cursor-pointer">
                <img src={downloadIcon} alt="Download Icon" className="download-icon" />
                <span className="download-text">Download CV</span>
              </div>
              <a href="https://github.com/EagleAnonymous" target="_blank" rel="noopener noreferrer" className="download-cv group">
                <img src={githubIcon} alt="GitHub Icon" className="download-icon" />
                <span className="download-text">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="min-h-screen w-full flex items-center justify-center snap-start">
        <div className="relative w-full max-w-2xl mx-4 group">
          <div className="glass-panel overflow-hidden relative min-h-[500px] flex flex-col items-center">
            {/* Slider Content */}
            <div className="w-full h-64 md:h-80 cursor-zoom-in" onClick={() => setIsZoomed(true)}>
              <img
                key={activeAboutSlide}
                src={ABOUT_SLIDES[activeAboutSlide].image}
                alt={ABOUT_SLIDES[activeAboutSlide].title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 animate-in fade-in slide-in-from-left duration-500"
              />
            </div>
            
            <div className="w-full p-8 md:p-10 text-center flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 animate-in slide-in-from-top-4 duration-500">
                {ABOUT_SLIDES[activeAboutSlide].title}
              </h2>
              <p className="text-slate-300 leading-relaxed text-lg animate-in slide-in-from-bottom duration-700">
                {ABOUT_SLIDES[activeAboutSlide].description}
              </p>
            </div>

            {/* Navigation Controls */}
            <button onClick={prevAboutSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full glass-panel-dark text-white opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Previous slide">
              ❮
            </button>
            <button onClick={nextAboutSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full glass-panel-dark text-white opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Next slide">
              ❯
            </button>
          </div>
          
          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {ABOUT_SLIDES.map((_, index) => (
              <button 
                key={index} 
                onClick={() => setActiveAboutSlide(index)}
                className={`h-2 transition-all rounded-full ${activeAboutSlide === index ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-600'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Zoom Modal Overlay */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 cursor-zoom-out animate-in fade-in duration-300"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
             <img 
              src={ABOUT_SLIDES[activeAboutSlide].image} 
              alt={ABOUT_SLIDES[activeAboutSlide].title}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-90 duration-300"
            />
          </div>
        </div>
      )}

      <section id="stack" className="min-h-screen w-full flex items-center justify-center snap-start">
        <div className="max-w-6xl w-full mx-4 animate-in fade-in duration-700">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">Technical Expertise</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Frontend Group */}
            <div className="glass-panel p-8 hover:border-indigo-500/50 transition-colors group">
              <h2 className="text-xl font-bold text-indigo-400 mb-6 flex items-center gap-3">
                <span className="p-2 rounded bg-indigo-500/10 text-indigo-500">⚛️</span>
                Frontend Development
              </h2>
              <ul className="space-y-4 text-slate-300">
                <li className="flex justify-between border-b border-slate-800 pb-2"><span className="flex items-center gap-2"><img src={htmlIcon} className="w-5 h-5 object-contain" alt="" /> HTML</span> <span className="text-xs text-slate-500 uppercase font-bold">Structure</span></li>
                <li className="flex justify-between border-b border-slate-800 pb-2"><span className="flex items-center gap-2"><img src={cssIcon} className="w-5 h-5 object-contain" alt="" />CSS</span> <span className="text-xs text-slate-500 uppercase font-bold">Styling</span></li>
                <li className="flex justify-between border-b border-slate-800 pb-2"><span className="flex items-center gap-2"><img src={jsIcon} className="w-5 h-5 object-contain" alt="" />JavaScript</span> <span className="text-xs text-slate-500 uppercase font-bold">Proficient</span></li>
                <li className="flex justify-between border-b border-slate-800 pb-2"><span className="flex items-center gap-2"><img src={reactIcon} className="w-5 h-5 object-contain" alt="" /> React.js</span> <span className="text-xs text-slate-500 uppercase font-bold">Framework</span></li>
                <li className="flex justify-between border-b border-slate-800 pb-2"><span className="flex items-center gap-2"><img src={tailwindIcon} className="w-5 h-5 object-contain" alt="" /> Tailwind CSS</span> <span className="text-xs text-slate-500 uppercase font-bold">Styling</span></li>
                <li className="flex justify-between border-b border-slate-800 pb-2"><span className="flex items-center gap-2"><img src={tsIcon} className="w-5 h-5 object-contain" alt="" /> TypeScript</span> <span className="text-xs text-slate-500 uppercase font-bold">Typed JS</span></li>
                <li className="flex justify-between border-b border-slate-800 pb-2"><span className="flex items-center gap-2"><img src={viteIcon} className="w-5 h-5 object-contain" alt="" /> Vite</span> <span className="text-xs text-slate-500 uppercase font-bold">Build Tool</span></li>
              </ul>
            </div>

            {/* Backend Group */}
            <div className="glass-panel p-8 hover:border-emerald-500/50 transition-colors group">
              <h2 className="text-xl font-bold text-emerald-400 mb-6 flex items-center gap-3">
                <span className="p-2 rounded bg-emerald-500/10 text-emerald-500">⚙️</span>
                Backend & Systems
              </h2>
              <ul className="space-y-4 text-slate-300">
                <li className="flex justify-between border-b border-slate-800 pb-2"><span className="flex items-center gap-2"><img src={nodeIcon} className="w-5 h-5 object-contain" alt="" /> Node.js & Express</span> <span className="text-xs text-slate-500 uppercase font-bold">Runtime</span></li>
                <li className="flex justify-between border-b border-slate-800 pb-2"><span className="flex items-center gap-2"><img src={mongoIcon} className="w-5 h-5 object-contain" alt="" /> MongoDB</span> <span className="text-xs text-slate-500 uppercase font-bold">Databases</span></li>
                <li className="flex justify-between border-b border-slate-800 pb-2"><span className="flex items-center gap-2"><img src={sqlIcon} className="w-5 h-5 object-contain" alt="" /> MySql</span> <span className="text-xs text-slate-500 uppercase font-bold">Databases</span></li>
                <li className="flex justify-between border-b border-slate-800 pb-2"><span className="flex items-center gap-2"><img src={sql2Icon} className="w-5 h-5 object-contain" alt="" /> SQL</span> <span className="text-xs text-slate-500 uppercase font-bold">Databases</span></li>
                <li className="flex justify-between border-b border-slate-800 pb-2"><span className="flex items-center gap-2"><img src={javaIcon} className="w-5 h-5 object-contain" alt="" /> Java Desktop</span> <span className="text-xs text-slate-500 uppercase font-bold">Swing/Javafx</span></li>
                <li className="flex justify-between border-b border-slate-800 pb-2"><span className="flex items-center gap-2"><img src={pyIcon} className="w-5 h-5 object-contain" alt="" /> Python</span> <span className="text-xs text-slate-500 uppercase font-bold">AI/ML</span></li>
                <li className="flex justify-between border-b border-slate-800 pb-2"><span className="flex items-center gap-2"><img src={phpIcon} className="w-5 h-5 object-contain" alt="" /> PHP</span> <span className="text-xs text-slate-500 uppercase font-bold">Language</span></li>
                

              </ul>
            </div>

            {/* Tools & Professional Group */}
            <div className="glass-panel p-8 hover:border-amber-500/50 transition-colors group md:col-span-2 lg:col-span-1">
              <h2 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-3">
                <span className="p-2 rounded bg-amber-500/10 text-amber-500">🛠️</span>
                Tools & Professional
              </h2>
              <ul className="space-y-4 text-slate-300">
                <li className="flex justify-between border-b border-slate-800 pb-2"><span className="flex items-center gap-2"><img src={githubIcon} className="w-5 h-5 object-contain" alt="" /> Github</span> <span className="text-xs text-slate-500 uppercase font-bold">Version Control</span></li>
                <li className="flex justify-between border-b border-slate-800 pb-2"><span className="flex items-center gap-2"><img src={gitIcon} className="w-5 h-5 object-contain" alt="" /> Git</span> <span className="text-xs text-slate-500 uppercase font-bold">Version Control</span></li>
                <li className="flex justify-between border-b border-slate-800 pb-2"><span className="flex items-center gap-2"><img src={mernIcon} className="w-5 h-5 object-contain" alt="" /> MERN Stack</span> <span className="text-xs text-slate-500 uppercase font-bold">Stack</span></li>
                <li className="flex justify-between border-b border-slate-800 pb-2"><span className="flex items-center gap-2"><img src={t3Icon} className="w-5 h-5 object-contain" alt="" /> T3 Stack</span> <span className="text-xs text-slate-500 uppercase font-bold">Stack</span></li>
                <li className="flex justify-between border-b border-slate-800 pb-2"><span className="flex items-center gap-2"><img src={laravelIcon} className="w-5 h-5 object-contain" alt="" /> Laravel</span> <span className="text-xs text-slate-500 uppercase font-bold">PHP Framework</span></li>
                <li className="flex justify-between border-b border-slate-800 pb-2"><span className="flex items-center gap-2"><img src={vercelIcon} className="w-5 h-5 object-contain" alt="" /> Vercel</span> <span className="text-xs text-slate-500 uppercase font-bold">Deployment</span></li>
                <li className="flex justify-between border-b border-slate-800 pb-2"><span className="flex items-center gap-2"><img src={renderIcon} className="w-5 h-5 object-contain" alt="" /> Render</span> <span className="text-xs text-slate-500 uppercase font-bold">Deployment</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="project" className="min-h-screen w-full flex items-center justify-center snap-start">
        <div className="p-8 md:p-12 text-center glass-panel max-w-4xl mx-4 animate-in fade-in duration-700">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Our Projects</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:border-indigo-500/50 transition-all duration-300 group">
              <h3 className="text-lg font-bold text-indigo-400 mb-2 group-hover:text-indigo-300 transition-colors">Java Payroll System</h3>
              <p className="text-sm text-slate-300 leading-relaxed">Automated compensation management using Java; calculates salaries, hours, and deductions with platform independence.</p>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:border-emerald-500/50 transition-all duration-300 group">
              <h3 className="text-lg font-bold text-emerald-400 mb-2 group-hover:text-emerald-300 transition-colors">Java Inventory System</h3>
              <p className="text-sm text-slate-300 leading-relaxed">Lifecycle stock management engine ensuring optimal inventory levels and minimizing waste.</p>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:border-emerald-500/50 transition-all duration-300 group">
              <h3 className="text-lg font-bold text-emerald-400 mb-2 group-hover:text-emerald-300 transition-colors">Java POS System</h3>
              <p className="text-sm text-slate-300 leading-relaxed">High-speed digital cash register interface designed for transaction accuracy and ease of use.</p>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:border-indigo-500/50 transition-all duration-300 group">
              <h3 className="text-lg font-bold text-indigo-400 mb-2 group-hover:text-indigo-300 transition-colors">MERN Stack Portfolio</h3>
              <p className="text-sm text-slate-300 leading-relaxed">Showcase of full-stack proficiency using MongoDB, Express, React, and Node.js with RESTful API architecture.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen w-full flex items-center justify-center snap-start">
        <div className="max-w-5xl w-full mx-4 animate-in fade-in duration-700">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">Get In Touch</h1>
          
          <div className="flex justify-center">
            {/* Contact Details */}
            <div className="glass-panel p-8 md:p-12 max-w-2xl w-full flex flex-col items-center text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Send Me a Message</h2>
              <p className="text-slate-400 mb-10 leading-relaxed">
                I'm currently available for freelance work or full-time positions. 
                If you have a project that needs a creative touch or a developer to join your team, 
                feel free to reach out!
              </p>
              
              {/* Contact Form */}
              <form ref={formRef} onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
                <div>
                  <label htmlFor="user_name" className="sr-only">Name</label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="w-full p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="user_email" className="sr-only">Email</label>
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    required
                    className="w-full p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    required
                    className="w-full p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3 px-6 rounded-lg bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? 'Sending...' : 'Send Message'}
                </button>

                {sendStatus === 'success' && (<p className="text-green-500 mt-4 font-bold">Thank you, {submittedName}! Your message has been sent successfully.</p>)}
                {sendStatus === 'error' && (<p className="text-red-500 mt-4">Failed to send message. Please try again.</p>)}
              </form>

              {/* Existing Facebook link, moved below the form */}
            </div>
          </div>
        </div>
      </section>

      <div className="print-only hidden print:block">
        <div className="max-w-[800px] print:max-w-none mx-auto my-10 bg-slate-950 text-slate-300 font-sans shadow-2xl print:shadow-none print:my-0 border border-slate-800 print:border-none print:w-[210mm] print:h-[297mm] print:overflow-hidden print:relative">
          
          <div className="p-10 print:p-10 h-full flex flex-col">
            {/* Header */}
            <header className="border-b-2 border-slate-800 pb-4 mb-6 flex flex-col md:flex-row justify-between items-start print:flex-row">
              <div className="print:text-left">
                <h1 className="text-4xl font-extrabold uppercase tracking-tighter text-white leading-none">Larry M. Lopez</h1>
                <p className="text-sm font-bold text-indigo-400 mt-2 tracking-wide">Full Stack Developer | Aspiring Software Engineer</p>
              </div>
              <div className="flex flex-col items-end gap-1 text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-4 md:mt-0 print:mt-0">
                <span className="flex items-center gap-2">Talavera, Nueva Ecija 📍</span>
                <span className="flex items-center gap-2">github.com/EagleAnonymous 🔗</span>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 print:grid-cols-3 gap-8">
              {/* Main Column (2/3) */}
              <div className="md:col-span-2 print:col-span-2 space-y-6">
                
                {/* Summary */}
                <section>
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b border-slate-800 pb-1 mb-2 text-indigo-500">
                    Professional Summary
                  </h2>
                  <p className="text-[13px] leading-relaxed text-slate-400 text-justify">
                   "Aspiring Software Engineer and 2nd-year IT student with a dual passion for building high-performance web applications and securing digital infrastructures. Currently specializing in the MERN and T3 stacks, I focus on creating type-safe, scalable solutions while maintaining a security-first mindset. My goal is to bridge the gap between seamless user experiences and robust, penetration-tested backends."
                  </p>
                </section>

                {/* Education */}
                <section>
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b border-slate-800 pb-1 mb-3 text-indigo-500">
                    Educational Attainment
                  </h2>
                  <div className="space-y-4">
                    {/* Tertiary */}
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-base font-bold text-slate-100 uppercase tracking-tight">Associate in Computer Technology</h3>
                        <span className="text-[10px] font-black text-slate-500 border border-slate-800 px-2 py-0.5 rounded">2024 — 2026</span>
                      </div>
                      <p className="text-xs font-bold text-indigo-400 uppercase">St. Elizabeth Global Skills Institute INC.</p>
                      <p className="text-[11px] text-slate-500 font-medium italic mt-1">Consistent Honor Student</p>
                    </div>

                    {/* Secondary */}
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-base font-bold text-slate-100 uppercase tracking-tight">General Academic Strand (GAS)</h3>
                        <span className="text-[10px] font-black text-slate-500 border border-slate-800 px-2 py-0.5 rounded">2018 — 2024</span>
                      </div>
                      <p className="text-xs font-bold text-indigo-400 uppercase">Bulac National High School</p>
                      <p className="text-[11px] text-slate-500 font-medium italic mt-1">Consistent Honor Student</p>
                    </div>
                    {/* Primary */}
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-base font-bold text-slate-100 uppercase tracking-tight">Computer Lab</h3>
                        <span className="text-[10px] font-black text-slate-500 border border-slate-800 px-2 py-0.5 rounded">2012 — 2018</span>
                      </div>
                      <p className="text-xs font-bold text-indigo-400 uppercase">Tagaytay Elementary School</p>
                      <p className="text-[11px] text-slate-500 font-medium italic mt-1">Consistent Honor Student</p>
                    </div>
                  </div>
                </section>

                {/* Projects */}
                <section>
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b border-slate-800 pb-1 mb-3 text-indigo-500">
                    Technical Projects
                  </h2>
                  <div className="space-y-3">
                    <div className="border-l-2 border-indigo-500/30 pl-4">
                      <h3 className="text-[11px] font-black text-slate-100 uppercase">Java Payroll System</h3>
                      <p className="text-[10px] leading-snug text-slate-400 mt-1">Automated compensation management using Java; calculates salaries, hours, and deductions with platform independence.</p>
                    </div>
                    <div className="border-l-2 border-emerald-500/30 pl-4">
                      <h3 className="text-[11px] font-black text-slate-100 uppercase">Java Inventory System</h3>
                      <p className="text-[10px] leading-snug text-slate-400 mt-1">Lifecycle stock management engine ensuring optimal inventory levels and minimizing waste.</p>
                    </div>
                    <div className="border-l-2 border-emerald-500/30 pl-4">
                      <h3 className="text-[11px] font-black text-slate-100 uppercase">Java POS System</h3>
                      <p className="text-[10px] leading-snug text-slate-400 mt-1">High-speed digital cash register interface designed for transaction accuracy and ease of use.</p>
                    </div>
                    <div className="border-l-2 border-emerald-500/30 pl-4">
                      <h3 className="text-[11px] font-black text-slate-100 uppercase">MERN Stack Portfolio</h3>
                      <p className="text-[10px] leading-snug text-slate-400 mt-1">Showcase of full-stack proficiency using MongoDB, Express, React, and Node.js with RESTful API architecture.</p>
                    </div>
                  </div>
                </section>
              </div>

              {/* Sidebar (1/3) */}
              <div className="space-y-6 bg-slate-900/40 p-6 rounded-2xl border border-slate-800/50 print:bg-transparent print:border-none print:p-0">
                {/* Skills */}
                <section>
                  <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-4">
                    Expertise
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {['Problem Solving', 'Logic', 'Technical Adaptability', 'Time Management', 'Good Communication'].map(skill => (
                      <span key={skill} className="px-2.5 py-1 bg-slate-800/50 border border-slate-700/50 text-slate-300 text-[9px] font-black rounded-md uppercase tracking-tighter">{skill}</span>
                    ))}
                  </div>
                </section>

                {/* Tech Stack */}
                <section>
                  <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-4">
                    Tech Stack
                  </h2>
                  <ul className="text-[10px] font-bold text-slate-400 space-y-1.5">
                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-indigo-500 rounded-full"></span> HTML / CSS / JS</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-indigo-500 rounded-full"></span> React / TypeScript / Vite</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-indigo-500 rounded-full"></span> Node.js / PHP / Laravel</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-indigo-500 rounded-full"></span> Express / MERN / T3</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-indigo-500 rounded-full"></span> MongoDB / MySQL / SQL</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-indigo-500 rounded-full"></span> Java / Python / Tailwind</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-indigo-500 rounded-full"></span> Git & GitHub / Render</li>
                  </ul>
                </section>

                {/* Personal */}
                <section>
                  <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-4">
                    Personal Data
                  </h2>
                  <div className="text-[10px] space-y-3 text-slate-400 font-bold uppercase">
                    <p className="flex justify-between"><span>Birthdate</span> <span className="text-slate-200">April 17, 2006</span></p>
                    <p className="flex justify-between"><span>Citizenship</span> <span className="text-slate-200">Filipino</span></p>
                    <p className="flex justify-between"><span>Sex</span> <span className="text-slate-200">Male</span></p>
                    <p className="flex justify-between"><span>Civil Status</span> <span className="text-slate-200">Single</span></p>
                    <p className="flex justify-between"><span>Height</span> <span className="text-slate-200">5'5"</span></p>
                    <p className="flex justify-between"><span>Weight</span> <span className="text-slate-200">73kg</span></p>
                  </div>
                </section>

                <section className="pt-4 border-t border-slate-800 mt-4">
                   <p className="text-[9px] text-slate-500 italic leading-tight">
                    I hereby certify that the above information is true and correct.
                   </p>
                   <p className="text-xs font-black text-indigo-400 mt-2 uppercase tracking-widest">Larry M. Lopez</p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App