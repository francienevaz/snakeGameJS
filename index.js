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

drawSnake()