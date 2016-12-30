var Metalsmith = require('metalsmith');
var collections = require('metalsmith-collections');
var layouts = require('metalsmith-layouts');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var sass = require('metalsmith-sass');
var uglify = require('metalsmith-uglify');
var debug = require('metalsmith-debug');
var pagination = require('metalsmith-pagination');
var Handlebars = require('handlebars');
var moment = require('moment');
var fs = require('fs');
var highlight = require('highlight.js');
var md5 = require('js-md5');

Handlebars.registerHelper('dateYYYMMDD', function (date) {
    return new Handlebars.SafeString(moment(date).format("MMMM Do YYYY"));
});

Handlebars.registerHelper('dateRFC822', function (date) {
    return new Handlebars.SafeString(moment(date).format('ddd, DD MMM YYYY HH:mm:ss ZZ'));
});

Handlebars.registerHelper('limit', function (collection, limit, start) {
    return collection.slice(start, limit + 1);
});

Handlebars.registerHelper('eachLimit10', function (context, options) {
    var ret = "";
    var loopLimit = context.length > 10 ? 10 : context.length;
    for (var i = 0; i < loopLimit; i++) {
        ret = ret + options.fn(context[i]);
    }

    return ret;
});

Handlebars.registerHelper('blogGuid', function (v1, v2) {
    return new Handlebars.SafeString(md5(`${v1}${v2}`));
});

Metalsmith(__dirname)
    .metadata({
        title: "Jason Butz",
        author: 'Jason Butz',
        siteurl: "http://jasonbutz.info",
        description: ""
    })
    .source('./src')
    .destination('./dist')
    .clean(true)
    .use(collections({
        blog: {
            pattern: 'blog/*.md',
            sortBy: 'date',
            reverse: true
        }
    }))
    .use(pagination({
        'collections.blog': {
            perPage: 10,
            layout: 'blogpage.html',
            first: 'index.html',
            path: 'page/:num/index.html',
            pageMetadata: {
                //title: 'Archive'
            }
        }
    }))
    .use(markdown({
        highlight: function (code, lang) {
            if (lang) {
                return highlight.highlight(lang, code).value;
            }
            return highlight.highlightAuto(code).value;
        }
    }))
    .use(permalinks({
        relative: false,
        pattern: 'blog/:date/:title',
        date: 'YYYY/MM/DD'
    }))
    //.use(concat)
    .use(layouts({
        engine: 'handlebars',
        partials: 'layouts/partials/'
    }))
    .use(sass({
        outputDir: 'css/'
    }))
    .use(uglify({
        nameTemplate: '[name].[ext]',
        sourceMap: true
    }))
    .use(debug())

    .build(function (err) {
        if (err) throw err;

    });

function concat(files, metalsmith, done) {
    /*var css = '';

    for (var file in files) {
        if ('.css' != extname(file)) continue;
        css += files[file].contents.toString();
        delete files[file];
    }

    css = myth(css);

    files['index.css'] = {
        contents: new Buffer(css)
    };*/
    //console.log(Object.keys(files));

    files['js/highlight.js'] = {
        contents: new Buffer(fs.readFileSync('node_modules/highlight.js/lib/highlight.js'))
    };

    done();
}