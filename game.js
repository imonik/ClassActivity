const inquirer = require('inquirer');
// you'll design a game where a user has to fend off monsters 

// this will be a node file where you use inquirer

// make a Human constructor function

// 	a human has

// 		name 
// 			a string

// 		health
// 			a number

function Human(name) {
    this.name = name;
    this.health = 100;
}

// make a Survivor constructor function

// 	lucky_number

// 		set it to a random number from 1 to 30

function Survivor(name) {
    var luckyNum = Math.floor(Math.random() * 30);
    this.luckyNum = luckyNum;
    Human.call(this, name);
}


// 	add a function named escape

// 		ask the user to input a number from 1 to 30

// 			if it equals the lucky_number

// 				return true

// 			if it does not equal the lucky_number

// 				return false

Survivor.prototype = Object.create(Human.prototype);

Survivor.prototype.escape = function () {
    //Inquirer Here
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter a number between 1-30",
                name: "userInput",
            }
        ])
        .then(function(inquirerResponse) {
            return parseInt(inquirerResponse.userInput) == this.luckyNum ? true : false;
        });
}

// make a Monster constructor function

// 	a monster has

// 		attack
// 			a number
function Monster(attack) {
    this.attack = attack;
}
Monster.prototype = Object.create(Human.prototype);

// 	a monster has an attack function

// 		it returns a random number from 1 to 5

// 		if the number is a 3 then return false

// 		if the number is not a 3, then return the monster's attack number
Monster.prototype.attack = function () {
    var randomNum = Math.floor(Math.random() * 5);
    return randomNum === 3 ? false : this.attack;
}

// 	connect the monster constructor to the Human constructor

var monster = new Monster(10);

inquirer
    .prompt([
        {
            type: "input",
            message: "What is your name?",
            name: "userName",
        }
    ])
    .then(function(inquirerResponse){
        var survivor = new Survivor(inquirerResponse.userName);
        var health = survivor.health;
        while(health>=0){
            if(survivor.escape()){
                console.log(`You've escaped! GJ!`);
                break;
            }else{
                if(monster.attack()){
                    health -= monster.attack;
                    console.log(`Ow!! Your Health is now: ${health}`);
                }else{
                    console.log(`You dodged the monster's attack!`);
                }
            }
        }
        console.log('You are dead!');
    });




