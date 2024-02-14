document.addEventListener('DOMContentLoaded', () => {
    // IDs of your moving boxes
    const boxIds = ['resume', 'contact', 'github-projects'];

    // Function to randomize box positions near the center
    const randomizePosition = (elementId) => {
        const box = document.getElementById(elementId);
        if (!box) return;

        // Define the area around the center where the boxes will appear
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const variance = 100; // How far from the center the boxes can go

        // Calculate random positions within the defined area
        const randomX = centerX - variance + Math.random() * (variance * 2);
        const randomY = centerY - variance + Math.random() * (variance * 2);

        // Apply the positions
        box.style.left = `${randomX}px`;
        box.style.top = `${randomY}px`;
    };

    // Randomize positions for each box
    boxIds.forEach(id => randomizePosition(id));
});

document.addEventListener('DOMContentLoaded', () => {
    // Add click event to the 'resume' circle to open a PDF
    document.getElementById('resume').addEventListener('click', () => {
        window.open('img/Master-Resume.pdf', '_blank');
    });

    // Add click event to the 'contact' circle to send an email
    document.getElementById('contact').addEventListener('click', () => {
        window.location.href = 'mailto:alomo@uci.com';
    });

    // Add click event to the 'github-projects' circle to link to your GitHub profile
    document.getElementById('github-projects').addEventListener('click', () => {
        window.open('https://github.com/AlanL0', '_blank');
    });
});
