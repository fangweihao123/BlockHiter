var paddle = function (game) {
    var image = game.imageByName('tPaddle')
    var o = {
        image : image,
        x : 100,
        y : 300,
        speed : 15,
    }
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
    o.collide = function (ball) {
        if(ball.y + ball.image.height > o.y){
            if(ball.x>o.x&&ball.x<o.x+o.image.width){
                return true
            }
        }
    }
    return o
}
