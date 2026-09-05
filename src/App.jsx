import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import {
  Mail, Phone, MapPin, Moon, Sun, Briefcase, GraduationCap,
  Cpu, Plane, Terminal, Video, Radio
} from 'lucide-react';

// lucide-react does not ship brand/logo icons (no Github, no Linkedin) —
// using small inline SVGs instead so this doesn't depend on the icon
// library having them.
const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" {...props}>
    <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.02 3.26 9.28 7.78 10.79.57.1.78-.25.78-.55
      0-.27-.01-1.16-.02-2.11-3.17.69-3.84-1.34-3.84-1.34-.52-1.32-1.27-1.67-1.27-1.67
      -1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95
      .1-.74.4-1.24.72-1.53-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.06
      -.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.17.91-.25 1.89-.38 2.86-.39
      .97 0 1.95.13 2.86.39 2.18-1.48 3.14-1.17 3.14-1.17.62 1.57.23 2.73.11 3.02
      .73.8 1.17 1.82 1.17 3.06 0 4.37-2.66 5.34-5.2 5.62.41.36.77 1.06.77 2.15
      0 1.55-.01 2.8-.01 3.18 0 .3.2.66.79.55A10.53 10.53 0 0 0 23.5 12.02
      C23.5 5.74 18.27.5 12 .5z"/>
  </svg>
);
const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" {...props}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05
      c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z"/>
  </svg>
);

// --- SCROLL-DRIVEN INTERACTION HELPERS ---
// Everything below fires based on what the person is doing (scrolling,
// hovering) rather than on a timer, so it stays purposeful instead of busy.

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// Digit-only metrics (e.g. "2") count up on reveal; compound strings
// (e.g. "3 (+2 planned)", "1 wk → <1 day") render as-is — animating a
// count for text that isn't a plain number would look broken, not cool.
function MetricValue({ value, active }) {
  const isPlainNumber = /^\d+$/.test(value.trim());
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active || !isPlainNumber) return;
    const target = parseInt(value, 10);
    const duration = 600;
    const start = performance.now();
    let raf;
    const step = (t) => {
      const p = Math.min((t - start) / duration, 1);
      setN(Math.round(p * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, isPlainNumber, value]);
  return <>{isPlainNumber ? n : value}</>;
}

// Subtle cursor-tilt on project cards — a "new-gen" tactile touch that
// only activates on hover/mousemove, so it costs nothing at rest.
function TiltCard({ children, className }) {
  const ref = useRef(null);
  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-4px)`;
  };
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };
  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className={className}>
      {children}
    </div>
  );
}


function ProjectCard({ p, delay }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? 'reveal-visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <TiltCard className="panel project-card p-6 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-3">
          {p.icon}
          <h3 className="font-display font-semibold text-lg">{p.title}</h3>
        </div>
        <p className="text-sm mb-4" style={{ color: "var(--ink-dim)" }}>{p.problem}</p>
        <ul className="space-y-2 mb-5 flex-grow">
          {p.points.map((pt, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="via-dot mt-1.5" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-end justify-between pt-4 border-t" style={{ borderColor: "var(--gold-line)" }}>
          <div>
            <div className="font-display text-xl font-bold" style={{ color: "var(--gold)" }}>
              <MetricValue value={p.metric.value} active={visible} />
            </div>
            <div className="font-mono text-xs" style={{ color: "var(--ink-dim)" }}>{p.metric.label}</div>
          </div>
          <div className="flex flex-wrap gap-1.5 justify-end">
            {p.stack.map((s) => <span key={s} className="tag">{s}</span>)}
          </div>
        </div>
      </TiltCard>
    </div>
  );
}

// Every claim below is backed by a real, specific detail. If you add
// something new, keep the same rule: specific > impressive-sounding.

const personalInfo = {
  name: "Bikram Paul",
  role: "Embedded systems engineer — UAV video, tracking & telemetry",
  email: "paulbikram20.09.04@gmail.com",
  phone: "+91 6289885701",
  location: "Kolkata, West Bengal, India",
  bio: "I build the software layer between a UAV's hardware and the people operating it — video, AI tracking, and flight-controller telemetry. Most of what I do is prototyping: getting the first working version of something running before it's locked down for deployment.",
  image: "Gemini_Generated_Image.png",
  github: "https://github.com/Bikram-20-9",
  linkedin: "https://www.linkedin.com/in/bikram-paul-207775380"
};

const specSheet = [
  { category: "Languages", items: ["C", "C++", "Python", "JavaScript"] },
  { category: "Embedded", items: ["Raspberry Pi", "Embedded Linux", "Pixhawk", "MAVLink 2.0"] },
  { category: "Vision / AI", items: ["OpenCV", "Object Tracking", "Socket Programming"] },
  { category: "UAV / Aero", items: ["Flight Controllers", "CFD Analysis", "Tailscale"] },
  { category: "Web", items: ["React", "HTML/CSS", "Shell Scripting"] },
];

const projects = [
  {
    icon: <Video className="w-5 h-5" style={{ color: "var(--gold)" }} />,
    title: "Live 4G video for VTOL drones",
    problem: "Carrier-grade NAT blocked remote video access over cellular — the actual reason 4G video is hard, not the video itself.",
    points: [
      "Built a Raspberry Pi relay (mediamtx) paired with Tailscale to route live video without port forwarding.",
      "Installed and running on 2 VTOL drones in active use.",
    ],
    metric: { value: "2", label: "VTOL drones live" },
    stack: ["Raspberry Pi", "mediamtx", "Tailscale", "RTSP"],
  },
  {
    icon: <Cpu className="w-5 h-5" style={{ color: "var(--gold)" }} />,
    title: "AI tracking, built from the raw protocol",
    problem: "No library existed for the camera's tracking protocol — so I implemented it directly from its binary spec.",
    points: [
      "Wrote a UDP client for the Skydroid C12's binary AI-tracking protocol (CRC16 framing) from scratch.",
      "Removed the dependency on Skydroid's own app; click-to-track now runs through a custom YOLO-assisted UI.",
    ],
    metric: { value: "1 wk → <1 day", label: "build time → redeploy time" },
    stack: ["Python", "OpenCV", "YOLO", "UDP / CRC16"],
  },
  {
    icon: <Radio className="w-5 h-5" style={{ color: "var(--gold)" }} />,
    title: "Fleet telemetry over 4G",
    problem: "Direct radio telemetry maxed out at ~10–20km. That range ceiling is now gone.",
    points: [
      "Built a Raspberry Pi–to–Pixhawk MAVLink 2.0 bridge (via Rpanion), relayed over Tailscale to Mission Planner.",
      "Standardized the setup so it's a repeatable install, not a one-off per system.",
    ],
    metric: { value: "3 (+2 planned)", label: "systems running the bridge" },
    stack: ["MAVLink 2.0", "Rpanion", "Pixhawk", "Tailscale"],
  },
];

const experience = [
  {
    role: "UAV Engineering Intern",
    company: "Weevils Drones Private Limited",
    period: "Sep 2025 — Present",
    points: [
      "Built a live video relay (Raspberry Pi + mediamtx + Tailscale) for 2 VTOL drones, removing carrier-grade NAT as a blocker to 4G video.",
      "Implemented the Skydroid C12's binary AI-tracking protocol from its raw spec, replacing dependency on the vendor's own app.",
      "Standardized a Raspberry Pi–to–Pixhawk MAVLink 2.0 telemetry bridge, now running on 3 UAV systems (2 more planned) — extending telemetry access from a ~10–20km radio-link range to anywhere with 4G coverage.",
      "Supported flight testing across roughly 5–6 test flights on 3–5 smaller drone builds, all completed successfully.",
    ],
  },
];

const education = [
  {
    degree: "B.Sc. in Computer Science Honours",
    institution: "Behala College, Calcutta University",
    period: "2023 — Present",
    grade: "",
  },
  {
    degree: "Higher Secondary (CBSE)",
    institution: "Future Gems Academy",
    period: "2023",
    grade: "79%",
  },
  {
    degree: "Matriculation (ICSE)",
    institution: "M.P. Birla Foundation H.S. School",
    period: "2021",
    grade: "92.5%",
  },
];

const NAV_ITEMS = ["Home", "Systems", "Experience", "Education"];

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const ids = ['home', 'systems', 'experience', 'education'];
      const pos = window.scrollY + 120;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
        }
      }
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setScrollPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 84, behavior: 'smooth' });
  };

  return (
    <div
      className="min-h-screen pcb-texture"
      style={{ backgroundColor: "var(--bg)", color: "var(--ink)" }}
    >
      {/* --- SCROLL PROGRESS --- */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[60]" style={{ backgroundColor: "var(--gold-line)" }}>
        <div
          className="h-full"
          style={{ width: `${scrollPct}%`, backgroundColor: "var(--gold)", transition: "width 0.1s linear" }}
        />
      </div>

      {/* --- NAV --- */}
      <nav
        className="fixed w-full z-50 top-0 border-b"
        style={{ backgroundColor: "var(--bg)", borderColor: "var(--gold-line)" }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <span className="font-display font-bold text-lg">BP</span>
            <div className="hidden md:flex gap-8">
              {NAV_ITEMS.map((item) => {
                const id = item.toLowerCase();
                return (
                  <button
                    key={item}
                    onClick={() => scrollTo(id)}
                    data-active={activeSection === id}
                    className="nav-link text-sm font-medium"
                    style={{ color: activeSection === id ? "var(--ink)" : "var(--ink-dim)" }}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle theme"
              className="icon-btn p-2 rounded"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-16">
        {/* --- HERO --- */}
        <section id="home" className="py-20 grid md:grid-cols-[1.3fr_0.7fr] gap-12 items-start">
          <div>
            <Reveal>
              <p className="font-mono text-sm mb-3" style={{ color: "var(--ink-dim)" }}>
                {personalInfo.role}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-display text-5xl font-bold mb-6 leading-tight">
                {personalInfo.name}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-base leading-relaxed max-w-md mb-8" style={{ color: "var(--ink-dim)" }}>
                {personalInfo.bio}
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="flex flex-col gap-2 font-mono text-sm mb-8" style={{ color: "var(--ink-dim)" }}>
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {personalInfo.location}</span>
                <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> {personalInfo.email}</span>
                <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> {personalInfo.phone}</span>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => scrollTo('systems')}
                  className="btn-primary px-5 py-2.5 font-medium text-sm rounded"
                  style={{ backgroundColor: "var(--gold)", color: "var(--bg)" }}
                >
                  View systems built
                </button>
                <a href={personalInfo.github} target="_blank" rel="noreferrer"
                   className="icon-btn p-2.5 rounded panel" aria-label="GitHub">
                  <GithubIcon />
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer"
                   className="icon-btn p-2.5 rounded panel" aria-label="LinkedIn">
                  <LinkedinIcon />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100} className="panel p-2">
            <div className="aspect-[4/5] overflow-hidden rounded" style={{ backgroundColor: "var(--ink-dim)" }}>
              <img
                src={personalInfo.image}
                alt={personalInfo.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <p className="font-mono text-xs mt-2 pt-2 border-t flex items-center justify-center gap-2" style={{ color: "var(--ink-dim)", borderColor: "var(--gold-line)" }}>
              <span className="status-dot" /> ONLINE — KOLKATA, IN
            </p>
          </Reveal>
        </section>

        {/* --- SPEC SHEET (SKILLS) --- */}
        <section className="py-12 border-t" style={{ borderColor: "var(--gold-line)" }}>
          <Reveal>
            <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
              <Terminal className="w-5 h-5" style={{ color: "var(--gold)" }} /> Spec sheet
            </h2>
          </Reveal>
          <div className="panel overflow-hidden">
            {specSheet.map((row, i) => (
              <Reveal key={row.category} delay={i * 60}>
                <div
                  className="grid grid-cols-[120px_1fr] md:grid-cols-[160px_1fr] gap-4 px-5 py-4"
                  style={{ borderTop: i === 0 ? "none" : "1px solid var(--gold-line)" }}
                >
                  <span className="font-medium text-sm pt-1">{row.category}</span>
                  <div className="flex flex-wrap gap-2">
                    {row.items.map((item) => (
                      <span key={item} className="tag">{item}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* --- SYSTEMS BUILT (PROJECTS) --- */}
        <section id="systems" className="py-16">
          <Reveal>
            <h2 className="font-display text-2xl font-bold mb-2 flex items-center gap-3">
              <Plane className="w-5 h-5" style={{ color: "var(--gold)" }} /> Systems built
            </h2>
            <p className="text-sm mb-8" style={{ color: "var(--ink-dim)" }}>
              Real deployments from the Weevils Drones internship — problem, build, and outcome for each.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} p={p} delay={i * 100} />
            ))}
          </div>
        </section>

        {/* --- EXPERIENCE --- */}
        <section id="experience" className="py-16 border-t" style={{ borderColor: "var(--gold-line)" }}>
          <Reveal>
            <h2 className="font-display text-2xl font-bold mb-8 flex items-center gap-3">
              <Briefcase className="w-5 h-5" style={{ color: "var(--gold)" }} /> Experience
            </h2>
          </Reveal>
          {experience.map((job, jIdx) => (
            <Reveal key={job.company} delay={jIdx * 100}>
              <div className="grid md:grid-cols-[160px_1fr] gap-6">
                <div>
                  <span className="font-mono text-xs" style={{ color: "var(--ink-dim)" }}>{job.period}</span>
                </div>
                <div className="pl-6 border-l-2" style={{ borderColor: "var(--gold-line)" }}>
                  <h3 className="font-display font-semibold text-lg">{job.role}</h3>
                  <p className="text-sm mb-4" style={{ color: "var(--ink-dim)" }}>{job.company}</p>
                  <ul className="space-y-2.5">
                    {job.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="via-dot mt-1.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </section>

        {/* --- EDUCATION --- */}
        <section id="education" className="py-16 border-t" style={{ borderColor: "var(--gold-line)" }}>
          <Reveal>
            <h2 className="font-display text-2xl font-bold mb-8 flex items-center gap-3">
              <GraduationCap className="w-5 h-5" style={{ color: "var(--gold)" }} /> Education
            </h2>
          </Reveal>
          <div className="panel overflow-hidden">
            {education.map((edu, i) => (
              <Reveal key={edu.degree} delay={i * 60}>
                <div
                  className="grid grid-cols-[100px_1fr_auto] gap-4 items-center px-5 py-4"
                  style={{ borderTop: i === 0 ? "none" : "1px solid var(--gold-line)" }}
                >
                  <span className="font-mono text-xs" style={{ color: "var(--ink-dim)" }}>{edu.period}</span>
                  <div>
                    <div className="font-medium text-sm">{edu.degree}</div>
                    <div className="text-xs" style={{ color: "var(--ink-dim)" }}>{edu.institution}</div>
                  </div>
                  {edu.grade && <span className="tag">{edu.grade}</span>}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-8 border-t text-center" style={{ borderColor: "var(--gold-line)" }}>
        <p className="font-mono text-xs" style={{ color: "var(--ink-dim)" }}>
          © {new Date().getFullYear()} Bikram Paul — Kolkata, India
        </p>
      </footer>
    </div>
  );
}
