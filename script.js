const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const statusText = document.getElementById("status");
const xpDisplay = document.getElementById("xp");
const levelDisplay = document.getElementById("level");
const xpBar = document.getElementById("xpBar");
const modeSelect = document.getElementById("mode");
const motivation = document.getElementById("motivation");
const badge = document.getElementById("badge");
const modeDescription = document.getElementById("modeDescription");
const showStatsBtn = document.getElementById("showStats");
const statsContainer = document.getElementById("statsContainer");
const statsOutput = document.getElementById("statsOutput");
const showSettingsBtn = document.getElementById("showSettings");
const settingsContainer = document.getElementById("settingsContainer");
const toggleSound = document.getElementById("toggleSound");
const toggleVibration = document.getElementById("toggleVibration");
const endSound = document.getElementById("endSound");

// Premium Button im HTML vorausgesetzt
const buyPremiumBtn = document.getElementById("buyPremiumBtn");

const customDialog = document.getElementById("customModeDialog");
const customName = document.getElementById("customName");
const customFocus = document.getElementById("customFocus");
const customPause = document.getElementById("customPause");
const saveCustom = document.getElementById("saveCustom");

let timer;
let isRunning = false;
let sessionType = "focus";
let focusSeconds = 25 * 60;
let pauseSeconds = 5 * 60;
let remaining = focusSeconds;

let xp = parseInt(localStorage.getItem("xp")) || 0;

// Premium-Status aus localStorage
let isPremium = localStorage.getItem("isPremium") === "true";

const messages = [
  // (Deine 100+ Motivationsnachrichten hier, aus Platzgründen nicht alle aufgeführt)
  "Du bist der Held deiner Geschichte.",
    "Weiter so! Motivation ist trainierbar.",
  "💡 Fokus ist deine Superkraft!",
  "Yes! Wieder eine Einheit geschafft.",
  "Disziplin schlägt Talent – und du hast beides!",
  "Fokus ist der Motor deines Erfolgs.",
  "Jeder kleine Fortschritt ist ein Sieg.",
  "Deine Konzentration ist beeindruckend stark.",
  "Dranbleiben lohnt sich immer!",
  "Fokus bringt dich näher an dein Ziel.",
  "Du bist ein wahrer Fokus-Profi.",
  "Konzentriere dich, und die Welt gehört dir.",
  "Bleib dran – du schaffst Großes.",
  "Jede Minute Fokus zählt doppelt.",
  "Motivation ist nur der Anfang, Fokus macht den Unterschied.",
  "Du hast die Kraft, alles zu erreichen.",
  "Mit jedem Fokusmoment wächst dein Erfolg.",
  "Bleib fokussiert, du bist fast da.",
  "Fokus ist die beste Investition in dich selbst.",
  "Dein Wille ist unaufhaltsam.",
  "Motivation plus Fokus ergibt Erfolg.",
  "Große Träume brauchen fokussierte Schritte.",
  "Jede Sitzung bringt dich weiter.",
  "Du bist ein Champion im Fokussieren.",
  "Konzentration öffnet Türen.",
  "Deine Ausdauer zahlt sich aus.",
  "Du hast die Energie, alles zu schaffen.",
  "Fokus führt zum Durchbruch.",
  "Bleib stark, der Erfolg kommt.",
  "Du bist ein Meister deiner Zeit.",
  "Jeder Fokusmoment zählt.",
  "Motivation treibt dich an, Fokus hält dich auf Kurs.",
  "Dein Ehrgeiz kennt keine Grenzen.",
  "Fokussierte Arbeit zahlt sich aus.",
  "Du bist ein Vorbild für Disziplin.",
  "Bleib dran, es lohnt sich.",
  "Jede Minute bringt dich weiter.",
  "Fokus ist dein bester Freund.",
  "Du bist auf dem Weg zum Erfolg.",
  "Deine Konzentration ist bewundernswert.",
  "Motivation plus Fokus = Power.",
  "Du hast das Zeug zum Gewinner.",
  "Jeder Fokusmoment macht dich stärker.",
  "Dein Einsatz ist bemerkenswert.",
  "Fokus bringt dich ans Ziel.",
  "Du bist ein echtes Kraftpaket.",
  "Bleib motiviert, bleib fokussiert.",
  "Große Ziele brauchen große Konzentration.",
  "Deine Disziplin zahlt sich aus.",
  "Fokus ist der Schlüssel zum Erfolg.",
  "Du hast die Power, alles zu schaffen.",
  "Jeder Schritt ist ein Fortschritt.",
  "Bleib dran, du bist auf Kurs.",
  "Motivation ist gut, Fokus ist besser.",
  "Du bist ein Meister der Konzentration.",
  "Jeder Schritt zählt – bleib dran!",
  "Konzentration ist der Schlüssel zum Erfolg.",
  "Deine Energie ist beeindruckend!",
  "Heute investierst du in deine Zukunft.",
  "Bleib fokussiert, der Erfolg kommt!",
  "Du rockst das – weiter so!",
  "Jede Minute Fokus bringt dich weiter.",
  "Deine Ausdauer zahlt sich aus.",
  "Du bist ein wahrer Konzentrationsheld!",
  "Fokus macht den Unterschied.",
  "Motivation ist dein bester Freund.",
  "Konzentrierte Köpfe schaffen Großes.",
  "Mach weiter – du bist fast am Ziel.",
  "Der Weg zum Erfolg ist fokussiert.",
  "Deine Disziplin beeindruckt mich.",
  "Du hast das Zeug zum Champion!",
  "Ein kleiner Fokusmoment nach dem anderen.",
  "Deine Leistung ist spitze!",
  "Bleib stark, bleib fokussiert.",
  "Jede Session zählt – du schaffst das!",
  "Fokussierte Zeit ist wertvolle Zeit.",
  "Dein Hirn dankt dir für die Arbeit.",
  "Motivation gepaart mit Fokus ist unschlagbar.",
  "Du bist die Definition von Durchhaltevermögen.",
  "Konzentrierte Momente führen zu großen Ergebnissen.",
  "Jede Sekunde zählt – lass sie nicht verstreichen.",
  "Dein Einsatz ist bewundernswert.",
  "Fokus ist die Geheimwaffe der Gewinner.",
  "Du bist ein Meister der Konzentration.",
  "Halte durch, Erfolg ist nah.",
  "Deine Fokuszeit ist Gold wert.",
  "Du machst das super!",
  "Mit jedem Fokusmoment wächst du.",
  "Konzentration bringt dich ans Ziel.",
  "Du bist ein echtes Vorbild.",
  "Motivation ist der Funke, Fokus das Feuer.",
  "Du bringst es auf den Punkt.",
  "Bleib konzentriert, bleib erfolgreich.",
  "Jede Minute Fokus stärkt deinen Geist.",
  "Deine Energie inspiriert!",
  "Große Ziele brauchen fokussierte Schritte.",
  "Du bist auf dem richtigen Weg.",
  "Fokussiert heute – erfolgreich morgen.",
  "Dein Ehrgeiz ist beeindruckend.",
  "Mit Fokus und Willen geht alles.",
  "Du bist der Held deiner Geschichte."
];

// Modus-Definitionen, ohne eigenen Modus, der ist Premium
let modes = {
  pomodoro: { label: "Pomodoro", icon: "🍅", focus: 25, pause: 5 },
  deep: { label: "Deep Work", icon: "🧠", focus: 90, pause: 15 },
  light: { label: "Light Focus", icon: "🌤️", focus: 15, pause: 3 },
  sprint: { label: "Sprint", icon: "⚡", focus: 10, pause: 2 },
  power: { label: "Power Hour", icon: "🔥", focus: 60, pause: 10 }
};

const modeDescriptions = {
  pomodoro: { suitableFor: "Ideal für Lerneinheiten, Schreibtischarbeit und Routineaufgaben." },
  deep: { suitableFor: "Perfekt für komplexe Projekte, wissenschaftliches Arbeiten oder Programmieren." },
  light: { suitableFor: "Gut für Lesen, Ideensammlung, Skizzen oder leichte Aufgaben." },
  sprint: { suitableFor: "Optimal für Mails, Aufgaben-Listen, kurze Recherchen oder Zwischenschritte." },
  power: { suitableFor: "Geeignet für fokussierte Arbeit an einem Ziel ohne Unterbrechung." }
};

// Wenn Premium, eigenen Modus hinzufügen
if (isPremium) {
  modes.custom = { label: "Eigener Modus", icon: "⚙️", focus: 25, pause: 5 };
  modeDescriptions.custom = { suitableFor: "Dein individuell konfigurierter Fokusmodus." };
}

let settings = {
  sound: JSON.parse(localStorage.getItem("settingSound")) ?? true,
  vibration: JSON.parse(localStorage.getItem("settingVibration")) ?? true
};

function showAd() {
  alert("Werbung: Bitte unterstütze die App mit Premium für werbefreies Arbeiten!");
}

function populateModeSelect() {
  modeSelect.innerHTML = "";
  for (const key in modes) {
    if (key === "custom" && !isPremium) continue; // eigenen Modus nur für Premium

    const mode = modes[key];
    const times = `${mode.focus}/${mode.pause}`;
    const label = `${mode.icon} ${mode.label}`.padEnd(20, " ") + ` (${times})`;
    const option = document.createElement("option");
    option.value = key;
    option.textContent = label;
    modeSelect.appendChild(option);
  }
  // Wenn nicht Premium, eigenen Modus als Hinweis hinzufügen
  if (!isPremium) {
    const option = document.createElement("option");
    option.value = "custom";
    option.textContent = "⚙️ Eigener Modus (Premium)";
    modeSelect.appendChild(option);
  }
}

function updateTimerDisplay() {
  const mins = String(Math.floor(remaining / 60)).padStart(2, "0");
  const secs = String(remaining % 60).padStart(2, "0");
  timerDisplay.textContent = `${mins}:${secs}`;
}

function updateXP() {
  localStorage.setItem("xp", xp);
  xpDisplay.textContent = xp;
  levelDisplay.textContent = Math.floor(xp / 100) + 1;
  xpBar.value = xp % 100;

  if (xp >= 1000) badge.textContent = "👑 Konzentrations-Champion";
  else if (xp >= 600) badge.textContent = "🥇 Gold-Medaille";
  else if (xp >= 300) badge.textContent = "🥈 Silber-Medaille";
  else if (xp >= 100) badge.textContent = "🥉 Bronze-Medaille";
  else badge.textContent = "";
}

function showRandomMotivation() {
  const msg = messages[Math.floor(Math.random() * messages.length)];
  motivation.textContent = msg;
}

function setMode() {
  const val = modeSelect.value;

  if (val === "custom" && !isPremium) {
    alert("Der eigene Modus ist nur in der Premiumversion verfügbar!");
    modeSelect.value = "pomodoro";
    return;
  }

  if (val === "custom") {
    const label = prompt("Wie soll dein Modus heißen?");
    if (!label) return;

    const focus = parseInt(prompt("Wie viele Minuten Fokuszeit?"));
    const pause = parseInt(prompt("Wie viele Minuten Pause?"));
    if (isNaN(focus) || isNaN(pause)) return;

    modes["custom"] = {
      label: label,
      icon: "🛠️",
      focus: focus,
      pause: pause
    };

    modeDescriptions["custom"] = {
      suitableFor: "Benutzerdefinierter Modus."
    };

    populateModeSelect();
    modeSelect.value = "custom";
  }

  const mode = modes[val];

  modeDescription.innerHTML = `
    <strong>${mode.icon} ${mode.label} – Fokus ${mode.focus} min / Pause ${mode.pause} min</strong><br />
    <em>${modeDescriptions[val]?.suitableFor || ""}</em>
  `;

  focusSeconds = mode.focus * 60;
  pauseSeconds = mode.pause * 60;

  resetTimer();
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  statusText.textContent = sessionType === "focus" ? "Fokus läuft…" : "Leg eine Pause ein...";

  timer = setInterval(() => {
    remaining--;
    updateTimerDisplay();

    if (remaining <= 0) {
      clearInterval(timer);
      isRunning = false;

      if (settings.sound) endSound.play();
      if (settings.vibration && "vibrate" in navigator) navigator.vibrate(1000);

      if (sessionType === "focus") {
        xp += Math.floor(focusSeconds / 60);
        updateXP();
        showRandomMotivation();

        const today = new Date().toISOString().split("T")[0];
        let stats = JSON.parse(localStorage.getItem("stats")) || {};
        stats[today] = (stats[today] || 0) + Math.floor(focusSeconds / 60);
        localStorage.setItem("stats", JSON.stringify(stats));

        // Werbung nach Fokus-Sitzung nur, wenn kein Premium
        if (!isPremium) {
          showAd();
        }

        sessionType = "pause";
        remaining = pauseSeconds;
        statusText.textContent = "Pause läuft…";
        startTimer();
      } else {
        sessionType = "focus";
        remaining = focusSeconds;
        statusText.textContent = "Fokus bereit.";
        updateTimerDisplay();
      }
    }
  }, 1000);
}

function pauseTimer() {
  if (!isRunning) return;
  clearInterval(timer);
  isRunning = false;
  statusText.textContent = "Pausiert.";
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  sessionType = "focus";
  remaining = focusSeconds;
  updateTimerDisplay();
  statusText.textContent = "Zurückgesetzt.";
  motivation.textContent = "";
}

function showStats() {
  let stats = JSON.parse(localStorage.getItem("stats")) || {};
  let output = "";

  const today = new Date().toISOString().split("T")[0];
  const week = getCurrentWeekDates();
  let todayTotal = stats[today] || 0;
  let weekTotal = week.reduce((sum, date) => sum + (stats[date] || 0), 0);

  output += `<strong>Heute:</strong> ${todayTotal} Minuten<br>`;
  output += `<strong>Diese Woche:</strong> ${weekTotal} Minuten<br><br>`;
  output += `<u>Wochenübersicht:</u><br>`;

  week.forEach(date => {
    output += `${formatDate(date)}: ${stats[date] || 0} Min<br>`;
  });

  statsOutput.innerHTML = output;
}

function getCurrentWeekDates() {
  const today = new Date();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - today.getDay());

  return [...Array(7)].map((_, i) => {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    return d.toISOString().split("T")[0];
  });
}

function formatDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

// Benutzerdefinierten Modus speichern
saveCustom.addEventListener("click", () => {
  const name = customName.value.trim();
  const focus = parseInt(customFocus.value);
  const pause = parseInt(customPause.value);

  if (!isPremium) {
    alert("Eigene Modi sind nur in der Premiumversion verfügbar!");
    customDialog.close();
    return;
  }

  if (name && focus > 0 && pause >= 0) {
    modes.custom = {
      label: name,
      icon: "🛠️",
      focus,
      pause
    };
    modeDescriptions.custom.suitableFor = "Dein persönlicher Modus: perfekt angepasst.";
    populateModeSelect();
    modeSelect.value = "custom";
    setMode();
  }

  customDialog.close();
});

// Premium kaufen simulieren (für Demo)
buyPremiumBtn?.addEventListener("click", () => {
  if (confirm("Premium für 2,99€ kaufen und Werbung entfernen?")) {
    isPremium = true;
    localStorage.setItem("isPremium", "true");
    alert("Danke für deinen Kauf! Die Werbung wurde deaktiviert.");
    // Premium Features aktivieren
    modes.custom = { label: "Eigener Modus", icon: "⚙️", focus: 25, pause: 5 };
    modeDescriptions.custom = { suitableFor: "Dein individuell konfigurierter Fokusmodus." };
    populateModeSelect();
    modeSelect.value = "pomodoro";
    setMode();
  }
});

// Event Listener
showStatsBtn.addEventListener("click", () => {
  statsContainer.style.display = statsContainer.style.display === "block" ? "none" : "block";
  if (statsContainer.style.display === "block") showStats();
});

showSettingsBtn.addEventListener("click", () => {
  settingsContainer.style.display = settingsContainer.style.display === "block" ? "none" : "block";
});

toggleSound.checked = settings.sound;
toggleVibration.checked = settings.vibration;

toggleSound.addEventListener("change", () => {
  settings.sound = toggleSound.checked;
  localStorage.setItem("settingSound", settings.sound);
});

toggleVibration.addEventListener("change", () => {
  settings.vibration = toggleVibration.checked;
  localStorage.setItem("settingVibration", settings.vibration);
});

modeSelect.addEventListener("change", setMode);
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// Init
populateModeSelect();
setMode();
updateTimerDisplay();
updateXP();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").then(() => {
      console.log("Service Worker registriert");
    });
  });
}
