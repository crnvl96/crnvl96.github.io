---
layout: default
title: Blog
permalink: /blog/
---

# Blog

{% for post in site.posts %}

- [{{ post.title }}]({{ post.url | relative_url }}) <br>
  <small>{{ post.date | date: "%b %-d, %Y" }}</small>
  {% endfor %}
