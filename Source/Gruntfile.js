'use strict';

module.exports = function (grunt) {


    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        global: {
            app: 'app',
            build: 'build',
            temp: 'temp',
            assets: '/assets',
            sass: '/assets/sass',
            css:  '/assets/css',
            libs: '/assets/libs',
            js: '/assets/js',
            bower: '/bower_components',
            components: '/components',
            shared: '/shared'
        },


        // Watches files for changes and runs tasks based on the changed files
        watch: {
            options: {
                livereload:true,
                cwd: '<%= global.app %>'
            },
            compass: {
                files: '**/*.sass',
                tasks: ['clean:dev','compass:dev', 'cssmin:dev', 'concat_css:dev'],
                options: {
                    cwd: '<%= global.app %><%= global.sass %>'
                }
            },
            js : {
                files: ['<%= global.components %>/**/*.js', '<%= global.bower %>/**/*.js'],
                tasks: ['clean:dev', 'uglify:dev', 'concat:dev', 'copy:dev']

            }
        },

        // Clean out temporary directories and files.
        clean: {
            dev: ["temp/**/*", "<%= global.app %><%= global.js %>/min/*.min.js", "<%= global.app %><%= global.css %>/min/*.min.css"],
            dist: ["build/**/*"]
        },

        // Compile sass files into css.
        compass: {
            options: {
                config:  'config.rb',
                sassDir: '<%= global.app %><%= global.sass %>',
                cssDir:  '<%= global.app %><%= global.css %>',
                bundleExec: true,
                force: true
            },
            dev: {
                options: {
                    environment: 'development'
                }
            },
            dist: {
                options: {
                    environment: 'production'
                }
            }

        },      


        // Minifies any unminified CSS files.
        cssmin: {
            dev: {

                files: [{
                    cwd: '<%= global.app %><%= global.css %>',
                    expand: true,
                    src: ['*.css',
                        '!*.min.css'],
                    dest: '<%= global.app %><%= global.css %>/min',
                    ext: '.min.css'
                }]
            },
            dist: {
                files: [{
                    cwd: '<%= global.app %><%= global.css %>',
                    expand: true,
                    flatten: true,
                    src: ['*.css',
                        '!*.min.css'],
                    dest: '<%= global.build %><%=global.css %>/min',
                    ext: '.min.css'
                }]
            }
        },

        // Uglifies and Minifies js files.
        uglify: {
            dev: {
                options: {
                    mangle: false,
                    compress: {}
                },
                files: [{
                    expand: true,
                    flatten:true,
                    cwd: '<%= global.app %><%= global.components %>',
                    dest: '<%= global.temp %><%= global.js %>/min',
                    src: ['**/*.js', '!**/*.min.js'],
                    rename: function (dest, src) {
                        var folder = src.substring(0, src.lastIndexOf('/'));
                        var filename = src.substring(src.lastIndexOf('/'), src.length);
                        filename = filename.substring(0, filename.lastIndexOf('.'));
                        return dest + '/' + folder + filename + '.min.js';
                    }
                },
                {
                    expand: true,
                    flatten:true,
                    cwd: '<%= global.app %>',
                    dest: '<%= global.temp %><%= global.js %>/min',
                    src: ['*.js', '!*.min.js'],
                    rename: function (dest, src) {
                        var folder = src.substring(0, src.lastIndexOf('/'));
                        var filename = src.substring(src.lastIndexOf('/'), src.length);
                        filename = filename.substring(0, filename.lastIndexOf('.'));
                        return dest + '/' + folder + filename + '.min.js';
                    }
                }
                ]
            },
            dist: {
                options: {
                    mangle: false,
                    compress: {}
                },
                files: [{
                    expand: true,
                    flatten:true,
                    cwd: '<%= global.app %><%= global.components %>',
                    dest: '<%= global.temp %><%= global.js %>/min',
                    src: ['**/*.js', '!**/*.min.js'],
                    rename: function (dest, src) {
                        var folder = src.substring(0, src.lastIndexOf('/'));
                        var filename = src.substring(src.lastIndexOf('/'), src.length);
                        filename = filename.substring(0, filename.lastIndexOf('.'));
                        return dest + '/' + folder + filename + '.min.js';
                    }
                },
                {
                    expand: true,
                    flatten:true,
                    cwd: '<%= global.app %>',
                    dest: '<%= global.temp %><%= global.js %>/min',
                    src: ['*.js', '!*.min.js'],
                    rename: function (dest, src) {
                        var folder = src.substring(0, src.lastIndexOf('/'));
                        var filename = src.substring(src.lastIndexOf('/'), src.length);
                        filename = filename.substring(0, filename.lastIndexOf('.'));
                        return dest + '/' + folder + filename + '.min.js';
                    }
                }
                ]
            }
        },

        //  Concatenate minified css files into single file.
        concat_css: {
            options: {},
            dev: {
                files: [{
                    '<%= global.app %><%= global.css %>/min/compiled-styles.min.css': [
                        '<%= global.app %><%= global.libs %>/animate/animate.min.css',
                        '<%= global.app %><%= global.libs %>/bootstrap-3.3.6-dist/css/bootstrap.min.css',
                        '<%= global.app %><%= global.bower %>/angular-ui-grid/ui-grid.min.css'
                    ]
                }]
            },
            dist: {
                files: [{
                    '<%= global.build %><%= global.css %>/min/compiled-styles.min.css': [
                        '<%= global.app %><%= global.libs %>/animate/animate.min.css',
                        '<%= global.app %><%= global.libs %>/bootstrap-3.3.6-dist/css/bootstrap.min.css',
                        '<%= global.app %><%= global.bower %>/angular-ui-grid/ui-grid.min.css'
                    ]
                }]
            }
        },

        // Concatenate specified files into one file to use in index.html.
        concat: {
            options: {
                separator: ';'
            },
            dev: {
                files:  [
                    /* This section is used to add js files from the app/bower_components folder to a single concatenated file. */
                    {
                        src: ['<%= global.app %><%= global.bower %>/angular/angular.min.js',
                            '<%= global.app %><%= global.bower %>/angular-ui-router/release/angular-ui-router.min.js',
                            '<%= global.app %><%= global.bower %>/ui-router-extras/release/ct-ui-router-extras.min.js',
                            '<%= global.app %><%= global.bower %>/angular-animate/angular-animate.min.js',
                            '<%= global.app %><%= global.bower %>/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js',
                            '<%= global.app %><%= global.bower %>/angular-touch/angular-touch.min.js',
                            '<%= global.app %><%= global.bower %>/ngstorage/ngStorage.min.js',
                            '<%= global.app %><%= global.bower %>/angular-sanitize/angular-sanitize.min.js',
                            '<%= global.app %><%= global.bower %>/angulartics/dist/angulartics.min.js',
                            '<%= global.app %><%= global.bower %>/angulartics-google-analytics/dist/angulartics-google-analytics.min.js',
                            '<%= global.app %><%= global.bower %>/angular-ui-grid/ui-grid.min.js'

                        ],

                        dest: '<%= global.app %><%= global.js %>/min/angular-plugins.min.js'
                    },


                    /* This section is used to add js files from the /assets/js folder to a single concatenated file. */
                    {
                        src: ['<%= global.temp %><%= global.js %>/min/*.min.js'],
                        dest: '<%= global.app %><%= global.js %>/min/app.min.js'
                    }
                    /* This section is used to add js files from the /assets/libs folder to a single concatenated file.
                     *  Use when there are more than one file from this directory.
                     * */
                    // {
                    //     src: ['<%= global.app %><%= global.libs %>/ngprint/ngprint.min.js'],
                    //     dest: '<%= global.build %><%= global.libs %>/ngprint/ngprint.min.js'
                    // }


                ]
            },
            dist: {
                files:  [
                    /* This section is used to add js files from the app/bower_components folder to a single concatenated file. */
                    {
                        src: ['<%= global.app %><%= global.bower %>/angular/angular.min.js',
                            '<%= global.app %><%= global.bower %>/angular-ui-router/release/angular-ui-router.min.js',
                            '<%= global.app %><%= global.bower %>/ui-router-extras/release/ct-ui-router-extras.min.js',
                            '<%= global.app %><%= global.bower %>/angular-animate/angular-animate.min.js',
                            '<%= global.app %><%= global.bower %>/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js',
                            '<%= global.app %><%= global.bower %>/angular-touch/angular-touch.min.js',
                            '<%= global.app %><%= global.bower %>/ngstorage/ngStorage.min.js',
                            '<%= global.app %><%= global.bower %>/angular-sanitize/angular-sanitize.min.js',
                            '<%= global.app %><%= global.bower %>/angulartics/dist/angulartics.min.js',
                            '<%= global.app %><%= global.bower %>/angulartics-google-analytics/dist/angulartics-google-analytics.min.js',
                            '<%= global.app %><%= global.bower %>/angular-ui-grid/ui-grid.min.js'

                        ],

                        dest: '<%= global.build %><%= global.js %>/min/angular-plugins.min.js'
                    },


                    /* This section is used to add js files from the /assets/js folder to a single concatenated file. */
                    {
                        src: ['<%= global.app %><%= global.js %>**/**.js'],
                        dest: '<%= global.build %><%= global.js %>/min/app.min.js'
                    },

                    /* This section is used to add js files from the /assets/libs folder to a single concatenated file.
                    *  Use when there are more than one file from this directory.
                    * */
                   // {
                   //     src: ['<%= global.app %><%= global.libs %>/ngprint/ngprint.min.js'],
                   //     dest: '<%= global.build %><%= global.libs %>/ngprint/ngprint.min.js'
                   // }

                ]
            }
        },

        copy: {
            dev: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= global.app %><%= global.bower %>/jquery/dist/jquery.min.js'],
                        dest: '<%= global.app %><%= global.js %>/min/', filter: 'isFile'},
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= global.app %><%= global.bower %>/jquery/dist/',
                        src: ['jquery.min.js'],
                        dest: '<%= global.build %><%= global.js %>/min/', filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= global.app %><%= global.js %>/min',
                        src: ['**/*.min.js', '*.*'],
                        dest: '<%= global.build %><%= global.js %>/min/', filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= global.app %><%= global.libs %>/',
                        src: ['ngprint/**/*.min.js', 'xdomain/**/*.min.js'],
                        dest: '<%= global.build %><%= global.libs %>', filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd:'<%= global.app %><%= global.components %>',
                        dest: '<%= global.build %><%= global.components %>',
                        src: ["*.html", "**/*.html", "*.json", "**/*.json"]
                    },
                    {
                        expand: true,
                        cwd:'<%= global.app %><%= global.shared %>',
                        dest: '<%= global.build %><%= global.shared %>',
                        src: ["*.*", "**/*.*"]
                    },
                    {
                        expand: true,
                        cwd:'<%= global.app %>/',
                        dest: '<%= global.build %>',
                        src: ["ie9/**/*.*"]
                    },
                    {
                        expand: true,
                        cwd:'<%= global.app %>/',
                        dest: '<%= global.build %>/',
                        src: ["index.html", "app.module.js"]
                    }

                ]
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-copy');



    // Watch task for only compiling sass files.  TBD:  Add JSLint task.
    grunt.registerTask('watch:dev', [
        'compass:dev'
    ]);

    // Running 'grunt' on the command line kicks off this process.
    // Creates a production like build.
    grunt.registerTask('default', [
        'compass:dev',
        'cssmin:dev',
        'uglify:dev'
    ]);

    grunt.registerTask('dev', [
        'clean:dev',
        'compass:dev',
        'cssmin:dev',
        'uglify:dev',
        'concat:dev',
        'concat_css:dev',
        'copy:dev'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'compass:dist',
        'cssmin:dist',
        'uglify:dist',
        'concat:dist',
        'concat_css:dist',
        'copy:dist'
    ]);


};
