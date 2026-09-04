import React, { useState, useEffect } from 'react';
import './App.css';
import {
  Mail, Phone, MapPin, Moon, Sun, Briefcase, GraduationCap,
  Cpu, Plane, Terminal, Github, Linkedin, Video, Radio
} from 'lucide-react';

// --- DATA ---
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
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 84, behavior: 'smooth' });
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg)", color: "var(--ink)" }}
    >
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
              className="p-2 rounded"
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
            <p className="font-mono text-sm mb-3" style={{ color: "var(--ink-dim)" }}>
              {personalInfo.role}
            </p>
            <h1 className="font-display text-5xl font-bold mb-6 leading-tight">
              {personalInfo.name}
            </h1>
            <p className="text-base leading-relaxed max-w-md mb-8" style={{ color: "var(--ink-dim)" }}>
              {personalInfo.bio}
            </p>

            <div className="flex flex-col gap-2 font-mono text-sm mb-8" style={{ color: "var(--ink-dim)" }}>
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {personalInfo.location}</span>
              <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> {personalInfo.email}</span>
              <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> {personalInfo.phone}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollTo('systems')}
                className="px-5 py-2.5 font-medium text-sm rounded"
                style={{ backgroundColor: "var(--gold)", color: "var(--bg)" }}
              >
                View systems built
              </button>
              <a href={personalInfo.github} target="_blank" rel="noreferrer"
                 className="p-2.5 rounded panel" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer"
                 className="p-2.5 rounded panel" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="panel p-2">
            <div className="aspect-[4/5] overflow-hidden rounded" style={{ backgroundColor: "var(--ink-dim)" }}>
              <img
                src={personalInfo.image}
                alt={personalInfo.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <p className="font-mono text-xs mt-2 pt-2 border-t text-center" style={{ color: "var(--ink-dim)", borderColor: "var(--gold-line)" }}>
              FIG. 1 — B. PAUL, KOLKATA
            </p>
          </div>
        </section>

        {/* --- SPEC SHEET (SKILLS) --- */}
        <section className="py-12 border-t" style={{ borderColor: "var(--gold-line)" }}>
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <Terminal className="w-5 h-5" style={{ color: "var(--gold)" }} /> Spec sheet
          </h2>
          <div className="panel overflow-hidden">
            {specSheet.map((row, i) => (
              <div
                key={row.category}
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
            ))}
          </div>
        </section>

        {/* --- SYSTEMS BUILT (PROJECTS) --- */}
        <section id="systems" className="py-16">
          <h2 className="font-display text-2xl font-bold mb-2 flex items-center gap-3">
            <Plane className="w-5 h-5" style={{ color: "var(--gold)" }} /> Systems built
          </h2>
          <p className="text-sm mb-8" style={{ color: "var(--ink-dim)" }}>
            Real deployments from the Weevils Drones internship — problem, build, and outcome for each.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {projects.map((p) => (
              <div key={p.title} className="panel p-6 flex flex-col">
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
                    <div className="font-display text-xl font-bold" style={{ color: "var(--gold)" }}>{p.metric.value}</div>
                    <div className="font-mono text-xs" style={{ color: "var(--ink-dim)" }}>{p.metric.label}</div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {p.stack.map((s) => <span key={s} className="tag">{s}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- EXPERIENCE --- */}
        <section id="experience" className="py-16 border-t" style={{ borderColor: "var(--gold-line)" }}>
          <h2 className="font-display text-2xl font-bold mb-8 flex items-center gap-3">
            <Briefcase className="w-5 h-5" style={{ color: "var(--gold)" }} /> Experience
          </h2>
          {experience.map((job) => (
            <div key={job.company} className="grid md:grid-cols-[160px_1fr] gap-6">
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
          ))}
        </section>

        {/* --- EDUCATION --- */}
        <section id="education" className="py-16 border-t" style={{ borderColor: "var(--gold-line)" }}>
          <h2 className="font-display text-2xl font-bold mb-8 flex items-center gap-3">
            <GraduationCap className="w-5 h-5" style={{ color: "var(--gold)" }} /> Education
          </h2>
          <div className="panel overflow-hidden">
            {education.map((edu, i) => (
              <div
                key={edu.degree}
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
