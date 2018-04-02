'use strict'

var Dep = require('node-dep');

module.exports = function (grunt) {
  grunt.registerMultiTask('dep', 'deployer your applications', function() {
    var done = this.async();
    var options = this.options({ servers: [], tasks: [], proxy: null });

    var dep = new Dep({
      servers: options.servers,
      tasks: options.tasks,
      proxy: options.proxy
    });

    dep.setLogger({
      log: function () {
        var args = Array.prototype.slice.call(arguments);
        grunt.log.writeln(args.join(' '));
      },
      debug: function () {
        var args = Array.prototype.slice.call(arguments);
        grunt.log.debug(args.join(' '));
      },
      info: function () {
        var args = Array.prototype.slice.call(arguments);
        grunt.log.ok(args.join(' '));
      },
      warn: function () {
        var args = Array.prototype.slice.call(arguments);
        grunt.fail.warn(args.join(' '));
      },
      error: function () {
        var args = Array.prototype.slice.call(arguments);
        grunt.log.error(args.join(' '));
      }
    });

    dep.on('ready', dep.start);
    dep.on('done', done);
  });
}
