function Ball(game,name,x,y,width,height) {
    Model2D.call(this,name,x,y,width,height)
    this.speedX = 5
    this.speedY = 5
    this.fired = false
}

Ball.prototype = Object.create(Model2D.prototype)

Ball.prototype.constructor = Ball

Ball.prototype.setSpeedX = function (speedX) {
    this.speedX = speedX
}

Ball.prototype.setSpeedY = function (speedY) {
    this.speedY = speedY
}

Ball.prototype.move = function () {
    if(!this.fired)
        return
    var canvas = document.getElementById('id-canvas')
    if(this.x<0||this.x>canvas.width-this.width)
        this.speedX *= -1
    if(this.y<0||this.y>canvas.height)
        this.speedY *= -1
    this.x += this.speedX
    this.y += this.speedY
}

Ball.prototype.fire = function () {
    this.fired = true
}