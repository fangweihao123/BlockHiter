function AbstractScene(game,callback) {
    this.actions = {}
    this.models = {}
    this.game = game
    this.callback = callback
    //scene 的images是文件名字对应
}

AbstractScene.prototype.update = function () {
    // log('super update')
}

AbstractScene.prototype.draw = function () {
    // log('super draw')
}

AbstractScene.prototype.createModel = function (name,x,y,width,height,path) {
    this.models[name] = new Model2D(x,y,width,height,path)
}

AbstractScene.prototype.imgToCache = function () {
    var names = Object.keys(this.models)
    for (var i = 0; i < names.length; i++) {
        var g = this
        let name = names[i]
        var path = this.models[name].path
        let img = new Image()
        img.src = path
        img.onload = function () {
            g.models[name].image = img
            log(g.models)
            if (Object.keys(g.models).length === names.length){
                //这里是图片加载完成的阶段 需要调用回调函数
                //log(loads.length)
                g.callback(g.game)
                g.game.run()
            }
        }
    }
}

AbstractScene.prototype.imageByName = function (name) {
    //将图片提前加载到内存中,只保留一份内存,需要时候重用
    var img = this.models[name]
    // var image = new MyObject()
    return img
}