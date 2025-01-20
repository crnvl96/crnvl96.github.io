document.addEventListener("DOMContentLoaded", () => {
  const codeBlocks = document.querySelectorAll("code");

  codeBlocks.forEach((block) => {
    // Create copy button
    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy";
    copyButton.classList.add("copy-btn");

    // Style the button
    copyButton.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 10;
      padding: 5px 10px;
      background-color: var(--accent-color);
      color: var(--text-primary);
      border: none;
      cursor: pointer;
      font-family: "JetBrains Mono", monospace;
      border-radius: 4px;
      transition: background-color 0.3s ease;
    `;

    // Wrap code block in a relative positioned container
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    block.parentNode.insertBefore(wrapper, block);
    wrapper.appendChild(block);
    wrapper.appendChild(copyButton);

    // Copy functionality
    copyButton.addEventListener("click", () => {
      navigator.clipboard
        .writeText(block.textContent)
        .then(() => {
          copyButton.textContent = "Copied!";
          copyButton.style.backgroundColor = "var(--link-color)";
          setTimeout(() => {
            copyButton.textContent = "Copy";
            copyButton.style.backgroundColor = "var(--accent-color)";
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy:", err);
        });
    });
  });
});
