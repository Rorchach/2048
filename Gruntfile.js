module.exports = function(grunt) {

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks); // 加载所有的任务

	/*
	 * 实时刷新参考文档: http://unmi.cc/grunt-contrib-connect-build-livereload-dev-env/
	 * chrome插件地址: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
	 */

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
        connect: {
            options: {
                port: 9000,
                hostname: '*', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
                livereload: 35729  //声明给 watch 监听的端口
            },
 
            server: {
                options: {
                    open: true, //自动打开网页 http://
                    base: [
                        '.'  //主目录
                    ]
                }
            }
        },
		// 通过watch任务，来监听文件是否有更改
		watch: {
			livereload: {
                options: {
                    livereload: '<%=connect.options.livereload%>'  //监听前面声明的端口  35729
                },
 
                files: [  //下面文件的改变就会实时刷新网页
                    '*.html',
                    '*.css',
                    '*.js'
                ]
            }
		}
	});

	// 自定义任务
	 grunt.registerTask('serve', [
        'connect:server',
        'watch'
    ]);

}