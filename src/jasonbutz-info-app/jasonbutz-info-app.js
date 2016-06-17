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
            '_onRoutePathChanged(route.path)'
        ],
        _onRoutePathChanged: function (path) {
            if (!path) {
                this.set('route.path', '/home/');
            }
        },
        handleBlogResponse: function (e, ironRequest) {
            Polymer.dom(this.$.blogPost).appendChild(ironRequest.response.body);
        }
    });
} ())