// js/gallery.js
document.addEventListener("DOMContentLoaded", () => {
  const thumbs = document.querySelectorAll(".gallery-grid img"); // your existing grid:contentReference[oaicite:0]{index=0}

  // Create overlay once
  const overlay = document.createElement("div");
  overlay.className = "img-overlay";
  document.body.appendChild(overlay);

  let clone = null;

  function closePopup() {
    overlay.classList.remove("show");
    document.body.classList.remove("no-scroll");
    if (clone) {
      clone.remove();
      clone = null;
    }
  }

  thumbs.forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => {
      // If already open, close
      if (clone) return closePopup();

      // Make a new top-layer clone
      clone = img.cloneNode(true);
      clone.classList.add("popup-clone");
      clone.style.cursor = "zoom-out";

      // Append above everything
      document.body.appendChild(clone);

      // Show dim background + lock scroll
      overlay.classList.add("show");
      document.body.classList.add("no-scroll");

      // Close when clicking the clone
      clone.addEventListener("click", closePopup, { once: true });
    });
  });

  // Click overlay to close
  overlay.addEventListener("click", closePopup);

  // ESC to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && (overlay.classList.contains("show") || clone)) {
      closePopup();
    }
  });
});
