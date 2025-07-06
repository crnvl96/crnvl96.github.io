---
layout: post
title: "When all depends on you"
date: 2025-06-17
---

A few months ago I had the opportunity to do something for the first time. This text is not a technical report, but rather my personal impressions and reflections on the choices I made, the challenges I faced, and how I overcame them with solutions that resulted in a working piece of software. Of course, I made some mistakes and poor decisions along the way, which I also want to discuss here.

The challenge was this: I work on the billing system of a company. Every month, we receive thousands of bill statements that we need to process to keep up with the billing workflow. We have a service with a user interface that our internal team uses to manage all this processing.

The problem arises because some of these bills require a power of attorney document to be attached. Although the bills are automatically received and processed, the powers of attorney are not. We have to manually upload them to the company's SharePoint and, once a month, send them by email to the authorized representative so they can follow the workflow for these documents. (It’s pure bureaucracy, but for the purpose of this text, the details aren’t important.)

So, although this process isn’t required for all bills, handling it for hundreds of papers is still a hassle. That’s where my mission comes in: *automate the entire process*.

The idea is simple: instead of uploading, organizing, composing an email, and remembering to send it every month, users just need to upload the documents to SharePoint, in a specific folder and with a certain naming convention - the rest is handled automatically by Python and AWS Lambda (but more on that later). I was tasked to create this service from scratch - design, documentation, testing, and deployment were all up to me. Although I work in a small, fast-paced team of three developers, everyone else was already fully occupied with tasks just as important as this one.

With that context, let’s explore the choices I made - both successes and mistakes. To be honest, I don’t want this to become a thousand-word report, as there isn’t that much to say. These are simply reflections for my future self, so I’ll condense what could be a rich (and lengthy) text into a few bullet points. This way, I can always come back and review what I learned.

## The good

- I chose to build the entire solution using [Python](https://www.python.org/), implementing it as a [Lambda function](https://aws.amazon.com/lambda/getting-started/?trk=56f58804-91cd-4af4-98d4-afe277a57fd3&sc_channel=ps&s_kwcid=AL!4422!3!651510591822!e!!g!!aws%20lambda&ef_id=CjwKCAjwpMTCBhA-EiwA_-MsmW9cvm4eXA0_czzJF5gX_SMFHf9QkWC5L9uF8WeYb2ewOqjIp5dJFRoCmD4QAvD_BwE:G:s&s_kwcid=AL!4422!3!651510591822!e!!g!!aws%20lambda!19828231347!148480170233&gad_campaignid=19828231347&gbraid=0AAAAADjHtp-rk54XcTwW8PrDPtGvk06YU&gclid=CjwKCAjwpMTCBhA-EiwA_-MsmW9cvm4eXA0_czzJF5gX_SMFHf9QkWC5L9uF8WeYb2ewOqjIp5dJFRoCmD4QAvD_BwE) powered by [Serverless](https://www.serverless.com/). This was a good decision because it provided a simple, straightforward way to develop and deploy code aimed at well-defined tasks. All I needed was to interact with the SharePoint filesystem and then send an email referencing a target folder, so this approach was the perfect fit.
- For documentation, I chose to use [Jekyll](https://jekyllrb.com/), specifically the “[Just the Docs](https://just-the-docs.com/)” template. I documented the process as I developed it, and by using [Docker](https://www.docker.com/), I was able to create a dockerized service that exposed all project documentation at a local URL, fully editable in Markdown. Having this ease of use for creating and editing documentation files was essential for maintaining quality and speed throughout the process.
- For testing, I chose [Pytest](https://docs.pytest.org/en/stable/). This is interesting because, although I wrote the documentation by hand, here I deliberately relied a bit on AI tools to provide good-quality tests. My workflow was simple: I gave the AI the necessary context, reviewed its output, ran the tests with intentionally faulty code to check if they failed, and then ran them again with the correct code to ensure they passed. I found this a great approach, as it forced me to read my entire codebase while still benefiting from the speed boost that AI provides.

## The bad

- Looking back, I might have overengineered things a bit here. I tried to design the solution as abstractly as possible, thinking, “What if we change our provider in the future? What if we stop using SharePoint in a few months?” In hindsight, this approach wasn’t really necessary because:
  - The company relies heavily on Microsoft products, so it’s very unlikely we’ll switch away from SharePoint anytime soon.
  - The codebase isn't large, and since the service only runs once every 24 hours, pausing it for a few hours to refactor wouldn’t be a big deal.
  - The critical function is sending an email once a month. Even if everything had to shut down for a week or two, we could always run the Lambda retroactively to process all the necessary documents without problems.
- The pursuit of perfection. I fell into the trap of trying to build the perfect software. I could have better balanced technical excellence with product viability. Focusing on delivering a concrete solution that simply does what’s needed - while still allowing for some flexibility - might have been a better choice.

At the end of this journey, I’m very satisfied, as the software has been running smoothly for several months now with 100% uptime, which makes me proud. Knowing that every decision - from the design choices to the implementation - came from my own research, thinking, and discussions with colleagues is truly meaningful. This experience has set a benchmark that I’ll reference in every future software project I work on.
