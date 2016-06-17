module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8080,
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
                tasks: ['sass'],
                options: {
                    spawn: false,
                    livereload: true
                },
            }
        },
    });

    grunt.registerTask('server', ['sass', 'connect:server', 'watch']);

};