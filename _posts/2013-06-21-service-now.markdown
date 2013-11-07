---
layout: post
title: "Service Now"
date: 2013-06-21 16:03
comments: true
tags: PaaS, JavaScript
categories: blog 2013 06 21
---
I recently switched jobs, and at the new company my department makes use of [Service Now](http://www.servicenow.com). I must say, I am impressed with the product. It is sold as an ITIL compatible help desk solution, but it is so much more. You are able to customize nearly every aspect of the system if you wish. Want to rearrange a page? Done. Want a wizard so people enter their issues correctly? Done. All of this customization is done through their interface, which I expect you can customize, and through JavaScript scripts.

Their platform runs on Java and uses Mozilla's rhino JavaScript engine for the server-side script processing. Everything is stored in a relational database, but you don't really have direct access to it.

The system is very flexible, and it even has some build in functionality for web services. You can connect to their service using WSDL and SOAP or by using HTTP requests to get JSON, XML, CSV responses back. I think there may also be PDF responses? I'm not sure since I haven't used them. Here is one of the big issues: I said you could use HTTP requests, but you don't really get to make RESTful requests. You end up with these horrendous lists of parameters on your requests that can get very unruly.

There is one other big issue in my mind. Everything is done with JavaScript, which isn't bad. However, their JavaScript does not look especially nice. It also doesn't promote very good practices. Some things get put into functions, and then the functions are called. Others are just monolithic in nature and have no functions and are all "global". I have been using a lot of IIFEs since I have no idea what the environment is like for my code, and I have no clue if the scripts are all thrown together, or if they are run individually.

That is really it for big issues. They have taken a lot of the annoying aspects out of making a web application. They take care of rendering for the most part, they have ACLs, they have logging, they have scheduled tasks. They even have decent documentation, which is always nice to find.

