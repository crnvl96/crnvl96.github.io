document.addEventListener("DOMContentLoaded", () => {
  // Load Mermaid library
  const mermaidScript = document.createElement("script");
  mermaidScript.src = "https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js";
  mermaidScript.onload = () => {
    // Initialize Mermaid
    mermaid.initialize({ startOnLoad: false });

    // Find all Mermaid diagram blocks
    const mermaidBlocks = document.querySelectorAll(".mermaid");

    mermaidBlocks.forEach((block) => {
      // Render the diagram
      mermaid.init(undefined, block);
    });
  };

  // Append the script to the document
  document.head.appendChild(mermaidScript);
});
