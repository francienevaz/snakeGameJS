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
    {x: 200, y: 200},
    {x: 230, y: 200},
    {x: 260, y: 200},
    {x: 290, y: 200},
];

let direction, loopId

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

const gameLoop = () => {
    clearInterval(loopId)
    ctx.clearRect(0, 0, 600, 600);

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