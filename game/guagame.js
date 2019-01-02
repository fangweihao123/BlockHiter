var GuaGame = function (loads,callback) {
    //loads 是一个对象 里面是图片的名字 程序会在所有图片载入成功后才运行
    var g = {
        actions:{},
        keydowns:{},
        images:{},
    }
    //todo guagame 用单例 可能需要先实现面向对象的编程 涉及到code refactor
    //todo 希望最终能实现像是从上到下不断下坠的俄罗斯方块这样的类型
    g.score = 0
    g.canvas = document.getElementById('id-canvas')
    g.context = g.canvas.getContext('2d')

    g.drawImage = function(img){
        g.context.drawImage(img.image,img.x,img.y)
    }

    g.drawRect = function(o){
        g.context.fillStyle="green"
        g.context.rect(o.x,o.y,o.width,o.height)
        g.context.fill();
    }

    window.addEventListener('keydown',function (event) {
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup',function (event) {
        //log(event.key)
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

    g.run = function(){
        setTimeout(function () {
            g.runloop()
        },1000)
    }

    //将图片提前加载到内存中,只保留一份内存,需要时候重用
    g.imageByName = function (name) {
        var img = g.images[name]
        // log(img)
        var image = {
            width : img.width,
            height : img.height,
            image : img,
        }
        return image
    }


    //预先载入所有程序
    var names = Object.keys(loads)
    for(var i=0;i<names.length;i++){
        let name = names[i]
        var path= loads[name]
        let img = new Image()
        img.src = path
        img.onload = function () {
            g.images[name] = img
            log(img)
            if (Object.keys(g.images).length === names.length){
                //这里是图片加载完成的阶段 需要调用回调函数
                //log(loads.length)
                callback(g)
                g.run()
            }
        }
    }

    //开始程序 所有图片载入成功后才会调用g.run()这个开始程序

    return g
}
