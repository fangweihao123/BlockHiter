var paddle = function (game) {
    var o = game.imageByName('tPaddle')
    o.x = 230
    o.y = 300
    o.speed = 15
    // var o = {
    //     image : image,
    //     x : 100,
    //     y : 300,
    //     speed : 15,
    // }
    o.moveLeft = function() {
        o.x -= o.speed
        if(o.x < 0)
            o.x = 0
    }
    o.moveRight = function() {
        var canvas = document.getElementById('id-canvas')
        o.x += o.speed
        if(o.x > canvas.width-o.image.width)
            o.x = canvas.width-o.image.width
    }
    //collide 应该分为两种情况 一种是侧面撞击 x方向速度相反 另外一种是上下相撞 y方向速度相反
    o.collide = function (ball) {
        // if(ball.y + ball.height > o.y){
        //     if(ball.x>o.x&&ball.x<o.x+o.image.width){
        //         return true
        //     }
        // }
        return rectIntersect(ball,o)||rectIntersect(o,ball)
    }
    return o
}
