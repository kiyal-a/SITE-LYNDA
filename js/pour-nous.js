// ============= CODE D'ACCES =============
const CORRECT_PASSWORD = "LYNDA";

const gate = document.getElementById('gate');
const site = document.getElementById('site');
const form = document.getElementById('pw-form');
const input = document.getElementById('pw-input');
const error = document.getElementById('pw-error');

if (sessionStorage.getItem('usSpaceUnlocked') === 'true') {
  gate.classList.add('hidden');
  site.classList.add('visible');
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value.trim().toUpperCase() === CORRECT_PASSWORD) {
    sessionStorage.setItem('usSpaceUnlocked', 'true');
    gate.classList.add('hidden');
    site.classList.add('visible');
    error.textContent = '';
  } else {
    error.textContent = "Code incorrect... essaie encore.";
    input.value = '';
    input.focus();
  }
});

// ============= ZOOM PHOTO + LEGENDE =============
const photoOverlay = document.getElementById('photo-overlay');
const photoFrameLarge = document.getElementById('photo-frame-large');
const photoCaption = document.getElementById('photo-caption');
const closePhotoBtn = document.getElementById('close-photo');
const frames = document.querySelectorAll('.frame');

frames.forEach(function (frame) {
  frame.addEventListener('click', function () {
    const src = frame.getAttribute('data-src');
    const type = frame.getAttribute('data-type') || 'image';
    const poster = frame.getAttribute('data-poster') || '';
    const caption = frame.getAttribute('data-caption') || '';

    photoFrameLarge.innerHTML = '';

    if (src && src.trim() !== '' && type === 'video') {
      const video = document.createElement('video');
      video.src = src;
      if (poster) video.poster = poster;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      photoFrameLarge.appendChild(video);
    } else if (src && src.trim() !== '') {
      const img = document.createElement('img');
      img.src = src;
      img.alt = caption;
      photoFrameLarge.appendChild(img);
    } else {
      const placeholder = document.createElement('div');
      placeholder.className = 'mark';
      placeholder.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="#6E2A38" stroke-width="1.2">' +
        '<rect x="3" y="3" width="18" height="18" rx="1"/>' +
        '<circle cx="9" cy="9" r="2"/>' +
        '<path d="M21 15l-5-5-4 4-3-3-6 6"/></svg>';
      photoFrameLarge.appendChild(placeholder);
    }

    photoCaption.textContent = caption;
    photoOverlay.classList.add('visible');
  });
});

function closePhoto() {
  photoOverlay.classList.remove('visible');
  const playingVideo = photoFrameLarge.querySelector('video');
  if (playingVideo) playingVideo.pause();
}
closePhotoBtn.addEventListener('click', closePhoto);
photoOverlay.addEventListener('click', function (e) {
  if (e.target === photoOverlay) closePhoto();
});

// ============= PLANIFIER UN DATE (EmailJS) =============
//
// --- À COMPLÉTER (voir emailjs.com > Email Services / Email Templates / Account > API Keys) ---
const EMAILJS_PUBLIC_KEY = "ZBM2qYnlrgBtC2RDL";
const EMAILJS_SERVICE_ID = "service_fhwkmbp";
const EMAILJS_TEMPLATE_ID = "template_5qax7lh";

// --- Adresses e-mail ---
// Astuce : pendant tes tests, mets TA propre adresse dans les deux lignes.
// Tu remplaceras par la vraie adresse de Lynda seulement quand tu seras prêt.
const EMAIL_KIYALA = "kiyalasilue1@gmail.com";
const EMAIL_LYNDA = "kiyalasilue1@gmail.com";

if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== "À_COMPLÉTER") {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

const dateForm = document.getElementById('date-form');
const dateWho = document.getElementById('date-who');
const dateDay = document.getElementById('date-day');
const dateTime = document.getElementById('date-time');
const datePlace = document.getElementById('date-place');
const dateSubmit = document.getElementById('date-submit');
const dateStatus = document.getElementById('date-status');

if (dateForm) {
  dateForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (EMAILJS_PUBLIC_KEY === "À_COMPLÉTER") {
      dateStatus.textContent = "Configuration EmailJS non terminée — voir les identifiants à compléter dans pour-nous.js.";
      dateStatus.classList.add('error');
      return;
    }

    const who = dateWho.value;
    const recipient = who === 'Kiyala' ? EMAIL_LYNDA : EMAIL_KIYALA;

    if (!recipient || recipient === "À_COMPLÉTER") {
      dateStatus.textContent = "Adresse e-mail du destinataire non renseignée.";
      dateStatus.classList.add('error');
      return;
    }

    const formattedDate = dateDay.value
      ? new Date(dateDay.value + 'T00:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
      : '';

    const params = {
      sender_name: who,
      date: formattedDate,
      heure: dateTime.value,
      lieu: datePlace.value,
      to_email: recipient
    };

    dateSubmit.disabled = true;
    dateStatus.classList.remove('error');
    dateStatus.textContent = "Envoi en cours...";

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
      .then(function () {
        dateStatus.textContent = "Invitation envoyée avec succès 💌";
        dateForm.reset();
        dateSubmit.disabled = false;
      })
      .catch(function (err) {
        dateStatus.textContent = "L'envoi a échoué. Vérifie la configuration EmailJS.";
        dateStatus.classList.add('error');
        dateSubmit.disabled = false;
        console.error(err);
      });
  });
}

// ============= LETTRE (enveloppe) =============
const envelopeWrap = document.getElementById('envelope-wrap');
const letterOverlay = document.getElementById('letter-overlay');
const closeLetterBtn = document.getElementById('close-letter');

envelopeWrap.addEventListener('click', function () {
  envelopeWrap.classList.add('open');
  setTimeout(function () {
    letterOverlay.classList.add('visible');
  }, 500);
});

function closeLetter() {
  letterOverlay.classList.remove('visible');
  setTimeout(function () {
    envelopeWrap.classList.remove('open');
  }, 300);
}
closeLetterBtn.addEventListener('click', closeLetter);
letterOverlay.addEventListener('click', function (e) {
  if (e.target === letterOverlay) closeLetter();
});