// contact.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  const inputs = form.querySelectorAll("input[required], textarea[required]");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // stop the form from reloading the page

    let valid = true;

    // Check each field
    inputs.forEach((field) => {
      if (field.value.trim() === "") {
        field.style.border = "2px solid #c0392b"; // red border if empty
        valid = false;
      } else {
        field.style.border = "1px solid #ccc"; // reset border
      }
    });

    if (!valid) {
      alert("Please fill in all required fields before submitting.");
      return;
    }

    // Everything filled — show thank-you popup
    const overlay = document.createElement("div");
    overlay.className = "thankyou-overlay";

    const box = document.createElement("div");
    box.className = "thankyou-box";
    box.innerHTML = `
      <h3>Thank you!</h3>
      <p>Your message has been sent successfully 💌</p>
      <button id="ok-btn">OK</button>
    `;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    // Stop scroll while popup is active
    document.body.style.overflow = "hidden";

    // Close popup when clicking OK
    document.getElementById("ok-btn").addEventListener("click", () => {
      overlay.remove();
      document.body.style.overflow = "";
      form.reset(); // clear all fields
    });
  });
});
