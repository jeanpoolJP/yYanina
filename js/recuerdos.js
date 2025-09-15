// Sistema de música de fondo
const audio = document.getElementById("backgroundMusic");
const musicBtn = document.getElementById("musicBtn");
const musicStatus = document.getElementById("musicStatus");
let isPlaying = false;

// Auto-reproducir si viene del botón de la página principal
const urlParams = new URLSearchParams(window.location.search);
const autoplay = urlParams.get("autoplay");

if (autoplay === "true") {
  setTimeout(() => {
    playMusic();
  }, 1000);
}

musicBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
});

function playMusic() {
  audio
    .play()
    .then(() => {
      isPlaying = true;
      musicBtn.innerHTML = '<i class="fas fa-pause"></i> <span>Pausar</span>';
      musicBtn.style.background = "linear-gradient(45deg, #28a745, #20c997)";
    })
    .catch((err) => {
      console.log("Error al reproducir: ", err);
    });
}

function pauseMusic() {
  audio.pause();
  isPlaying = false;
  musicBtn.innerHTML = '<i class="fas fa-music"></i> <span>Reproducir</span>';
  musicBtn.style.background = "linear-gradient(45deg, #ff6b6b, #ff8e8e)";
}

// Función para mostrar foto en modal
function showPhoto(src, title) {
  document.getElementById("modalImage").src = src;
  document.getElementById("modalTitle").textContent = title;
}

// Crear corazones flotantes
function createFloatingHearts() {
  const heartsContainer = document.getElementById("heartsContainer");

  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDuration = Math.random() * 4 + 4 + "s";
    heart.style.fontSize = Math.random() * 20 + 15 + "px";

    heartsContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 8000);
  }, 2000);
}

// Efecto de partículas al hacer clic
document.addEventListener("click", (e) => {
  createSparkles(e.clientX, e.clientY);
});

function createSparkles(x, y) {
  for (let i = 0; i < 6; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.innerHTML = "✨";
    sparkle.style.left = x + "px";
    sparkle.style.top = y + "px";
    sparkle.style.animation = `sparkle 1s ease-out forwards`;
    sparkle.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${
      (Math.random() - 0.5) * 100
    }px)`;

    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 1000);
  }
}

// Inicializar efectos
createFloatingHearts();

// Animación de entrada escalonada para las tarjetas
window.addEventListener("load", () => {
  const cards = document.querySelectorAll(".memory-card");
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 200);
  });
});

// Efecto parallax suave
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;

  document.querySelector(
    ".floating-hearts"
  ).style.transform = `translateY(${rate}px)`;
});
