function Button(x,y,width,height,image) {
    Model2D.call(x,y,width,height,image)
}

Button.prototype = Object.create(Model2D.prototype)

Button.prototype.constructor = Button

