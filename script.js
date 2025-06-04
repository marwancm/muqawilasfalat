// Initialize map when page loads
document.addEventListener("DOMContentLoaded", function () {
  initializeMap();
  initializeGallery();
  initializeSmoothScrolling();
});

// Initialize map with correct location
function initializeMap() {
  // Coordinates for the provided Google Maps link (سعير خميس مشيط)
  var map = L.map("map").setView([18.2639, 42.7278], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Add marker for the exact location
  var marker = L.marker([18.2639, 42.7278]).addTo(map);
  marker
    .bindPopup(
      '<b>مقاول أسفلت سعير خميس مشيط</b><br>507691810<br><a href="https://maps.app.goo.gl/Kmxt58vJzbC6EcQf7" target="_blank">عرض في خرائط جوجل</a>'
    )
    .openPopup();

  // Add custom marker icon if needed
  var customIcon = L.divIcon({
    className: "custom-marker",
    html: '<i class="fas fa-map-marker-alt" style="color: #e74c3c; font-size: 2rem;"></i>',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  // Replace default marker with custom one
  marker.setIcon(customIcon);
}

// Initialize gallery lightbox functionality
function initializeGallery() {
  document.querySelectorAll(".gallery-item img").forEach((img) => {
    img.addEventListener("click", function () {
      openLightbox(this.src, this.alt);
    });
  });
}

// Open lightbox for gallery images
function openLightbox(imageSrc, imageAlt) {
  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.innerHTML = `
        <div class="lightbox-content">
            <img src="${imageSrc}" alt="${imageAlt}">
            <button class="lightbox-close" aria-label="إغلاق">&times;</button>
        </div>
    `;
  document.body.appendChild(overlay);

  // Close lightbox when clicking close button
  overlay.querySelector(".lightbox-close").addEventListener("click", () => {
    closeLightbox(overlay);
  });

  // Close lightbox when clicking outside image
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeLightbox(overlay);
    }
  });

  // Close lightbox with Escape key
  document.addEventListener("keydown", function escapeHandler(e) {
    if (e.key === "Escape") {
      closeLightbox(overlay);
      document.removeEventListener("keydown", escapeHandler);
    }
  });
}

// Close lightbox
function closeLightbox(overlay) {
  if (overlay && overlay.parentNode) {
    document.body.removeChild(overlay);
  }
}

// Initialize smooth scrolling for navigation links
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Add scroll effect to header
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.backdropFilter = "blur(10px)";
  } else {
    header.style.background = "#fff";
    header.style.backdropFilter = "none";
  }
});

// Add animation on scroll for cards
function animateOnScroll() {
  const cards = document.querySelectorAll(
    ".service-card, .feature-card, .gallery-item"
  );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
}

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", animateOnScroll);

// Phone number click tracking (for analytics if needed)
function trackPhoneClick() {
  // Add analytics tracking here if needed
  console.log("Phone number clicked");
}

// Add click tracking to phone links
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.addEventListener("click", trackPhoneClick);
  });
});

// WhatsApp link functionality
function openWhatsApp() {
  const phoneNumber = "966507691810";
  const message = "مرحباً، أريد الاستفسار عن خدمات الأسفلت";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappUrl, "_blank");
}

// Add WhatsApp functionality to buttons
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".whatsapp").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      openWhatsApp();
    });
  });
});

// Form validation (if contact form is added later)
function validateContactForm(formData) {
  const errors = [];

  if (!formData.name || formData.name.trim().length < 2) {
    errors.push("الاسم مطلوب ويجب أن يكون أكثر من حرفين");
  }

  if (!formData.phone || !/^[0-9+\-\s()]{10,}$/.test(formData.phone)) {
    errors.push("رقم الهاتف غير صحيح");
  }

  return errors;
}

// Lazy loading for images
function initializeLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }
}

// Initialize lazy loading
document.addEventListener("DOMContentLoaded", initializeLazyLoading);

// Error handling for map loading
window.addEventListener("error", function (e) {
  if (e.target.tagName === "SCRIPT" && e.target.src.includes("leaflet")) {
    console.warn("Map library failed to load. Map functionality may not work.");
    // Hide map container or show fallback
    const mapContainer = document.getElementById("map");
    if (mapContainer) {
      mapContainer.innerHTML =
        '<p style="text-align: center; padding: 2rem;">خريطة الموقع غير متاحة حالياً</p>';
    }
  }
});
