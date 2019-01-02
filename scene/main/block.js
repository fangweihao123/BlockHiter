var block = function (position,game){
    var p = position
    var o = game.imageByName('tBlock')
    o.x = p[0]
    o.y = p[1]
    o.killed = false
    // var o = {
    //     image: img,
    //     x : p[0],
    //     y : p[1],
    //     killed : false,
    //     // bonus : p[2],
    // }
    o.collide = function (ball) {
        return (rectIntersect(o,ball)||rectIntersect(ball,o))
    }
    return o
}