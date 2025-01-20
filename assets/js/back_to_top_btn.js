document.addEventListener("DOMContentLoaded", function () {
  // Create back to top button
  const backToTopButton = document.createElement("button");
  backToTopButton.innerHTML = "↑";
  backToTopButton.classList.add("back-to-top");
  backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 99;
        font-size: 18px;
        border: none;
        outline: none;
        background-color: var(--accent-color);
        color: var(--text-primary);
        cursor: pointer;
        padding: 15px;
        border-radius: 8px;
        display: none;
        font-family: "JetBrains Mono", monospace;
        transition: background-color 0.3s ease;
    `;

  // Append button to body
  document.body.appendChild(backToTopButton);

  // Show/hide button based on scroll position
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  });

  // Scroll to top when button is clicked
  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
