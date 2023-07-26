const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const size = 30;

function roundedRect(ctx,x,y,width,height,radius){
    ctx.beginPath();
    ctx.moveTo(x,y+radius);
    ctx.lineTo(x,y+height-radius);
    ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
    ctx.lineTo(x+width-radius,y+height);
    ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
    ctx.lineTo(x+width,y+radius);
    ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
    ctx.lineTo(x+radius,y);
    ctx.quadraticCurveTo(x,y,x,y+radius);
    ctx.fill();
  }

const snake = [
    {x: 270, y: 270},
];

const randowNumber = (max, min) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randowPosition = () => {
    const number = randowNumber(0, canvas.width - size)

    return Math.round(number / 30) * 30
}

const randowColor = () => {
    const red = randowNumber(0, 255);
    const green = randowNumber(0, 255);
    const blue = randowNumber(0, 255);

    return `rbg(${red}, ${green}, ${blue})`
}

const food = {
    x: randowPosition(),
    y: randowPosition(),
    color: randowColor()
}

let direction, loopId

const  drawFood = () => {
    const { x, y, color} = food;

    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.fillStyle = color;
    roundedRect(ctx, x, y, size, size, size/2)
    ctx.shadowBlur = 0;
}

const drawSnake = () => {

    ctx.fillStyle = "#008d0e"
    
    snake.forEach((position, index) => {

        if (index == snake.length - 1) {
            ctx.fillStyle = "#21b902"
            roundedRect(ctx, position.x, position.y-5, size+10, size+10, size/2)
        }

        roundedRect(ctx, position.x, position.y, size, size, size/2)
    })
}

const moveSnake = () => {
    if (!direction) return

    const head = snake[snake.length - 1] // Pega o ultimo elemento, no caso a cabeça

    if (direction == "right") {
        snake.push({x: head.x + size, y: head.y})
    }

    if (direction == "left") {
        snake.push({x: head.x - size, y: head.y})
    }

    if (direction == "down") {
        snake.push({x: head.x, y: head.y + size})
    }

    if (direction == "up") {
        snake.push({x: head.x, y: head.y - size})
    }

    snake.shift() // Pega o primeiro elemento
}

const drawGrid = () => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#191919";

    for (let i = 30; i < canvas.width; i += 30) {
        //desenhando a linha vertical
        ctx.beginPath();
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()
        // desenhando a linha horizontal
        ctx.beginPath();
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke()
    }
}

drawGrid()

const gameLoop = () => {
    clearInterval(loopId)
    ctx.clearRect(0, 0, 600, 600);
    drawGrid()
    drawFood()
    moveSnake()
    drawSnake()

    loopId = setTimeout(() => {
        
        gameLoop()
        
    }, 300)
}

gameLoop();

document.addEventListener("keydown", ({ key }) => {
    if (key == "ArrowRight" && direction != "left") {
        direction = "right"
    }
    if (key == "ArrowLeft" && direction != "right") {
        direction = "left"
    }
    if (key == "ArrowDown" && direction != "up") {
        direction = "down"
    }
    if (key == "ArrowUp" && direction != "down") {
        direction = "up"
    }
})