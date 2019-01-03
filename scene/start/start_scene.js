function StartScene(game) {
    AbstractScene.call(this)
    this.game = game
    this.game.canvas.addEventListener('mousedown',function (event) {
        log('mouse down')
    })
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
    var img = new Image()
    img.src = 'img/start.png'
    this.game.context.drawImage(img,250,250,130,80)
    // log('child draw')
}

