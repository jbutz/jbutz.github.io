---
layout: post.html
title: "ServiceNow - Workflow E-Mails"
date: 2014-01-29
tags: ServiceNow
---
Sending an e-mail from a workflow is ServiceNow is very easy. It barely takes any work. What happens when you need to include Request Item variables? Things get ugly. I had to dig around to find out how to do it; then I hoped I could find a better looking way. I didn't.

This is how you normally access a variable on a Request Item from a script:

```js
current.variables['variable_name'].getGlideObject().getDisplayValue(); // For the displayed value
current.variables['variable_name'].getGlideObject().getValue(); // For the real value (sys_id when it is a reference)
```

In order to run a script with e-mail you have to use the `mail_script` tag. So if we wanted to output the display value of a variable in the body of our e-mail we could do this:

```html
<mail_script>
template.print( current.variables['primary_contact'].getGlideObject().getDisplayValue() );
</mail_script>
```

If my case I had about 20 variables that needed to go in the e-mail and I didn't want to have that ugly mess throughout my message body. This is the best way I have come up with to accomplish what I needed in less space:

```html
<mail_script>
var item_var = function(key)
{
	template.print( current.variables[key].getGlideObject().getDisplayValue() );
}
</mail_script>

... blah blah blah ...
<strong>Variable One:</strong><mail_script>item_var('var1')</mail_script>
<strong>Variable Two:</strong><mail_script>item_var('var2')</mail_script>
<strong>Variable Three:</strong><mail_script>item_var('var3')</mail_script>
...
```