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
