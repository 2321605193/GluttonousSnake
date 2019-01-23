//点击开始游戏  startPbage  消失   游戏开始
// 随机出现食物   出现三姐蛇开始运动   
//改变方向
//判断是否吃到食物  食物消失  蛇增长
//游戏结束弹框

var ccontent = document.getElementById('content');
var startPage = document.getElementById('startPage');
var startBtn = document.getElementById('startBtn');
var scoreBox = document.getElementById('score');
var loser = document.getElementById('loser');
var closeScore = document.getElementById('closeScore');
var close = document.getElementById('close');
var startP = document.getElementById('startAndPush');
var startGameBool = true;
var startPushBool = true;
var snakeMove;
var speed = 200;


init();

function init() {
    this.mapW = parseInt(getComputedStyle(content).width);
    this.mapH = parseInt(getComputedStyle(content).height);
    this.mapDiv = content;
    //食物属性
    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0;
    this.foodY = 0;
    // 蛇属性
    this.snakeW = 20;
    this.snakeH = 20;
    this.snakeBody = [
        [3, 1, 'head'],
        [2, 1, 'body'],
        [1, 1, 'body']
    ];
    //游戏属性

    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;

    this.score = 0;
   startBtn.onclick = function() {
        
        startAndPush(); 
    }
}

function startGame() {   
    startPage.style.display = 'none';
    startP.style.display = 'block';
    food();
    snake();
 bindEvent();
  
}

function food() {
    var food = document.createElement('div');
    food.style.width = this.foodW + 'px';
    food.style.height = this.foodH + 'px';
    food.style.position = 'absolute';
    this.foodX = Math.floor(Math.random() * (this.mapW / 20));
    this.foodY = Math.floor(Math.random() * (this.mapH / 20));
    food.style.left = this.foodX * 20 + 'px';
    food.style.top = this.foodY * 20 + 'px';
    this.mapDiv.appendChild(food).setAttribute('class', 'food');
}

function snake() {
    for(var i = 0; i < this.snakeBody.length; i++) {
        var snake = document.createElement('div');
        snake.style.width = this.snakeW + 'px';
        snake.style.height = this.snakeH + 'px';
        snake.style.position = "absolute";
        snake.style.left = this.snakeBody[i][0] * 20 + 'px';
        snake.style.top = this.snakeBody[i][1] * 20 + 'px';
        snake.classList.add(this.snakeBody[i][2]);
        this.mapDiv.appendChild(snake).classList.add('snake');
        switch(this.direct) {
            case 'right':
                break;
            case 'left':
                snake.style.transform = 'rotate(180deg)';
                break;
            case 'up':
                snake.style.transform = 'rotate(270deg)';
                break;
            case 'down':
                snake.style.transform = 'rotate(90deg)';
                break;
            default:
                return;

        }
    }
}

function move() {
    for(var i = this.snakeBody.length - 1; i > 0; i--) {
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];

    }
    switch(this.direct) {
        case 'right':
            this.snakeBody[0][0] += 1;
            break;
        case 'left':
            this.snakeBody[0][0] -= 1;
            break;
        case 'up':
            this.snakeBody[0][1] -= 1;
            break;
        case 'down':
            this.snakeBody[0][1] += 1;
            break;
        default:
            return;

    }
    removeClass('snake');
    snake();
    if(this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
        var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
        switch(this.direct) {
            case 'right':
                this.snakeBody.push([snakeEndX - 1, snakeEndY, 'body']);
                break;
            case 'left':
                this.snakeBody.push([snakeEndX + 1, snakeEndY, 'body']);
                break;
            case 'up':
                this.snakeBody.push([snakeEndX, snakeEndY + 1, 'body']);
                break;
            case 'down':
                this.snakeBody.push([snakeEndX, snakeEndY - 1, 'body']);
                break;
            default:
                return;
        }
        this.score += 1;
        scoreBox.innerHTML = score;
        removeClass('food');
        food();

    }
    if(this.snakeBody[0][0] < 0 || this.snakeBody[0][0] > this.mapW / 20) {
        relodGame();
    }
    if(this.snakeBody[0][1] < 0 || this.snakeBody[0][1] > this.mapH / 20) {
        relodGame();
    }
    var snakeHeadX = this.snakeBody[0][0];
    var snakeHeadY = this.snakeBody[0][1];
    for(var i = 1; i < this.snakeBody.length; i++) {
        if(snakeHeadX == this.snakeBody[i][0] && snakeHeadY == this.snakeBody[i][1]) {
            relodGame();
        }
    }
}

function removeClass(calssName) {
    var ele = document.getElementsByClassName(calssName);
    while(ele.length > 0) {
        ele[0].parentNode.removeChild(ele[0]);
    }
}

function setDerict(code) {
    switch(code) {
        case 37:
            if(this.left) {
                this.direct = 'left';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 38:
            if(this.up) {
                this.direct = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        case 40:
            if(this.down) {
                this.direct = 'down';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        case 39:
            if(this.right) {
                this.direct = 'right';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        default:
            break;
    }
}

function bindEvent() {

    close.onclick = function() {
        loser.style.display = 'none';
         startAndPush();
    }
    startBtn.onclick = function() {
        
        startAndPush(); 
    }
    startP.onclick = function() {
        startAndPush();
    }
}

function relodGame() {
    removeClass('snake');
    removeClass('food');
    clearInterval(snakeMove);
    this.snakeBody = [
        [3, 1, 'head'],
        [2, 1, 'body'],
        [1, 1, 'body']
    ];
    //游戏属性

    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;

    loser.style.display = 'block';
    closeScore.innerHTML = this.score;
    this.score = 0;
    scoreBox.innerHTML = this.score;
    startGameBool = true;
    startPushBool = true;
    startP.setAttribute('src', 'img/start.png');
}

function startAndPush() {
    if(startPushBool) {
        if(startGameBool) {
            startGame();
            startGameBool = false;
        }
        startP.setAttribute('src', 'img/pause.png');
        document.onkeydown = function(e) {
            var code = e.keyCode;
            setDerict(code);
        }
        snakeMove = setInterval(function() {
            move();
        }, speed);
        startPushBool = false;
    } else {
        startP.setAttribute('src', 'img/start.png');
        clearInterval(snakeMove);
        document.onkeydown = function(e) {
            e.returnValue = false;
            return false;
        }
        startPushBool = true;
    }
}