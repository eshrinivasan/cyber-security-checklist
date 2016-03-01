'use strict';

module.exports = function (grunt) {


    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        global: {
            module:'cyberapp',
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
                               '<%= global.app %><%= global.bower %>/angulartics/dist/angulartics.min.js',
                               '<%= global.app %><%= global.bower %>/angulartics-google-analytics/dist/angulartics-google-analytics.min.js',
                               '<%= global.app %><%= global.bower %>/ngstorage/ngStorage.min.js',                                                      
                               '<%= global.app %><%= global.bower %>/angular-ui-grid/ui-grid.min.js',
                               '<%= global.app %><%= global.libs %>/ngprint/ngPrint.min.js'
                        ],
                        dest: '<%= global.app %><%= global.js %>/min/angular-plugins.min.js'
                    }
                ]
            },
            dist: {
                files:  [
                    /* This section is used to add js files from the app/bower_components folder to a single concatenated file. */
                    {
                        src: ['<%= global.app %><%= global.bower %>/angular/angular.min.js',
                               '<%= global.app %><%= global.bower %>/angular-ui-router/release/angular-ui-router.min.js',                                                        
                               '<%= global.app %><%= global.bower %>/angulartics/dist/angulartics.min.js',
                               '<%= global.app %><%= global.bower %>/angulartics-google-analytics/dist/angulartics-google-analytics.min.js',
                               '<%= global.app %><%= global.bower %>/ngstorage/ngStorage.min.js',                                                      
                               '<%= global.app %><%= global.bower %>/angular-ui-grid/ui-grid.min.js',
                               '<%= global.app %><%= global.libs %>/ngprint/ngPrint.min.js'
                        ],

                        dest: '<%= global.build %><%= global.js %>/min/angular-plugins.min.js'
                    }
                ]
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


        copy: {
            dev: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= global.app %><%= global.bower %>/jquery/dist/jquery.min.js'],
                        dest: '<%= global.app %><%= global.js %>/min/', filter: 'isFile'
                    },{
                        expand: true,
                        flatten: true,
                        src: ['<%= global.app %>/*.js'],
                        dest: '<%= global.app %><%= global.js %>/', filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= global.app %><%= global.bower %>/bootstrap/fonts/*'],
                        dest: '<%= global.app %><%= global.css %>/fonts/', filter: 'isFile'
                    }
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
                    },
                    {
                        expand: true,
                        cwd:'<%= global.app %>/<%= global.js %>/',
                        dest: '<%= global.build %>/<%= global.js %>/',
                        src: ["*.js"]
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= global.app %><%= global.bower %>/bootstrap/fonts/*'],
                        dest: '<%= global.build %><%= global.css %>/fonts/', filter: 'isFile'
                    },{
                        expand: true,
                        flatten: true,
                        src: ['<%= global.app %>/*.js'],
                        dest: '<%= global.build %><%= global.js %>/', filter: 'isFile'
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

    grunt.registerTask("prepareModules", "Finds and prepares modules for concatenation.", function() {

        // get all module directories
        grunt.file.expand("app/components/*").forEach(function (dir) {

            // get the module name from the directory name
            var dirName = dir.substr(dir.lastIndexOf('/')+1);
           
            // get the current concat object from initConfig
            var concat = grunt.config.get('concat') || {};  

            // create a subtask for each module, find all src files
            // and combine into a single js file per module
            concat[dirName] = {
                src: [dir + '/*.js'],
                dest: 'app/assets/js/cyberapp.' + dirName + '.js'
            };

            // add module subtasks to the concat task in initConfig
            grunt.config.set('concat', concat);
        });
    });

    grunt.registerTask('default', [
            'compass:dev',
            'concat_css:dev',
            'cssmin:dev',
    ]);

    grunt.registerTask('dev', [
        'clean:dev',
        'compass:dev',     //compiles sass to css
        'prepareModules',  //Runs through all component folders
        'concat',          //and combine them and put into assets/js
        'copy:dev',        //put app.module.js into assets/js 
        'concat_css:dev',  //concatenates common css as well as app specific css
        'cssmin:dev',      //minifies the css
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'compass:dist',
        'prepareModules',
        'concat',
        'concat_css:dist',
        'cssmin:dist',
        'uglify:dist',
        'copy:dist'
    ]);


};
