---
layout: post
title: "ServiceNow - Navigation Handlers"
date: 2014-01-31 10:00
comments: true
tags: ServiceNow
categories: blog 2014 01 31
---
Today I had a need to toy with a default ServiceNow functionality called Navigation Handlers. This is a feature that doesn't show up at all on the Wiki. The only reference I could find to it was on a [ServiceNow Guru article](http://www.servicenowguru.com/system-ui/ui-pages-system-ui/overriding-ess-checkout-view-catalog-requests/) that my predecessor had followed to disable it. Since there is no wiki article on Navigation Handlers I thought I might do a small write up about what I have figured out about them.

**Navigation Handlers**

A navigation handler can be used to re-write URLs and change where a user goes based on the record they are trying to view. The only default navigation handler is used to send users to the Order Status page when opening a request record in the Self-Service view.

You can access the Navigation Handlers by typing in `sys_navigator.list` in the navigation search bar on the left.

There are three important fields on the Navigation Handler record. The table, a class, and the script. I don't know what the class is for. The table specifies which table's records the script should be run for. The script is used to rewrite the URL.

This is the default Navigation Handler script on the Request (sc_request) table:

{% gist 8743060 sc_request.js %}

This script checks if the view being loaded is the Self-Service (ess) or checkout view, or if the user is unprivilleged. If any of those are the case the URL is changed to load `com.glideapp.servicecatalog_checkout_view.do` instead of `sc_request.do` for the page.

There are two objects in there that you won't find documented on the wiki. They are `g_uri` and `g_request`. At the end of the article I'll include a list of all of the methods they have. I don't have information on most of the functions, but atleast you can see what exists. `g_request` seems to be information from the HTTP request. `g_uri` seems to be used to build a URL, but it also starts of holding the URL of the page you are currently trying to access. By setting `answer` to the value of g_uri the page gets redirected to the new URL. If `answer` is null then there is no redirect.

**g_request.getParameter(parameter)**

This method gets a parameter from the request URL and returns it as a string. For example if the requested URL is `https://demo.service-now.com/sc_request.do?sys_id=abcdef0123456789&sysparam_view=ess` and you call `g_request.getParameter('sys_param_view')` it will return `ess`.

**g_uri.get(parameter)**

This method gets the a parameter from the URL and returns it as a string. For example if the  URL is `sc_request.do?sys_id=abcdef0123456789&sysparam_view=ess` and you call `g_uri.get('sys_id')` it will return `abcdef0123456789`.

**g_uri.set(parameter,value)**

This method sets a parameter on the URL. It will either add the parameter or update it if it already exists. For example, if the URL is currently 'sc_request.do' and you call `g_uri.set('sys_id','abcdef0123456789')` the URL will be `sc_request.do?sys_id=abcdef0123456789`.

--

{% highlight javascript %}
# These are the available methods for g_uri and g_request
g_uri.action()
g_uri.addIgnoreParam()
g_uri.class()
g_uri.deleteMatchingParameter()
g_uri.deleteParmameter()
g_uri.equals()
g_uri.fileFromPath()
g_uri.get()
g_uri.getAction()
g_uri.getClass()
g_uri.getFileFromPath()
g_uri.getMap()
g_uri.getPath()
g_uri.hashCode()
g_uri.isSetAsDefault()
g_uri.map()
g_uri.notify()
g_uri.notifyAll()
g_uri.path()
g_uri.set()
g_uri.setAbsoluteURI()
g_uri.setAction()
g_uri.setAsDefault()
g_uri.setFilter()
g_uri.setParameter()
g_uri.setRelatedQuery()
g_uri.toString()
g_uri.wait()
 
 
g_request.asyncStarted()
g_request.asyncSupported()
g_request.authType()
g_request.contentLength()
g_request.contextPath()
g_request.cookies()
g_request.dispatcherType()
g_request.equals()
g_request.getAsyncContext()
g_request.getAttribute()
g_request.getAttributeNames()
g_request.getAuthType()
g_request.getCharacterEncoding()
g_request.getContentLength()
g_request.getContentType()
g_request.getCookies()
g_request.getDispatcherType()
g_request.getHeader()
g_request.getHeaderNames()
g_request.getInputStream()
g_request.getIntHeader()
g_request.getLocalAddr()
g_request.getLocale()
g_request.getLocales()
g_request.getLocalName()
g_request.getMethod()
g_request.getOriginalParameterMap()
g_request.getParameterMap()
g_request.getParameterNames()
g_request.getParameterValues()
g_request.getPart()
g_request.getParts()
g_request.getPathInfo()
g_request.getPathTranslated()
g_request.getProtocol()
g_request.getRealPath()
g_request.getRemoteAddr()
g_request.getRemoteUser()
g_request.getRequestDispatcher()
g_request.getRequestedSessionId()
g_request.getRequestURI()
g_request.getRequestURL()
g_request.getScheme()
g_request.getServletPath()
g_request.getSession()
g_request.getSiteID()
g_request.getSiteName()
g_request.getUserPrincipal()
g_request.headerNames()
g_request.inputStream()
g_request.isAsyncStarted()
g_request.isAsyncSupported()
g_request.isPublic()
g_request.isRequestedSessionIdFromCookie()
g_request.isRequestedSessionIdFromUrl()
g_request.isRequestedSessionIdFromURL()
g_request.isRequestedSessionIdValid()
g_request.isSecure()
g_request.isVirtual()
g_request.localAddr()
g_request.locale()
g_request.locales()
g_request.login()
g_request.logout()
g_request.method()
g_request.notify()
g_request.notifyAll()
g_request.originalParameterMap()
g_request.parameterMap()
g_request.parameterNames()
g_request.parts()
g_request.pathInfo()
g_request.pathTranslated()
g_request.protocol()
g_request.queryString()
g_request.reader()
g_request.remoteAddr()
g_request.remoteHost()
g_request.remotePort()
g_request.removeAttribute()
g_request.requestedSessionId()
g_request.requestedSessionIdFromCookie()
g_request.requestedSessionIdFromURL()
g_request.requestedSessionIdValid()
g_request.requestURI()
g_request.requestURL()
g_request.scheme()
g_request.secure()
g_request.serverPort()
g_request.servletPath()
g_request.setAttribute()
g_request.setCharacterEncoding()
g_request.setParameter()
g_request.siteID()
g_request.startAsync()
g_request.toString()
g_request.updateSessionLastAccessedTime()
g_request.userPrincipal()
g_request.virtual()
g_request.wait()
{% endhighlight %}