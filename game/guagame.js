function GuaGame(loads,callback) {
    //loads 是一个对象 里面是图片的名字 程序会在所有图片载入成功后才运行
    //我这个用的是类似工厂模式
    this.actions = {}
    this.keydowns = {}
    this.images = {}
    //todo guagame 用单例 可能需要先实现面向对象的编程 涉及到code refactor
    //todo 希望最终能实现像是从上到下不断下坠的俄罗斯方块这样的类型
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
    // this.init(loads,callback)           //在constructor里面要加载图片 加载完图片才能调用callback函数
}

// GuaGame.prototype.runWithScene = function(scene){
//     this.images
// }

GuaGame.prototype.test = function(){
    log('test')
}

GuaGame.prototype.drawModel2D = function(model,scene){
    this.context.drawImage(scene.models[model.name].image,model.x,model.y,model.width,model.height)
}

GuaGame.prototype.registerAction = function(key,callback){
    this.actions[key] = callback
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
        g.runloop()
    },1000)
}

GuaGame.prototype.registerScene = function (scene) {
    //注册这个场景中的所有动作
    this.actions = {}
    // if(scene.actions===undefined)
    //     return
    var names = Object.keys(scene.actions)
    for (var i = 0; i < names.length; i++) {
        this.registerAction(names[i],scene.actions[names[i]])
    }
}

GuaGame.prototype.runWithScene = function (scene) {
    // while(!scene.ready){
    //
    // }
    this.update = function () {
        scene.update()
    }
    this.draw = function () {
        scene.draw()
    }
    this.registerScene(scene)
}
