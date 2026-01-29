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

    // Simple markdown to HTML parser
    function parseMarkdown(md) {
        return md
            // Headers
            .replace(/^### (.+)$/gm, '<h3>$1</h3>')
            .replace(/^## (.+)$/gm, '<h3>$1</h3>')
            .replace(/^# (.+)$/gm, '<h2>$1</h2>')
            // Bold
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            // Links
            .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
            // Unordered lists
            .replace(/^\- (.+)$/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
            // Paragraphs (lines that aren't already wrapped)
            .replace(/^(?!<[hula]|<li)(.+)$/gm, '<p>$1</p>')
            // Clean up empty paragraphs
            .replace(/<p>\s*<\/p>/g, '');
    }

    // Fetch markdown content from file
    async function fetchMarkdownContent(filename, fallbackTitle) {
        try {
            const response = await fetch(`content/${filename}`);
            if (!response.ok) throw new Error(`Failed to load ${filename}`);
            const markdown = await response.text();
            return parseMarkdown(markdown);
        } catch (error) {
            console.error(`Error loading ${filename}:`, error);
            return `<h2>${fallbackTitle}</h2><p>Content unavailable.</p>`;
        }
    }

    // Parse skills markdown into structured data
    function parseSkillsMarkdown(markdown) {
        const categories = [];
        let currentCategory = null;

        const lines = markdown.split('\n');
        for (const line of lines) {
            // Category header (## Header)
            if (line.startsWith('## ')) {
                if (currentCategory) categories.push(currentCategory);
                currentCategory = {
                    title: line.replace('## ', '').trim(),
                    skills: []
                };
            }
            // Skill item (- **Skill** - description)
            else if (line.startsWith('- ') && currentCategory) {
                const skillLine = line.replace('- ', '').trim();
                // Extract skill name (bold text) and description
                const boldMatch = skillLine.match(/\*\*(.+?)\*\*/);
                const skillName = boldMatch ? boldMatch[1] : skillLine.split(' - ')[0];
                const description = skillLine.replace(/\*\*(.+?)\*\*/, '').replace(/^\s*-\s*/, '').trim();
                currentCategory.skills.push({ name: skillName, description });
            }
        }
        if (currentCategory) categories.push(currentCategory);
        return categories;
    }

    // Render skills as card grid with expandable details
    function renderSkillsCards(categories) {
        let html = '<h2>Skills</h2><div class="skills-cards-grid">';

        categories.forEach((category, index) => {
            const previewSkills = category.skills.slice(0, 3);
            const hasMore = category.skills.length > 3;

            html += `
                <div class="skill-card" data-category="${index}">
                    <h3>${category.title}</h3>
                    <div class="skill-preview">
                        ${previewSkills.map(s => `<span class="skill-tag">${s.name}</span>`).join('')}
                    </div>
                    ${hasMore ? `<button class="skill-more-btn" data-category="${index}">+ ${category.skills.length - 3} More</button>` : ''}
                </div>
            `;
        });

        html += '</div>';

        // Hidden expanded view
        html += '<div class="skill-expanded-overlay" id="skill-expanded-overlay">';
        html += '<div class="skill-expanded-content" id="skill-expanded-content"></div>';
        html += '</div>';

        return { html, categories };
    }

    // Fetch and render skills
    async function fetchSkillsContent() {
        try {
            const response = await fetch('content/skills.md');
            if (!response.ok) throw new Error('Failed to load skills.md');
            const markdown = await response.text();
            const categories = parseSkillsMarkdown(markdown);
            return renderSkillsCards(categories);
        } catch (error) {
            console.error('Error loading skills:', error);
            return { html: '<h2>Skills</h2><p>Content unavailable.</p>', categories: [] };
        }
    }

    // Setup skill card click handlers
    function setupSkillCardHandlers(categories) {
        const overlay = document.getElementById('skill-expanded-overlay');
        const content = document.getElementById('skill-expanded-content');

        // "+ More" button clicks
        document.querySelectorAll('.skill-more-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const categoryIndex = parseInt(btn.dataset.category);
                const category = categories[categoryIndex];
                showExpandedSkills(category, overlay, content);
            });
        });

        // Card clicks (also expand)
        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('click', () => {
                const categoryIndex = parseInt(card.dataset.category);
                const category = categories[categoryIndex];
                showExpandedSkills(category, overlay, content);
            });
        });

        // Close expanded view
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    }

    // Show expanded skills for a category
    function showExpandedSkills(category, overlay, content) {
        content.innerHTML = `
            <button class="skill-expanded-close">&times;</button>
            <h3>${category.title}</h3>
            <ul class="skill-full-list">
                ${category.skills.map(s => `
                    <li>
                        <strong>${s.name}</strong>
                        ${s.description ? `<span class="skill-desc">- ${s.description}</span>` : ''}
                    </li>
                `).join('')}
            </ul>
        `;
        overlay.classList.add('active');

        // Close button handler
        content.querySelector('.skill-expanded-close').addEventListener('click', () => {
            overlay.classList.remove('active');
        });
    }

    // Section content templates (about and skills loaded from markdown files)
    const sectionContent = {
        about: '<div class="loading" id="about-loading"></div><div id="about-content"></div>',
        skills: '<div class="loading" id="skills-loading"></div><div id="skills-content"></div>',
        projects: `
            <h2>Projects</h2>
            <div class="loading" id="projects-loading"></div>
            <div class="projects-grid" id="projects-grid"></div>
        `
    };

    // Open modal with content
    async function openModal(section) {
        modalContent.innerHTML = sectionContent[section];
        modalOverlay.classList.add('active');

        // Load content based on section
        if (section === 'about') {
            const content = await fetchMarkdownContent('about.md', 'About Me');
            const loadingEl = document.getElementById('about-loading');
            const contentEl = document.getElementById('about-content');
            if (loadingEl) loadingEl.style.display = 'none';
            if (contentEl) contentEl.innerHTML = content;
        } else if (section === 'skills') {
            const { html, categories } = await fetchSkillsContent();
            const loadingEl = document.getElementById('skills-loading');
            const contentEl = document.getElementById('skills-content');
            if (loadingEl) loadingEl.style.display = 'none';
            if (contentEl) {
                contentEl.innerHTML = html;
                setupSkillCardHandlers(categories);
            }
        } else if (section === 'projects') {
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
