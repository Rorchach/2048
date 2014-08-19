module.exports = function(grunt) {

	// LiveReload的默认端口号，也可以改成想要的端口号
	var lrPort = 35729;

	// 使用connect-livereload模块, 生成一个与LiveReload脚本
	// <sricpt src="http://127.0.0.1:35729/livereload.js?snipver=1" type="text/javascript"></script>
	var lrSnippet = require('connect-livereload')({ port: lrPort});

	var lrMiddleware = function(connect, options) {
		return [
			// 把脚本，注入到静态文件中
			lrSnippet,
			//静态文件服务器的路径
			connect.static(options.base),
			//启动目录浏览
			connect.directory(options.base);
		];
	}

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// 通过connect任务，创建一个静态服务器
		connect: {
			options: {
				// 服务端口号
				port: 8000,
				// 服务器地址
				hostname: 'localhost',
				// 物理路径（默认为. 即根目录）
			},
			livereload: {
				options: {
					// 通过LiveReload脚本，让页面重新加载
					middleware: lrMiddleware
				}
			}
		}，

		// 通过watch任务，来监听文件是否有更改
		watch: {
			client: {
				// 我们不需要配置额外的任务， watch任务已经内建LiveReload浏览器刷新的代码片段。
				options: {
					livereload: lrPort
				},
				// ’**‘ 表示包含所有的子目录(此处没有用到)
				// '*' 表示包含所以的文件
				files: ['*.html', '*.css', '*.js']
			}
		}
	});

	//加载插件
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// 自定义任务
	grunt.registerTask('live', ['connect', 'watch']);

}