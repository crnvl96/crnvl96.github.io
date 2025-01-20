---
layout: post
slug: nvim-insight-autocmd
title: Nvim Insights - A More Elegant Approach to Autocommands
category: [nvim]
# custom_js: mouse_coords
---

Neovim configurations often revolve around `autocommands` (':h autocmd'), a well-established feature. Traditionally, developers define autocmds like this:

```lua
local group = vim.api.nvim_create_augroup("my-autocmd-group", { clear = true })

vim.api.nvim_create_autocmd("TextYankPost", {
	group = group,
	callback = function()
		vim.highlight.on_yank()
	end,
})
```

While this approach works, I encountered a subtle challenge when implementing a cursor position preservation technique during yanking operations (got it from [here](https://nanotipsforvim.prose.sh/sticky-yank), thankd for the tip!)

My initial implementation looked like this:

```lua
local cursorPreYank

local function yank_cmd(cmd)
	return function()
		cursorPreYank = vim.api.nvim_win_get_cursor(0)
		return cmd
	end
end

Utils.Set({ "n", "x" }, "y", yank_cmd("y"), { expr = true })
Utils.Set("n", "Y", yank_cmd("yg_"), { expr = true })

vim.api.nvim_create_autocmd("TextYankPost", {
	callback = function()
		if vim.v.event.operator == "y" and cursorPreYank then
			vim.api.nvim_win_set_cursor(0, cursorPreYank)
		end
	end,
})
```

The primary issue was code fragmentation. Despite addressing a single workflow (maintaining cursor position after yanking) the code felt scattered and less cohesive.

## A More Structured Solution

A more elegant way involved writing a custom wrapper function:

```lua
_G.Utils = {}

Utils.Autocmd = vim.api.nvim_create_autocmd

Utils.Group = function(name, fn)
	fn(vim.api.nvim_create_augroup(name, { clear = true }))
end
```

This method creates a closed scope that encapsulates autocmd definitions. For example:

```lua
Utils.Group("mygroup", function(g)
	print(g) -- prints the created augroup identifier
end)
```

The approach offers two key benefits:

1. Improved code organization
2. Clearer group naming that immediately communicates the autocmd's purpose

## Refactored Implementation

Here's the refined version:

```lua
Utils.Group("crnvl96-handle-yank", function(g)
	local cursorPreYank

	local function yank_cmd(cmd)
		return function()
			cursorPreYank = vim.api.nvim_win_get_cursor(0)
			return cmd
		end
	end

	Utils.Set("n", "Y", yank_cmd("yg_"), { expr = true })
	Utils.Set({ "n", "x" }, "y", yank_cmd("y"), { expr = true })

	Utils.Autocmd("TextYankPost", {
		group = g,
		callback = function()
			(vim.hl or vim.highlight).on_yank()
			if vim.v.event.operator == "y" and cursorPreYank then
				vim.api.nvim_win_set_cursor(0, cursorPreYank)
			end
		end,
	})
end)
```
