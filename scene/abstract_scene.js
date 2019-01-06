function AbstractScene(game) {
    this.actions = {}
    this.models = {}
    this.game = game
    //scene 的images是文件名字对应
}

AbstractScene.prototype.update = function () {
    // log('super update')
}

AbstractScene.prototype.draw = function () {
    // log('super draw')
}

AbstractScene.prototype.createModel = function (name,model) {
    //var model = new Model2D(x,y,width,height,path)
    this.models[name] = model
}

AbstractScene.prototype.getModel = function (name) {
    //var model = new Model2D(x,y,width,height,path)
    return this.models[name]
}

AbstractScene.prototype.imgToCache = function () {
    var names = Object.keys(this.models)
    let count = 0
    for (var i = 0; i < names.length; i++) {
        var g = this
        let name = names[i]
        var path = this.imgToPath[name]
        let img = new Image()
        img.src = path
        img.onload = function () {
            g.models[name].image = img
            count++
            if (count === names.length){
                //这里是图片加载完成的阶段 需要调用回调函数
                //log(loads.length)
                // g.callback(g.game)
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