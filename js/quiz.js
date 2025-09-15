// Preguntas configuradas según lo que enviaste
const questions = [
  {
    q: "¿Cuándo fue nuestra primera cita?",
    opts: ["5 de julio", "6 de julio", "7 de julio", "8 de julio"],
    correct: 1, // índice 1 -> '6 de julio'
  },
  {
    q: "¿Dónde fue la primera foto que nos tomamos juntos?",
    opts: ["En un ensayo", "En Ancón", "En la fiesta de Eli", "En el parque"],
    correct: 2, // 'En la fiesta de Eli'
  },
  {
    q: "¿Qué cosa hemos hecho más como pareja?",
    opts: ["Ver películas", "Ir al parque", "Ir a comer", "Detonar"],
    correct: 3, // 'Detonar'
  },
  {
    q: "¿Qué día comenzamos a hablar por chat?",
    opts: ["5 de junio", "6 de junio", "7 de junio", "8 de junio"],
    correct: 1, // '6 de junio'
  },
  {
    q: "¿Qué fue lo que hicimos primero como pareja?",
    opts: [
      "Ir al ensayo",
      "Ir a comer",
      "Ir al parque",
      "Ninguna de las anteriores",
    ],
    correct: 1, // 'Ir a comer'
  },
];

let current = 0;
let timer = null;
let timeLeft = 30;
const total = questions.length;
let musicPlaying = false;

// Elementos DOM
const landing = document.getElementById("landing");
const startBtn = document.getElementById("startBtn");
const quizArea = document.getElementById("quizArea");
const questionCard = document.getElementById("questionCard");
const optionsDiv = document.getElementById("options");
const currentSpan = document.getElementById("current");
const totalSpan = document.getElementById("total");
const timeLeftSpan = document.getElementById("timeLeft");
const progressBar = document.getElementById("progressBar");
const resultArea = document.getElementById("resultArea");
const resultText = document.getElementById("resultText");
const retryBtn = document.getElementById("retryBtn");
const bgAudio = document.getElementById("bgAudio");
const musicToggle = document.getElementById("musicToggle");
const heartsContainer = document.getElementById("heartsContainer");
const celebration = document.getElementById("celebration");
const closeCelebration = document.getElementById("closeCelebration");

totalSpan.textContent = total;

// Crear corazones flotantes
function createHearts() {
  for (let i = 0; i < 25; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = '<i class="fas fa-heart"></i>';
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 4 + 3 + "s";
    heart.style.animationDelay = Math.random() * 5 + "s";
    heartsContainer.appendChild(heart);
  }
}

// Función para crear confeti
function createConfetti() {
  const colors = ["#ff4d8d", "#ff9ec0", "#ff7ba9", "#c2185b", "#ffe6f0"];
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
    confetti.style.animationDelay = Math.random() * 2 + "s";
    document.body.appendChild(confetti);

    // Eliminar el confeti después de que termine la animación
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

function startQuiz() {
  landing.classList.add("d-none");
  quizArea.classList.remove("d-none");
  current = 0;
  showQuestion();
  // reproducir audio — esto se ejecuta en respuesta al click del usuario (gesto necesario)
  toggleMusic();
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = 30;
  timeLeftSpan.textContent = timeLeft;
  currentSpan.textContent = current + 1;
  const q = questions[current];

  // Formatear la pregunta con emojis
  questionCard.innerHTML = `<div class="floating"><i class="fas fa-question-circle me-2" style="color: var(--primary-color);"></i> ${q.q}</div>`;

  optionsDiv.innerHTML = "";
  const optionLetters = ["A", "B", "C", "D"];

  q.opts.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "btn option-btn";
    btn.innerHTML = `<div class="option-number">${optionLetters[i]}</div> ${opt}`;
    btn.dataset.index = i;
    btn.addEventListener("click", onOptionClick);
    optionsDiv.appendChild(btn);
  });

  updateProgress();
  timer = setInterval(() => {
    timeLeft--;
    timeLeftSpan.textContent = timeLeft;

    // Cambiar color del temporizador cuando queda poco tiempo
    if (timeLeft <= 10) {
      timeLeftSpan.parentElement.classList.add("text-danger");
    } else {
      timeLeftSpan.parentElement.classList.remove("text-danger");
    }

    if (timeLeft <= 0) {
      clearInterval(timer);
      lose("⏰ Se acabó el tiempo. ¡Perdiste!");
    }
  }, 1000);
}

function onOptionClick(e) {
  const chosen = parseInt(e.currentTarget.dataset.index, 10);
  // Deshabilitar opciones para evitar doble click
  Array.from(optionsDiv.children).forEach((b) =>
    b.classList.add("disabled-opt")
  );

  const correctIdx = questions[current].correct;

  if (chosen === correctIdx) {
    // Respuesta correcta
    e.currentTarget.classList.remove("btn-outline-primary");
    e.currentTarget.classList.add("btn-success");

    // Animación de acierto
    e.currentTarget.innerHTML += ' <i class="fas fa-check ms-2"></i>';

    clearInterval(timer);
    // pequeña pausa antes de siguiente pregunta para que vea la respuesta
    setTimeout(() => {
      current++;
      if (current >= total) {
        // Todas respondidas correctamente
        showCelebration();
      } else {
        showQuestion();
      }
    }, 1000);
  } else {
    // Respuesta incorrecta
    e.currentTarget.classList.remove("btn-outline-primary");
    e.currentTarget.classList.add("btn-danger");
    e.currentTarget.innerHTML += ' <i class="fas fa-times ms-2"></i>';

    // Mostrar la respuesta correcta
    const correctBtn = optionsDiv.children[correctIdx];
    correctBtn.classList.add("btn-success");
    correctBtn.innerHTML += ' <i class="fas fa-check ms-2"></i>';

    clearInterval(timer);
    setTimeout(() => lose("❌ Respuesta incorrecta. ¡Perdiste!"), 1500);
  }
}

function showCelebration() {
  quizArea.classList.add("d-none");
  celebration.classList.add("active");
  createConfetti();

  // Reproducir sonido de celebración
  const audio = new Audio(
    "https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3"
  );
  audio.play();
}

function lose(message) {
  // Pausar música
  try {
    bgAudio.pause();
    musicPlaying = false;
    musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
  } catch (e) {}

  quizArea.classList.add("d-none");
  resultArea.classList.remove("d-none");
  resultText.innerHTML = `
          <div class="alert alert-danger">
            <h4><i class="fas fa-heart-broken me-2"></i> ${message}</h4>
            <p class="mb-0 mt-2">Pero no te preocupes, el amor siempre te da otra oportunidad.</p>
          </div>`;
}

function updateProgress() {
  const percent = Math.round((current / total) * 100);
  progressBar.style.width = percent + "%";
}

function resetQuiz() {
  resultArea.classList.add("d-none");
  landing.classList.remove("d-none");
  // reiniciar audio
  try {
    bgAudio.pause();
    bgAudio.currentTime = 0;
    musicPlaying = false;
    musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
  } catch (e) {}
}

function toggleMusic() {
  if (musicPlaying) {
    bgAudio.pause();
    musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
  } else {
    bgAudio
      .play()
      .catch((e) => console.warn("No se pudo reproducir audio:", e));
    musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
  }
  musicPlaying = !musicPlaying;
}

// Inicialización
startBtn.addEventListener("click", startQuiz);
retryBtn.addEventListener("click", resetQuiz);
musicToggle.addEventListener("click", toggleMusic);
closeCelebration.addEventListener("click", () => {
  celebration.classList.remove("active");
  resetQuiz();
});

createHearts();
