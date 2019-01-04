function AbstractScene(game,callback) {
    this.actions = {}
    this.imagePath = {}
    this.imageCache = {}
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

AbstractScene.prototype.imgToPath = function (name,path) {
    this.imagePath[name] = path
}

AbstractScene.prototype.imgToCache = function () {
    var names = Object.keys(this.imagePath)
    for (var i = 0; i < names.length; i++) {
        var g = this
        let name = names[i]
        var path = this.imagePath[name]
        let img = new Image()
        img.src = path
        img.onload =function () {
            g.imageCache[name] = img
            if (Object.keys(g.imageCache).length === names.length){
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
    var img = this.imageCache[name]
    var image = new MyObject()
    image.width = img.width
    image.height = img.height
    image.image = img
    // var image = {
    //     width : img.width,
    //     height : img.height,
    //     image : img,
    // }
    return image
}