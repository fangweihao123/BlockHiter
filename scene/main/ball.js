var ball = function (game) {
    var image = game.imageByName('tBall')
    var o = {
        image : image,
        x : 250,
        y : 280,
        speedX : 10,
        speedY : 10,
        fired : false,
    }
    o.move = function () {
        if(!o.fired)
            return
        var canvas = document.getElementById('id-canvas')
        if(o.x<0||o.x>canvas.width-o.image.width)
            o.speedX *= -1
        if(o.y<0||o.y>canvas.height)
            o.speedY *= -1
        o.x += o.speedX
        o.y += o.speedY
    }
    o.fire = function () {
        o.fired = true
    }
    return o
}