module.exports = function(router){
    function is_weixin(){ var ua = navigator.userAgent.toLowerCase(); if(ua.match(/MicroMessenger/i)=="micromessenger") { return true; } else { return false; } }
    window.onload=function(){
        if(!is_weixin()){
            router.go({path:"404"});
        }
    },
	router.map({
		'*': {
            component: require('./components/error.vue')
        },
        '/': {
            component: require('./components/login.vue')
        },
        '/login': {
            component: require('./components/login.vue')
        },
        '/score': {
            component: require('./components/score.vue')
        },
        '/wy404': {
            component: require('./components/error.vue')
        },
        '/jwc404': {
            component: require('./components/jwc_error.vue')
        },
    })
	
}