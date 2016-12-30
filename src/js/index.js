(function () {
    // Grab our main content
    var mainContent = document.querySelector('#main').innerHTML;
    // Remove the main content
    var mainEl = document.querySelector('#main');
    while (mainEl.firstChild) {
        mainEl.removeChild(mainEl.firstChild);
    }
    // Summon the shadow (dom)
    var contentShadow = document.querySelector('#main').createShadowRoot();
    // Create a div to use in the shadow dom and fill it
    var pageContainer = document.createElement('div');
    pageContainer.innerHTML = mainContent;
    // Find and add our shadow styles
    document.querySelectorAll('link[data-attr="shadow-page"]').forEach(function (el) {
        contentShadow.appendChild(el.cloneNode());
    });
    // Add our div to the shadow dom
    contentShadow.appendChild(pageContainer);

    // Create somewhere to hold loaded pages
    var templateEl = document.createElement('template');



    var pageNavigate = function (url, doPushState) {
        doPushState = doPushState === undefined ? true : doPushState;
        // Create our request and run it
        var pageURL = url;
        var pageRequest = new Request(pageURL);
        fetch(pageRequest)
            .then(function (response) {
                return response.text();
            })
            .then(function (responseHtml) {
                // Fill the template with our page html
                templateEl.innerHTML = responseHtml;
                // Clear the existing page content
                while (pageContainer.firstChild) {
                    pageContainer.removeChild(pageContainer.firstChild);
                }
                // Get the main content from the template
                var templateMain = templateEl.content.getElementById('main');
                templateMain.className = ''
                templateMain.id = ''
                // Move that content into the shadow dom
                pageContainer.appendChild(document.importNode(templateMain, true));
                // Scroll up to the top of the new page
                window.scrollTo(0, 0);
                // Setup our link-catcher
                modifyLinks(contentShadow);

                return true;
            })
            .then(function () {
                if (doPushState) {
                    // We got this far, update the URL
                    var titleEl = templateEl.content.querySelector('title');
                    window.history.pushState({
                        href: pageURL
                    }, titleEl.innerHTML || '', pageURL);

                    // and title
                    document.getElementsByTagName('title')[0].innerHTML = titleEl.innerHTML;
                }
            });
    }

    var catchClick = function (e) {
        // Stop real link functionality
        e.preventDefault();

        pageNavigate(this.href);

        return false;
    };

    var modifyLinks = function (element) {
        element.querySelectorAll('a[href^="/"]').forEach(function (el) {
            el.addEventListener('click', catchClick);
        });
    }

    modifyLinks(document.body);
    modifyLinks(contentShadow);



    window.onpopstate = function (e) {
        debugger;
        if (e.state && e.state.href) {
            pageNavigate(e.state.href, false);
        }
    }

} ());