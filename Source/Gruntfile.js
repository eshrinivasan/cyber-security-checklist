'use strict';

module.exports = function (grunt) {

      // Configurable paths for the application
      var appConfig = {
        app: require('./bower.json').appPath  || 'app',
        dist: 'build'
      };

    grunt.initConfig({

        //Project settings
        global: appConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {           
            options: {
                livereload: true
            },
            sass: {
                files: ['app/assets/sass/{,**/}*.{scss,sass}'],
                tasks: ['default'],
                options: {
                    livereload: false
                }
            },
            js: {
                files: ['app/*.js', '!app/*.min.js', '!app/*_test.js'],
                tasks: ['default'],
                options: {
                    livereload: false
                }
            },
            components: {
                files: ['app/bower_components/**/*', 'app/components/**/*'],
                tasks: ['default'],
                options: {
                    livereload: false
                }
            },
            shared: {
                files: ['app/shared/**/*'],
                tasks: ['default'],
                options: {
                    livereload: false
                }
            }
        },

        clean: {
            dev: ["app/assets/js/**/*", "app/assets/css/**/*"],
            dist: ["build/**/*"]
        },

        copy: {
            dev: {
                files: [
                    {expand: true, flatten: true, src: ['app/bower_components/jquery/dist/jquery.min.js'], dest: 'app/assets/js/min/', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['app/bower_components/jquery/dist/jquery.min.js.map'], dest: 'app/assets/js/min/', filter: 'isFile'},
                ]
            },

            dist: {
                files: [{
                         expand: true, 
                         dot:true,
                         cwd:'<%= global.app %>',
                         dest: '<%= global.dist %>',
                         src: ["*.*", "**/*.*", '!**/bower_components/**']                    
                    },
                ]
            }
        },
        // Automatically inject Bower components into the app
        wiredep: {
              app: {
                src: ['<%= global.app %>/index.html'],
                ignorePath:  /\.\.\//
              },
              test: {
                devDependencies: true,
                src: '<%= karma.unit.configFile %>',
                ignorePath:  /\.\.\//,
                fileTypes:{
                  js: {
                    block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
                      detect: {
                        js: /'(.*\.js)'/gi
                      },
                      replace: {
                        js: '\'{{filePath}}\','
                      }
                    }
                  }
              },
              sass: {
                src: ['<%= global.app %>/assets/sass/{,*/}*.{scss,sass}'],
                ignorePath: /(\.\.\/){1,2}bower_components\//
              }
        },
        compass: {
            options: {
                config: 'config.rb',
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

        concat: {
            options: {
                separator: ';'
            },
            dev: {
                files:  [
                    {
                        src: ['app/bower_components/angular/angular.min.js',
                            'app/bower_components/jquery-mousewheel/jquery.mousewheel.min.js',
                            'app/bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
                            'app/bower_components/ng-scrollbars/dist/scrollbars.min.js',
                            'app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
                            'app/bower_components/angular-ui/build/angular-ui.min.js',
                            'app/bower_components/angular-ui/build/angular-ui-ieshiv.min.js',
                            'app/bower_components/ui-router-extras/release/ct-ui-router-extras.min.js',
                            'app/bower_components/angular-animate/angular-animate.min.js',
                            'app/bower_components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js',
                            'app/bower_components/angular-touch/angular-touch.min.js',
                            'app/bower_components/angular-sanitize/angular-sanitize.min.js',
                            'app/bower_components/angulartics/dist/angulartics.min.js',
                            'app/bower_components/angulartics-google-analytics/dist/angulartics-google-analytics.min.js',
                            
                        ],

                        dest: 'app/assets/js/min/angular-plugins.min.js'
                    },
                    {
                        src: ['app/app.module.js'],
                        dest: 'app/assets/js/app.module.js'
                    },
                    {
                        src: ['app/components/core/core.module.js',
                                'app/components/core/core.factories.js',
                                'app/components/core/core.services.js',                         
                                'app/components/core/core.config.js'],
                        dest: 'app/assets/js/cyberapp.core.js'
                    },
                    {
                        src: ['app/components/checklist/checklist.module.js',
                            'app/components/checklist/checklist.controller.js'],
                        dest: 'app/assets/js/cyberapp.checklist.js'
                    },
                    {
                        src: ['app/components/print/print.module.js',
                            'app/components/print/print.controller.js'],
                        dest: 'app/assets/js/cyberapp.print.js'
                    },
                    {
                        src: ['app/components/section/section.module.js',
                            'app/components/section/section.controller.js'],
                        dest: 'app/assets/js/cyberapp.section.js'
                    }
                ]
            },
            dist: {
                files:  [
                    {
                        src: ['app/bower_components/angular/angular.min.js',
                            'app/bower_components/jquery-mousewheel/jquery.mousewheel.min.js',
                            'app/bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
                            'app/bower_components/ng-scrollbars/dist/scrollbars.min.js',
                            'app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
                            'app/bower_components/angular-ui/build/angular-ui.min.js',
                            'app/bower_components/angular-ui/build/angular-ui-ieshiv.min.js',
                            'app/bower_components/ui-router-extras/release/ct-ui-router-extras.min.js',
                            'app/bower_components/angular-animate/angular-animate.min.js',
                            'app/bower_components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js',
                            'app/bower_components/angular-touch/angular-touch.min.js',
                            'app/bower_components/angular-sanitize/angular-sanitize.min.js',
                            'app/bower_components/angulartics/dist/angulartics.min.js',
                            'app/bower_components/angulartics-google-analytics/dist/angulartics-google-analytics.min.js',
                        ],
                        dest: 'app/assets/js/min/angular-plugins.min.js'
                    }
                ]
            }
        },
        concat_css: {
            options: {},
            dev: {
                files: [{
                            'app/assets/css/min/compiled-styles.min.css': [
                            'app/assets/libs/animate/animate.min.css',
                            'app/assets/libs/bootstrap-3.3.6-dist/css/bootstrap.min.css',                       
                        ]
                }]
            },
            dist: {
                files: [{
                            'app/assets/css/min/compiled-styles.min.css': [
                            'app/assets/libs/animate/animate.min.css',
                            'app/assets/libs/bootstrap-3.3.6-dist/css/bootstrap.min.css',
                       ]
                }]
            }
        },

        cssmin: {

            dev: {
                files: [{
                    cwd: 'app',
                    expand: true,
                    flatten: true,
                    src: ['bower_components/html5-boilerplate/dist/css/*.css',
                        'bower_components/html5-boilerplate/dist/css/!*.min.css',
                        'assets/css/*.css',
                        'assets/css/!*.min.css'],
                    dest: 'app/assets/css/min',
                    ext: '.min.css'
                }]
            },
            dist: {
                files: [{
                    cwd: 'app',
                    expand: true,
                    flatten: true,
                    src: ['bower_components/html5-boilerplate/dist/css/*.css',
                        'bower_components/html5-boilerplate/dist/css/!*.min.css',
                        'assets/css/*.css',
                        'assets/css/!*.min.css'],
                    dest: 'app/assets/css/min',
                    ext: '.min.css'
                }]
            }
        },

      // Test settings
        karma: {
          unit: {
            configFile: 'test/karma.conf.js',
            singleRun: true
          }
        },
        uglify: {
            dev: {
                options: {
                    mangle: false,
                    compress: {}
                },
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: 'app/assets/js',
                    dest: 'app/assets/js/min',
                    src: ['**/*.js', '!**/*.min.js'],
                    rename: function(dest, src) {
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
                    flatten: true,
                    cwd: 'app/assets/js',
                    dest: 'app/assets/js/min',
                    src: ['**/*.js', '!**/*.min.js'],
                    rename: function(dest, src) {
                        var folder = src.substring(0, src.lastIndexOf('/'));
                        var filename = src.substring(src.lastIndexOf('/'), src.length);
                        filename = filename.substring(0, filename.lastIndexOf('.'));
                        return dest + '/' + folder + filename + '.min.js';
                    }
                }]
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
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-connect');


    grunt.registerTask('watch', [      
        'compass:dev',
          'concat_css:dev',
           'cssmin:dev'
    ]);

    grunt.registerTask('default', [
        'clean:dev',
        'compass:dev',
        'concat:dev',
        'concat_css:dev',
        'cssmin:dev',
        'copy:dev'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'wiredep',
        'compass:dist',
        'concat:dist',
        'concat_css:dist',
        'cssmin:dist',
        'uglify:dist',
        'copy:dist'
    ]);


};
