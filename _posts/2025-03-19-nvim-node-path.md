---
layout: post
slug: nvim-node-path
title: Nvim Insights - Using consistend node version in every nvim instance
custom_js: [copy_code_block, back_to_top_btn]
---

```lua
local env = vim.env
local node_path = "/home/crnvl96/.asdf/installs/nodejs/22.14.0"

env.PATH = node_path .. "/bin:" .. env.PATH
```

```mermaid
flowchart LR
    A[System PATH] --> B[Original PATH Environment]
    C[Node.js Installation] --> D["/home/crnvl96/.asdf/installs/nodejs/22.14.0/bin"]
    D --> E[Modified PATH Environment]
    B --> E
    E --> F[Neovim]
    
    style C fill:#f9f,stroke:#333,stroke-width:2px
    style D fill:#bbf,stroke:#333,stroke-width:2px
    style F fill:#bfb,stroke:#333,stroke-width:2px
```
