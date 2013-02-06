/*global module:false*/
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('build', ['concat', 'less', 'handlebars', 'uglify', 'copy:dist']);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        stripBanners: true
      },
      jquip: {
        src: [ 'components/jquip/src/jquip.js', 'components/jquip/src/jquip.ajax.js' ],
        dest: 'src/vendor/jquip.js'
      }
    },
    handlebars: {
      core: {
        files: {
          'src/vendor/templates.js': 'src/templates/*.hbs'
        },
        options: {
          namespace: 'AAB',
          wrapped: true
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      core: {
        src: [ 'src/vendor/jquip.js', 'components/handlebars/handlebars.runtime.js', 'src/vendor/templates.js' ],
        dest: 'dist/js/core.min.js'
      }
    },
    less: {
      core: {
        options: {
          paths: [ 'src/less/lib', 'src/less/includes', 'components/bootstrap/less' ],
          yuicompress: true
        },
        files: {
          'dist/css/core.css': 'src/less/core.less'
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    copy: {
      dist: {
        files: [
          { cwd: 'src/', src: ['*'], dest: 'dist/', filter: 'isFile', expand: true },
          { cwd: 'src/', src: ['assets/**'], dest: 'dist/assets/', expand: true }
        ]
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      js: {
        files: '<%= uglify.core.src %>',
        tasks: [ 'uglify', 'copy', 'jshint' ]
      },
      less: {
        files: 'src/less/**/*.less',
        tasks: [ 'less', 'copy' ]
      },
      html: {
        files: [ 'src/**/*.html' ],
        tasks: [ 'copy' ]
      },
      templates: {
        files: [ 'src/templates/*.hbs' ],
        tasks: [ 'handlebars', 'uglify', 'copy' ]
      }
    }
  });
};
