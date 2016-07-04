module.exports = function (grunt) {
    var path = require('path');
    var swPrecache = require('sw-precache');

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 3000,
                    hostname: '*',
                    livereload: true
                }
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'css/style.css': 'css/style.scss'
                }
            }
        },
        watch: {
            sass: {
                files: ['css/**/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                    livereload: true
                },
            },
            html: {
                files: ['index.html', 'components/**/*.html'],
                options: {
                    livereload: true
                },
            },
            js: {
                files: ['js/**/*.js', 'components/**/*.js'],
                options: {
                    livereload: true
                },
            }
        },
        swPrecache: {
            dev: {
                handleFetch: false,
                rootDir: '.'
            },
            build: {
                handleFetch: true,
                rootDir: 'build',
            }
        },
        copy: {
            build: {
                files: [
                    // CSS
                    { expand: true, src: ['css/**/*.css'], dest: 'build/' },
                    // JS
                    { expand: true, src: ['js/**/*.js'], dest: 'build/' },
                    // Components
                    { expand: true, src: ['components/**/*'], dest: 'build/' },
                    // Root Files
                    { expand: true, src: ['bower.json', 'index.html', 'manifest.json'], dest: 'build/' },
                ],
            },
        },
        exec: {
            bower_prod: {
                command: 'bower install -p',
                cwd: 'build/',
                stdout: true,
                stderr: true
            },
            serve_build: {
                command: './node_modules/.bin/http-server build',
                stdout: true
            }
        }
    });

    grunt.registerTask('serve-build', ['exec:serve_build']);

    grunt.registerTask('server', ['sass', 'swPrecache:dev', 'connect:server', 'watch']);
    grunt.registerTask('serve', ['server']);

    grunt.registerTask('build', ['sass', 'copy:build', 'exec:bower_prod', 'swPrecache:build',]);

    /**
     * ------------------------------------------------------------------------
     */
    function writeServiceWorkerFile(rootDir, handleFetch, callback) {
        var config = {
            cacheId: grunt.config('pkg.name'),
            dynamicUrlToDependencies: {},
            // If handleFetch is false (i.e. because this is called from swPrecache:dev), then
            // the service worker will precache resources but won't actually serve them.
            // This allows you to test precaching behavior without worry about the cache preventing your
            // local changes from being picked up during the development cycle.
            handleFetch: handleFetch,
            logger: grunt.log.writeln,
            staticFileGlobs: [
                rootDir + '/css/**.css',
                rootDir + '/**.html',
                rootDir + '/images/**',
                rootDir + '/js/**.js',
                rootDir + '/components/**',
                rootDir + '/data.json',
            ],
            stripPrefix: rootDir + '/',
            // verbose defaults to false, but for the purposes of this demo, log more.
            verbose: true
        };

        swPrecache.write(path.join(rootDir, 'service-worker.js'), config, callback);
    }

    grunt.registerMultiTask('swPrecache', function () {
        var done = this.async();
        var rootDir = this.data.rootDir;
        var handleFetch = this.data.handleFetch;

        writeServiceWorkerFile(rootDir, handleFetch, function (error) {
            if (error) {
                grunt.fail.warn(error);
            }
            done();
        });
    });

};