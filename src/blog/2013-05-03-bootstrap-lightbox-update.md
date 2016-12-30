---
layout: post.html
title: "Bootstrap Lightbox Update"
date: 2013-05-03
tags: Development, JavaScript, "Twitter Bootstrap"
---
I took a bit of a break from working on [Bootstrap Lightbox](https://github.com/jbutz/bootstrap-lightbox). I just needed to get away and be lazy for a while, but I am back. The other week I re-wrote the whole thing again. I'm sure that gets tiring for some, but I had several reasons:

<ul class="no-bullet">
<li>I wanted to do a little as necessary as Twitter updates Bootstrap</li>
<li>I wanted Bootstrap Lightbox to focus on images</li>
<li>I needed more JavaScript practice</li>
</ul>

So, here is what is going on. The [modal JavaScript](http://twitter.github.io/bootstrap/javascript.html#modals) is now a dependency. I take its functions and extend them and only modify the ones for lightbox that need it. This reduced the amount of work required significantly. If people want to extend or tweak Bootstrap Lightbox to use with non-image content or with carousels then they are welcome to do so, but that isn't what Bootstrap Lightbox is for. I'm focusing on images and that makes the code much easier to work with. This will make it a lot easier to add in some image gallery functionality. The old JavaScript was a mess, but now it is a lot cleaner and easier to understand.

So, what do I plan to do next? I am thinking about adding a feature so that you don't need to add any extra HTML to your page. The feature would be optional, but it would provide a good basis to take care of image galleries.

The new version is still a work in progress, but I think I have it all working. It should be released soon.