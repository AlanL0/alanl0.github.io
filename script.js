document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const config = {
        githubUsername: 'AlanL0',
        email: 'alomo@uci.edu',
        linkedinUrl: 'https://www.linkedin.com/in/alanlo2023/',
        resumePath: 'img/Master-Resume.pdf'
    };

    // Theme switching based on PST time
    function updateTheme() {
        // Get current time in PST (UTC-8) / PDT (UTC-7)
        const now = new Date();
        const pstOffset = -8 * 60; // PST is UTC-8
        const localOffset = now.getTimezoneOffset();
        const pstTime = new Date(now.getTime() + (localOffset + pstOffset) * 60000);

        // Check if PDT (Daylight Saving Time) - roughly March to November
        const month = pstTime.getMonth();
        const isPDT = month >= 2 && month <= 10; // March (2) to November (10)
        if (isPDT) {
            pstTime.setHours(pstTime.getHours() + 1); // PDT is UTC-7
        }

        const hour = pstTime.getHours();

        // Day: 6am - 6pm PST, Night: 6pm - 6am PST
        const isDayTime = hour >= 6 && hour < 18;

        if (isDayTime) {
            document.documentElement.classList.add('light-theme');
        } else {
            document.documentElement.classList.remove('light-theme');
        }
    }

    // Initial theme check
    updateTheme();

    // Update theme every minute
    setInterval(updateTheme, 60000);

    // Press 'T' to toggle theme for testing (remove in production if desired)
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 't' && !modalOverlay.classList.contains('active')) {
            document.documentElement.classList.toggle('light-theme');
        }
    });

    // Chip highlight effect - 20% brighter for 30 seconds on page load
    const chip = document.querySelector('.chip');
    if (chip) {
        chip.classList.add('chip-highlight');
        setTimeout(() => {
            chip.classList.remove('chip-highlight');
        }, 30000);
    }

    // DOM Elements
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');

    // Section content templates
    const sectionContent = {
        about: `
            <h2>About Me</h2>
            <p>Hi, I'm Alan Lo - a software developer passionate about building robust backend systems and solving complex problems.</p>
            <p>I specialize in creating efficient, scalable solutions using modern technologies. My approach combines clean code principles with practical problem-solving to deliver reliable software.</p>
            <p>When I'm not coding, I enjoy exploring new technologies and contributing to interesting projects.</p>
        `,
        skills: `
            <h2>Skills</h2>
            <div class="skills-grid">
                <div class="skill-category">
                    <h3>Programming</h3>
                    <ul>
                        <li>C/C++</li>
                        <li>Java</li>
                        <li>Python</li>
                        <li>Kotlin</li>
                    </ul>
                </div>
                <div class="skill-category">
                    <h3>Cloud & DevOps</h3>
                    <ul>
                        <li>AWS / EKS</li>
                        <li>Docker</li>
                        <li>Kubernetes</li>
                        <li>Git</li>
                    </ul>
                </div>
                <div class="skill-category">
                    <h3>Backend & Tools</h3>
                    <ul>
                        <li>MySQL / Redis</li>
                        <li>Vert.x</li>
                        <li>GStreamer API</li>
                        <li>Datadog / JIRA</li>
                    </ul>
                </div>
                <div class="skill-category">
                    <h3>Hardware & Embedded</h3>
                    <ul>
                        <li>Raspberry Pi</li>
                        <li>Arduino</li>
                        <li>OpenCV</li>
                        <li>Linux / Ubuntu</li>
                    </ul>
                </div>
            </div>
        `,
        projects: `
            <h2>Projects</h2>
            <div class="loading" id="projects-loading"></div>
            <div class="projects-grid" id="projects-grid"></div>
        `
    };

    // Open modal with content
    function openModal(section) {
        modalContent.innerHTML = sectionContent[section];
        modalOverlay.classList.add('active');

        // If projects section, fetch from GitHub
        if (section === 'projects') {
            fetchGitHubProjects();
        }
    }

    // Close modal
    function closeModal() {
        modalOverlay.classList.remove('active');
    }

    // Fetch GitHub projects
    async function fetchGitHubProjects() {
        const loadingEl = document.getElementById('projects-loading');
        const gridEl = document.getElementById('projects-grid');

        try {
            const response = await fetch(`https://api.github.com/users/${config.githubUsername}/repos?sort=updated&per_page=6`);

            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }

            const repos = await response.json();

            // Hide loading, show grid
            if (loadingEl) loadingEl.style.display = 'none';

            // Filter out forked repos and the portfolio repo itself
            const filteredRepos = repos.filter(repo =>
                !repo.fork &&
                repo.name.toLowerCase() !== `${config.githubUsername.toLowerCase()}.github.io`
            );

            if (filteredRepos.length === 0) {
                gridEl.innerHTML = '<p>No projects found. Check back soon!</p>';
                return;
            }

            // Render project cards
            gridEl.innerHTML = filteredRepos.map(repo => `
                <div class="project-card">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No description available.'}</p>
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">View on GitHub →</a>
                    ${repo.language ? `<span class="project-language">${repo.language}</span>` : ''}
                </div>
            `).join('');

        } catch (error) {
            console.error('Error fetching GitHub projects:', error);
            if (loadingEl) loadingEl.style.display = 'none';
            gridEl.innerHTML = `
                <p>Unable to load projects. <a href="https://github.com/${config.githubUsername}" target="_blank" rel="noopener noreferrer">View on GitHub →</a></p>
            `;
        }
    }

    // Handle node clicks
    function handleNodeClick(node) {
        const section = node.dataset.section;
        const action = node.dataset.action;

        if (section) {
            // Expandable sections (About, Skills, Projects)
            openModal(section);
        } else if (action) {
            // Direct action links
            switch (action) {
                case 'resume':
                    window.open(config.resumePath, '_blank');
                    break;
                case 'github':
                    window.open(`https://github.com/${config.githubUsername}`, '_blank');
                    break;
                case 'linkedin':
                    window.open(config.linkedinUrl, '_blank');
                    break;
                case 'contact':
                    window.location.href = `mailto:${config.email}`;
                    break;
            }
        }
    }

    // Add click handlers to all nodes
    document.querySelectorAll('.node').forEach(node => {
        node.addEventListener('click', () => handleNodeClick(node));
    });

    // Close modal handlers
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // Add particle effect along traces (optional enhancement)
    function createParticle(traceId) {
        const trace = document.getElementById(traceId);
        if (!trace) return;

        // Get current glow color from CSS variables
        const glowColor = getComputedStyle(document.documentElement).getPropertyValue('--glow-color').trim();

        const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        particle.setAttribute('r', '4');
        particle.setAttribute('fill', glowColor);
        particle.style.filter = `drop-shadow(0 0 6px ${glowColor})`;

        const pathLength = trace.getTotalLength();
        const svg = trace.parentElement;
        svg.appendChild(particle);

        let progress = 0;
        const speed = 0.01;

        function animate() {
            progress += speed;
            if (progress > 1) {
                particle.remove();
                return;
            }

            const point = trace.getPointAtLength(progress * pathLength);
            particle.setAttribute('cx', point.x);
            particle.setAttribute('cy', point.y);

            requestAnimationFrame(animate);
        }

        animate();
    }

    // Periodically spawn particles on random traces
    const traceIds = ['trace-about', 'trace-skills', 'trace-projects', 'trace-resume', 'trace-github', 'trace-linkedin', 'trace-contact'];

    setInterval(() => {
        const randomTrace = traceIds[Math.floor(Math.random() * traceIds.length)];
        createParticle(randomTrace);
    }, 2000);
});
