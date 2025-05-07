const elements = document.querySelectorAll('.animate__animated');

function checkScroll() {
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            element.classList.add('animate__fadeInUp');
        }
    });
}

window.addEventListener('scroll', checkScroll);
checkScroll(); 