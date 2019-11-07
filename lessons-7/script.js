var FIELD_SIZE_X = 20;
var FIELD_SIZE_Y = 20;
var SNAKE_SPEED = 300;
var snake = [];
var direction = "x-";
var gameIsRuning = false;
var snake_timer;
var food_timer;
var creatWall_timer;
var removeWall_timer;
var score = 0;


function init() {
    createScore();
    prepareGameField();

    document.getElementById("snake-start").addEventListener("click", startGame);
    document.getElementById("snake-renew").addEventListener("click", stopGame);


    addEventListener("keydown", changeDirection);
}

function prepareGameField() {

    var game_table = document.createElement("table");

    game_table.setAttribute("class", "game-table");

    for (var i = 0; i < FIELD_SIZE_X; i++) {
        var row = document.createElement("tr");
        row.setAttribute("class", "game-table-row row-" + i);

        for (var j = 0; j < FIELD_SIZE_Y; j++) {
            var cell = document.createElement("td");
            cell.setAttribute("class", "game-table-cell cell-" + i + "-" + j);

            row.appendChild(cell);
        }

        game_table.appendChild(row);
    }

    document.getElementById("snake-field").appendChild(game_table);

}

function createScore() {
    var div_score = document.createElement("div");
    div_score.setAttribute("class", "div-score");

    var span_scoreDescr = document.createElement("span");
    span_scoreDescr.innerHTML = "СЧЁТ ИГРЫ: ";
    div_score.appendChild(span_scoreDescr);

    var span_scoreValue = document.createElement("span");
    span_scoreValue.setAttribute("id", "score");
    span_scoreValue.innerHTML = score;
    div_score.appendChild(span_scoreValue);

    document.getElementById("snake-field").appendChild(div_score);
}

function respawn() {
    var start_coord_x = Math.floor(FIELD_SIZE_X / 2);
    var start_coord_y = Math.floor(FIELD_SIZE_Y / 2);

    var snake_head = document.getElementsByClassName("cell-" + start_coord_x + "-" + start_coord_y)[0];
    snake_head.setAttribute("class", snake_head.getAttribute("class") + " snake-unit");

    var snake_tail = document.getElementsByClassName("cell-" + (start_coord_x - 1) + "-" + start_coord_y)[0];
    snake_tail.setAttribute("class", snake_tail.getAttribute("class") + " snake-unit");

    snake.push(snake_head);
    snake.push(snake_tail);
}

function move() {
    var new_unit;

    var snake_head_class = snake[snake.length - 1].getAttribute("class").split(" ");
    var snake_coord = snake_head_class[1].split("-");
    var coord_x = parseInt(snake_coord[1]);
    var coord_y = parseInt(snake_coord[2]);

    switch (direction) {
        case "x-":
            new_unit = document.getElementsByClassName("cell-" + (coord_x - 1) + "-" + coord_y)[0];
            break;
        case "x+":
            new_unit = document.getElementsByClassName("cell-" + (coord_x + 1) + "-" + coord_y)[0];
            break;
        case "y+":
            new_unit = document.getElementsByClassName("cell-" + coord_x + "-" + (coord_y + 1))[0];
            break;
        case "y-":
            new_unit = document.getElementsByClassName("cell-" + coord_x + "-" + (coord_y - 1))[0];
            break;
    }

    if (new_unit !== undefined) {

        var new_unit_classes = new_unit.getAttribute("class").split(" ");
        if (!new_unit_classes.includes("wall-unit") && !new_unit_classes.includes("snake-unit")) {

            new_unit.setAttribute("class", new_unit.getAttribute("class") + " snake-unit");
            snake.push(new_unit);

            if (!haveFood(new_unit)) {

                var removed = snake.splice(0, 1)[0];
                var classes = removed.getAttribute("class").split(" ");

                removed.setAttribute("class", classes[0] + " " + classes[1]);
            }
        } else {

            alert("Змейка сломалась. Игра окончена.");
            clearInterval(creatWall_timer);
            stopGame();

        }
    } else {

        alert("Змейка врезалась в стену. Игра окончена.");
        clearInterval(creatWall_timer);
        stopGame();

    }
}

function changeDirection(event) {
    switch (event.keyCode) {
        case 37:

            if (direction !== "y+") {
                direction = "y-";
            }
            break;
        case 38:
            if (direction !== "x+") {
                direction = "x-";
            }
            break;
        case 39:
            if (direction !== "y-") {
                direction = "y+";
            }
            break;
        case 40:
            if (direction !== "x-") {
                direction = "x+";
            }
            break;
    }
}

function createFood() {
    var foodCreated = false;


    while (!foodCreated && gameIsRuning) {

        var food_x = Math.floor(Math.random() * FIELD_SIZE_X);
        var food_y = Math.floor(Math.random() * FIELD_SIZE_Y);

        var food_cell = document.getElementsByClassName("cell-" + food_x + "-" + food_y)[0];
        var food_cell_classes = food_cell.getAttribute("class").split(" ");

        if (!food_cell_classes.includes("snake-unit") && !food_cell_classes.includes("wall-unit")) {

            var classes = food_cell_classes.join(" ");
            food_cell.setAttribute("class", classes + " food-unit");

            foodCreated = true;
        }
    }
}

function removeWall() {
    while (gameIsRuning) {
        var createdWall = document.getElementsByClassName("wall-unit");
        for (var i = 0; i < createdWall.length; i++) {
            createdWall[i].classList.remove("wall-unit");
        }
    }
}

function createWall() {
    //var wallCreated = false;
    while (gameIsRuning) {
        for (var i = 0; i <= Math.floor(Math.random() * 3); i++) {

            var wall_x = Math.floor(Math.random() * FIELD_SIZE_X);
            var wall_y = Math.floor(Math.random() * FIELD_SIZE_Y);

            var wall_cell = document.getElementsByClassName("cell-" + wall_x + "-" + wall_y)[0];
            var wall_cell_classes = wall_cell.getAttribute("class").split(" ");

            if (!wall_cell_classes.includes("snake-unit") || !wall_cell_classes.includes("food-unit")) {

                var classes = wall_cell_classes.join(" ");
                wall_cell.setAttribute("class", classes + " wall-unit");

                //wallCreated = true;
                // }
            }
        }
    }
}


function haveFood(unit) {
    var check = false;

    var unit_classes = unit.getAttribute("class").split(" ");

    if (unit_classes.includes("food-unit")) {
        check = true;

        setTimeout(createFood, 500);

        score++;
        var scoreValue = document.getElementById("score");
        scoreValue.innerHTML = score;

    }

    return check;
}

function startGame() {
    gameIsRuning = true;
    respawn();

    snake_timer = setInterval(move, SNAKE_SPEED);
    setTimeout(createFood, 2000);
    creatWall_timer = setInterval(createWall, 3000);
    removeWall_timer = setInterval(removeWall, 10000);

}

function stopGame() {
    gameIsRuning = false;
    window.snake = [];
    clearInterval(snake_timer);
    clearInterval(removeWall_timer);
    //removeWall();

    var cell = document.getElementsByTagName("td");
    for (var n = 0; n < cell.length; n++) {
        cell[n].removeAttribute("class");
    }
    prepareGameField();
    //var game_table = document.getElementsByClassName("game-table");

    /*var delSnake = document.getElementsByClassName("snake-unit");
    for (var i = 0; i < delSnake.length; i++) {
        delSnake[i].classList.remove("snake-unit");
    }

    var delFood = document.getElementsByClassName("food-unit");
    for (var i = 0; i < delFood.length; i++) {
        delSnake[i].classList.remove("food-unit");
    }*/

    // document.getElementById("snake-field").removeChild("game_table")[0];
    //  wallCreated = false;
    //foodCreated = false;
    //prepareGameField();
    //respawn();
}

window.onload = init;
