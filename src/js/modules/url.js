define(function(){
    var hostName='http://localhost:3000/api/';
    return{
        login:hostName+'login',
        register:hostName+'register',
        banner:hostName+'banner',
        topics:hostName+'topics',
        search:hostName+'search',
        autho:hostName+'autho',
        note:hostName+'note',
        writer:hostName+'writer'
    }
})