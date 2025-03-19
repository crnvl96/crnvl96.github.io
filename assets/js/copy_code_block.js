document.addEventListener("DOMContentLoaded", () => {
  // Find all code blocks that are not Mermaid diagrams
  const codeBlocks = document.querySelectorAll("pre code:not(.language-mermaid)");

  codeBlocks.forEach((block) => {
    // Create a copy button
    const copyButton = document.createElement("button");
    copyButton.className = "copy-code-button";
    copyButton.textContent = "Copy";
    copyButton.addEventListener("click", () => {
      copyToClipboard(block.textContent);
      copyButton.textContent = "Copied!";
      setTimeout(() => {
        copyButton.textContent = "Copy";
      }, 2000);
    });

    // Append the button to the code block
    const pre = block.parentElement;
    pre.style.position = "relative";
    pre.appendChild(copyButton);
  });

  function copyToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
});
