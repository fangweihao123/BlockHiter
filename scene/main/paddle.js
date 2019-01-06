function Paddle(game,name,x,y,width,height) {
    Model2D.call(this,name,x,y,width,height)
    this.speed = 5
}

Paddle.prototype = Object.create(Model2D.prototype)

Paddle.prototype.constructor = Paddle

Paddle.prototype.setSpeed = function (speed) {
    this.speed = speed
}

Paddle.prototype.moveLeft = function () {
    this.x -= this.speed
    if(this.x < 0)
        this.x = 0
}

Paddle.prototype.moveRight = function() {
    var canvas = document.getElementById('id-canvas')
    this.x += this.speed
    if(this.x > canvas.width-this.width)
        this.x = canvas.width-this.width
}

//collide 应该分为两种情况 一种是侧面撞击 x方向速度相反 另外一种是上下相撞 y方向速度相反
Paddle.prototype.collide = function (ball) {
    // if(ball.y + ball.height > o.y){
    //     if(ball.x>o.x&&ball.x<o.x+o.image.width){
    //         return true
    //     }
    // }
    return rectIntersect(ball,this)||rectIntersect(this,ball)
}