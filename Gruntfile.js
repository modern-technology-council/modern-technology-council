
module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        '-W117': true
      },
      files: [
        'Gruntfile.js',
        'app/**/*.js'
    ]},
  });



  grunt.loadNpmTasks('grunt-contrib-internal');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-haml');

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('default', ['test']);

};


