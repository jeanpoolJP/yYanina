function getLimaTime() {
  // Crear fecha actual en UTC
  const now = new Date();
  // Obtener la diferencia horaria para Lima (UTC-5)
  const limaOffset = -5 * 60; // Lima está en UTC-5
  // Ajustar la hora actual a la zona horaria de Lima
  const limaTime = new Date(now.getTime() + limaOffset * 60 * 1000);
  return limaTime;
}

function calculateTimeUntilAnniversary() {
  const now = new Date(); // hora local de tu PC
  let nextAnniversary;

  if (now.getDate() < 11) {
    // Próximo 11 a las 00:00
    nextAnniversary = new Date(now.getFullYear(), now.getMonth(), 11, 0, 0, 0);
  } else if (now.getDate() > 11) {
    // Próximo mes, día 11 a las 00:00
    nextAnniversary = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      11,
      0,
      0,
      0
    );
  } else {
    // Si hoy ya es 11
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isAnniversary: true,
    };
  }

  const diffMs = nextAnniversary - now;

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isAnniversary: false };
}

function formatTime(value) {
  return value < 10 ? `0${value}` : value;
}

function updateCountdown() {
  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");
  const messageElement = document.getElementById("message");

  const timeLeft = calculateTimeUntilAnniversary();

  if (timeLeft.isAnniversary) {
    daysElement.textContent = "0";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    messageElement.innerHTML =
      "¡<strong>Hoy es nuestro aniversario!</strong> ¡Te Quiero! ❤️";
  } else {
    daysElement.textContent = timeLeft.days;
    hoursElement.textContent = formatTime(timeLeft.hours);
    minutesElement.textContent = formatTime(timeLeft.minutes);
    secondsElement.textContent = formatTime(timeLeft.seconds);
    messageElement.innerHTML = `Faltan <span id="days" class="days">${timeLeft.days}</span> días para nuestro próximo aniversario de mes`;
  }
}

// Actualizar la cuenta regresiva al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  updateCountdown();
  // Actualizar cada segundo
  setInterval(updateCountdown, 1000);
});
