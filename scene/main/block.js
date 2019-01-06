function Block(game,name,p,width,height) {      //p == position
    Model2D.call(this,name,p[0],p[1],width,height)
    this.killed = false
}

Block.prototype = Object.create(Model2D.prototype)

Block.prototype.constructor = Block

Block.prototype.collide = function (ball) {
    return (rectIntersect(this,ball)||rectIntersect(ball,this))
}