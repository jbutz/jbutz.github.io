(function () {
    Polymer({
        is: 'jasonbutz-info-app',
        properties: {
            route: {
                type: Object
            },
            routeBlog: {
                type: Object
            },
            subrouteData: {
                type: Object
            },
            dataFileUrl: {
                type: String,
                value: 'data.json'
            },
            siteData: {
                type: Object,
                value: {}
            },
            selectedPost: {
                type: Object,
                value: null
            },
            data: {
                type: Object,
                value: function () {
                    return {
                        page: '/home/'
                    };
                }
            }
        },
        observers: [
            '_onRoutePathChanged(route.path)',
            '_selectBlogPage(routeBlog)'
        ],
        _onRoutePathChanged: function (path) {
            if (!path) {
                this.set('route.path', '/home/');
            }
            this.$$('app-drawer').close();
            window.scrollTo(0, 0);
        },
        _selectBlogPage: function (routeBlog) {
            routeBlog = routeBlog || {};

            var blogPage = 'blog-list';
            if (this.routeBlog.path !== '/' && this.routeBlog.path !== '') {
                blogPage = 'blog-post';
            }

            this.$.blog.querySelector('iron-pages').selected = blogPage;
        }
    });

    // Register service worker if supported.
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js');
    }
} ())