module.exports = function(grunt) {
	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// 通过watch任务，来监听文件是否有更改
		watch: {
			client: {
				// 我们不需要配置额外的任务， watch任务已经内建LiveReload浏览器刷新的代码片段。
				options: {
					livereload: true
				},
				// ’**‘ 表示包含所有的子目录(此处没有用到)
				// '*' 表示包含所以的文件
				files: ['*.html', '*.css', '*.js']
			}
		}
	});

	//加载插件
    grunt.loadNpmTasks('grunt-contrib-watch');

	// 自定义任务

}