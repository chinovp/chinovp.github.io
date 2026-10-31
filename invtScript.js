const confirmBtn = document.getElementById('confirmBtn');
const detailsBtn = document.getElementById('detailsBtn');
const confirmationModal = document.getElementById('confirmationModal');
const detailsModal = document.getElementById('misaModal');
const confirmationForm = document.getElementById('confirmationForm');
const mapaFrame = document.getElementById('mapaFrame');
const mapaLink = document.getElementById('mapaLink');

const ubicacionURL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3487.1989006568674!2d-110.9386799!3d29.070266900000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86ce85a623e47671%3A0x7227357dd0dfbc84!2sHacienda%20La%20Flor%20Eventos!5e0!3m2!1sen!2smx!4v1793405190649!5m2!1sen!2smx";

if (ubicacionURL !== "SIN_UBICACION" && ubicacionURL.trim() !== "") {
    mapaFrame.src = ubicacionURL;
    mapaLink.href = ubicacionURL;
} else {
    mapaFrame.src = "about:blank";
    mapaLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('La dirección no está disponible en este momento.');
    });
}

createConfetti();

// Abrir modal de confirmación
confirmBtn.addEventListener('click', () => {
    confirmationModal.style.display = 'flex';
});

// Abrir modal de detalles
detailsBtn.addEventListener('click', () => {
    detailsModal.style.display = 'flex';
});

// Cerrar modales al hacer clic fuera del contenido
window.addEventListener('click', (e) => {
    if (e.target === confirmationModal) confirmationModal.style.display = 'none';
    if (e.target === detailsModal) detailsModal.style.display = 'none';
});

// Manejar envío del formulario
confirmationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const guests = document.getElementById('guests').value;

    // Construir enlace de WhatsApp (wa.me) con el número y el texto codificado
    const phone = '526621131570'; // número provisto
    const text = `Hola, confirmo mi asistencia. Nombre: ${name}. Número de asistentes: ${guests}.`;
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`; //https://wa.me/526623415601?text=Gracias%20por%20confirmar.%20Esperamos%20que%20lo%20disfrutes.%0ANombre%3A

    // Abrir WhatsApp en nueva pestaña/ventana
    window.open(waUrl, '_blank');

    // Actualizar la UI como antes
    confirmationModal.style.display = 'none';
    confirmationForm.reset();
    confirmBtn.innerHTML = '<i class="fas fa-check"></i> ¡Confirmado!';
    confirmBtn.style.background = 'linear-gradient(90deg, #4CAF50, #8BC34A)';
    confirmBtn.disabled = true;
});

// Efecto de confeti
function createConfetti() {
    const colors = ['#ff7e5f', '#feb47b', '#6a11cb', '#2575fc', '#4CAF50'];
    const container = document.querySelector('.invitation-card');
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.opacity = '1';
        container.appendChild(confetti);

        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 5000 + 2000,
            easing: 'cubic-bezier(0.2, 0.8, 0.3, 0.9)'
        });

        animation.onfinish = () => confetti.remove();
    }
}

const countdown = document.getElementById("timer");
const eventDate = new Date("2026-11-28T21:00:00").getTime();

const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        countdown.innerHTML = "<span>¡El evento ha comenzado!</span>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdown.innerHTML = `
        <span>${days}<br><small>días</small></span>
        <span>${hours}<br><small>horas</small></span>
        <span>${minutes}<br><small>minutos</small></span>
        <span>${seconds}<br><small>segundos</small></span>
    `;
};

updateCountdown();
setInterval(updateCountdown, 1000);
