function GuaGame(loads,callback) {
    //loads 是一个对象 里面是图片的名字 程序会在所有图片载入成功后才运行
    //我这个用的是类似工厂模式
    this.actions = {}
    this.keydowns = {}
    this.images = {}
    //todo guagame 用单例 可能需要先实现面向对象的编程 涉及到code refactor
    //todo 希望最终能实现像是从上到下不断下坠的俄罗斯方块这样的类型
    this.score = 0
    this.canvas = document.getElementById('id-canvas')
    this.context = this.canvas.getContext('2d')
    var g = this
    window.addEventListener('keydown',function (event) {
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup',function (event) {
        //log(event.key)
        g.keydowns[event.key] = false
    })
    //预先载入所有程序
    this.init(loads,callback)
}

GuaGame.prototype.test = function(){
    log('test')
}

GuaGame.prototype.drawImage = function(img){
    this.context.drawImage(img.image,img.x,img.y)
}

GuaGame.prototype.drawRect = function(o){
    this.context.fillStyle="green"
    this.context.rect(o.x,o.y,o.width,o.height)
    this.context.fill();
}

GuaGame.prototype.registerAction = function(key,callback){
    this.actions[key] = callback
}

GuaGame.prototype.loadLevel = function(n){
    var blocks = []
    var tempBlock = levels[n]
    for(var i=0;i<tempBlock.length;i++){
        var bk = block(tempBlock[i],this)
        blocks.push(bk)
    }
    return blocks
}

GuaGame.prototype.runloop = function(){
    var actions = Object.keys(this.actions)
    for(var i=0;i < actions.length;i++){
        var key = actions[i]
        if(this.keydowns[key]){
            //如果按键被按下 调用注册的action
            this.actions[key]()
        }
    }
    this.update()
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
    this.draw()
    var range = document.getElementById('id-input-speed')
    var fps = Number(range.value)
    if(fps<1)
        fps = 1
    //next runloop
    var g = this
    setTimeout(function () {
        g.runloop()
    },1000/fps)
}

GuaGame.prototype.run = function(){
    var g = this
    //todo 这是js的闭包的原因么？ 延迟执行的函数指向this
    setTimeout(function() {
        g.test()
        g.runloop()
    },1000)
}

GuaGame.prototype.imageByName = function (name) {
    //将图片提前加载到内存中,只保留一份内存,需要时候重用
    var img = this.images[name]
    var image = {
        width : img.width,
        height : img.height,
        image : img,
    }
    return image
}

GuaGame.prototype.init = function (loads,callback) {
    var g = this
    var names = Object.keys(loads)
    for(var i=0;i<names.length;i++){
        let name = names[i]
        var path= loads[name]
        let img = new Image()
        img.src = path
        img.onload = function () {
            log(g.images)
            g.images[name] = img
            if (Object.keys(g.images).length === names.length){
                //这里是图片加载完成的阶段 需要调用回调函数
                //log(loads.length)
                callback(g)
                g.test()
                g.run()
            }
        }
    }
    //开始程序 所有图片载入成功后才会调用g.run()这个开始程序
}

GuaGame.prototype.registerScene = function (scene) {
    //注册这个场景中的所有动作
    var names = Object.keys(scene.actions)
    for (var i = 0; i < names.length; i++) {
        this.registerAction(names[i],scene.actions[names[i]])
    }
}
