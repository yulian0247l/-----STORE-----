const products = [
  {
    id: 1,
    title: "Script de tuning ilegal con acl y spawm",
    description: "Funciona para poder poner velocidad únicas a los vehículos.",
    price: "$2 USD",
    mediaType: "image",
    mediaSrc: "ilegal.jpg"
  },
  {
    id: 2,
    title: "Script para revisar la velocidad",
    description: "Funciona para poder ver si el vehiculo a estado alterado con su respectivo acl de polica.",
    price: "$2 USD",
    mediaType: "image",
    mediaSrc: "revisar.jpg"
  },
  {
    id: 3,
    title: "Sistema de arresto con su Carcel y mapeo",
    description: "Sistema de arrestar con carcel y trabajo para disminuir el tiempo con acl de policia.",
    price: "$5 USD",
    mediaType: "image",
    mediaSrc: "https://drive.google.com/uc?export=view&id=1MJNZUnAiejBCI02yLj6HaXJgkLj3qVY3"
  },
  {
    id: 4,
    title: "Script de laser",
    description: "Funciona para poder utilizar lazer en las armas.",
    price: "$4 USD",
    mediaType: "video",
    mediaSrc: "https://drive.google.com/uc?export=view&id=1sIrnLXFzxU9NIhKB8DpUY0VU1wVIP46-"
  },
  {
    id: 5,
    title: "Trabajo de cortador de cesped",
    description: "Trabajo.",
    price: "$1 USD",
    mediaType: "video",
    mediaSrc: "https://drive.google.com/uc?export=view&id=15gvSvOP_xwBJQgHixlf8z-7cGM7mapj8"
  },
  {
    id: 6,
    title: "Demo en Video",
    description: "Video mostrando las funciones del script",
    price: "$18 USD",
    mediaType: "video",
    mediaSrc: "https://drive.google.com/uc?export=view&id=15gvSvOP_xwBJQgHixlf8z-7cGM7mapj8"
  }
];

const productsGrid = document.getElementById('productsGrid');
const searchBox = document.getElementById('searchBox');

const modal = document.getElementById('productModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');
const closeBtn = modal.querySelector('.close-btn');

function createProductCard(p) {
  const card = document.createElement("div");
  card.className = "product-card";

  if (p.mediaType === "video") {
    card.innerHTML = `
      <video class="product-video" muted preload="metadata" loop>
        <source src="${p.mediaSrc}" type="video/mp4" />
        Tu navegador no soporta video HTML5.
      </video>
      <div class="product-title">${p.title}</div>
      <div class="product-desc">${p.description}</div>
      <div class="product-price">${p.price}</div>
    `;
    card.querySelector('video').addEventListener('click', () => {
      showModal(p);
    });
  } else {
    card.innerHTML = `
      <img class="product-image" src="${p.mediaSrc}" alt="${p.title}" />
      <div class="product-title">${p.title}</div>
      <div class="product-desc">${p.description}</div>
      <div class="product-price">${p.price}</div>
    `;
    card.querySelector('img').addEventListener('click', () => {
      showModal(p);
    });
  }

  return card;
}

function showModal(p) {
  modalTitle.textContent = p.title;
  modalDesc.textContent = p.description;
  modalPrice.textContent = p.price;

  if (p.mediaType === "video") {
    modalImage.style.display = "none";
    if (!modal.querySelector('video')) {
      const video = document.createElement('video');
      video.id = "modalVideo";
      video.controls = true;
      video.autoplay = true;
      video.loop = true;
      video.muted = false;
      video.style.maxWidth = "100%";
      video.style.borderRadius = "12px";
      video.style.boxShadow = "0 0 20px #00ffffbb";
      modal.querySelector('.modal-content').insertBefore(video, modalTitle);
    }
    const modalVideo = document.getElementById('modalVideo');
    modalVideo.src = p.mediaSrc;
    modalVideo.style.display = "block";
  } else {
    const modalVideo = document.getElementById('modalVideo');
    if (modalVideo) {
      modalVideo.pause();
      modalVideo.remove();
    }
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
  filtered.forEach(p => {
    productsGrid.appendChild(createProductCard(p));
  });
}

displayProducts();

searchBox.addEventListener('input', (e) => {
  displayProducts(e.target.value);
});

closeBtn.addEventListener('click', () => {
  modal.style.display = "none";
  const modalVideo = document.getElementById('modalVideo');
  if (modalVideo) {
    modalVideo.pause();
  }
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    const modalVideo = document.getElementById('modalVideo');
    if (modalVideo) {
      modalVideo.pause();
    }
  }
});






