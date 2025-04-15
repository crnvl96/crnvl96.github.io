---
layout: post
slug: lua-metatables-intro
title: Lua metatables - introduction
custom_js: [copy_code_block, back_to_top_btn]
---

### Lua Metatables Overview

In Lua, metatables allow you to define how tables behave in various situations, like when accessing a key that doesn't exist or when performing operations between tables, like addition or multiplication.

We will discuss in more detail two of the most used metatable methods: `__index` and `__newindex`.

### The \_\_index method

The `__index` metamethod specifically defines what happens when you try to access a key that doesn't exist in a table. It can be either a function or another table.

Let's look at an example where `__index` points to another table:

```lua
-- Define a 'prototype' table with default values or methods
local prototype = {
	greeting = "Hello",
	sayHello = function(self)
		print(self.greeting)
	end,
}

-- Define our main table
local myObject = {
	name = "World",
}

-- Create the metatable
local mt = {
	__index = prototype, -- When a key is not found in myObject, look in 'prototype'
}

-- Attach the metatable to our main table
setmetatable(myObject, mt)

-- Access keys
print(myObject.name) -- "World"
print(myObject.greeting) -- "Hello"
myObject:sayHello() -- "Hello"
```

**How it works:**

1.  Defines a `prototype` table containing default key-value pairs.
2.  Defines the main table, `myObject`.
3.  Creates a metatable `mt` where the `__index` field is set to the `prototype` table.
4.  Attaches the metatable `mt` to the table `myObject` using `setmetatable`.
5.  When `myObject.greeting` is accessed, Lua checks `myObject`, doesn't find "greeting", finds the metatable, sees the `__index` field pointing to `prototype`, and looks up "greeting" in `prototype` instead.
6.  Similarly, when `myObject:sayHello()` is called, "sayHello" is found in `prototype` via `__index`.

**The benefits of this approach:**

- **Defaults:** Provides default values for tables without needing to copy them into every new table.
- **Inheritance:** Simulates object-oriented inheritance, allowing tables to "inherit" properties and methods from a prototype.
- **Code Reuse:** Avoids repetition by centralizing default behaviors or data.

Instead of `__index` being a table, it can also be a function:

```lua
local myTable = {}
local mt = {}

function mt.__index(table, key)
	print("Attempting to access non-existent key:", key)
	-- You could dynamically compute a value, load data, etc.
	-- For this example, we just return a default string
	return "Default value for " .. key
end

setmetatable(myTable, mt)

print(myTable.someKey) -- Prints and returns "Default value for someKey"
print(myTable.anotherKey) -- Prints and returns "Default value for anotherKey"
```

### The \_\_newindex method

The `__newindex` metamethod controls what happens when you try to assign a value to a key that _doesn't_ already exist in a table. Like `__index`, it can be a function or another table.
If it's a table, the assignment is performed on that table instead. If it's a function, that function is called.

Let's see an example using a function to log or validate assignments:

```lua
local myData = {
	threshold = 10,
}

local mt = {}

-- This function is called when assigning to a non-existent key in myData
function mt.__newindex(table, key, value)
	print("Attempting to set new key:", key, "with value:", value)

	-- Example: Only allow numeric values for new keys
	if type(value) == "number" then
		print("Setting new key:", key)
		-- IMPORTANT: Use rawset to avoid infinite recursion!
		rawset(table, key, value)
	else
		print("Error: Value for new key", key, "must be a number. Assignment blocked.")
	end
end

-- Attach the metatable
setmetatable(myData, mt)

-- Try assigning values
myData.newValue = 25 -- Triggers __newindex, assignment allowed
myData.anotherValue = "abc" -- Triggers __newindex, assignment blocked
myData.threshold = 5 -- Does NOT trigger __newindex (key exists), standard assignment
print(myData.newValue)
print(myData.threshold)
print(myData.anotherValue) -- Will print nil as assignment was blocked
```

**How it works:**

1.  Defines a table `myData`.
2.  Creates a metatable `mt`.
3.  Defines the `__newindex` metamethod as a function within `mt`. This function receives the table (`table`), the key being assigned (`key`), and the value being assigned (`value`).
4.  Inside `__newindex`, we first print a message. Then, we add validation logic (checking if `value` is a number).
5.  Crucially, `rawset(table, key, value)` is used to perform the actual assignment. Using `table[key] = value` inside `__newindex` would trigger `__newindex` again, leading to infinite recursion. `rawset` bypasses the metamethod.
6.  Attaches the metatable `mt` to `myData`.
7.  When `myData.newValue = 25` is executed, Lua checks `myData`, doesn't find "newValue", finds the metatable, and calls the `mt.__newindex` function. The function validates the numeric value and uses `rawset` to add the key-value pair.
8.  When `myData.anotherValue = "abc"` is executed, `__newindex` is called, but the validation fails, and `rawset` is not called, effectively blocking the assignment.
9.  When `myData.threshold = 5` is executed, Lua finds the key "threshold" directly in `myData`, so `__newindex` is _not_ triggered, and the assignment happens normally.

Alternatively, `__newindex` can be another table. When you try to set a new key-value pair on the original table, the assignment is redirected to the table specified by `__newindex`.

```lua
local mainTable = {
	existingKey = "original value",
}

local storageTable = {} -- New keys will be stored here

local mt = {
	__newindex = storageTable, -- Redirect new assignments to storageTable
}

setmetatable(mainTable, mt)

-- Assign a new key
mainTable.newKey = "this goes to storage"

-- Assign to an existing key (does NOT trigger __newindex)
mainTable.existingKey = "updated value"

print("Main table:")
for k, v in pairs(mainTable) do
	print(k, "=", v)
end
-- Output:
-- Main table:
-- existingKey = updated value

print("\nStorage table:")
for k, v in pairs(storageTable) do
	print(k, "=", v)
end
-- Output:
-- Storage table:
-- newKey = this goes to storage

-- Trying to access the new key via mainTable won't work
-- unless __index is also set appropriately.
print("\nAccessing newKey via mainTable:", mainTable.newKey) -- nil
```

**How it works:**

1.  We define `mainTable` and `storageTable`.
2.  The metatable `mt` has its `__newindex` field set to `storageTable`.
3.  `mt` is attached to `mainTable`.
4.  When `mainTable.newKey = "..."` is executed, Lua checks `mainTable`, doesn't find "newKey", finds the metatable, sees `__newindex` points to `storageTable`, and performs the assignment `storageTable["newKey"] = "..."` instead.
5.  The assignment `mainTable.existingKey = "..."` happens directly on `mainTable` because the key already exists, so `__newindex` is not involved.
6.  This demonstrates how `__newindex` can redirect assignments for new keys to a different table.

**The benefits of this approach:**

- **Validation:** Enforce rules about what kinds of keys or values can be added to a table.
- **Read-Only Tables:** Prevent any new keys from being added by having an empty `__newindex` function or one that throws an error.
- **Logging/Debugging:** Track when and how new keys are being added to a table.
- **Redirecting Assignments:** Set values in a different, underlying table instead of the original one.
