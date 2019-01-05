function StartScene(game) {
    AbstractScene.call(this,game,this.init)
    this.game.canvas.addEventListener('mousedown',(event)=>{
        var point = new Point2D()
        point.x = event.offsetX
        point.y = event.offsetY
        if(aInb(point,this.models['start'])){
            log('mouse down')

        }
    })
    this.createModel('start',250,250,130,80,'img/start.png')
    this.imgToCache()
    //加载完成后才能调用回调

    //而且可以继承父类的属性
    // log(this.actions)
}

//第三步：确定继承的关系
StartScene.prototype = Object.create(AbstractScene.prototype)

//第四步：改造构造器
//改变了某个构造器的原型之后，紧接着的代码一定是改构造器
StartScene.prototype.constructor = StartScene;

//ok 经过实验可以确定子类重写的方法会覆盖父类的方法
// StartScene.prototype.update = function () {
//     log('child update')
// }
//
StartScene.prototype.draw = function () {
    //var button = new Button(250,250,130,80,this.imageCache['start'])
    this.game.drawModel2D(this.models['start'])
    // this.game.context.drawImage(button.image,250,250,130,80)
    // log('child draw')
}

StartScene.prototype.init = function (game){
    var g = this
    game.update = function () {
        g.update()
    }
    game.draw = function () {
        g.draw()
    }
    game.registerScene(g)
}

