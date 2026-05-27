import { useState, useEffect, useRef } from 'react';
import './App.css';

// ── Animation hook ──
function useAnimate(direction = 'up', delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = `${delay}ms`;
    el.classList.add(`anim-${direction}`);
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) { el.classList.add('visible'); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [direction, delay]);
  return ref;
}
function useFadeIn() { return useAnimate('up', 0); }

// ── Data ──
const projects = [
  {
    name: 'Flutter Bot',
    featured: true,
    desc: 'AI chatbot app powered by Google Dialogflow for natural language understanding and intent-based responses. Supports both mobile and web.',
    stack: ['Flutter', 'Dart', 'Dialogflow', 'AI'],
    demo: 'https://github.com/Yashsukhadiya1/flutter_bot',
    download: 'https://github.com/Yashsukhadiya1/feedback_form/raw/main/apk/app-release.apk',
  },
  {
    name: 'Feedback Form',
    featured: true,
    desc: 'Full-stack Flutter app for customer feedback with automatic ML classification using TF-IDF + Logistic Regression, Firebase Firestore storage, and email confirmation via Gmail SMTP.',
    stack: ['Flutter', 'FastAPI', 'Scikit-learn', 'Firebase'],
    demo: 'https://github.com/Yashsukhadiya1/feedback_form',
    download: 'https://github.com/Yashsukhadiya1/feedback_form/raw/main/apk/app-release.apk',
  },
  {
    name: 'iChat — Real-Time Chat',
    featured: true,
    desc: 'Real-time chat application built with Node.js and Socket.IO. Supports instant messaging, user join/leave broadcasts, and live connection events.',
    stack: ['Node.js', 'Socket.IO', 'HTML/CSS', 'JavaScript'],
    demo: 'https://github.com/Yashsukhadiya1/chat-app',
    download: null,
  },
  {
    name: 'CA Diary',
    featured: true,
    desc: 'Diary management app built for chartered accountants to track tasks, clients, and daily work entries. Available on Google Play.',
    stack: ['Flutter', 'Dart', 'Mobile'],
    demo: 'https://github.com/Yashsukhadiya1/ca_app',
    download: 'https://play.google.com/store/apps/details?id=gnhub.cadiary',
  },
  { name: 'Coming Soon', featured: true, desc: 'New project in progress — stay tuned.', stack: [], demo: null, download: null, comingSoon: true },
  { name: 'Coming Soon', featured: true, desc: 'New project in progress — stay tuned.', stack: [], demo: null, download: null, comingSoon: true },
];

// secondary projects — shown in small cards under "More Projects"
const moreProjects = [
  {
    name: 'Food Recipe App',
    desc: 'React app for searching meal recipes using TheMealDB API with routing and clean UI.',
    stack: ['React', 'React Router', 'TheMealDB API'],
    demo: 'https://github.com/Yashsukhadiya1/recipe-app',
    download: null,
  },
  {
    name: 'Weather App',
    desc: 'Real-time weather app showing temperature, conditions, and wind speed for any city via OpenWeatherMap API.',
    stack: ['React', 'Axios', 'OpenWeatherMap'],
    demo: 'https://github.com/Yashsukhadiya1/weather_app',
    download: null,
  },
  {
    name: 'Calculator',
    desc: 'Clean online calculator built with pure HTML and CSS — no JavaScript frameworks.',
    stack: ['HTML', 'CSS'],
    demo: 'https://github.com/Yashsukhadiya1/Calculator',
    download: null,
  },
  {
    name: 'QR Code Generator',
    desc: 'React app that generates QR codes from any text or URL with PNG download and clipboard copy.',
    stack: ['React.js'],
    demo: 'https://github.com/Yashsukhadiya1/generate-qr-code-using-reactjs',
    download: null,
  },
  { name: 'Coming Soon', desc: 'New project in progress — stay tuned.', stack: [], demo: null, download: null, comingSoon: true },
  { name: 'Coming Soon', desc: 'New project in progress — stay tuned.', stack: [], demo: null, download: null, comingSoon: true },
];

const mlModels = [
  {
    icon: '🏠',
    name: 'House Price Prediction',
    year: '2025',
    desc: 'Linear regression model to predict house prices based on square footage, number of bedrooms and bathrooms. Trained on Kaggle House Prices dataset.',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'Linear Regression'],
    demo: 'https://github.com/Yashsukhadiya1/PRODIGY_ML_01',
    download: null,
  },
  {
    icon: '🛒',
    name: 'Customer Segmentation',
    year: '2025',
    desc: 'K-Means clustering to group retail store customers based on purchase history. Visualized segments using Matplotlib on the Mall Customers dataset.',
    tags: ['Python', 'Scikit-learn', 'KMeans', 'Seaborn'],
    demo: 'https://github.com/Yashsukhadiya1/PRODIGY_ML_02',
    download: null,
  },
  {
    icon: '🐱',
    name: 'Cat vs Dog Classifier',
    year: '2025',
    desc: 'SVM-based image classifier to distinguish cats from dogs using the Kaggle Dogs vs. Cats dataset with image preprocessing via OpenCV.',
    tags: ['Python', 'SVM', 'OpenCV', 'Scikit-learn'],
    demo: 'https://github.com/Yashsukhadiya1/PRODIGY_ML_03',
    download: null,
  },
];

const techStack = [
  { label: 'Languages', tags: ['Java', 'Python', 'C', 'Dart'] },
  { label: 'Frontend', tags: ['HTML', 'CSS', 'JavaScript', 'ReactJS'] },
  { label: 'Mobile', tags: ['Flutter', 'Dart'] },
  { label: 'Backend', tags: ['PHP', 'Node.js', 'FastAPI'] },
  { label: 'Database', tags: ['MySQL', 'SQLite', 'Firebase'] },
  { label: 'Core Subjects', tags: ['Data Structures', 'Operating Systems', 'DBMS'] },
];

const certifications = ['NPTEL — Data Structures (4 Credit, Score: 65%, May 2025)'];

// ── Navbar ──
function Navbar({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <a href="#hero" className="nav-logo">yash<span>.sukhadiya</span></a>
      <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
        {['projects', 'skills', 'resume', 'contact'].map(s => (
          <li key={s}><a href={`#${s}`} onClick={() => setMenuOpen(false)}>{s}</a></li>
        ))}
      </ul>
      <button className="nav-menu-btn" onClick={() => setMenuOpen(o => !o)} aria-label="menu">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {menuOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
        </svg>
      </button>
    </nav>
  );
}

// ── Animated canvas background for hero ──
function HeroCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    const NODES = 80;
    const nodes = [];

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < NODES; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 3 + 1.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(37,99,235,${0.45 * (1 - dist / 160)})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(37,99,235,0.6)';
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="hero-canvas" />;
}

// ── Hero ──
function Hero() {
  const [typed, setTyped] = useState('');
  const roles = ['Flutter Developer', 'Machine Learning Expert', 'AI Integrated with Flutter', 'AI Automations'];
  const [roleIdx, setRoleIdx] = useState(0);

  const eyebrowRef = useAnimate('up', 0);
  const nameRef    = useAnimate('up', 80);
  const roleRef    = useAnimate('up', 160);
  const descRef    = useAnimate('up', 220);
  const btnsRef    = useAnimate('up', 280);
  const eduRef     = useAnimate('up', 340);

  useEffect(() => {
    let i = 0; const cur = roles[roleIdx]; setTyped('');
    const t = setInterval(() => {
      setTyped(cur.slice(0, ++i));
      if (i === cur.length) { clearInterval(t); setTimeout(() => setRoleIdx(r => (r + 1) % roles.length), 2200); }
    }, 65);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleIdx]);

  return (
    <section id="hero" className="hero">
      <HeroCanvas />
      <div className="hero-inner">
        <div className="hero-eyebrow anim-base" ref={eyebrowRef}>
          <span className="status-dot" /> available for opportunities
        </div>
        <h1 className="hero-name anim-base" ref={nameRef}>
          Yash<br /><span className="accent">Sukhadiya</span>
        </h1>
        <p className="hero-role anim-base" ref={roleRef}>
          {typed}<span className="typed-cursor">|</span>
        </p>
        <p className="hero-desc anim-base" ref={descRef}>
          Flutter & React developer with hands-on internship experience building production-level mobile apps, AI-integrated systems, and responsive web applications.
        </p>
        <div className="hero-btns anim-base" ref={btnsRef}>
          <a href="https://github.com/Yashsukhadiya1" target="_blank" rel="noreferrer" className="btn-primary"><GithubIcon /> GitHub</a>
          <a href="https://www.linkedin.com/in/yash-sukhadiya-5219552b2/" target="_blank" rel="noreferrer" className="btn-ghost"><LinkedinIcon /> LinkedIn</a>
          <a href="mailto:23amtics020@gmail.com" className="btn-ghost"><MailIcon /> Email</a>
        </div>
        <div className="hero-edu anim-base" ref={eduRef}>
          <div className="edu-box">
            <span className="edu-badge">🎓</span>
            <div>
              <p className="edu-degree">Asha M. Tarsadia Institute of Science and Technology</p>
              <p className="edu-uni">B.Tech — Information Technology</p>
              <p className="edu-meta"><span className="accent-text">Oct 2023 – Present</span> · CGPA 9</p>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-scroll-hint">scroll ↓</div>
    </section>
  );
}


// ── Projects ──
function Projects() {
  const [showMore, setShowMore] = useState(false);
  const ref = useFadeIn();
  return (
    <section id="projects" className="section">
      <div className="section-head fade-up" ref={ref}>
        <span className="eyebrow">selected work</span>
        <h2 className="section-title">Projects <span className="accent">&amp; Builds</span></h2>
        <p className="section-sub">Things I've built — apps, tools, and experiments</p>
      </div>

      <div className="proj-grid">
        {projects.map((p, i) => <ProjectRow key={p.name} project={p} index={i} />)}
      </div>

      {moreProjects.length > 0 && (
        <div className="more-proj-wrap">
          <button className="view-all-btn" onClick={() => setShowMore(s => !s)}>
            {showMore ? '↑ Hide' : `More Projects (${moreProjects.length}) →`}
          </button>
          {showMore && (
            <div className="proj-grid-small">
              {moreProjects.map((p, i) => <SmallProjectCard key={p.name + i} project={p} index={i} />)}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function SmallProjectCard({ project, index }) {
  const ref = useAnimate('up', index * 50);
  if (project.comingSoon) {
    return (
      <div className="proj-card-small proj-coming-soon anim-base" ref={ref}>
        <div className="coming-soon-inner">
          <span className="coming-soon-icon">🚀</span>
          <p className="coming-soon-label">Coming Soon</p>
          <p className="coming-soon-sub">New project in progress</p>
        </div>
      </div>
    );
  }
  return (
    <div className="proj-card-small anim-base" ref={ref}>
      <div className="proj-card-header">
        <p className="proj-name" style={{ fontSize: '0.88rem' }}>{project.name}</p>
        <div className="proj-header-btns">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="icon-btn" aria-label="Repo">
              <ExternalIcon />
              <span className="icon-btn-tip">View Repo</span>
            </a>
          )}
          {project.download && (
            <a href={project.download} target="_blank" rel="noreferrer" className="icon-btn icon-btn-primary" aria-label="Download">
              <DownloadIcon />
              <span className="icon-btn-tip">Download</span>
            </a>
          )}
        </div>
      </div>
      <p className="proj-desc" style={{ fontSize: '0.78rem' }}>{project.desc}</p>
      <div className="proj-tags">
        {project.stack.map(t => <span key={t} className="tag tag-blue">{t}</span>)}
      </div>
    </div>
  );
}

function ProjectRow({ project, index }) {
  const ref = useAnimate('up', index * 60);
  if (project.comingSoon) {
    return (
      <div className="proj-card proj-coming-soon anim-base" ref={ref}>
        <div className="coming-soon-inner">
          <span className="coming-soon-icon">🚀</span>
          <p className="coming-soon-label">Coming Soon</p>
          <p className="coming-soon-sub">New project in progress</p>
        </div>
      </div>
    );
  }
  return (
    <div className="proj-card anim-base" ref={ref}>
      <div className="proj-card-header">
        <div>
          <p className="proj-name">{project.name}</p>
        </div>
        <div className="proj-header-btns">
          {project.download && (
            <a href={project.download} target="_blank" rel="noreferrer" className="icon-btn icon-btn-primary" aria-label="Download App">
              <DownloadIcon />
              <span className="icon-btn-tip">Download App</span>
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="icon-btn" aria-label="Live Demo / Repo">
              <ExternalIcon />
              <span className="icon-btn-tip">Live Demo / Repo</span>
            </a>
          )}
        </div>
      </div>
      <p className="proj-desc">{project.desc}</p>
      <div className="proj-tags">
        {project.stack.map(t => <span key={t} className="tag tag-blue">{t}</span>)}
      </div>
    </div>
  );
}

// ── Skills ──
function Skills() {
  const ref = useFadeIn();
  const certsRef = useFadeIn();
  return (
    <section id="skills" className="section">
      <div className="section-head fade-up" ref={ref}>
        <span className="eyebrow">tools &amp; technologies</span>
        <h2 className="section-title">What I <span className="accent">Work With</span></h2>
      </div>

      <div className="skills-list">
        {techStack.map((cat, i) => (
          <SkillRow key={cat.label} cat={cat} index={i} />
        ))}
      </div>

      <div className="certs-row fade-up" ref={certsRef}>
        <span className="eyebrow" style={{ marginBottom: '1rem', display: 'block' }}>certifications</span>
        <div className="certs-tags">
          {certifications.map(c => <span key={c} className="tag tag-cert">{c}</span>)}
        </div>
      </div>
    </section>
  );
}

function SkillRow({ cat, index }) {
  const ref = useAnimate('up', index * 60);
  return (
    <div className="skill-row anim-base" ref={ref}>
      <span className="skill-label">{cat.label}</span>
      <div className="skill-tags">
        {cat.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>
    </div>
  );
}

// ── ML Models ──
function MLModels() {
  const ref = useFadeIn();
  return (
    <section className="section">
      <div className="section-head fade-up" ref={ref}>
        <span className="eyebrow">machine learning</span>
        <h2 className="section-title">ML <span className="accent">Experiments</span></h2>
        <p className="section-sub">Hands-on models exploring core ML concepts</p>
      </div>
      <div className="ml-list">
        {mlModels.map((m, i) => (
          <MLCard key={m.name} model={m} index={i} />
        ))}
      </div>
    </section>
  );
}

// ── Resume ──
function MLCard({ model, index }) {
  const ref = useAnimate('up', index * 80);
  return (
    <div className="ml-row anim-base" ref={ref}>
      <span className="ml-icon">{model.icon}</span>
      <div className="ml-body">
        <div className="proj-card-header">
          <div>
            <span className="ml-name">{model.name}</span>
            <span className="proj-year" style={{ display: 'block', marginTop: '0.1rem' }}>{model.year}</span>
          </div>
          <div className="proj-header-btns">
            {model.download && (
              <a href={model.download} target="_blank" rel="noreferrer" className="icon-btn icon-btn-primary" aria-label="Download App">
                <DownloadIcon />
                <span className="icon-btn-tip">Download App</span>
              </a>
            )}
            {model.demo && (
              <a href={model.demo} target="_blank" rel="noreferrer" className="icon-btn" aria-label="Live Demo / Repo">
                <ExternalIcon />
                <span className="icon-btn-tip">Live Demo / Repo</span>
              </a>
            )}
          </div>
        </div>
        <p className="ml-desc">{model.desc}</p>
        <div className="proj-tags">
          {model.tags.map(t => <span key={t} className="tag tag-blue">{t}</span>)}
        </div>
      </div>
    </div>
  );
}

function Resume() {
  const ref = useFadeIn();
  const rowRef = useAnimate('up', 100);
  return (
    <section id="resume" className="section">
      <div className="section-head fade-up" ref={ref}>
        <span className="eyebrow">resume</span>
        <h2 className="section-title">My <span className="accent">Resume</span></h2>
        <p className="section-sub">Full overview of my skills, projects, and background</p>
      </div>
      <div className="resume-center anim-base" ref={rowRef}>
        <div className="resume-icon-wrap">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
        </div>
        <p className="resume-filename">YASH_SUKHADIYA_RESUME.PDF</p>
        <p className="resume-sub">Skills · Projects · Experience</p>
        <div className="resume-actions">
          <a href="https://drive.google.com/file/d/1cf--fv6Ej1ReH7697IJ11KklwM5ELEdB/view?usp=drivesdk" target="_blank" rel="noreferrer" className="btn-ghost"><EyeIcon /> View Resume</a>
          <a href="https://drive.google.com/uc?export=download&id=1cf--fv6Ej1ReH7697IJ11KklwM5ELEdB" target="_blank" rel="noreferrer" className="btn-primary"><DownloadIcon /> Download PDF</a>
        </div>
      </div>
    </section>
  );
}

// ── Contact ──
function Contact() {
  const ref = useFadeIn();
  const rowRef = useAnimate('up', 100);
  return (
    <section id="contact" className="section">
      <div className="section-head fade-up" ref={ref}>
        <span className="eyebrow">get in touch</span>
        <h2 className="section-title">Let's <span className="accent">Talk</span></h2>
        <p className="section-sub">
          Have an idea, opportunity, or just want to say hi?<br />
          I'm always open to interesting conversations.
        </p>
      </div>
      <div className="contact-open anim-base" ref={rowRef}>
        <a href="mailto:23amtics020@gmail.com" className="contact-line">
          <span className="contact-line-label">Email</span>
          <span className="contact-line-value">23amtics020@gmail.com <ExternalIcon /></span>
        </a>
        <a href="https://github.com/Yashsukhadiya1" target="_blank" rel="noreferrer" className="contact-line">
          <span className="contact-line-label">GitHub</span>
          <span className="contact-line-value">github.com/Yashsukhadiya1 <ExternalIcon /></span>
        </a>
        <a href="https://www.linkedin.com/in/yash-sukhadiya-5219552b2/" target="_blank" rel="noreferrer" className="contact-line">
          <span className="contact-line-label">LinkedIn</span>
          <span className="contact-line-value">linkedin.com/in/yash-sukhadiya <ExternalIcon /></span>
        </a>
      </div>
    </section>
  );
}

// ── Footer ──
function Footer() {
  return (
    <footer className="footer">
      <span>© 2026 Yash Sukhadiya</span>
      <span>designed &amp; built by <span className="accent-text">yash</span></span>
    </footer>
  );
}

// ── Icons ──
const GithubIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>;
const LinkedinIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const MailIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const ExternalIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
const EyeIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const DownloadIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const ArrowRightIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;

// ── App ──
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="App">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <Projects />
      <Skills />
      <MLModels />
      <Resume />
      <Contact />
      <Footer />
    </div>
  );
}
