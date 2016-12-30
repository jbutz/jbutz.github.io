---
title: Contact Me
layout: page.html
permalink: false
---

<p>If you would like to contact me please use the form below or contact me via my <a href="https://www.linkedin.com/in/jasonbutz" target="_blank">LinkedIn Profile</a>.</p>

<div class="pure-g">
    <div class="pure-u-1-5"></div>
    <div class="pure-u-3-5">
        <form class="pure-form pure-form-stacked" method="POST" action="https://formspree.io/jason@jasonbutz.info">
            <label for="name">Your Name</label>
            <input class="pure-input-1" name="name" type="text">
            <label for="email">Your E-Mail Address</label>
            <input class="pure-input-1" name="email" type="email">
            <label for="message">Your Message</label>
            <textarea class="pure-input-1" name="message"></textarea>
            <input type="hidden" name="_next" value="/thanks" />
            <input type="hidden" name="_subject" value="Website Contact" />
            <input type="text" name="_gotcha" style="display:none" />
            <button type="submit" class="pure-button pure-button-primary">Send</button>
        </form>
    </div>
</div>