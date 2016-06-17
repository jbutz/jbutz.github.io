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
            blogPostList: {
                type: Array,
                value: []
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
            window.scrollTo(0,0);
        },
        _selectBlogPage: function(routeBlog) {
            routeBlog = routeBlog || {};

            var blogPage = 'blog-list';
            if(this.routeBlog.path !== '/' && this.routeBlog.path !== '') {
                blogPage =  'blog-post';
            }

            this.$.blog.querySelector('iron-pages').selected = blogPage;
        },
        handleBlogResponse: function (e, ironRequest) {
            Polymer.dom(this.$.blogPost).appendChild(ironRequest.response.body);
        },
        buildBlogPath: function(dateValue, postValue) {
            if(dateValue && postValue) {
                return dateValue + '/' + postValue;
            }
        },
        getFirstArrayItem: function(arr, prop) {
            arr = arr || [];
            prop = prop || null;

            var el = arr[0] || {};
            if(prop) {
                return el[prop];
            }

            return el;
        }
    });
} ())