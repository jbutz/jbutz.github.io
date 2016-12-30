---
layout: post.html
title: "ServiceNow Record Producer Caveats"
date: 2014-09-24
tags: ServiceNow
---
I recently ran into a problem when using Record Producers. In the script for the Record Producer I am using the `applyTemplate` function on the `current` GlideRecord. The template used varies, which is why I can't use the template field on the Record Producer. I kept ending up with duplicate task records with the exact same value in the number field.

After some tinkering I came to the conclusion that the `applyTemplate` method causes an insert, and that the Record Producer also does an insert after running the Record Producer script. After a lot of frustration I was looking through the Sandbox instance of ServiceNow when I noticed that the *New LDAP Server* inserted the `current` GlideRecord and they used the `setAbortAction` method. So I decided to give that a try.

Here is what I ended up with at the end of my Record Producer:

```javascript
current.update();
current.setAbortAction(true);
```

This works because the insert done by the Record Producer is aborted, and thus stops the duplicates.