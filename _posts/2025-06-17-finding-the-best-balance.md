---
layout: post
title: "Finding the best balance"
date: 2025-06-17
---

Recently, I embarked on a personal adventure to learn a new programming language: Ruby. I’m not doing this for professional reasons, but simply to sharpen my learning and concentration skills, and to have another tool to consider (or not) for my personal projects or specific tasks at work. During my initial research, I was pleased to discover that [Ruby is strongly object-oriented](https://www.ruby-lang.org/en/about/). Since I’m already familiar with this concept, I decided to not only learn Ruby but also share some notes about OOP and the craft of coding with the world. I don’t promote my blog to anyone, but it’s out there in case it might be helpful to someone.

Just to give a taste about why I became so thrilled with this idea, This is what [Ruby's official website](https://www.ruby-lang.org/en/) says about its _OOP style:

> Initially, [Matz](https://pt.wikipedia.org/wiki/Yukihiro_Matsumoto) looked at other languages to find an ideal syntax. Recalling his search, he said, *“I wanted a scripting language that was more powerful than Perl, and more object-oriented than Python.”*
>
> In Ruby, everything is an object. Every bit of information and code can be given their own properties and actions. Object-oriented programming calls properties by the name *instance variables* and actions are known as *methods*. Ruby’s pure object-oriented approach is most commonly demonstrated by a bit of code which applies an action to a number.

```ruby
5.**times** { print "We *love* Ruby -- it's outrageous!" }
```

> In many languages, numbers and other primitive types are not objects. Ruby follows the influence of the [Smalltalk](https://en.wikipedia.org/wiki/Smalltalk) language by giving methods and instance variables to all of its types. This eases one’s use of Ruby, since rules applying to objects apply to all of Ruby.

As a last disclaimer, I won’t write here about rules or concepts. The intention of this blog as a whole is to serve as my personal, philosophical space to share thoughts and insights about life and software. Throughout this text, you’ll encounter reflections that you may or may not agree with, but if they make you think for just a second, well, the goal has been achieved.

## An Introduction to OOP, or finding the right balance

> OOP is a tradeoff

In OOP, we often accept increased complexity in some dimensions of our code to reduce it in others. The code may become less understandable in order to improve its adaptability to change. This tradeoff is all about making the code less concrete and more abstract. One of the most challenging responsibilities of a programmer is finding this balance. We need to keep the code concrete enough to be easily understood, yet abstract enough to be extensible, allowing for changes without excessive cost.

> Code should be consistent

Consider these conditional operators in Ruby:

```ruby

```

Every time the style of the code changes, the reader has to make a cognitive effort to understand what’s happening, which hinders readability. By not maintaining a consistent style, we increase the maintenance and comprehension costs of our code without providing equivalent benefits.

> Code should avoid duplication of data and login

I could mention many reasons for this, but I’ll focus on one: while duplication of data is sometimes necessary, duplication of logic often indicates that there are concepts in the code that remain hidden because they haven’t been isolated and named. When we identify the domain of a problem, encapsulate it within a method, and give that method a clear, descriptive name, we expose this concept and make it evident that it’s a recognized part of our code’s functionality.

> Code should have good names

During the initial development, the cost of poor method names is relatively low. However, code is read far more often than it’s written, and the ultimate cost of unclear naming can be very high, often paid by someone other than the original author. We should think of writing code as almost the same as writing a book, striving for consistency, a natural flow, and descriptive names. Code clarity is fundamentally built upon good naming.

I’ve shared some points I consider fundamental when writing code and working with OOP, but it’s important to remember that these are just opinions. The best way to judge good code is to evaluate its value against its cost. Ultimately, though, judgments about code often come down to individual taste, and humans don’t always agree. Regardless of how well a piece of code is written and organized, it’s also assessed on whether it meets current needs and is easy to read, so it can be adapted for future requirements.

If we had to characterize the goal of a "not so well-written" code, we might point to brevity. While brevity may be the soul of wit, in coding, it quickly becomes costly. Finding the right balance is always a valuable pursuit.
