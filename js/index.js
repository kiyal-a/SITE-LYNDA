// ============= MOT DE PASSE =============
const CORRECT_PASSWORD = "KIYALA&LYNDA";

const gate = document.getElementById('gate');
const site = document.getElementById('site');
const form = document.getElementById('pw-form');
const input = document.getElementById('pw-input');
const error = document.getElementById('pw-error');

// Si déjà déverrouillé pendant cette visite, on saute directement le code
if (sessionStorage.getItem('siteUnlocked') === 'true') {
  gate.classList.add('hidden');
  site.classList.add('visible');
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value.trim().toUpperCase() === CORRECT_PASSWORD) {
    sessionStorage.setItem('siteUnlocked', 'true');
    gate.classList.add('hidden');
    site.classList.add('visible');
    error.textContent = '';
  } else {
    error.textContent = "Ce n'est pas le bon mot... essaie encore.";
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

    // Vide le cadre agrandi puis le remplit
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
      // Pas encore de vraie photo : on garde le repère décoratif
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