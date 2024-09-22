import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Github, Linkedin, Mail, Phone, MessageCircle } from 'lucide-react';
import { jsPDF } from "jspdf";
import styles from './VimTerminalResume.module.css';

const VimTerminalResume = () => {
  const [content, setContent] = useState('');
  const [mode, setMode] = useState('normal');
  const [cursor, setCursor] = useState(0);
  const [activeTab, setActiveTab] = useState('resume');
  const [commandLine, setCommandLine] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const contentRef = useRef(null);
  const terminalRef = useRef(null);

  const resumeContent = `
Bekbolat Abaildayev (robertt3kuk)
Software Engineer

Contact:
• Email: awesome.abaildaev@yandex.kz
• Phone: +77073137691
• LinkedIn: linkedin.com/in/robertt3kuk
• GitHub: github.com/robertt3kuk
• Telegram: t.me/biqontie

Core Skills:
• Go • MongoDB • PostgreSQL • AWS • GrafanaLoki
• gRPC • REST API • GraphQL • JavaScript • DevOps

Professional Profile:
Skilled Go software engineer with expertise in MongoDB and PostgreSQL databases. Experienced in GraphQL, REST API, and gRPC technologies. Passionate about Linux (Unix) operating systems with strong DevOps skills for server management and AWS deployments using Caddy.

Career Summary:

Gexabyte, Almaty | Golang Backend Developer (August 2024 - Present)
• Built backend system using Ethereum Go library, integrating smart contracts
• Tested smart contracts on Sepolia network
• Utilized IPFS via Pinata for decentralized file storage
• Managed PostgreSQL database for secure data storage
• Collaborated with product managers and analysts
• Used MinIO for off-chain storage of images

Union Strategies, Toronto | Golang Backend Developer (Feb 2023 - July 2024)
• Developed and maintained backend for union's system
• Monitored system performance and implemented improvements
• Designed and implemented new services
• Stayed updated with Go programming language trends

mvp14, Astana | Golang Backend Developer (Feb 2023 - Jun 2023)
• Developed CRM system for construction workers using Golang, PostgreSQL, and S3
• Implemented user management, task tracking, and QR code verification

BilimX, Pavlodar | Golang Backend Developer (Nov 2022 - Feb 2023)
• Created edtech platform for schools using Golang and PostgreSQL
• Implemented secure session management and licensing system

WeLoveFlutterFlow, Astana | Golang Backend Developer (Jun 2021 - Oct 2022)
• Built CRM platform using Golang & PostgreSQL
• Developed RESTful API and role-based visibility features
• Created efficient project management and collaboration solution

Type ':help' for available commands.
`;

  const githubProjects = [
    { name: 'Project 1', description: 'Description of Project 1', url: 'https://github.com/robertt3kuk/project1' },
    { name: 'Project 2', description: 'Description of Project 2', url: 'https://github.com/robertt3kuk/project2' },
    { name: 'Project 3', description: 'Description of Project 3', url: 'https://github.com/robertt3kuk/project3' },
  ];

  useEffect(() => {
    setContent(resumeContent);
    terminalRef.current.focus();
  }, []);

  const handleScroll = (direction) => {
    const scrollAmount = direction === 'up' ? -30 : 30;
    if (contentRef.current) {
      contentRef.current.scrollTop += scrollAmount;
      setScrollPosition(contentRef.current.scrollTop);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setMode('normal');
      setCommandLine('');
    } else if (mode === 'normal') {
      switch (e.key) {
        case 'j': handleScroll('down'); break;
        case 'k': handleScroll('up'); break;
        case 'i': setMode('insert'); break;
        case ':': setMode('command'); setCommandLine(':'); break;
        default: break;
      }
    } else if (mode === 'insert') {
      handleInsertMode(e);
    } else if (mode === 'command') {
      handleCommandMode(e);
    }
  };

  const handleInsertMode = (e) => {
    if (e.key === 'Backspace') {
      setContent(content.slice(0, cursor - 1) + content.slice(cursor));
      setCursor(Math.max(0, cursor - 1));
    } else if (e.key.length === 1) {
      setContent(content.slice(0, cursor) + e.key + content.slice(cursor));
      setCursor(cursor + 1);
    }
  };

  const handleCommandMode = (e) => {
    if (e.key === 'Enter') {
      executeCommand(commandLine);
      setCommandLine('');
      setMode('normal');
    } else if (e.key === 'Backspace') {
      setCommandLine(commandLine.slice(0, -1));
    } else if (e.key.length === 1) {
      setCommandLine(commandLine + e.key);
    }
  };

  const executeCommand = (cmd) => {
    switch (cmd.slice(1).toLowerCase()) {
      case 'q':
      case 'quit':
        alert('Thanks for viewing my resume!');
        break;
      case 'w':
      case 'write':
        saveAsPDF();
        break;
      case 'help':
        setContent(`Available commands:
:q or :quit - Exit
:w or :write - Save resume as PDF
:help - Show this help message
:github - View GitHub projects
:resume - View resume
`);
        break;
      case 'github':
        setActiveTab('github');
        break;
      case 'resume':
        setActiveTab('resume');
        setContent(resumeContent);
        break;
      default:
        setContent(`Unknown command: ${cmd}\nType :help for available commands.`);
    }
  };

  const saveAsPDF = () => {
    const doc = new jsPDF();
    const lines = content.split('\n');
    let y = 10;
    lines.forEach(line => {
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
      doc.text(10, y, line);
      y += 7;
    });
    doc.save("robertt3kuk_resume.pdf");
    setContent("Resume saved as PDF.");
  };

  return (
    <div className={styles.terminal} onKeyDown={handleKeyDown} tabIndex="0" ref={terminalRef}>
      <div className={styles.header}>
        <Terminal size={18} />
        <h1>robertt3kuk's Terminal Resume</h1>
      </div>
      <div className={styles.tabs}>
        <button
          className={activeTab === 'resume' ? styles.active : ''}
          onClick={() => setActiveTab('resume')}
        >
          Resume
        </button>
        <button
          className={activeTab === 'github' ? styles.active : ''}
          onClick={() => setActiveTab('github')}
        >
          GitHub Projects
        </button>
      </div>
      <div className={styles.content} ref={contentRef}>
        {activeTab === 'resume' ? (
          <pre>
            {content}
          </pre>
        ) : (
          <div className={styles.githubProjects}>
            {githubProjects.map((project, index) => (
              <div key={index} className={styles.project}>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <a href={project.url} target="_blank" rel="noopener noreferrer">View on GitHub</a>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <div className={styles.mode}>
          {mode.toUpperCase()} | Line: {Math.floor(scrollPosition / 30) + 1}
        </div>
        <div className={styles.commandLine}>
          {commandLine}
          {mode === 'command' && <span className={styles.cursor}>_</span>}
        </div>
        <div className={styles.contactLinks}>
          <a href="https://github.com/robertt3kuk" target="_blank" rel="noopener noreferrer"><Github size={18} /></a>
          <a href="https://linkedin.com/in/robertt3kuk" target="_blank" rel="noopener noreferrer"><Linkedin size={18} /></a>
          <a href="mailto:awesome.abaildaev@yandex.kz"><Mail size={18} /></a>
          <a href="tel:+77073137691"><Phone size={18} /></a>
          <a href="https://t.me/biqontie" target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /></a>
        </div>
      </div>
    </div>
  );
};

export default VimTerminalResume;
