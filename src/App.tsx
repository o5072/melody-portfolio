/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring, useInView } from "motion/react";
import { 
  ArrowUpRight, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Mail, 
  ChevronRight, 
  Menu, 
  X
} from "lucide-react";
import { useState, useRef, useEffect, FormEvent } from "react";

// --- Components ---

interface Project {
  title: string;
  category: string;
  image: string;
}

type SubmitStatus = "idle" | "sending" | "sent" | "error";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-brand-bg/80 backdrop-blur-md py-4 border-b border-white/5" : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-xl font-display font-bold tracking-tighter">
          MELODY<span className="text-brand-muted">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-12">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium hover:text-brand-muted transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-brand-bg border-b border-white/5 p-6 flex flex-col gap-6 md:hidden"
        >
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-2xl font-display font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center px-6 pt-32 pb-20">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-sm uppercase tracking-[0.3em] text-brand-muted mb-6 block">
            Independent Brand Designer
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold leading-[0.9] tracking-tighter mb-12 text-balance">
            CRAFTING <br />
            <span className="text-brand-muted italic">DISTINCT</span> <br />
            IDENTITIES.
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-col md:flex-row justify-between items-end gap-8"
        >
          <p className="max-w-md text-lg text-brand-accent/70 leading-relaxed">
            Helping visionaries and forward-thinking brands stand out through 
            strategic minimalism and timeless aesthetic solutions.
          </p>
          
          <a 
            href="#work"
            className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest border border-white/20 rounded-full pl-8 pr-2 py-2 hover:bg-brand-accent hover:text-brand-bg transition-all duration-500"
          >
            Explore Work
            <div className="w-10 h-10 rounded-full bg-brand-accent text-brand-bg flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <ChevronRight size={20} />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }: { project: Project; index: number; key?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative cursor-pointer"
    >
      <div className="overflow-hidden aspect-[4/5] bg-brand-bg mb-6">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
          <p className="text-sm text-brand-muted uppercase tracking-widest">{project.category}</p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 transition-transform">
          <ArrowUpRight size={24} />
        </div>
      </div>
    </motion.div>
  );
};

const Work = () => {
  const projects = [
    {
      title: "LUMINA",
      category: "Visual Identity",
      image: "https://picsum.photos/seed/lumina/800/1000",
    },
    {
      title: "NOIR ARCHIVE",
      category: "Brand Strategy",
      image: "https://picsum.photos/seed/noir/800/1000",
    },
    {
      title: "VELVET STUDIO",
      category: "Digital Design",
      image: "https://picsum.photos/seed/velvet/800/1000",
    },
    {
      title: "ECHO LABS",
      category: "Art Direction",
      image: "https://picsum.photos/seed/echo/800/1000",
    },
  ];

  return (
    <section id="work" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
            SELECTED PROJECTS <br />
            <span className="text-brand-muted">2023 - PRES.</span>
          </h2>
          <p className="max-w-xs text-sm text-brand-muted uppercase tracking-widest leading-loose">
            A curation of works focused on minimalism, grid systems and typography.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 px-6 bg-brand-accent text-brand-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
            WE BELIEVE <br />
            THAT THE BEST <br />
            DESIGN IS <br />
            <span className="opacity-30">INVISIBLE.</span>
          </h2>
          
          <div className="flex flex-col gap-12 pt-4">
            <p className="text-xl md:text-2xl font-medium leading-relaxed">
              Based in London, we partner with ambitious companies to build 
              distinctive visual systems. Our approach is rooted in standard 
              principles, yet always looking for the unexpected detail.
            </p>
            
            <div className="grid grid-cols-2 gap-8 border-t border-brand-bg/10 pt-12">
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold mb-4">Services</h4>
                <ul className="text-sm flex flex-col gap-2 opacity-70">
                  <li>Visual Identity</li>
                  <li>Brand Strategy</li>
                  <li>Digital Design</li>
                  <li>Art Direction</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold mb-4">Recognition</h4>
                <ul className="text-sm flex flex-col gap-2 opacity-70">
                  <li>Awwwards SOTD</li>
                  <li>CSS Design Awards</li>
                  <li>Behance Featured</li>
                  <li>Typewolf</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [messageCount, setMessageCount] = useState<number | null>(null);
  
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await fetch("/api/messages");
        const data = await response.json();
        setMessageCount(Array.isArray(data.messages) ? data.messages.length : 0);
      } catch {
        setMessageCount(null);
      }
    };

    loadMessages();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus("sending");
    setStatusMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Could not send your message.");
      }

      setSubmitStatus("sent");
      setMessageCount((current) => (current ?? 0) + 1);
      form.reset();
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      setSubmitStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "Could not send your message.");
    }
  };

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12">
              LET'S START <br />
              A PROJECT.
            </h2>
            <div className="flex flex-col gap-6 text-brand-muted">
              <a href="mailto:hello@melody.design" className="text-2xl hover:text-brand-accent transition-colors flex items-center gap-4">
                hello@melody.design <ArrowUpRight size={24} />
              </a>
              <p className="max-w-xs text-sm uppercase tracking-widest leading-loose">
                Currently accepting new commissions for Q3 2026.
              </p>
              {messageCount !== null && (
                <p className="max-w-xs text-xs uppercase tracking-widest text-brand-accent/60">
                  {messageCount} message{messageCount === 1 ? "" : "s"} received.
                </p>
              )}
            </div>
            
            <div className="flex gap-8 mt-20">
              <a href="#" className="hover:text-brand-muted transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-brand-muted transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-brand-muted transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          <div className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/5">
            {submitStatus === "sent" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col justify-center items-center text-center py-20"
              >
                <div className="w-16 h-16 rounded-full bg-brand-accent text-brand-bg flex items-center justify-center mb-6">
                  <Mail size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Received</h3>
                <p className="text-brand-muted">Melody will get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-muted">Name</label>
                  <input 
                    required
                    name="name"
                    type="text" 
                    className="bg-transparent border-b border-white/20 py-4 outline-none focus:border-brand-accent transition-colors text-lg"
                    placeholder="Your name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-muted">Email</label>
                  <input 
                    required
                    name="email"
                    type="email" 
                    className="bg-transparent border-b border-white/20 py-4 outline-none focus:border-brand-accent transition-colors text-lg"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-muted">Message</label>
                  <textarea 
                    required
                    name="message"
                    rows={4}
                    className="bg-transparent border-b border-white/20 py-4 outline-none focus:border-brand-accent transition-colors text-lg resize-none"
                    placeholder="Tell us about your project"
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={submitStatus === "sending"}
                  className="w-full bg-brand-accent text-brand-bg font-bold uppercase tracking-widest py-6 rounded-full hover:scale-[0.98] transition-transform active:scale-95 mt-4"
                >
                  {submitStatus === "sending" ? "Sending..." : "Send Message"}
                </button>
                {submitStatus === "error" && (
                  <p className="text-sm text-red-300">{statusMessage}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-xs text-brand-muted font-medium uppercase tracking-[0.2em]">
        <p>(c) 2026 MELODY. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-12">
          <a href="#" className="hover:text-brand-accent transition-colors">Privacy</a>
          <a href="#" className="hover:text-brand-accent transition-colors">Terms</a>
          <a href="#" className="hover:text-brand-accent transition-colors flex items-center gap-1">
            Back to top <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="overflow-x-hidden selection:bg-brand-accent selection:text-brand-bg">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand-accent origin-left z-[60]"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <main>
        <Hero />
        <Work />
        <About />
        <ContactForm />
      </main>
      
      <Footer />
    </div>
  );
}
