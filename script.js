let gameBoard = document.querySelector('.game-board');
let snake = [{x: 5, y: 5}, {x: 4, y: 5}, {x: 3, y: 5}];
let direction = 'right';
let apple = {x: 0, y: 0};
let score = 0;
let intervalTime = 1000;
let interval;

function startGame() {
    createGameBoard();
    createSnake();
    createApple();
    moveSnake();
}

function createGameBoard() {
    for (let i = 0; i < 100; i++) {
        let div = document.createElement('div');
        gameBoard.appendChild(div);
    }
}

function createSnake() {
    snake.forEach((part, index) => {
        let div = gameBoard.children[part.x + part.y * 10];
        div.classList.add('snake');
    });
}

function createApple() {
    apple.x = Math.floor(Math.random() * 10);
    apple.y = Math.floor(Math.random() * 10);
    let div = gameBoard.children[apple.x + apple.y * 10];
    div.classList.add('apple');
}

function moveSnake() {
    interval = setInterval(() => {
        let head = snake; // Corrected here
        let newHead;
        switch (direction) {
            case 'right':
                newHead = {x: head.x + 1, y: head.y};
                break;
            case 'left':
                newHead = {x: head.x - 1, y: head.y};
                break;
            case 'up':
                newHead = {x: head.x, y: head.y - 1};
                break;
            case 'down':
                newHead = {x: head.x, y: head.y + 1};
                break;
        }

        if (newHead.x < 0 || newHead.x >= 10 || newHead.y < 0 || newHead.y >= 10) {
            clearInterval(interval);
            alert('Game Over!');
            return;
        }

        let newHeadDiv = gameBoard.children[newHead.x + newHead.y * 10];
        if (newHeadDiv.classList.contains('snake')) {
            clearInterval(interval);
            alert('Game Over!');
            return;
        }

        snake.unshift(newHead);
        let tail = snake.pop();
        let tailDiv = gameBoard.children[tail.x + tail.y * 10];
        tailDiv.classList.remove('snake');

        if (newHeadDiv.classList.contains('apple')) {
            score++;
            createApple();
            snake.push(tail);
            tailDiv.classList.add('snake');
        }

        newHeadDiv.classList.add('snake');
    }, intervalTime);
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
    }
});

startGame();
