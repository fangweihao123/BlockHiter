function Button(name,x,y,width,height) {
    Model2D.call(this,name,x,y,width,height)
}

Button.prototype = Object.create(Model2D.prototype)

Button.prototype.constructor = Button
