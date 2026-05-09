import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Moon, Sun, ChevronRight, Briefcase, GraduationCap, Code, Cpu, Plane, Award, Terminal } from 'lucide-react';

// --- DATA ---
const personalInfo = {
  name: "Bikram Paul",
  title: "Computer Science Honours Student & UAV Engineer",
  email: "paulbikram20.09.04@gmail.com",
  phone: "+91 6289885701",
  location: "Kolkata, West Bengal, India",
  summary: "Dedicated Computer Science Honours student with a strong foundation in software development and specialized expertise in unmanned aerial vehicle (UAV) engineering. Experienced in drone manufacturing, FPV systems, fixed-wing RC planes, and embedded programming. Passionate about bridging hardware and software to build, network, and optimize high-performance aerial systems.",
  image: "Gemini_Generated_Image.png"
};

const technicalSkills = [
  "C", "C++", "JavaScript", "HTML/CSS", "React", 
  "Linux", "Shell Scripting", "Raspberry Pi", "Embedded Systems", 
  "Drone Flight Controllers", "CFD Analysis"
];

const coreCompetencies = [
  "Project Management", "Leadership & Teamwork", 
  "Critical Thinking", "Effective Communication", "Disciplined Work Culture"
];

const expertiseAndProjects = [
  {
    icon: <Plane className="w-6 h-6 text-blue-500" />,
    title: "UAV Engineering & Aeromodelling",
    points: [
      "Built and programmed custom FPV drones and fixed-wing RC planes from the ground up.",
      "Integrated and configured Skydroid cameras and gimbals to ensure stable aerial imaging.",
      "Utilized Computational Fluid Dynamics (CFD) analysis to evaluate aerodynamic performance."
    ]
  },
  {
    icon: <Cpu className="w-6 h-6 text-emerald-500" />,
    title: "Embedded Systems & Telemetry",
    points: [
      "Configured Raspberry Pi to act as a companion computer for advanced drone operations.",
      "Established secure remote networking and telemetry for UAVs utilizing Tailscale and Rpanion."
    ]
  },
  {
    icon: <Code className="w-6 h-6 text-purple-500" />,
    title: "Software & Web Development",
    points: [
      "Developed responsive web applications using HTML, CSS, JavaScript, and React.",
      "Wrote and executed shell scripts for Linux system automation and workflow efficiency.",
      "Programmed core logic and algorithms using C and C++."
    ]
  },
  {
    icon: <Award className="w-6 h-6 text-orange-500" />,
    title: "Leadership & Professional Discipline",
    points: [
      "Cultivated a highly disciplined work culture, leadership, and teamwork through rigorous training as a Cadet in the National Cadet Corps (NCC).",
      "Developed resilience and cross-functional collaboration skills, directly applicable to dynamic engineering and professional environments."
    ]
  }
];

const experience = [
  {
    role: "Internship",
    company: "Weevils Drone Private Limited",
    period: "2025 - PRESENT",
    points: [
      "Contribute hands-on to drone manufacturing and aeromodelling initiatives.",
      "Assist in the testing, wiring, and configuration of flight controllers and advanced UAV systems."
    ]
  }
];

const education = [
  {
    degree: "B.Sc. in Computer Science Honours",
    institution: "Behala College | Calcutta University",
    period: "2023 - PRESENT",
    grade: ""
  },
  {
    degree: "Higher Secondary (CBSE)",
    institution: "Future Gems Academy",
    period: "2023",
    grade: "Percentage: 79%"
  },
  {
    degree: "Matriculation (ICSE)",
    institution: "M.P. Birla Foundation H.S. School",
    period: "2021",
    grade: "Percentage: 92.5%"
  }
];

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Toggle theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Scroll spy functionality
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'expertise', 'experience', 'education'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // offset for navbar
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'dark bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* --- NAVBAR --- */}
      <nav className={`fixed w-full z-50 top-0 transition-all duration-300 shadow-md ${darkMode ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800' : 'bg-white/90 backdrop-blur-md border-b border-slate-200'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl tracking-wider text-blue-600 dark:text-blue-400">
              BP.
            </div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'Expertise', 'Experience', 'Education'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className={`text-sm font-medium hover:text-blue-500 transition-colors ${
                    activeSection === item.toLowerCase() ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        
        {/* --- HERO SECTION --- */}
        <section id="home" className="py-12 md:py-20 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">{personalInfo.name}</span>
            </h1>
            <h2 className="text-xl md:text-2xl font-medium text-slate-600 dark:text-slate-300">
              {personalInfo.title}
            </h2>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              {personalInfo.summary}
            </p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4 text-sm font-medium text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {personalInfo.location}</span>
              <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> {personalInfo.email}</span>
              <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> {personalInfo.phone}</span>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4 pt-6">
              <button 
                onClick={() => scrollTo('expertise')}
                className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
              >
                View My Work
              </button>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                <Code className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                <User className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="flex-shrink-0 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-48 h-48 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
              <img 
                src={personalInfo.image} 
                alt={personalInfo.name} 
                className="w-full h-full object-cover object-[center_15%]"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300?text=BP";
                }}
              />
            </div>
          </div>
        </section>

        {/* --- SKILLS SECTION --- */}
        <section className="py-12 border-t border-slate-200 dark:border-slate-800">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-blue-500" /> Technical Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {technicalSkills.map((skill, index) => (
                  <span key={index} className="px-4 py-2 text-sm font-medium rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-purple-500" /> Core Competencies
              </h3>
              <div className="flex flex-wrap gap-2">
                {coreCompetencies.map((skill, index) => (
                  <span key={index} className="px-4 py-2 text-sm font-medium rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- EXPERTISE & PROJECTS --- */}
        <section id="expertise" className="py-16">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
            <Code className="w-8 h-8 text-blue-500" /> Expertise & Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {expertiseAndProjects.map((item, index) => (
              <div 
                key={index} 
                className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </div>
                <ul className="space-y-3">
                  {item.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                      <ChevronRight className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* --- WORK EXPERIENCE --- */}
        <section id="experience" className="py-16">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-blue-500" /> Work Experience
          </h2>
          <div className="space-y-8">
            {experience.map((job, index) => (
              <div key={index} className="relative pl-8 md:pl-0">
                <div className="md:grid md:grid-cols-4 md:gap-8 items-start">
                  {/* Timeline dot for desktop */}
                  <div className="hidden md:block absolute left-[24.5%] top-2 w-4 h-4 rounded-full bg-blue-500 border-4 border-slate-50 dark:border-slate-900 z-10"></div>
                  {/* Timeline line for desktop */}
                  <div className="hidden md:block absolute left-[25.2%] top-6 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 -ml-px"></div>
                  
                  <div className="md:col-span-1 md:text-right mb-2 md:mb-0 relative">
                    {/* Timeline dot for mobile */}
                    <div className="md:hidden absolute -left-8 top-1.5 w-3 h-3 rounded-full bg-blue-500"></div>
                    {/* Timeline line for mobile */}
                    <div className="md:hidden absolute -left-[27px] top-4 bottom-[-40px] w-0.5 bg-slate-200 dark:bg-slate-700"></div>
                    
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/30">
                      {job.period}
                    </span>
                  </div>
                  <div className="md:col-span-3 p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold">{job.company}</h3>
                    <h4 className="text-lg text-slate-500 dark:text-slate-400 font-medium mb-4">{job.role}</h4>
                    <ul className="space-y-2">
                      {job.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-2"></span>
                          <span className="text-sm leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- EDUCATION --- */}
        <section id="education" className="py-16">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-blue-500" /> Education
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {education.map((edu, index) => (
              <div key={index} className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 border-t-4 border-t-blue-500">
                <span className="text-xs font-bold tracking-wider text-slate-400 dark:text-slate-500 mb-2 block uppercase">
                  {edu.period}
                </span>
                <h3 className="text-lg font-bold leading-tight mb-2">{edu.degree}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{edu.institution}</p>
                {edu.grade && (
                  <span className="inline-block px-2 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-semibold rounded">
                    {edu.grade}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="py-8 text-center border-t border-slate-200 dark:border-slate-800">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Bikram Paul. All rights reserved.
        </p>
      </footer>
    </div>
  );
}