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
                files: [
                    "x_project_adv_worker/static/js/block/**/*.js"
                ],
                // tasks: ['jshint', 'requirejs']
                tasks: ['requirejs']
            }
        },
        requirejs: {
            compile: {
                options: {
                    mainConfigFile: 'x_project_adv_worker/static/js/block/require_config.js',
                    baseUrl: 'x_project_adv_worker/static/js/block/',
                    out: 'x_project_adv_worker/static/js/block.js',
                    include: ['main'],
                    removeCombined: true,
                    findNestedDependencies: true,
                    preserveLicenseComments: false,
                    wrap: true,
                    optimize: 'uglify2',
                    // optimize: 'none',
                    uglify2: {
                        output: {
                            beautify: false,
                            quote_keys: true,
                            screw_ie8: false,
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
                            drop_console: false,
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
                    generateSourceMaps: false,
                    onModuleBundleComplete: function (data) {
                        var fs = module.require('fs'),
                            amdclean = module.require('amdclean'),
                            outputFile = data.path,
                            cleanedCode = amdclean.clean({
                                'filePath': outputFile
                            });

                        fs.writeFileSync(outputFile, cleanedCode);
                    }
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.registerTask('default', ['requirejs', 'watch']);
};