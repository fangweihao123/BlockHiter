function MainScene(game,callback) {
    AbstractScene.call(this,game,callback)
    //callback 是注册gua.uodate
    this.actions = {}
    this.paused = false
    // this.blocks = blocks
    this.inside = false
    // this.imgToPath('tBa')
    this.p = paddle(game)
    this.b = ball(game)
    //进入debug mode
    this.enableDebug(true,game,this.b)
    this.__init()
}

MainScene.prototype.enableDebug = function (flag,gua,ball) {
    if(!flag)
        return
    window.addEventListener('keydown',function (event) {
        if(event.key === 'p'){
            this.paused = !this.paused
        }else if('1234567'.includes(event.key)){
            blocks = []
            this.blocks = this.loadLevel(Number(event.key)-1,gua)
            // gua.blocks = blocks
        }
    })

    var pressed = false

    gua.canvas.addEventListener('mousedown',function (event) {
        // log('mouse down')
        pressed = true
    })

    gua.canvas.addEventListener('mousemove',function (event) {
        // log('mouse move')
        if(pressed){
            ball.x = event.offsetX
            ball.y = event.offsetY
        }
    })

    gua.canvas.addEventListener('mouseup',function (event) {
        // log('mouse up')
        pressed = false
    })
}

MainScene.prototype.loadLevel = function (n,game) {
    var blocks = []
    var tempBlock = levels[n]
    for(var i=0;i<tempBlock.length;i++){
        var bk = block(tempBlock[i],game)
        blocks.push(bk)
    }
    return blocks
}

MainScene.prototype.update = function () {
    if(this.paused)
        return
    //如果球和第一次相撞 就直接将方向相反 如果第二次还在相交时相撞 保持速度不变
    if(this.p.collide(this.b)){
        if(!this.inside){
            this.inside = true
            this.b.speedY *= -1
        }
    }else{
        //当二者不想交时候再复原标志位
        this.inside = false
    }
        // o.b.speedY *= -1
    for(var i = 0;i < this.blocks.length;i++){
        // var bk = blocks[i]
        if(this.blocks[i].collide(this.b)){
            if(this.blocks[i].killed === true)
                continue
            this.blocks[i].killed = true
            this.b.speedY *= -1
            this.game.score += 10
        }
    }
    this.b.move()
}

MainScene.prototype.draw = function () {
    //this.game是在abstract scene里面
    this.game.drawImage(this.p)
    this.drawImage(this.b)
    // gua.drawRect(p)
    // gua.drawRect(b)
    for(var i=0;i<this.blocks.length;i++){
        if(!this.blocks[i].killed)
            this.game.drawImage(this.blocks[i])
    }
    this.game.context.font = "36px serif"
    this.game.context.fillStyle = "white"
    this.game.context.fillText('score: ' + gua.score ,30 ,400 )
}

MainScene.prototype.enlistActions = function(key,callback){
    this.actions[key] = callback
}

MainScene.prototype.__init = function(){
    //这里初始化这个场景中所需注册的所有动作
    this.enlistActions('a',function () {
        log('a')
        this.p.moveLeft()
    })

    this.enlistActions('d',function () {
        this.p.moveRight()
    })

    this.enlistActions(' ',function () {
        this.b.fire()
    })
}
