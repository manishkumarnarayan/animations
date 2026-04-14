const irises = document.querySelectorAll('.iris');
let isRolling = false;

document.addEventListener('mousemove', (event) => {
    if (isRolling) return; // Skip tracking during animation
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    irises.forEach((iris) => {
        // Get the parent eye element to find the center reference
        const eye = iris.parentElement;
        const rect = eye.getBoundingClientRect();
        
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        // Calculate distance and angle from center to mouse
        const deltaX = mouseX - eyeCenterX;
        const deltaY = mouseY - eyeCenterY;
        
        // Calculate the angle
        const angle = Math.atan2(deltaY, deltaX);
        
        // Limit the movement radius (max distance iris can travel from center)
        const maxMove = 10; 
        
        // Calculate the actual translation
        const moveX = Math.cos(angle) * maxMove;
        const moveY = Math.sin(angle) * maxMove;

        // Apply transformation
        iris.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

const eyes = document.querySelectorAll('.eye');

document.addEventListener('mousedown', () => {
    eyes.forEach(eye => eye.classList.add('blinking'));
});

document.addEventListener('mouseup', () => {
    eyes.forEach(eye => eye.classList.remove('blinking'));
});

const sasBtn = document.getElementById('sas-btn');

sasBtn.addEventListener('click', () => {
    const isSas = document.body.classList.toggle('sas-mode');
    
    if (isSas) {
        // Trigger eye roll animation
        isRolling = true;
        irises.forEach(iris => iris.classList.add('rolling'));
        
        // Disable tracking temporarily
        setTimeout(() => {
            isRolling = false;
            irises.forEach(iris => iris.classList.remove('rolling'));
        }, 600); // Matches animation duration
    }

    // Toggle active label/style on button
    sasBtn.classList.toggle('active');
    sasBtn.textContent = isSas ? 'Light Mode' : 'Dark Mode';
});