!function(){for(var e=document.querySelector("#main").innerHTML,t=document.querySelector("#main");t.firstChild;)t.removeChild(t.firstChild);var n,r=document.querySelector("#main").shadowRoot;r?n=r.querySelector("div"):(r=document.querySelector("#main").createShadowRoot(),n=document.createElement("div"),n.innerHTML=e,document.querySelectorAll('link[data-attr="shadow-page"]').forEach(function(e){r.appendChild(e.cloneNode())}),r.appendChild(n));var o=document.createElement("template"),i=function(e,t){t=void 0===t||t;var i=e,c=new Request(i);fetch(c).then(function(e){return e.text()}).then(function(e){for(o.innerHTML=e;n.firstChild;)n.removeChild(n.firstChild);var t=o.content.getElementById("main");return t.className="",t.id="",n.appendChild(document.importNode(t,!0)),window.scrollTo(0,0),a(r),!0}).then(function(){if(t){var e=o.content.querySelector("title");window.history.pushState({href:i},e.innerHTML||"",i),document.getElementsByTagName("title")[0].innerHTML=e.innerHTML}})},c=function(e){return e.preventDefault(),i(this.href),!1},a=function(e){e.querySelectorAll('a[href^="/"]').forEach(function(e){e.addEventListener("click",c)})};a(document.body),a(r),window.onpopstate=function(e){e.state&&e.state.href&&i(e.state.href,!1)}}();
//# sourceMappingURL=index.js.map