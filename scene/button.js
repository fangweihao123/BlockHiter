function Button() {

}

Button.prototype = Object.create(MyObject.prototype)

Button.prototype.constructor = Button

