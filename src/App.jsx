import React, { useEffect, useState } from 'react';
import PixelBlast from './components/PixelBlast/PixelBlast';
import Laptop3D from './components/Laptop3D/Laptop3D';

const projectsData = [
  {
    id: 1,
    number: "01",
    title: "FTIR to SBPR Classification Pipeline",
    subtitle: "Maruti Suzuki AI/ML Diagnostic Engine",
    tech: ["Python", "PyTorch", "ResNet-34", "Scikit-learn", "Selenium", "Tkinter"],
    description: "Automated end-to-end scraping & ML pipeline logging into internal web portal, retrieving Field Technical Investigation Reports (FTIRs) and embedded defect photos without manual downloading.",
    github: "https://github.com/Kapil6996/FTIR_Diagnostic_Engine",
    demo: null,
    image: "/maruti_ftir_gui.png",
    bullets: [
      "Automated scraping pipeline retrieving internal FTIR reports & defect photos.",
      "Two-stage classification: ResNet-34 vision CNN + Decision Tree metadata fusion layer.",
      "Built desktop GUI with active-learning loop for continuous engineer corrections."
    ]
  },
  {
    id: 2,
    number: "02",
    title: "SahayCredit – Alternate Credit Scoring Platform",
    subtitle: "Fintech & In-Browser WebAssembly ML",
    tech: ["JavaScript", "Python (Pyodide)", "Node.js", "WebAssembly", "SHAP"],
    description: "Full-stack fintech platform scoring creditworthiness for thin-file borrowers using non-traditional signals (UPI patterns, bill regularity, geolocation stability, psychometric & e-commerce data).",
    github: "https://github.com/Kapil6996/sahaycredit1",
    demo: null,
    image: "/sahay_credit.png",
    bullets: [
      "In-browser ML inference via Pyodide/WebAssembly achieving ~0.99 R² on borrower data.",
      "SHAP-based explainability & RBI Account Aggregator consent flow.",
      "AES-256-GCM encrypted document vault & real-time lender analytics dashboard."
    ]
  },
  {
    id: 3,
    number: "03",
    title: "Asset Alpha – Quantitative Trading System",
    subtitle: "Algorithmic Market Prediction",
    tech: ["Python", "LightGBM", "LSTM", "Machine Learning", "Backtesting"],
    description: "Real-time algorithmic trading system with live prediction agent that achieved Top 5 ranking in competitive leaderboard. Features ML ensemble (LightGBM + LSTM) with 80+ engineered features.",
    github: "https://github.com/Kapil6996/market-prediction-ml",
    demo: null,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
    bullets: [
      "Achieved Top 5 ranking in competitive algorithmic trading leaderboard.",
      "ML ensemble (LightGBM + LSTM) trained on 80+ engineered financial features.",
      "Integrated dynamic risk management, position sizing, and automated backtesting."
    ]
  },
  {
    id: 4,
    number: "04",
    title: "SkillGenomeX – Talent Intelligence Platform",
    subtitle: "Workforce Analytics & ML Insights",
    tech: ["Python", "Flask", "Machine Learning", "Analytics Dashboards"],
    description: "Built machine learning system to analyze workforce profiles, detect hidden technical skills, and generate strategic workforce analytics dashboards for decision-making.",
    github: "https://github.com/Kapil6996/_skillgenomeX12",
    demo: "https://skillgenome-x12.vercel.app",
    image: "/skillgenome_x12.png",
    bullets: [
      "ML system analyzing workforce profiles & detecting hidden technical skills.",
      "Interactive analytics dashboards providing data-driven talent intelligence.",
      "Deployed live production web application on Vercel."
    ]
  },
  {
    id: 5,
    number: "05",
    title: "UPLINE – Emergency Triage System (PWA)",
    subtitle: "Offline-First Healthcare Triage",
    tech: ["JavaScript", "PWA", "Offline Storage", "Low-Network Architecture"],
    description: "Offline-first progressive web application built for hospital emergency triage and disaster scenarios, engineered for fast input workflows and zero-latency low-network reliability.",
    github: "https://github.com/Kapil6996/Upline-Final",
    demo: null,
    image: "/upline_triage.png",
    bullets: [
      "Offline-first triage PWA for hospitals & emergency response teams.",
      "Designed fast input workflows optimized for low-bandwidth scenarios.",
      "Resilient local storage caching with zero network dependence."
    ]
  }
];

const achievementsData = [
  {
    id: 1,
    category: "Robotics & Hardware",
    title: "National Robotics Competition",
    issuer: "Tech Expo 2025",
    image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&w=1200&q=80",
    size: "tall"
  },
  {
    id: 2,
    category: "AI & ML",
    title: "FTIR Defect Classification Engine",
    issuer: "Maruti Suzuki",
    image: "/maruti_ftir_gui.png",
    size: "medium"
  },
  {
    id: 3,
    category: "Award Ceremony",
    title: "National Fintech Innovation Award",
    issuer: "SahayCredit Platform",
    image: "/sahay_credit.png",
    size: "small"
  },
  {
    id: 4,
    category: "Team Achievement",
    title: "Hackathon Champions",
    issuer: "Buildathon 2025",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    size: "small"
  },
  {
    id: 5,
    category: "Executive Presentation",
    title: "AI Automation Showcase",
    issuer: "GO-BRICS Business Lab",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    size: "small"
  },
  {
    id: 6,
    category: "Field Research & Testing",
    title: "Autonomous Quadruped Field Test",
    issuer: "Robotics Research Lab",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    size: "tall"
  },
  {
    id: 7,
    category: "Stage Honors",
    title: "Best Technical Paper Presentation",
    issuer: "IEEE International Conference",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
    size: "medium"
  },
  {
    id: 8,
    category: "Keynote Talk",
    title: "Future of On-Device WASM Machine Learning",
    issuer: "Tech Talks 2025",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    size: "medium"
  },
  {
    id: 9,
    category: "Student Leadership",
    title: "Technical Society Lead Recognition",
    issuer: "University Chapter",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    size: "tall"
  }
];

const certificationsData = [
  {
    num: "01",
    title: "Microservices Development on Azure with Java",
    issuer: "Infosys — March 2026",
    skills: "Java, Azure Cloud, Microservices Architecture, REST APIs",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80"
  },
  {
    num: "02",
    title: "Harvard CS50 Python / Spring Microservices",
    issuer: "Harvard University / Infosys — March 2026",
    skills: "Python, Spring Boot, Microservices, Object-Oriented Programming",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
  },
  {
    num: "03",
    title: "Advanced Features in Java: Working with Sets",
    issuer: "Infosys — March 2026",
    skills: "Java Collections Framework, HashSet, TreeSet, Set Manipulation",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
  },
  {
    num: "04",
    title: "Advanced Features in Java: Using Built-in Annotations",
    issuer: "Infosys — March 2026",
    skills: "Java Annotations, @Override, @Deprecated, Meta-annotations",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
  },
  {
    num: "05",
    title: "Basics of C Language",
    issuer: "Great Learning",
    skills: "C Programming, Pointers, Memory Management, Functions & Structs",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80"
  },
  {
    num: "06",
    title: "Communication",
    issuer: "Saylor Academy",
    skills: "Professional Writing, Interpersonal Communication, Active Listening",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
  },
  {
    num: "07",
    title: "Effective Presentation",
    issuer: "HP LIFE",
    skills: "Public Speaking, Slide Design, Data Storytelling, Business Pitching",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80"
  }
];

export default function App() {
  const [certModal, setCertModal] = useState({ open: false, src: '', title: '' });
  const [openAccordion, setOpenAccordion] = useState('content-1');
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [projectScrollProgress, setProjectScrollProgress] = useState(0);
  const [activeArrowKey, setActiveArrowKey] = useState(null);

  const prevProject = () => {
    setActiveArrowKey('left');
    setActiveProjectIndex((prev) => (prev > 0 ? prev - 1 : projectsData.length - 1));
    setTimeout(() => setActiveArrowKey(null), 300);
  };

  const nextProject = () => {
    setActiveArrowKey('right');
    setActiveProjectIndex((prev) => (prev < projectsData.length - 1 ? prev + 1 : 0));
    setTimeout(() => setActiveArrowKey(null), 300);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevProject();
      } else if (e.key === 'ArrowRight') {
        nextProject();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // --- 100% ACCURATE NATIVE MOUSE SCROLL SPEED MATCHING ---
  // Native browser scroll handles mouse wheel 1:1 with zero lag or speed mismatch.
  // LERP dampening below smooths 3D Laptop opening and horizontal certifications translation.

  const certSectionRef = React.useRef(null);
  const [certTranslateX, setCertTranslateX] = useState(0);

  const targetCertTranslateXRef = React.useRef(0);
  const currentCertTranslateXRef = React.useRef(0);

  const targetProjectProgressRef = React.useRef(0);
  const currentProjectProgressRef = React.useRef(0);

  // Smooth LERP Dampening Loop for fluid section transitions
  useEffect(() => {
    let animId;
    const updateSmoothScrolls = () => {
      currentCertTranslateXRef.current += (targetCertTranslateXRef.current - currentCertTranslateXRef.current) * 0.15;
      setCertTranslateX(currentCertTranslateXRef.current);

      currentProjectProgressRef.current += (targetProjectProgressRef.current - currentProjectProgressRef.current) * 0.15;
      setProjectScrollProgress(currentProjectProgressRef.current);

      animId = requestAnimationFrame(updateSmoothScrolls);
    };
    animId = requestAnimationFrame(updateSmoothScrolls);
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    const handleCertScroll = () => {
      const section = certSectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const totalScrollable = section.offsetHeight - window.innerHeight;
      if (totalScrollable > 0) {
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
        const track = section.querySelector('.cert-horizontal-track');
        if (track) {
          const maxScroll = track.scrollWidth - window.innerWidth + 120;
          targetCertTranslateXRef.current = -progress * Math.max(0, maxScroll);
        }
      }
    };
    window.addEventListener('scroll', handleCertScroll, { passive: true });
    handleCertScroll();
    return () => window.removeEventListener('scroll', handleCertScroll);
  }, []);

  useEffect(() => {
    const handleScrollProgress = () => {
      const section = document.getElementById('projects');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      
      const totalDist = viewH * 0.7;
      const distScrolled = viewH - rect.top;
      const progress = Math.max(0, Math.min(1, distScrolled / totalDist));
      
      targetProjectProgressRef.current = progress;
    };
    window.addEventListener('scroll', handleScrollProgress, { passive: true });
    handleScrollProgress();
    return () => window.removeEventListener('scroll', handleScrollProgress);
  }, []);

  // --- PARALLAX SCROLL GLIDE MOTION LISTENER ---
  useEffect(() => {
    let animId;
    const handleParallaxGlide = () => {
      document.querySelectorAll('[data-glide-speed]').forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-glide-speed')) || 0.05;
        const rect = el.getBoundingClientRect();
        const viewH = window.innerHeight;
        if (rect.top <= viewH && rect.bottom >= 0) {
          const centerDiff = (viewH / 2) - (rect.top + rect.height / 2);
          const offsetY = centerDiff * speed;
          el.style.transform = `translate3d(0, ${offsetY.toFixed(2)}px, 0)`;
        }
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(handleParallaxGlide);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleParallaxGlide();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  // IntersectionObserver for Smooth Page Up Scroll Reveal Animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // --- Cursor Trail Logic ---
    const cursorCanvas = document.getElementById('cursor-canvas');
    if (!cursorCanvas) return;
    const ctx = cursorCanvas.getContext('2d');
    const header = document.getElementById('main-header');
    
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let targetX = lastX; 
    let targetY = lastY; 
    let trail = [];
    let isHeaderHovering = false; 
    let animationFrameId;
    
    const TRAIL_LENGTH = 25;
    const MAX_SPEED_FACTOR = 15;
    const EASE_AMOUNT = 0.5;

    function resizeCanvas() {
      cursorCanvas.width = window.innerWidth;
      cursorCanvas.height = window.innerHeight;
      if (trail.length === 0) {
        lastX = cursorCanvas.width / 2;
        lastY = cursorCanvas.height / 2;
        targetX = lastX;
        targetY = lastY;
        for (let i = 0; i < TRAIL_LENGTH; i++) {
          trail.push({ x: lastX, y: lastY });
        }
      }
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      lastX = targetX;
      lastY = targetY; 
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    if (header) {
      header.addEventListener('mouseenter', () => {
        isHeaderHovering = true;
        trail = [];
      });
      header.addEventListener('mouseleave', () => {
        isHeaderHovering = false;
        if (trail.length === 0) {
          for (let i = 0; i < TRAIL_LENGTH; i++) {
            trail.push({ x: targetX, y: targetY });
          }
        }
      });
    }

    function draw() {
      ctx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
      ctx.save();
      
      if (!isHeaderHovering && trail.length > 0) {
        const dx = lastX - trail[0].x;
        const dy = lastY - trail[0].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const stretchFactor = Math.min(1, distance / MAX_SPEED_FACTOR);
        
        const newHeadX = trail[0].x + dx * stretchFactor;
        const newHeadY = trail[0].y + dy * stretchFactor;

        trail.unshift({ x: newHeadX, y: newHeadY }); 
        trail.pop();

        for (let i = 1; i < TRAIL_LENGTH; i++) {
          const prev = trail[i - 1];
          const current = trail[i];
          current.x += (prev.x - current.x) * EASE_AMOUNT;
          current.y += (prev.y - current.y) * EASE_AMOUNT;
        }

        const lineWidth = 2 + Math.min(distance / 4, 3);

        for (let i = 0; i < TRAIL_LENGTH - 1; i++) {
          const opacity = 0.7 * (1 - i / TRAIL_LENGTH); 
          const currentX = trail[i].x;
          const currentY = trail[i].y;
          const nextX = trail[i+1].x;
          const nextY = trail[i+1].y;
          
          ctx.beginPath();
          ctx.lineCap = 'round';
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = lineWidth * (1 - i / TRAIL_LENGTH); 
          
          ctx.moveTo(currentX, currentY);
          ctx.lineTo(nextX, nextY);
          ctx.stroke();
        }
      }
      
      ctx.restore();
      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    // Accordion setup
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const contentId = header.getAttribute('data-target');
        const content = document.getElementById(contentId);
        const chevron = header.querySelector('.chevron');
        const isExpanded = content.classList.contains('active');

        document.querySelectorAll('.accordion-content').forEach(c => {
          c.classList.remove('active');
          c.style.maxHeight = '0';
        });
        document.querySelectorAll('.chevron').forEach(c => {
          c.style.transform = 'rotate(0deg)';
        });

        if (!isExpanded) {
          content.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px'; 
          chevron.style.transform = 'rotate(180deg)';
        }
      });
    });

    // Logo Carousel
    const logos = [
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", alt: "Next.js", name: "Next" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "Node.js", name: "Node.js" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", alt: "HTML5", name: "HTML" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", alt: "CSS3", name: "CSS3" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", alt: "JavaScript", name: "JavaScript" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", alt: "Git", name: "Git" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", alt: "MySQL", name: "MySQL" },
      { src: "https://skillicons.dev/icons?i=tailwind", alt: "Tailwind CSS", name: "Tailwind" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg", alt: "Bash", name: "Bash" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/astro/astro-original.svg", alt: "Astro", name: "Astro" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React", name: "React" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", alt: "TypeScript", name: "TypeScript" },
    ];

    const logoTracks = document.querySelectorAll('.logo-track');
    logoTracks.forEach(track => {
      track.innerHTML = '';
      [...logos, ...logos, ...logos].forEach(logo => {
        const logoItem = document.createElement('div');
        logoItem.className = 'logo-item flex flex-col items-center justify-center text-gray-500 text-xs';
        
        const img = document.createElement('img');
        img.src = logo.src;
        img.alt = logo.alt;
        img.loading = 'lazy';
        
        const nameSpan = document.createElement('span');
        nameSpan.textContent = logo.name;
        nameSpan.classList.add('mt-1');

        logoItem.appendChild(img);
        logoItem.appendChild(nameSpan);
        track.appendChild(logoItem);
      });
    });

    // Reading progress & Active Nav & Career Timeline
    const readingProgress = document.getElementById('reading-progress');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav .nav-link');

    function updateReadingProgress() {
      const fullHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollAmount = window.scrollY;
      if (readingProgress && fullHeight > 0) {
        const progress = (scrollAmount / fullHeight) * 100;
        readingProgress.style.width = `${progress}%`;
      }
    }

    function updateActiveNav() {
      let currentSection = null;
      const scrollPos = window.scrollY + 180;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id');
        }
      });
      
      const totalHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      if (window.scrollY + viewportHeight >= totalHeight - 15) { 
        currentSection = 'contact';
      }

      navLinks.forEach(link => {
        const href = link.getAttribute('href')?.substring(1);
        const circle = link.parentElement?.querySelector('.nav-active-circle');
        if (href === currentSection) {
          link.classList.add('active');
          if (circle) circle.classList.add('animate');
        } else {
          link.classList.remove('active');
          if (circle) circle.classList.remove('animate');
        }
      });
    }

    let timelineTargetY = 0;
    let timelineCurrentY = 0;
    let isTimelineAnimating = false;

    function calculateTimelineTarget() {
      const container = document.getElementById('career-timeline-container');
      if (!container) return 0;
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const focalY = viewportHeight * 0.5;
      const relativeY = focalY - rect.top;
      return Math.max(0, Math.min(rect.height, relativeY));
    }

    function animateTimeline() {
      const container = document.getElementById('career-timeline-container');
      const orb = document.getElementById('career-traveler-orb');
      const fill = document.getElementById('timeline-progress-fill');
      const rows = document.querySelectorAll('.career-row');

      if (!container || !orb || !rows.length) return;
      const rect = container.getBoundingClientRect();

      timelineCurrentY += (timelineTargetY - timelineCurrentY) * 0.22;
      if (Math.abs(timelineTargetY - timelineCurrentY) < 0.1) {
        timelineCurrentY = timelineTargetY;
      }

      if (fill && rect.height > 0) {
        const pct = (timelineCurrentY / rect.height) * 100;
        fill.style.height = `${pct}%`;
      }
      orb.style.top = `${timelineCurrentY}px`;

      let closestRow = null;
      let minDistance = Infinity;

      rows.forEach(row => {
        const rowRect = row.getBoundingClientRect();
        const rowCenterInContainer = (rowRect.top - rect.top) + (rowRect.height / 2);
        const dist = Math.abs(timelineCurrentY - rowCenterInContainer);
        row.classList.remove('active-career');

        if (dist < minDistance) {
          minDistance = dist;
          closestRow = row;
        }
      });

      const focalY = window.innerHeight * 0.5;
      const relativeY = focalY - rect.top;
      if (relativeY >= -150 && relativeY <= rect.height + 150 && closestRow) {
        closestRow.classList.add('active-career');
      }

      if (Math.abs(timelineTargetY - timelineCurrentY) >= 0.1) {
        requestAnimationFrame(animateTimeline);
      } else {
        isTimelineAnimating = false;
      }
    }

    function updateCareerTimeline() {
      timelineTargetY = calculateTimelineTarget();
      if (!isTimelineAnimating) {
        isTimelineAnimating = true;
        requestAnimationFrame(animateTimeline);
      }
    }

    const handleScroll = () => {
      updateActiveNav();
      updateReadingProgress();
      updateCareerTimeline();

      const mainHeader = document.getElementById("main-header");
      if (mainHeader) {
        const maxScroll = 150;
        const scrollY = Math.min(window.scrollY, maxScroll);
        const progress = scrollY / maxScroll;
        const currentBorderAlpha = 0.15 * progress;
        mainHeader.style.border = `1px solid rgba(255, 255, 255, ${currentBorderAlpha})`;
        const currentRadius = (9999 - 40) * progress + 40;
        mainHeader.style.borderRadius = `${currentRadius}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateCareerTimeline);

    updateActiveNav();
    updateReadingProgress();
    updateCareerTimeline();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateCareerTimeline);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const openCertModal = (e, src, title) => {
    if (e) e.preventDefault();
    setCertModal({ open: true, src, title });
  };

  const closeCertModal = () => {
    setCertModal({ open: false, src: '', title: '' });
  };

  return (
    <div className="relative antialiased min-h-screen text-[#dfdfdf]">
      {/* PixelBlast Background Layer */}
      <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}>
        <PixelBlast
          variant="diamond"
          pixelSize={3}
          color="#B497CF"
          patternScale={4}
          patternDensity={1.05}
          pixelSizeJitter={0.55}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={false}
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.65}
          edgeFade={0.25}
          transparent
        />
      </div>

      {/* Ambient gradient overlay */}
      <div className="custom-background"></div>

      {/* Cursor Trail Canvas */}
      <canvas id="cursor-canvas"></canvas>

      {/* Reading Progress Bar */}
      <div id="reading-progress"></div>

      {/* Header */}
      <header id="main-header" className="fixed w-[90%] sm:w-[80%] md:w-[60%] lg:w-[45%] transition-all duration-500 ease-in-out z-50">
        <div id="header-inner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center py-3">
          <nav className="flex space-x-6 sm:space-x-10">
            <div className="relative flex items-center">
              <span className="nav-active-circle animate" id="home-circle"></span>
              <a href="#hero" className="nav-link text-gray-400 font-medium ml-2 sm:ml-4 active" id="home-link">Home</a>
            </div>
            <div className="relative flex items-center">
              <span className="nav-active-circle"></span>
              <a href="#about" className="nav-link text-gray-400 font-medium ml-2 sm:ml-4">About</a>
            </div>
            <div className="relative flex items-center">
              <span className="nav-active-circle"></span>
              <a href="#career" className="nav-link text-gray-400 font-medium ml-2 sm:ml-4">Career</a>
            </div>
            <div className="relative flex items-center">
              <span className="nav-active-circle"></span>
              <a href="#projects" className="nav-link text-gray-400 font-medium ml-2 sm:ml-4">Projects</a>
            </div>
            <div className="relative flex items-center">
              <span className="nav-active-circle"></span>
              <a href="#achievements" className="nav-link text-gray-400 font-medium ml-2 sm:ml-4">Achievements</a>
            </div>
            <div className="relative flex items-center">
              <span className="nav-active-circle"></span>
              <a href="#certifications" className="nav-link text-gray-400 font-medium ml-2 sm:ml-4">Certifications</a>
            </div>
            <div className="relative flex items-center">
              <span className="nav-active-circle"></span>
              <a href="#contact" className="nav-link text-gray-400 font-medium ml-2 sm:ml-4">Contact</a>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        <section id="hero" className="reveal-up text-white pt-24 md:pt-12 pb-12 flex items-center justify-center min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center md:text-left gap-6 md:grid md:grid-cols-3 md:items-center space-y-8 md:space-y-0">
            <div className="md:col-span-1 flex flex-col items-center md:items-start">
              <p className="text-gray-200 text-xl sm:text-2xl font-semibold mb-1 drop-shadow">Hi, I'm Kapil Kumar</p>
              <h1 className="text-5xl sm:text-6xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-md">
                AI Engineer
              </h1>
              <div className="flex space-x-4 mt-2">
                <a href="https://github.com/Kapil6996" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="GitHub Profile">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.475.087.687-.212.687-.472 0-.232-.007-.847-.011-1.672-2.782.602-3.371-1.336-3.371-1.336-.454-1.154-1.11-1.46-1.11-1.46-.908-.62.069-.608.069-.608 1.004.07 1.532 1.03 1.532 1.03.89 1.529 2.336 1.087 2.903.829.091-.645.349-1.087.635-1.334-2.22-.253-4.555-1.113-4.555-4.949 0-1.091.39-1.984 1.029-2.682-.103-.253-.446-1.27.098-2.659 0 0 .84-.27 2.75 1.025A9.458 9.458 0 0112 6.06c.85.004 1.701.116 2.502.33 1.909-1.294 2.747-1.025 2.747-1.025.546 1.39.202 2.406.099 2.659.64.698 1.028 1.591 1.028 2.682 0 3.843-2.339 4.69-4.566 4.943.359.309.678.92.678 1.855 0 1.336-.012 2.418-.012 2.746 0 .262.19.566.694.468C21.144 20.283 24 16.52 24 12.017 24 6.484 19.522 2 14 2h-2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/kapil-kumar-470549304?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn Profile">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0zM7.12 20.45H3.59V9.33h3.53v11.12zM5.35 7.74c-1.18 0-2.14-.96-2.14-2.14 0-1.18.96-2.14 2.14-2.14 1.18 0 2.14.96 2.14 2.14 0 1.18-.96 2.14-2.14 2.14zm15.1 12.71h-3.53v-5.46c0-1.3-.02-2.98-1.82-2.98-1.83 0-2.11 1.42-2.11 2.88v5.56h-3.53V9.33h3.39v1.55h.05c.47-.89 1.62-1.82 3.34-1.82 3.58 0 4.24 2.35 4.24 5.4v6.04z"/>
                  </svg>
                </a>
                <a href="mailto:kapillkumar69@gmail.com" className="social-icon-btn" aria-label="Send Email">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="md:col-span-1 flex justify-center md:justify-start pt-6 md:pt-0" data-glide-speed="0.04">
              <p className="text-xl sm:text-2xl font-normal text-gray-100 max-w-xs md:max-w-none bg-[#0a0a0c]/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl leading-relaxed">
                Turns data into decisions and algorithms into impact. From training deep learning models to building end-to-end <span className="shiny-text font-semibold">AI products</span>, I love creating smart systems that make life easier.
              </p>
            </div>

            <div className="md:col-span-1 flex justify-center md:justify-end pt-6 md:pt-0" data-glide-speed="-0.06">
              <div className="profile-image-container">
                <img src="https://raw.githubusercontent.com/Kapil6996/Kapil6996.github.io/main/Screenshot_20251101_111305.jpg" 
                     alt="Kapil Kumar Profile Picture" 
                     onError={(e) => { e.currentTarget.src='https://placehold.co/250x250/333/fff?text=Kapil'; }}
                />
              </div>        
            </div>
          </div>
        </section>

        <section id="logo-carousel-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="logo-carousel-container">
              <div className="logo-track"></div>
              <div className="logo-track"></div>
            </div>
          </div>
        </section>
        
        <section id="about" className="reveal-up py-16 sm:py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-12 drop-shadow-md">
              <span className="shiny-text">Who I am & What I do</span>
            </h2>
            <div className="md:grid md:grid-cols-2 md:gap-16">
              <div className="pt-8 md:pt-0 order-2 md:order-1">
                <h3 className="text-3xl font-semibold text-white mb-6">My Story</h3>
                <div className="text-gray-100 space-y-6 text-lg leading-relaxed mb-12 bg-[#0a0a0c]/65 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl">
                  <p>
                    I'm a B.Tech undergraduate driven by real-world learning and curiosity over standard textbook memorization. My core focus lies in Artificial Intelligence and Machine Learning—building intelligent solutions, training neural models, and understanding how complex algorithms function behind the scenes.
                  </p>
                  <p>
                    I specialize in programming languages such as C, Python, and Swift. Quick to adapt to emerging toolstacks, I am always eager to take on hands-on technical challenges and stay ahead of key industry developments shaping tomorrow's tech ecosystem.
                  </p>
                </div>

                <h3 className="text-2xl font-semibold text-white mt-12 mb-6">Core Skills</h3>
                <div className="flex flex-wrap justify-start gap-3 sm:gap-4">
                  {["C / C++", "UI/UX", "Python", "React", "Swift / iOS", "HTML & CSS", "Canva", "Git & GitHub"].map((skill, i) => (
                    <span key={i} className="glare-hover bg-[#121212] border border-white/10 text-gray-200 px-4 py-2 rounded-full font-medium shadow-sm" style={{ "--gh-width": "100%", "--gh-height": "100%", "--gh-br": "9999px", "--gh-border": "rgba(255, 255, 255, 0.15)", "--gh-rgba": "rgba(163, 117, 255, 0.6)", "--gh-angle": "135deg", "--gh-size": "200%", "--gh-duration": "0.8s" }}>{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-semibold text-white mb-6 drop-shadow">My Expertise</h3>
                <div className="space-y-4 max-w-lg md:max-w-none mx-auto md:mx-0">
                  {/* Accordion Item 1 */}
                  <div className="accordion-item bg-[#121212]/90 backdrop-blur-md rounded-xl shadow-lg border border-white/10 overflow-hidden">
                    <button 
                      onClick={() => setOpenAccordion(openAccordion === 'content-1' ? null : 'content-1')}
                      className="accordion-header w-full p-6 flex justify-between items-center text-left transition duration-300 hover:bg-[#1c1c22] rounded-xl"
                    >
                      <div className="flex items-center space-x-4">
                        <svg className="h-6 w-6 text-special-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        <span className="text-xl font-medium text-gray-100">AI Solutions</span>
                      </div>
                      <svg className={`h-6 w-6 text-gray-300 transition-transform duration-300 ${openAccordion === 'content-1' ? 'rotate-180 text-special-accent' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className={`accordion-content transition-all duration-300 ease-in-out ${openAccordion === 'content-1' ? 'max-h-96 opacity-100 p-6 pt-0' : 'max-h-0 opacity-0 px-6 py-0'}`}>
                      <div className="text-gray-200 text-base leading-relaxed border-t border-white/5 pt-4">
                        <p>I design and develop AI-driven solutions that solve real-world problems through data, automation, and intelligent modeling. From idea to implementation, my focus is on creating systems that learn, adapt, and make smarter decisions over time.</p>
                      </div>
                    </div>
                  </div>

                  {/* Accordion Item 2 */}
                  <div className="accordion-item bg-[#121212]/90 backdrop-blur-md rounded-xl shadow-lg border border-white/10 overflow-hidden">
                    <button 
                      onClick={() => setOpenAccordion(openAccordion === 'content-2' ? null : 'content-2')}
                      className="accordion-header w-full p-6 flex justify-between items-center text-left transition duration-300 hover:bg-[#1c1c22] rounded-xl"
                    >
                      <div className="flex items-center space-x-4">
                        <svg className="h-6 w-6 text-special-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xl font-medium text-gray-100">Mobile Development</span>
                      </div>
                      <svg className={`h-6 w-6 text-gray-300 transition-transform duration-300 ${openAccordion === 'content-2' ? 'rotate-180 text-special-accent' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className={`accordion-content transition-all duration-300 ease-in-out ${openAccordion === 'content-2' ? 'max-h-96 opacity-100 p-6 pt-0' : 'max-h-0 opacity-0 px-6 py-0'}`}>
                      <div className="text-gray-200 text-base leading-relaxed border-t border-white/5 pt-4">
                        <p>Early experience in native iOS development using Swift and exploring cross-platform solutions like React Native for building high-quality mobile applications.</p>
                      </div>
                    </div>
                  </div>

                  {/* Accordion Item 3 */}
                  <div className="accordion-item bg-[#121212]/90 backdrop-blur-md rounded-xl shadow-lg border border-white/10 overflow-hidden">
                    <button 
                      onClick={() => setOpenAccordion(openAccordion === 'content-3' ? null : 'content-3')}
                      className="accordion-header w-full p-6 flex justify-between items-center text-left transition duration-300 hover:bg-[#1c1c22] rounded-xl"
                    >
                      <div className="flex items-center space-x-4">
                        <svg className="h-6 w-6 text-special-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-4.414-4.414A1 1 0 0012.586 4H7a2 2 0 00-2 2v13a2 2 0 002 2zM13 3v4a1 1 0 001 1h4" />
                        </svg>
                        <span className="text-xl font-medium text-gray-100">UI/UX Design & Prototyping</span>
                      </div>
                      <svg className={`h-6 w-6 text-gray-300 transition-transform duration-300 ${openAccordion === 'content-3' ? 'rotate-180 text-special-accent' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className={`accordion-content transition-all duration-300 ease-in-out ${openAccordion === 'content-3' ? 'max-h-96 opacity-100 p-6 pt-0' : 'max-h-0 opacity-0 px-6 py-0'}`}>
                      <div className="text-gray-200 text-base leading-relaxed border-t border-white/5 pt-4">
                        <p>From wireframing in Figma to final implementation, I focus on creating intuitive, accessible, and visually stunning interfaces that enhance the overall user experience.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="career" className="reveal-up py-20 sm:py-32 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="text-center mb-20 sm:mb-28">
              <h2 className="text-5xl sm:text-7xl font-light text-white tracking-tight">
                My career &amp; <br className="sm:hidden" />
                <span className="shiny-text font-semibold">experience</span>
              </h2>
            </div>

            <div id="career-timeline-container" className="timeline-track-container relative">
              <div id="central-timeline-line"></div>
              <div id="timeline-progress-fill"></div>
              <div id="career-traveler-orb"></div>

              <div className="space-y-24 sm:space-y-36 relative z-20">
                <div className="career-row grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-center" data-year="NOW">
                  <div className="md:col-span-4 text-center md:text-right pr-0 md:pr-8">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide leading-tight">AI &amp; ML Intern</h3>
                    <p className="text-sm sm:text-base text-gray-400 font-medium mt-1">Maruti Suzuki &bull; On-site</p>
                  </div>
                  <div className="md:col-span-4 flex justify-center items-center my-2 md:my-0">
                    <span className="bg-[#050505] text-white font-black text-2xl sm:text-4xl px-5 py-2 z-20 rounded-full border border-white/10 tracking-wider shadow-2xl shadow-purple-900/40">
                      NOW
                    </span>
                  </div>
                  <div className="md:col-span-4 text-center md:text-left pl-0 md:pl-8">
                    <p className="text-gray-100 text-sm sm:text-base font-normal leading-relaxed bg-[#0a0a0c]/60 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-md">
                      Engineered an offline ML pipeline automating defect routing for customer complaint reports (FTIRs). Built ResNet-34 computer vision &amp; Decision Tree text classification models achieving 93% accuracy.
                    </p>
                    <div className="mt-3">
                      <button onClick={(e) => openCertModal(e, 'certificate.png', 'Maruti Suzuki - AI & ML Internship Certificate')} className="inline-flex items-center text-xs text-special-accent hover:underline font-semibold gap-1">
                        View Certificate &rarr;
                      </button>
                    </div>
                  </div>
                </div>

                <div className="career-row grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-center" data-year="2026">
                  <div className="md:col-span-4 text-center md:text-right pr-0 md:pr-8">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide leading-tight">AI Intern</h3>
                    <p className="text-sm sm:text-base text-gray-300 font-medium mt-1">GO-BRICS Business Lab &bull; Remote</p>
                  </div>
                  <div className="md:col-span-4 flex justify-center items-center my-2 md:my-0">
                    <span className="bg-[#050505] text-white font-extrabold text-2xl sm:text-4xl px-5 py-2 z-20 rounded-full border border-white/10 tracking-wider">
                      2026
                    </span>
                  </div>
                  <div className="md:col-span-4 text-center md:text-left pl-0 md:pl-8">
                    <p className="text-gray-100 text-sm sm:text-base font-normal leading-relaxed bg-[#0a0a0c]/60 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-md">
                      Built process automation workflows, API integrations, and AI chatbot solutions. Developed CRM dashboards, conducted tech research audits, and created digital transformation tools.
                    </p>
                    <div className="mt-3">
                      <button onClick={(e) => openCertModal(e, 'certificate.png', 'GO-BRICS Business Lab - AI Internship Certificate')} className="inline-flex items-center text-xs text-special-accent hover:underline font-semibold gap-1">
                        View Certificate &rarr;
                      </button>
                    </div>
                  </div>
                </div>

                <div className="career-row grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-center" data-year="2025">
                  <div className="md:col-span-4 text-center md:text-right pr-0 md:pr-8">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide leading-tight">AI Systems Developer</h3>
                    <p className="text-sm sm:text-base text-gray-300 font-medium mt-1">HopIn Carpooling &amp; Prototypes</p>
                  </div>
                  <div className="md:col-span-4 flex justify-center items-center my-2 md:my-0">
                    <span className="bg-[#050505] text-white font-extrabold text-2xl sm:text-4xl px-5 py-2 z-20 rounded-full border border-white/10 tracking-wider">
                      2025
                    </span>
                  </div>
                  <div className="md:col-span-4 text-center md:text-left pl-0 md:pl-8">
                    <p className="text-gray-100 text-sm sm:text-base font-normal leading-relaxed bg-[#0a0a0c]/60 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-md">
                      Designed and deployed flagship college project HopIn—an Uber-like peer-to-peer carpooling web application to optimize daily commutes and cut vehicle carbon emissions.
                    </p>
                  </div>
                </div>

                <div className="career-row grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-center" data-year="2024">
                  <div className="md:col-span-4 text-center md:text-right pr-0 md:pr-8">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide leading-tight">Python &amp; ML Foundations</h3>
                    <p className="text-sm sm:text-base text-gray-300 font-medium mt-1">Self-Taught &amp; Academic Focus</p>
                  </div>
                  <div className="md:col-span-4 flex justify-center items-center my-2 md:my-0">
                    <span className="bg-[#050505] text-white font-extrabold text-2xl sm:text-4xl px-5 py-2 z-20 rounded-full border border-white/10 tracking-wider">
                      2024
                    </span>
                  </div>
                  <div className="md:col-span-4 text-center md:text-left pl-0 md:pl-8">
                    <p className="text-gray-100 text-sm sm:text-base font-normal leading-relaxed bg-[#0a0a0c]/60 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-md">
                      Dived deep into Python programming, object-oriented concepts in C/C++, Swift iOS prototypes, linear algebra, and neural network fundamentals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section with 3D Pinned Laptop & Mouse Hover Tilt Effect */}
        <section id="projects" className="relative min-h-[220vh] py-12">
          {/* Sticky Viewport Container */}
          <div className="sticky top-0 h-screen flex flex-col justify-center items-center py-6 px-4 sm:px-8 lg:px-12 overflow-hidden z-20">
            
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
              
              {/* LEFT COLUMN: Project Details (Matching Image 1 Design) */}
              <div className="lg:col-span-5 flex flex-col items-start justify-center space-y-4 sm:space-y-5 text-left">
                
                {/* Number Badge & Cyan Line Accent */}
                <div className="flex items-center space-x-3 font-mono text-cyan-400 text-sm sm:text-base font-bold">
                  <span className="w-10 h-0.5 bg-cyan-400 inline-block shadow-[0_0_10px_#22d3ee]"></span>
                  <span className="tracking-widest text-cyan-300">PROJECT {projectsData[activeProjectIndex].number}</span>
                </div>

                {/* Main Project Title */}
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
                  {projectsData[activeProjectIndex].title}
                </h3>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {projectsData[activeProjectIndex].tech.map((t, idx) => (
                    <span key={idx} className="text-xs bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 px-3 py-1 rounded-full font-medium shadow-sm">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Project Description */}
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-light bg-[#0a0a0c]/60 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-md">
                  {projectsData[activeProjectIndex].description}
                </p>

                {/* Key Bullet Points */}
                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-300 border-l-2 border-cyan-400/30 pl-4 py-1">
                  {projectsData[activeProjectIndex].bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Cyan CTA Action Button (Matching Image 1) */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {projectsData[activeProjectIndex].demo ? (
                    <a
                      href={projectsData[activeProjectIndex].demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-sm sm:text-base rounded-xl transition-all duration-300 shadow-xl shadow-cyan-400/25 hover:shadow-cyan-400/40 hover:scale-105 flex items-center gap-2"
                    >
                      View website &rarr;
                    </a>
                  ) : (
                    <a
                      href={projectsData[activeProjectIndex].github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-sm sm:text-base rounded-xl transition-all duration-300 shadow-xl shadow-cyan-400/25 hover:shadow-cyan-400/40 hover:scale-105 flex items-center gap-2"
                    >
                      View GitHub Repository &rarr;
                    </a>
                  )}

                  {projectsData[activeProjectIndex].demo && projectsData[activeProjectIndex].github && (
                    <a
                      href={projectsData[activeProjectIndex].github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 bg-[#16161a] hover:bg-[#22222a] text-white font-semibold text-xs sm:text-sm rounded-xl border border-white/15 transition-all duration-300 flex items-center gap-2"
                    >
                      GitHub Code
                    </a>
                  )}
                </div>

                {/* Step Indicators */}
                <div className="flex items-center space-x-3 pt-3">
                  <div className="flex space-x-2">
                    {projectsData.map((_, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => setActiveProjectIndex(pIdx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          pIdx === activeProjectIndex ? 'w-8 bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'w-2 bg-gray-600 hover:bg-gray-400'
                        }`}
                        title={`Go to Project ${pIdx + 1}`}
                        aria-label={`Project ${pIdx + 1}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 font-mono font-medium">
                    0{activeProjectIndex + 1} / 0{projectsData.length}
                  </span>
                </div>

              </div>

              {/* RIGHT COLUMN: 3D Laptop Showcase Assembly */}
              <div className="lg:col-span-7 relative flex flex-col items-center justify-center translate-x-4 sm:translate-x-12 lg:translate-x-20 xl:translate-x-24 [perspective:1400px]">
                
                {/* Floating Side Arrow Navigation Buttons */}
                <button
                  onClick={prevProject}
                  className={`absolute left-0 sm:-left-6 z-40 p-3 sm:p-4 rounded-full bg-[#0d0d12]/90 border border-white/20 text-white hover:border-cyan-400 hover:bg-cyan-400/20 shadow-2xl transition-all duration-300 transform active:scale-95 ${
                    activeArrowKey === 'left' ? 'scale-110 border-cyan-400 bg-cyan-400/40 shadow-[0_0_20px_#22d3ee]' : ''
                  }`}
                  title="Previous Project (Left Arrow Key)"
                  aria-label="Previous Project"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={nextProject}
                  className={`absolute right-0 sm:-right-6 z-40 p-3 sm:p-4 rounded-full bg-[#0d0d12]/90 border border-white/20 text-white hover:border-cyan-400 hover:bg-cyan-400/20 shadow-2xl transition-all duration-300 transform active:scale-95 ${
                    activeArrowKey === 'right' ? 'scale-110 border-cyan-400 bg-cyan-400/40 shadow-[0_0_20px_#22d3ee]' : ''
                  }`}
                  title="Next Project (Right Arrow Key)"
                  aria-label="Next Project"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* 3D LAPTOP DEVICE (1:1 Exact Match to Reference Image) */}
                <div 
                  className="relative w-[330px] sm:w-[540px] md:w-[620px] lg:w-[680px] my-auto translate-x-4 sm:translate-x-8 lg:translate-x-10 transition-transform duration-200 ease-out [transform-style:preserve-3d]"
                  style={{
                    transform: 'perspective(1400px) rotateX(12deg) rotateY(0deg) scale(1)'
                  }}
                >
                  {/* WHITE GRAPHIC ACCENT ON RIGHT SIDE (Matching Reference Image) */}
                  <div className="absolute -right-5 sm:-right-10 bottom-6 sm:bottom-10 z-10 pointer-events-none opacity-90">
                    <svg className="w-10 h-10 sm:w-16 sm:h-16 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5 3l14 9-14 9V3z" />
                    </svg>
                  </div>

                  {/* LAPTOP LID / SCREEN */}
                  <div 
                    className="relative w-full h-[220px] sm:h-[350px] md:h-[410px] bg-[#1a1a20] rounded-t-[20px] sm:rounded-t-[28px] border-[8px] sm:border-[12px] border-b-0 border-[#22222a] shadow-[0_30px_60px_rgba(0,0,0,0.95)] overflow-hidden origin-bottom transition-transform duration-300 ease-out [transform-style:preserve-3d]"
                    style={{
                      transform: `rotateX(${Math.max(0, 85 - projectScrollProgress * 85)}deg)`
                    }}
                  >
                    {/* Camera Lens */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#111116] border border-[#33333d] z-40 flex items-center justify-center">
                      <span className="w-0.5 h-0.5 rounded-full bg-blue-400/80"></span>
                    </div>

                    {/* FULL BLEED SCREEN DISPLAY */}
                    <div className="relative w-full h-full bg-[#050508] overflow-hidden group">
                      <img 
                        src={projectsData[activeProjectIndex].image} 
                        alt={projectsData[activeProjectIndex].title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>

                      {/* Screen Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                        <span className="text-xs text-cyan-400 font-mono font-bold uppercase tracking-wider mb-1">
                          {projectsData[activeProjectIndex].number} — {projectsData[activeProjectIndex].subtitle}
                        </span>
                        <h4 className="text-lg sm:text-2xl font-extrabold text-white">
                          {projectsData[activeProjectIndex].title}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* LAPTOP BASE & KEYBOARD DECK (Matching Reference Image) */}
                  <div className="relative w-full h-[95px] sm:h-[150px] bg-gradient-to-b from-[#24242c] via-[#1a1a22] to-[#121218] rounded-b-[20px] sm:rounded-b-[28px] border-t-2 border-[#383842] shadow-[0_45px_90px_rgba(0,0,0,0.98)] p-2 sm:p-3 flex flex-col justify-between [transform-style:preserve-3d]">
                    {/* Front Lip Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-28 h-2.5 bg-[#121218] rounded-b-md"></div>

                    {/* Recessed Keyboard Deck */}
                    <div className="flex-1 bg-[#14141a] rounded-xl p-1.5 sm:p-2 border border-white/5 flex flex-col justify-between shadow-inner">
                      {/* Keycaps Rows Mockup */}
                      <div className="grid grid-cols-12 gap-1 sm:gap-1.5 opacity-60">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <div key={i} className="h-1.5 sm:h-3 bg-[#24242e] rounded-[3px] border border-white/5"></div>
                        ))}
                      </div>

                      {/* Bottom Deck Row: Spacebar, Wide Trackpad & Highlighted Arrow Keys */}
                      <div className="flex justify-between items-end px-1 pt-1">
                        <div className="w-1/4 h-2 sm:h-4 bg-[#24242e] rounded-sm border border-white/5"></div>

                        {/* Large Wide Centered Trackpad */}
                        <div className="w-2/5 h-6 sm:h-12 bg-[#191922] rounded-lg border border-white/10 mx-auto shadow-inner"></div>

                        {/* Highlighted Arrow Keys */}
                        <div className="flex space-x-1 items-center bg-[#0a0a0e] p-1 rounded-lg border border-white/10 shadow-inner">
                          <button
                            onClick={prevProject}
                            className={`px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-black transition-all duration-200 ${
                              activeArrowKey === 'left'
                                ? 'bg-cyan-400 text-black shadow-[0_0_15px_#22d3ee] scale-110'
                                : 'bg-[#20202a] text-cyan-300 hover:bg-cyan-400/20 border border-cyan-500/30'
                            }`}
                            title="Click or press Left Arrow key"
                          >
                            ◀
                          </button>
                          <button
                            onClick={nextProject}
                            className={`px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-black transition-all duration-200 ${
                              activeArrowKey === 'right'
                                ? 'bg-cyan-400 text-black shadow-[0_0_15px_#22d3ee] scale-110'
                                : 'bg-[#20202a] text-cyan-300 hover:bg-cyan-400/20 border border-cyan-500/30'
                            }`}
                            title="Click or press Right Arrow key"
                          >
                            ▶
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Honors & Achievements Bento Gallery Grid Section (Matching Reference Layout) */}
        <section id="achievements" className="reveal-up py-20 sm:py-28 relative overflow-hidden border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center sm:text-left z-20 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold tracking-widest uppercase text-cyan-400 mb-1 drop-shadow">
                  Certificates &amp; Recognition
                </p>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  Honors &amp; <span className="shiny-text">Achievements</span>
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 font-light bg-[#0a0a0c]/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 inline-block">
                📸 Click any photo to enlarge in full-screen
              </p>
            </div>
          </div>

          {/* MASONRY GALLERY GRID (1:1 Match to Reference Image Layout) */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20 relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              
              {/* COLUMN 1 */}
              <div className="flex flex-col gap-4 sm:gap-5" data-glide-speed="0.04">
                {/* Photo 1 (Tall) */}
                <div 
                  onClick={(e) => openCertModal(e, achievementsData[0].image, `${achievementsData[0].title} — ${achievementsData[0].issuer}`)}
                  className="group relative h-[320px] sm:h-[380px] bg-[#0a0a0c] border border-white/15 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]"
                >
                  <img src={achievementsData[0].image} alt={achievementsData[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
                    <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider">{achievementsData[0].category}</span>
                    <h3 className="text-base font-bold text-white mt-0.5">{achievementsData[0].title}</h3>
                  </div>
                </div>
                {/* Photo 2 (Landscape) */}
                <div 
                  onClick={(e) => openCertModal(e, achievementsData[1].image, `${achievementsData[1].title} — ${achievementsData[1].issuer}`)}
                  className="group relative h-[210px] sm:h-[240px] bg-[#0a0a0c] border border-white/15 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]"
                >
                  <img src={achievementsData[1].image} alt={achievementsData[1].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
                    <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider">{achievementsData[1].category}</span>
                    <h3 className="text-base font-bold text-white mt-0.5">{achievementsData[1].title}</h3>
                  </div>
                </div>
              </div>

              {/* COLUMN 2 */}
              <div className="flex flex-col gap-4 sm:gap-5" data-glide-speed="-0.03">
                {/* Photo 3 (Very Tall) */}
                <div 
                  onClick={(e) => openCertModal(e, achievementsData[5].image, `${achievementsData[5].title} — ${achievementsData[5].issuer}`)}
                  className="group relative h-[390px] sm:h-[450px] bg-[#0a0a0c] border border-white/15 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]"
                >
                  <img src={achievementsData[5].image} alt={achievementsData[5].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
                    <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider">{achievementsData[5].category}</span>
                    <h3 className="text-base font-bold text-white mt-0.5">{achievementsData[5].title}</h3>
                  </div>
                </div>
                {/* Photo 4 (Medium) */}
                <div 
                  onClick={(e) => openCertModal(e, achievementsData[2].image, `${achievementsData[2].title} — ${achievementsData[2].issuer}`)}
                  className="group relative h-[180px] sm:h-[200px] bg-[#0a0a0c] border border-white/15 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]"
                >
                  <img src={achievementsData[2].image} alt={achievementsData[2].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
                    <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider">{achievementsData[2].category}</span>
                    <h3 className="text-base font-bold text-white mt-0.5">{achievementsData[2].title}</h3>
                  </div>
                </div>
              </div>

              {/* COLUMN 3 */}
              <div className="flex flex-col gap-4 sm:gap-5" data-glide-speed="0.05">
                {/* Photo 5 (Landscape) */}
                <div 
                  onClick={(e) => openCertModal(e, achievementsData[3].image, `${achievementsData[3].title} — ${achievementsData[3].issuer}`)}
                  className="group relative h-[200px] sm:h-[230px] bg-[#0a0a0c] border border-white/15 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]"
                >
                  <img src={achievementsData[3].image} alt={achievementsData[3].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
                    <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider">{achievementsData[3].category}</span>
                    <h3 className="text-base font-bold text-white mt-0.5">{achievementsData[3].title}</h3>
                  </div>
                </div>
                {/* Photo 6 (Medium) */}
                <div 
                  onClick={(e) => openCertModal(e, achievementsData[4].image, `${achievementsData[4].title} — ${achievementsData[4].issuer}`)}
                  className="group relative h-[190px] sm:h-[210px] bg-[#0a0a0c] border border-white/15 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]"
                >
                  <img src={achievementsData[4].image} alt={achievementsData[4].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
                    <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider">{achievementsData[4].category}</span>
                    <h3 className="text-base font-bold text-white mt-0.5">{achievementsData[4].title}</h3>
                  </div>
                </div>
                {/* Photo 7 (Medium) */}
                <div 
                  onClick={(e) => openCertModal(e, achievementsData[6].image, `${achievementsData[6].title} — ${achievementsData[6].issuer}`)}
                  className="group relative h-[180px] sm:h-[200px] bg-[#0a0a0c] border border-white/15 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]"
                >
                  <img src={achievementsData[6].image} alt={achievementsData[6].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
                    <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider">{achievementsData[6].category}</span>
                    <h3 className="text-base font-bold text-white mt-0.5">{achievementsData[6].title}</h3>
                  </div>
                </div>
              </div>

              {/* COLUMN 4 */}
              <div className="flex flex-col gap-4 sm:gap-5" data-glide-speed="-0.04">
                {/* Photo 8 (Tall) */}
                <div 
                  onClick={(e) => openCertModal(e, achievementsData[7].image, `${achievementsData[7].title} — ${achievementsData[7].issuer}`)}
                  className="group relative h-[310px] sm:h-[350px] bg-[#0a0a0c] border border-white/15 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]"
                >
                  <img src={achievementsData[7].image} alt={achievementsData[7].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
                    <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider">{achievementsData[7].category}</span>
                    <h3 className="text-base font-bold text-white mt-0.5">{achievementsData[7].title}</h3>
                  </div>
                </div>
                {/* Photo 9 (Tall) */}
                <div 
                  onClick={(e) => openCertModal(e, achievementsData[8].image, `${achievementsData[8].title} — ${achievementsData[8].issuer}`)}
                  className="group relative h-[290px] sm:h-[320px] bg-[#0a0a0c] border border-white/15 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]"
                >
                  <img src={achievementsData[8].image} alt={achievementsData[8].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
                    <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider">{achievementsData[8].category}</span>
                    <h3 className="text-base font-bold text-white mt-0.5">{achievementsData[8].title}</h3>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Courses & Certifications Section (Transparent Glassmorphism + Portfolio Palette) */}
        <section id="certifications" ref={certSectionRef} className="reveal-up relative min-h-[220vh] py-12 border-t border-white/10 bg-transparent">
          <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center bg-transparent">
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 z-20 w-full">
              <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-cyan-400 mb-1 drop-shadow">
                CERTIFICATIONS
              </p>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  Courses &amp; <span className="shiny-text">Certifications</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 font-light bg-[#0a0a0c]/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 inline-block">
                  ↕ Scroll mouse down to slide certificates horizontally
                </p>
              </div>
            </div>

            {/* HORIZONTAL TRANSLATING TRACK */}
            <div className="w-full overflow-hidden z-20 py-4">
              <div 
                className="cert-horizontal-track flex space-x-6 sm:space-x-8 px-4 sm:px-16 transition-transform duration-100 ease-out"
                style={{ transform: `translateX(${certTranslateX}px)` }}
              >
                {certificationsData.map((cert, idx) => (
                  <div
                    key={idx}
                    onClick={(e) => openCertModal(e, cert.image, `${cert.num} ${cert.title} — ${cert.issuer}`)}
                    className="shrink-0 w-[300px] sm:w-[360px] md:w-[410px] bg-[#0a0a0c]/70 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-2xl transition-all duration-300 hover:scale-[1.03] hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] cursor-pointer group"
                  >
                    {/* Header Row: Big Number & Issuer */}
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-4xl sm:text-5xl font-extrabold text-cyan-400/90 font-serif tracking-tight drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]">
                          {cert.num}
                        </span>
                        <div className="text-right max-w-[210px]">
                          <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {cert.title}
                          </h4>
                          <span className="text-xs font-mono text-cyan-400/80 font-semibold block mt-0.5">
                            {cert.issuer}
                          </span>
                        </div>
                      </div>

                      {/* Skills Covered */}
                      <div className="mb-6 pt-3 border-t border-white/10">
                        <span className="text-xs font-semibold text-gray-400 block mb-1">Skills covered</span>
                        <p className="text-xs text-gray-200 font-light leading-relaxed">
                          {cert.skills}
                        </p>
                      </div>
                    </div>

                    {/* Certificate Image Frame */}
                    <div className="relative h-44 sm:h-52 w-full rounded-xl overflow-hidden border border-white/10 bg-black/60 shadow-inner group-hover:border-cyan-400/50">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                        <span className="text-xs font-bold text-cyan-300 bg-black/90 px-3 py-1.5 rounded-full border border-cyan-400/50 shadow-lg">
                          Click to Enlarge 🔍
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        <section id="contact" className="reveal-up py-16 sm:py-24 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:grid md:grid-cols-2 md:gap-16">
              <div className="mb-12 md:mb-0">
                <p className="text-xl font-medium mb-2">
                  <span className="shiny-text">Let's talk</span>
                </p>
                <h2 className="text-5xl sm:text-6xl font-extrabold text-white mb-8">Contact</h2>
                <p className="text-xl text-gray-400 mb-6 max-w-md">
                  Have a question or a project in mind? Feel free to reach out.
                </p>
                <div className="text-lg text-gray-300 space-y-2">
                  <p><strong>Location:</strong> Gurugram, Delhi, India</p>
                  <p><strong>Email:</strong> <a href="mailto:kapillkumar69@gmail.com" className="hover:underline text-special-accent">kapillkumar69@gmail.com</a></p>
                </div>
              </div>
              
              <div>
                <form onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully!'); }} className="space-y-6">
                  <div className="relative">
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input type="text" id="name" name="name" placeholder="Name" required className="contact-input" />
                  </div>
                  
                  <div className="relative">
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input type="email" id="email" name="email" placeholder="Email" required className="contact-input" />
                  </div>

                  <div className="relative">
                    <label htmlFor="message" className="sr-only">Message</label>
                    <textarea id="message" name="message" rows="5" placeholder="Message" required className="contact-input resize-none"></textarea>
                  </div>

                  <button type="submit" className="w-full bg-[#121212] text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:bg-[#1a1a1a] transition duration-300 border border-white/10">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#020202] text-white py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500">&copy; 2026 Kapil Kumar. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-3">
            <a href="#hero" className="text-gray-500 hover:text-accent-gray transition duration-150 text-sm">Back to Top</a>
          </div>
        </div>
      </footer>

      {/* Certificate Modal */}
      {certModal.open && (
        <div id="cert-modal" className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 transition-opacity duration-300" onClick={closeCertModal}>
          <div className="relative max-w-3xl w-full bg-[#121212] border border-white/10 rounded-xl p-4 overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center pb-3 mb-3 border-b border-white/10">
              <h3 id="cert-modal-title" className="text-lg font-bold text-white">{certModal.title}</h3>
              <button onClick={closeCertModal} className="text-gray-400 hover:text-white text-2xl font-bold px-2 leading-none">&times;</button>
            </div>
            <div className="flex justify-center bg-black/50 rounded-lg p-2 max-h-[80vh] overflow-auto">
              <img id="cert-modal-img" src={certModal.src} alt="Certificate" className="max-w-full max-h-[70vh] object-contain rounded" onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x600/101010/A375FF?text=Certificate+Preview'; }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
