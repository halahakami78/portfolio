// main.js
document.addEventListener("DOMContentLoaded", function () {
  const now = new Date();
  const hour = now.getHours();

  let greetingText;
  if (hour >= 5 && hour < 12) {
    greetingText = "Good morning🌅";
  } else if (hour >= 12 && hour < 18) {
    greetingText = "Good afternoon☀️";
  } else {
    greetingText = "Good evening🌙";
  }

  // === Overlay (dark background) ===
  const overlay = document.createElement("div");
  overlay.className = "popup-overlay";

  // === Popup box ===
  const popup = document.createElement("div");
  popup.className = "popup-box";

  // Greeting text
  const message = document.createElement("p");
  message.textContent = greetingText;

  // OK button
  const okButton = document.createElement("button");
  okButton.textContent = "OK";
  okButton.className = "ok-btn";

  // Remove popup + overlay when OK is clicked
  okButton.addEventListener("click", function () {
    popup.classList.add("fade-out");
    overlay.classList.add("fade-out");
    setTimeout(() => {
      popup.remove();
      overlay.remove();
    }, 300);
  });

  // Combine elements
  popup.appendChild(message);
  popup.appendChild(okButton);
  document.body.appendChild(overlay);
  document.body.appendChild(popup);
});

