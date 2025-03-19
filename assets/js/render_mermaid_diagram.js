document.addEventListener("DOMContentLoaded", () => {
  // Check if Mermaid is already loaded
  if (typeof mermaid === "undefined") {
    // Load Mermaid library
    const mermaidScript = document.createElement("script");
    mermaidScript.src = "https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js";
    mermaidScript.onload = () => {
      initializeMermaid();
    };
    mermaidScript.onerror = () => {
      console.error("Failed to load Mermaid library.");
    };
    document.head.appendChild(mermaidScript);
  } else {
    initializeMermaid();
  }

  function initializeMermaid() {
    // Initialize Mermaid
    mermaid.initialize({ startOnLoad: false });

    // Find all Mermaid diagram blocks
    const mermaidBlocks = document.querySelectorAll(".language-mermaid");

    mermaidBlocks.forEach((block) => {
      // Render the diagram
      mermaid.init(undefined, block);
    });
  }
});
