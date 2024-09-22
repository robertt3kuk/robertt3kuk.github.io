import React, { useState, useEffect } from 'react';
import { Terminal, Github, Linkedin, Mail, Phone, MessageCircle } from 'lucide-react';

const GruvboxDark = {
  bg: '#282828',
  fg: '#ebdbb2',
  gray: '#928374',
  red: '#cc241d',
  green: '#98971a',
  yellow: '#d79921',
  blue: '#458588',
  purple: '#b16286',
  aqua: '#689d6a',
  orange: '#d65d0e',
};

const VimTerminalResume = () => {
  const [content, setContent] = useState('');
  const [mode, setMode] = useState('normal');
  const [cursor, setCursor] = useState(0);
  const [activeTab, setActiveTab] = useState('resume');

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
  }, []);

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'c') {
      setMode('normal');
      return;
    }

    if (mode === 'command' && e.key === 'Enter') {
      handleCommand(e.target.value);
      setMode('normal');
      e.target.value = '';
      return;
    }

    if (mode !== 'command') {
      e.preventDefault();
    }

    switch (mode) {
      case 'normal':
        handleNormalMode(e);
        break;
      case 'insert':
        handleInsertMode(e);
        break;
      default:
        break;
    }
  };

  const handleNormalMode = (e) => {
    switch (e.key) {
      case 'h':
        setCursor(Math.max(0, cursor - 1));
        break;
      case 'l':
        setCursor(Math.min(content.length - 1, cursor + 1));
        break;
      case 'j':
        setCursor(Math.min(content.length - 1, cursor + 80));
        break;
      case 'k':
        setCursor(Math.max(0, cursor - 80));
        break;
      case 'i':
        setMode('insert');
        break;
      case ':':
        setMode('command');
        break;
      default:
        break;
    }
  };

  const handleInsertMode = (e) => {
    if (e.key === 'Escape') {
      setMode('normal');
    } else if (e.key === 'Backspace') {
      setContent(content.slice(0, cursor - 1) + content.slice(cursor));
      setCursor(Math.max(0, cursor - 1));
    } else if (e.key.length === 1) {
      setContent(content.slice(0, cursor) + e.key + content.slice(cursor));
      setCursor(cursor + 1);
    }
  };

  const handleCommand = (cmd) => {
    switch (cmd.toLowerCase()) {
      case 'q':
      case 'quit':
        alert('Thanks for viewing my resume!');
        break;
      case 'w':
      case 'write':
        alert('Resume saved (not really, this is just a demo)');
        break;
      case 'help':
        setContent(`Available commands:
:q or :quit - Exit
:w or :write - Save
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

  return (
    <div
      className="bg-[#282828] text-[#ebdbb2] p-4 font-mono h-screen flex flex-col"
      style={{ fontFamily: 'Hack, monospace' }}
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      <div className="flex items-center mb-4 text-[#b8bb26]">
        <Terminal className="mr-2" />
        <h1 className="text-xl">robertt3kuk's Terminal Resume</h1>
      </div>
      <div className="flex space-x-2 mb-4">
        <button
          className={`px-2 py-1 rounded ${activeTab === 'resume' ? 'bg-[#3c3836]' : 'bg-[#282828]'}`}
          onClick={() => setActiveTab('resume')}
        >
          Resume
        </button>
        <button
          className={`px-2 py-1 rounded ${activeTab === 'github' ? 'bg-[#3c3836]' : 'bg-[#282828]'}`}
          onClick={() => setActiveTab('github')}
        >
          GitHub Projects
        </button>
      </div>
      <div className="flex-grow overflow-auto bg-[#3c3836] p-4 rounded shadow-inner">
        {activeTab === 'resume' ? (
          <div className="whitespace-pre-wrap">
            {content.slice(0, cursor)}
            <span className="bg-[#928374] text-[#282828]">{content[cursor] || ' '}</span>
            {content.slice(cursor + 1)}
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-[#b8bb26]">GitHub Projects</h2>
            {githubProjects.map((project, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold text-[#8ec07c]">{project.name}</h3>
                <p>{project.description}</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#83a598] hover:underline"
                >
                  View on GitHub
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          Mode: {mode} | Cursor: {cursor}
        </div>
        <div className="flex space-x-4">
          <a href="https://github.com/robertt3kuk" target="_blank" rel="noopener noreferrer" className="text-[#b8bb26]">
            <Github />
          </a>
          <a href="https://linkedin.com/in/robertt3kuk" target="_blank" rel="noopener noreferrer" className="text-[#8ec07c]">
            <Linkedin />
          </a>
          <a href="mailto:awesome.abaildaev@yandex.kz" className="text-[#fe8019]">
            <Mail />
          </a>
          <a href="tel:+77073137691" className="text-[#fabd2f]">
            <Phone />
          </a>
          <a href="https://t.me/biqontie" target="_blank" rel="noopener noreferrer" className="text-[#83a598]">
            <MessageCircle />
          </a>
        </div>
      </div>
      {mode === 'command' && (
        <input
          type="text"
          className="mt-2 p-1 bg-[#3c3836] text-[#ebdbb2] border border-[#928374] rounded"
          autoFocus
          onBlur={() => setMode('normal')}
        />
      )}
    </div>
  );
};

export default VimTerminalResume;
