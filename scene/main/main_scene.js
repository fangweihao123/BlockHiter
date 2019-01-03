var MainScene = function (gua,blocks) {
    var o = {
        actions : {},
    }

    o.enlistActions = function(key,callback){
        o.actions[key] = callback
    }

    o.__init = function(){
        //这里初始化这个场景中所需注册的所有动作
        o.enlistActions('a',function () {
            log('a')
            o.p.moveLeft()
        })

        o.enlistActions('d',function () {
            o.p.moveRight()
        })

        o.enlistActions(' ',function () {
            o.b.fire()
        })
    }

    o.draw = function () {
        gua.drawImage(o.p)
        gua.drawImage(o.b)
        // gua.drawRect(p)
        // gua.drawRect(b)
        for(var i=0;i<o.blocks.length;i++){
            if(!o.blocks[i].killed)
                gua.drawImage(o.blocks[i])
        }
        gua.context.font = "36px serif"
        gua.context.fillStyle = "white"
        gua.context.fillText('score: ' + gua.score ,30 ,400 )
    }
    o.update = function () {
        if(o.paused)
            return
        //如果球和第一次相撞 就直接将方向相反 如果第二次还在相交时相撞 保持速度不变
        if(o.p.collide(o.b)){
            if(!o.inside){
                o.inside = true
                o.b.speedY *= -1
            }
        }else{
            //当二者不想交时候再复原标志位
            o.inside = false
        }
            // o.b.speedY *= -1
        for(var i = 0;i < o.blocks.length;i++){
            // var bk = blocks[i]
            if(o.blocks[i].collide(b)){
                if(o.blocks[i].killed === true)
                    continue
                o.blocks[i].killed = true
                b.speedY *= -1
                gua.score += 10
            }
        }
        o.b.move()
    }

    //加载关卡的函数 应该加入一个场景编辑器的
    o.loadLevel = function (n,game) {
        var blocks = []
        var tempBlock = levels[n]
        for(var i=0;i<tempBlock.length;i++){
            var bk = block(tempBlock[i],game)
            blocks.push(bk)
        }
        return blocks
    }

    o.enableDebug = function (flag,gua,ball) {
        if(!flag)
            return
        window.addEventListener('keydown',function (event) {
            if(event.key === 'p'){
                o.paused = !o.paused
            }else if('1234567'.includes(event.key)){
                blocks = []
                gua.blocks = o.loadLevel(Number(event.key)-1,gua)
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


    o.paused = false
    o.blocks = blocks
    o.inside = false
    o.p = paddle(gua)
    o.b = ball(gua)
    //进入debug mode
    o.enableDebug(true,gua,o.b)
    o.__init()

    return o
}