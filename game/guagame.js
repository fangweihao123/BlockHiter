var GuaGame = function (loads) {
    //loads 是一个对象 里面是图片的名字 程序会在所有图片载入成功后才运行
    var g = {
        actions:{},
        keydowns:{},
        images:{},
    }
    //todo guagame 用单例
    g.score = 0
    g.canvas = document.getElementById('id-canvas')
    g.context = g.canvas.getContext('2d')

    g.drawImage = function(img){
        g.context.drawImage(img.image,img.x,img.y)
    }

    window.addEventListener('keydown',function (event) {
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup',function (event) {
        log(event.key)
        g.keydowns[event.key] = false
    })
    g.registerAction = function(key,callback){
        g.actions[key] = callback
    }
    g.loadLevel = function(n){
        var blocks = []
        var tempBlock = levels[n]
        for(var i=0;i<tempBlock.length;i++){
            var bk = block(tempBlock[i],g)
            blocks.push(bk)
        }
        return blocks
    }

    // setInterval(function () {
    //     //events
    //     var actions = Object.keys(g.actions)
    //     for(var i=0;i < actions.length;i++){
    //         var key = actions[i]
    //         if(g.keydowns[key]){
    //             //如果按键被按下 调用注册的action
    //             g.actions[key]()
    //         }
    //     }
    //     g.update()
    //     context.clearRect(0,0,canvas.width,canvas.height)
    //     g.draw()
    // },1000/30)

    g.runloop = function(){
        var actions = Object.keys(g.actions)
        for(var i=0;i < actions.length;i++){
            var key = actions[i]
            if(g.keydowns[key]){
                //如果按键被按下 调用注册的action
                g.actions[key]()
            }
        }
        g.update()
        g.context.clearRect(0,0,g.canvas.width,g.canvas.height)
        g.draw()
        var range = document.getElementById('id-input-speed')
        var fps = Number(range.value)
        if(fps<1)
            fps = 1
        //next runloop
        setTimeout(function () {
            g.runloop()
        },1000/fps)
    }


    //预先载入所有程序
    var names = Object.keys(loads)
    for(var i=0;i<names.length;i++){
        var name = names[i]
        var path= loads[name]
        var img = new Image()
        img.src = path
        img.onload = function () {
            g.images[name] = img
            if(g.images.length === loads.length)
                g.run()
        }
    }

    //开始程序 所有图片载入成功后才会调用g.run()这个开始程序
    g.run = function(){
        setTimeout(function () {
            g.runloop()
        },1000)
    }

    //todo 现在想实现一个预先加载一份图片到内存然后相同的block使用相同的copy的功能 是调用顺序出问题
    g.imageByName = function (name) {
        var img = g.images[name]
        var image = {
            width : img.width,
            height : img.height,
            image : img,
        }
        return image
    }

    return g
}
