function MainScene(game) {
    AbstractScene.call(this,game)
    this.imgToPath = {
        'tBall':'img/ball.png',
        'tBlock':'img/block.png',           //???
        'tPaddle':'img/paddle.png',
    }
    //callback 是注册gua.uodate
    this.score = 0                          //这个场景的分数
    this.game = game
    this.actions = {}
    this.blocks = []
    this.paused = false
    // this.blocks = blocks
    this.inside = false
    // this.imgToPath('tBa')
    this.p = new Paddle(game,'tPaddle',220,300,100,15)
    log(this.p)
    this.createModel('tPaddle',this.p)
    this.b = new Ball(game,'tBall',250,290,10,10)
    this.createModel('tBall',this.b)
    var temp = [0,0,]
    var bk = new Block(game,'tBlock',temp,50,30)
    this.createModel('tBlock',bk)
    this.imgToCache()
    //进入debug mode
    this.enableDebug(true,game,this.b)
    this.__init()
}

MainScene.prototype = Object.create(AbstractScene.prototype)

//第四步：改造构造器
//改变了某个构造器的原型之后，紧接着的代码一定是改构造器
MainScene.prototype.constructor = MainScene

MainScene.prototype.__init = function(){
    var g = this
    //这里初始化这个场景中所需注册的所有动作
    this.enlistActions('a',function () {
        g.p.moveLeft()
    })

    this.enlistActions('d',function () {
        g.p.moveRight()
    })

    this.enlistActions(' ',function () {
        g.b.fire()
    })
}

MainScene.prototype.enableDebug = function (flag,gua,ball) {
    if(!flag)
        return
    var g = this
    window.addEventListener('keydown',function (event) {
        if(event.key === 'p'){
            g.paused = !g.paused
        }else if('1234567'.includes(event.key)){
            // log(event.key)
            g.blocks = g.loadLevel(Number(event.key)-1,gua)
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
    var model = this.getModel('tBlock')
    for(var i=0;i<tempBlock.length;i++){
        var tempBK = new Block(game,'tBlock',tempBlock[i],model.width,model.height)
        // tempBK.x = tempBlock[i][0]  //是不是都指向一个对象
        // tempBK.y = tempBlock[i][1]
        blocks.push(tempBK)
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
            this.score += 10
        }
    }
    this.b.move()
}

MainScene.prototype.draw = function () {
    //this.game是在abstract scene里面
    this.game.drawModel2D(this.p,this)
    this.game.drawModel2D(this.b,this)
    for(var i=0;i<this.blocks.length;i++){
        if(!this.blocks[i].killed){
            this.game.drawModel2D(this.blocks[i],this)           //这里不对..
        }
    }
    this.game.context.font = "36px serif"
    this.game.context.fillStyle = "white"
    this.game.context.fillText('score: ' + this.score ,30 ,400 )
}

MainScene.prototype.enlistActions = function(key,callback){
    this.actions[key] = callback
}
