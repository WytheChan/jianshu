require.config({
    paths: {
        jquery:'lib/jquery', 
        bootstrap:'lib/bootstrap' ,
        tem:'lib/template-web',
        mock:'lib/mock',
        url:'modules/url',
        api:'modules/api',
        testMock:'modules/testMock',
        until:'modules/until'
    },
    map:{
        '*':{
            css:'lib/css'
        }
    },
    shim:{
        bootstrap:['jquery']
    }
})