// Premios disponibles con colores vibrantes
const prizes = [
  {
    name: "Cena Romántica",
    description:
      "Una cena mágica a la luz de las velas con tu comida favorita, música suave y toda mi atención para ti. Será una noche que recordaremos para siempre. 🕯️❤️",
    icon: "fa-utensils",
    color: "#FF6B6B",
  },
  {
    name: "Noche de Películas",
    description:
      "Maratón de tus películas favoritas acurrucados juntos, con palomitas caseras, tus dulces preferidos y muchos abrazos. El plan perfecto para una noche especial. 🎬🍿",
    icon: "fa-film",
    color: "#4ECDC4",
  },
  {
    name: "Masaje Relajante",
    description:
      "Una hora completa de masajes relajantes con aceites aromáticos, música relajante y todo mi amor. Te vas a sentir como en las nubes. 💆‍♀️✨",
    icon: "fa-spa",
    color: "#FFD166",
  },
  {
    name: "Paseo al Atardecer",
    description:
      "Un paseo romántico de la mano para contemplar juntos el atardecer más hermoso, acompañado de conversaciones dulces y momentos únicos. 🌅💕",
    icon: "fa-sun",
    color: "#F96E46",
  },
  {
    name: "Un beso ",
    description:
      "Despertar con el aroma de un delicioso desayuno preparado con amor, servido en la cama con flores frescas y una sonrisa matutina. 💋☕",
    icon: "fa-coffee",
    color: "#9C51B6",
  },
  {
    name: "Poema Personalizado",
    description:
      "Un poema único y especial escrito desde el corazón, donde cada verso refleje lo mucho que significas para mí. Palabras que saldrán del alma. 📝💖",
    icon: "fa-pen-fancy",
    color: "#118AB2",
  },
];

// Elementos DOM
const wheel = document.getElementById("wheel");
const spinButton = document.getElementById("spinButton");
const prizeModal = new bootstrap.Modal(document.getElementById("prizeModal"));
const prizeName = document.getElementById("prizeName");
const prizeDescription = document.getElementById("prizeDescription");
const prizeIcon = document.getElementById("prizeIcon");
const prizesContainer = document.getElementById("prizesContainer");

let canSpin = true;
let currentRotation = 0;

// Crear la ruleta con diseño mejorado (sin texto)
function createWheel() {
  wheel.innerHTML = "";
  const sliceAngle = 360 / prizes.length;

  prizes.forEach((prize, index) => {
    const angle = sliceAngle * index;
    const wheelItem = document.createElement("div");
    wheelItem.className = "wheel-item";
    wheelItem.style.transform = `rotate(${angle}deg) skewY(${
      90 - sliceAngle
    }deg)`;

    // Crear gradiente para cada segmento
    const lighterColor = adjustBrightness(prize.color, 20);
    wheelItem.style.background = `linear-gradient(135deg, ${prize.color} 0%, ${lighterColor} 100%)`;

    wheel.appendChild(wheelItem);
  });
}

// Crear la sección de premios
function createPrizesSection() {
  prizesContainer.innerHTML = "";

  prizes.forEach((prize, index) => {
    const prizeElement = document.createElement("div");
    prizeElement.className = "prize-card";

    prizeElement.innerHTML = `
            <div class="prize-color" style="background: ${prize.color};"></div>
            <div class="prize-info">
              <i class="fas ${prize.icon} prize-icon-small" style="color: ${prize.color};"></i>
              <h3 class="prize-name">${prize.name}</h3>
            </div>
          `;

    prizesContainer.appendChild(prizeElement);
  });
}

// Función para ajustar el brillo del color
function adjustBrightness(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

// Girar la ruleta con animación mejorada
function spinWheel() {
  if (!canSpin) return;

  canSpin = false;
  spinButton.disabled = true;
  spinButton.innerHTML =
    '<i class="fas fa-spinner fa-spin me-2"></i> Girando...';

  // Ángulo aleatorio con múltiples rotaciones
  const prizeIndex = Math.floor(Math.random() * prizes.length);
  const sliceAngle = 360 / prizes.length;
  const extraRotations = 1440; // 4 rotaciones completas
  const targetAngle =
    extraRotations + (360 - prizeIndex * sliceAngle) - sliceAngle / 2;

  currentRotation += targetAngle;

  // Aplicar la rotación
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  // Mostrar resultado después de la animación
  setTimeout(() => {
    showPrize(prizeIndex);
    spinButton.innerHTML =
      '<i class="fas fa-magic me-2"></i> Descubrir Mi Premio';
  }, 4000);
}

// Mostrar el premio en modal
function showPrize(prizeIndex) {
  const prize = prizes[prizeIndex];

  // Mostrar en el modal
  prizeName.textContent = prize.name;
  prizeDescription.textContent = prize.description;
  prizeIcon.innerHTML = `<i class="fas ${prize.icon}"></i>`;

  // Abrir modal
  prizeModal.show();

  // Volver a activar el botón
  spinButton.disabled = false;
  spinButton.innerHTML =
    '<i class="fas fa-magic me-2"></i> Descubrir Mi Premio';
  canSpin = true;
}

// Event listeners
spinButton.addEventListener("click", spinWheel);

// Inicializar la ruleta y la sección de premios
createWheel();
createPrizesSection();
