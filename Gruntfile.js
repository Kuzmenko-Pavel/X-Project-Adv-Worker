module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ["x_project_adv_worker/static/js/block/**/*.js"],
            options: {
                jshintrc: '.jshintrc',
                globals: {
                    jQuery: true
                }
            }
        },
        watch: {
            taskName: {
                options: {
                    livereload: {
                        port: 35729,
                    }
                },
                files: [
                    "x_project_adv_worker/static/js/**/*.js"
                ],
                tasks: ['jshint', 'requirejs']
            }
        },
        requirejs: {
            compile: {
                options: {
                    mainConfigFile: 'x_project_adv_worker/static/js/block/require_config.js',
                    baseUrl: 'x_project_adv_worker/static/js/block/',
                    include: ['main', './../../../../bower_components/almond/almond'],
                    out: 'x_project_adv_worker/static/js/block.js',
                    removeCombined: false,
                    findNestedDependencies: true,
                    preserveLicenseComments: false,
                    wrap: true,
                    optimize: 'uglify2',
                    //optimize: 'none',
                    uglify2: {
                        output: {
                            beautify: false,
                            quote_keys: true,
                            ascii_only: true
                        },
                        compress: {
                            unsafe: true,
                            comparisons: true,
                            cascade: true,
                            collapse_vars: true,
                            reduce_vars: true,
                            warnings: true,
                            loops: true,
                            properties: true,
                            screw_ie8 : false,
                            sequences: true,
                            dead_code: true,
                            conditionals: true,
                            booleans: true,
                            unused: true,
                            if_return: true,
                            join_vars: true,
                            drop_console: true,
                            passes: 3
                        },
                        warnings: true,
                        verbose: true,
                        mangle: {
                            screw_ie8 : false,
                            toplevel: true,
                            sort: true,
                            eval: true,
                            props: true


                        },
                        ie8: true
                    },
                    generateSourceMaps: false
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.registerTask('default', ['jshint', 'requirejs', 'watch']);
};