var log = console.log.bind(console)

var imageFromPath = function (path) {
    var img = new Image()
    img.onload = function(){
    }
    img.src = path

    return img
}


var aInb = function (a,b) {
    if(a.x > b.x && a.x < a.x+a.width){
        if(a.y > b.y && a.y < b.y+b.height)
            return true
    }
    return false
}


//矩形相交函数
var rectIntersect = function (a,b) {
    if(a.x + a.image.width > b.x && a.x + a.image.width < b.x+b.image.width){
        if(a.y + a.image.height > b.y && a.y + a.image.height < b.y + b.image.height){
            return true
        }
    }
    if(a.x > b.x && a.x < b.x+b.image.width){
        if(a.y + a.image.height > b.y && a.y + a.image.height < b.y + b.image.height){
            return true
        }
    }
    return false

}
