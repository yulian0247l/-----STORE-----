const products = [ 
  { id: 1, title: "Script de tuning ilegal con acl y spawm", description: "Funciona para poder poner velocidad únicas a los vehículos.", price: "$2 USD", mediaType: "image", mediaSrc: "ilegal.jpg" },
  { id: 2, title: "Script para revisar la velocidad", description: "Funciona para poder ver si el vehiculo a estado alterado con su respectivo acl de polica.", price: "$2 USD", mediaType: "image", mediaSrc: "revisar.jpg" },
  { id: 3, title: "Sistema de arresto con su Carcel y mapeo", description: "Sistema de arrestar con carcel y trabajo para disminuir el tiempo con acl de policia.", price: "$5 USD", mediaType: "video", mediaSrc: "1mJUOWd0TvNWfNG6U5HUIi0BhjA2MoKOT" , thumbnail: "arrestar.jpg" },
  { id: 4, title: "Script de laser", description: "Funciona para poder utilizar lazer en las armas.", price: "$4 USD", mediaType: "video", mediaSrc: "1sIrnLXFzxU9NIhKB8DpUY0VU1wVIP46-" , thumbnail: "laser.jpg" },
  { id: 5, title: "Trabajo de cortador de cesped", description: "Trabajo.", price: "$1 USD", mediaType: "video", mediaSrc: "15gvSvOP_xwBJQgHixlf8z-7cGM7mapj8" , thumbnail: "cesped.jpg" },
  { id: 6, title: "Letrero Personalizado", description: "Letrero personalizado a su gusto", price: "$2 USD", mediaType: "video", mediaSrc: "1qd80w2yZjGWpFJtWmX2ysB80ku3HU95x", thumbnail: "letrero.jpg" },
  { id: 7, title: "Parqueo", description: "Mapeo de Parqueo bien ampliado con logo", price: "$2 USD", mediaType: "video", mediaSrc: "1HiMUJJ_ugvCbyS0rBjB2sNiKOOBPUZGP", thumbnail: "parqueo.jpg" },

];

const productsGrid = document.getElementById('productsGrid');
const searchBox = document.getElementById('searchBox');

const modal = document.getElementById('productModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');
const closeBtn = modal.querySelector('.close-btn');

const contactModal = document.getElementById('contactModal');
const closeContact = contactModal.querySelector('.close-contact');

function createProductCard(p) {
  const card = document.createElement("div");
  card.className = "product-card";

  let mediaHtml = "";
  if (p.mediaType === "video") {
    if (p.thumbnail) {
      mediaHtml = `<img class="product-image" src="${p.thumbnail}" alt="${p.title}">`;
    } else {
      mediaHtml = `<img class="product-image" src="video-placeholder.png" alt="${p.title}">`;
    }
  } else {
    mediaHtml = `<img class="product-image" src="${p.mediaSrc}" alt="${p.title}" />`;
  }

  card.innerHTML = `
    ${mediaHtml}
    <div class="product-title">${p.title}</div>
    <div class="product-desc">${p.description}</div>
    <div class="product-price">${p.price}</div>
    <button class="contact-btn">Contacto & Pago</button>
  `;

  // Evento: abrir modal cuando se haga click en cualquier parte del card excepto el botón contacto
  card.addEventListener('click', (e) => {
    if (!e.target.classList.contains('contact-btn')) {
      showModal(p);
    }
  });

  // Evento botón contacto
  card.querySelector('.contact-btn').addEventListener('click', () => {
    contactModal.style.display = "block";
  });

  return card;
}

function showModal(p) {
  modal.scrollTop = 0;
  modalTitle.textContent = p.title;
  modalDesc.textContent = p.description;
  modalPrice.textContent = p.price;

  // Limpiar modal de contenido anterior
  const oldVideo = document.getElementById('modalVideo');
  if (oldVideo) oldVideo.remove();

  modalImage.style.display = "none";

  if (p.mediaType === "video") {
    const isGoogleDriveID = !p.mediaSrc.endsWith('.mp4') && !p.mediaSrc.includes('/');

    if (isGoogleDriveID) {
      const iframe = document.createElement('iframe');
      iframe.id = 'modalVideo';
      iframe.src = `https://drive.google.com/file/d/${p.mediaSrc}/preview`;
      iframe.allowFullscreen = true;
      iframe.allow = "autoplay";
      iframe.style.width = '100%';
      iframe.style.height = '360px';
      iframe.style.borderRadius = '12px';
      iframe.style.boxShadow = '0 0 20px #00ffffbb';

      modal.querySelector('.modal-content').insertBefore(iframe, modalTitle);
    } else {
      const video = document.createElement('video');
      video.id = "modalVideo";
      video.controls = true;
      video.autoplay = true;
      video.loop = true;
      video.muted = false;
      video.src = p.mediaSrc;
      video.style.maxWidth = "100%";
      video.style.borderRadius = "12px";
      video.style.boxShadow = "0 0 20px #00ffffbb";
      modal.querySelector('.modal-content').insertBefore(video, modalTitle);
    }
  } else {
    modalImage.src = p.mediaSrc;
    modalImage.alt = p.title;
    modalImage.style.display = "block";
  }

  modal.style.display = "block";
}

function displayProducts(filter = "") {
  productsGrid.innerHTML = "";
  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(filter.toLowerCase()) ||
    p.description.toLowerCase().includes(filter.toLowerCase())
  );
  if (filtered.length === 0) {
    productsGrid.innerHTML = "<p style='grid-column:1/-1; text-align:center; color:#008888;'>No se encontraron productos</p>";
    return;
  }
  filtered.forEach(p => productsGrid.appendChild(createProductCard(p)));
}

displayProducts();

searchBox.addEventListener('input', e => displayProducts(e.target.value));

closeBtn.addEventListener('click', () => closeModal());
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

closeContact.addEventListener('click', () => contactModal.style.display = "none");
contactModal.addEventListener('click', e => { if (e.target === contactModal) contactModal.style.display = "none"; });

function closeModal() {
  modal.style.display = "none";
  const modalVideo = document.getElementById('modalVideo');
  if (modalVideo && modalVideo.tagName === "VIDEO") modalVideo.pause();
  if (modalVideo && modalVideo.tagName === "IFRAME") {
    modalVideo.src = ""; // Para detener video de Google Drive
  }
}






