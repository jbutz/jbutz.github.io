---
layout: post
title: "ServiceNow - Workflow E-Mails"
date: 2014-01-29 12:00
comments: true
tags: ServiceNow
categories: blog 2014 01 29
---
Sending an e-mail from a workflow is ServiceNow is very easy. It barely takes any work. What happens when you need to include Request Item variables? Things get ugly. I had to dig around to find out how to do it; then I hoped I could find a better looking way. I didn't.

This is how you normally access a variable on a Request Item from a script:

{% gist 8743166 example0.js %}

In order to run a script with e-mail you have to use the `mail_script` tag. So if we wanted to output the display value of a variable in the body of our e-mail we could do this:

{% gist 8743166 example1.html %}

If my case I had about 20 variables that needed to go in the e-mail and I didn't want to have that ugly mess throughout my message body. This is the best way I have come up with to accomplish what I needed in less space:

{% gist 8743166 example2.html %}