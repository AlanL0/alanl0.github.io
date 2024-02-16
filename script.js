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

document.addEventListener('DOMContentLoaded', () => {
    const boxIds = ['resume', 'contact', 'github-projects'];

    const bringToFrontOnHover = (elementId) => {
        const box = document.getElementById(elementId);
        if (!box) return;

        // Store the original background color
        const originalColor = box.style.backgroundColor;

        box.addEventListener('mouseover', () => {
            box.style.zIndex = 10; // Bring to the front
            box.style.backgroundColor = '#1e29ff'; // Change to highlight color
        });

        box.addEventListener('mouseout', () => {
            box.style.zIndex = 1; // Reset z-index
            box.style.backgroundColor = originalColor; // Revert to original color
        });
    };

    // Apply functions to each box
    boxIds.forEach(id => {
        bringToFrontOnHover(id);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('banner');
    const logoContainer = document.getElementById('logo-container');
    const elementsToHide = document.querySelectorAll('.moving-box, #banner'); // Add other selectors as needed

    const revertChanges = () => {
        elementsToHide.forEach(el => el.style.display = ''); // Revert display
        document.body.style.backgroundColor = ''; // Revert background color
        logoContainer.classList.add('hidden');
        logoContainer.style.display = 'none'; // Hide the logo again
        clearTimeout(revertTimeout); // Clear the timeout to prevent it from running if manual revert is triggered
    };

    banner.addEventListener('click', () => {
        // Hide elements and change background color
        elementsToHide.forEach(el => el.style.display = 'none');
        document.body.style.backgroundColor = '#003366'; // Changed to white as per requirement

        // Ensure logoContainer is ready to be shown
        logoContainer.style.display = 'flex'; // Use 'flex' to utilize the centering from CSS
        logoContainer.classList.remove('hidden'); // Remove 'hidden' to make logo visible

        // Apply effects immediately without the delay
        logoContainer.classList.add('show-logo');

        timeoutId = setTimeout(revertChanges, 10000);

    });

    logoContainer.addEventListener('click', () => {
        clearTimeout(timeoutId); // Cancel the scheduled revertChanges
        revertChanges(); // Immediately revert changes
    });
});







