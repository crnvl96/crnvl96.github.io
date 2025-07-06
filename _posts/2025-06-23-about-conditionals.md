---
layout: post
title: "About conditionals"
date: 2025-06-23
---

While reading [99 Bottles of OOP](https://sandimetz.com/99bottles), I came across an interesting approach to using conditionals that I thought would be valuable to share.

Consider the following code:

```javascript
function getUserRoleLevel(role) {
  if (role === "admin") {
    return 5;
  } else if (role === "editor") {
    return 4;
  } else if (role === "writer") {
    return 3;
  } else if (role === "reader") {
    return 2;
  } else if (role === "invited") {
    return 1;
  } else {
    return 0;
  }
}
```

Although there's nothing technically wrong with this code, it's important to discuss how readers might interpret it. Using *if/else* statements here suggests that each condition represents a fundamentally different case. In reality, all the conditions are simply checking the value of role.

This structure forces readers to examine each branch carefully, making the function harder to follow. Because each check is just a straightforward comparison, using multiple *if/else* statements overcomplicates the code and reduces its readability.

```js
function getUserRoleLevel(role) {
  switch (role) {
    case "admin":
      return 5;
    case "editor":
      return 4;
    case "writer":
      return 3;
    case "reader":
      return 2;
    case "invited":
      return 1;
    default:
      return 0;
  }
}
```

On the other hand, using a *switch* statement inherently suggests simpler checks. This approach implies that each condition has minimal variation, often just a direct comparison against a specific value (in this case, the value of the *user role*).

Readers of a *switch* statement expect the conditions to be fundamentally similar, requiring less mental effort to analyze each case individually.

```js
function validateInput({ name, email }) {
  if (!name) {
    throw new Error("a valid name is required");
  }

  if (!email) {
    throw new Error("a valid email is required");
  }

  return { name, email };
}
```

Lastly, the code below illustrates a scenario where the *if/else* operator is more appropriate, based on the perspective we've discussed. Notice how each condition is fundamentally different. We are checking for the absence of two separate values, both of which prevent the code from proceeding. When the conditional logic is more complex, or when the conditions being checked are unrelated, using *if/else* can be a suitable approach.
