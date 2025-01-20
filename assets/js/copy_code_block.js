document.addEventListener("DOMContentLoaded", () => {
  const codeBlocks = document.querySelectorAll("code");

  codeBlocks.forEach((block) => {
    // Create copy button
    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy";
    copyButton.classList.add("copy-btn");

    // Style the button
    copyButton.style.position = "absolute";
    copyButton.style.top = "10px";
    copyButton.style.right = "10px";
    copyButton.style.zIndex = "10";
    copyButton.style.padding = "5px 10px";
    copyButton.style.background = "#333";
    copyButton.style.color = "white";
    copyButton.style.border = "none";
    copyButton.style.cursor = "pointer";

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
          setTimeout(() => {
            copyButton.textContent = "Copy";
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy:", err);
        });
    });
  });
});
