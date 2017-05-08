////////////////////////////////////////////// modules /////////////////////////////////////////////////

var ray = (function() {
	var DEFAULTS = {
		say: 'hello!',
		speed: 'normal'
	}
	return {
		speak: function() {
			// прием укороченная оценка
			var myArguments = arguments[0] || '';
			var statement = myArguments.say ||  DEFAULTS.say; 
			console.log(statement);
			// this возвращает экземпляр объекта, return завершает текущую функцию
			// если бы был вне функции, не было бы неоходимого для запуска метода объекта
			// поскольку позвращает this, последнее что делает функция speak, возвращает сам объект
			// и значит снова есть доступ либо к speak либо к run. Этот прием заметно облегчает
			// вызовы в коде
			return this;
		},
		run: function(){
			var myArguments = arguments[0] || '';
			var running = myArguments.speed ||  DEFAULTS.speed; 
			console.log('running...' + running);
			return this
		}
	};
})();

//////////////////////////////////// variable scope and hoisting ////////////////////////////////////////

// не важно где будет происходить вызов функции
myCat();
console.log(catName + ' say miau!');

function myCat() {
	// catName - глобальная переменная доступна везде
	catName = 'Timmy';
}

//////

function myDog() {
	var dogName = 'Fido';
	function otherDog() {
		// имя новее будет выводиться будет именно оно
		// если не переопределять внутри функции, выведится родительская переменная
		var dogName = 'Rover';
		console.log(dogName + ' say woof!');
	}
	otherDog();
}

myDog();

////////////////////////////////////////// анонимные замыкания //////////////////////////////////////////

// kung не существует в глобальной области видимисти
// можно вызвать по имени переменной
// если бодавить () - будет самовоспроизводится, при желании внуть () можно передать переменные
// скобки меняют объявление функции на выражение функции, когда объеяление идет через ключевое слово
// function, предполагается, что у функции так же будет имя; но он ее не запустит.
// самозапускающаяся анонимная функция
// Если бы нужна была рекурсивность, то имя было бы нужно
// Если убрать var iKnow, это приведет к ошибке
// Самуосуществляющийся фактор, анонимное замыкание

var iKnow = function kung(){
	console.log('foo1');
};
iKnow();

var iKnow = function kung(){
	console.log('foo2');
}();

// анонимная функция
var iKnow = function(){
	console.log('foo3');
}();

// замыкание, запираем переменную от всего мира
// этот паттерн очень важен при работе с отдельными конструкциями в js вроде модулей 
(function(){
	// доступна только в поле видимости функции
	var a = 1;
	console.log('foo4');
})();

////////////////////////////////////////// creating tags //////////////////////////////////////////

// create new element
var newLi = document.createElement("li");
var newA = document.createElement("a");

// [0] - положение в массиве
var menu = document.getElementById("social_media").getElementsByTagName("ul")[0];
menu.appendChild(newLi);
newLi.appendChild(newA);
newA.innerHTML = "Blog";

// добавить сверху
// menu.insertBefore(newLi, menu.getElementsByTagName("ul")[0]);

///////////////////////////////////////////// challenge ////////////////////////////////////////////

var links = {
	facebook: "img/facebook.png",
	twitter: "img/twitter.png",
	flickr: "img/flickr.png",
	youtube: "img/youtube.png"
};

function create_social() {
	
	var container = document.getElementById("social");
	for (var link in links) {
		var img = document.createElement("img");
		container.appendChild(img).setAttribute("src", links[link]);
	}
}

create_social();


///////
// там где добавляется класс элемент полностью меняет все содержимое блока

var socialMedia = {
	facebook: 'http://facebook.com/viewsource',
	twitter: 'http://twitter.com/planetoftheweb',
	flickr: 'http://flickr.com/planetoftheweb',
	youtube: 'http://youtube.com/planetoftheweb'
}

// function(){}(); - автоматический вызов функции
// Инстанциируем функцию, которая запустится автоматически с links
// Переменный внутри доступные только для этой функции
// document.querySelectorAll() позволяет выбрать элемент с определенным классом
// '' - js, "" - html
var social = function() {
	var output = '<ul>',
	myList = document.querySelectorAll('.socialmediaicons');

	for (var key in arguments[0]) {
		output += '<li><a href="' + socialMedia[key] + '">' +
		'<img src="img/' + key + '.png" alt="icon for ' + key + '">' +
		'</a></li>';
	}
	output += '</ul>';

	for (var i = myList.length - 1; i >= 0; i--) {
		myList[i].innerHTML = output;
	}

}(socialMedia);


/////////////////////////////////////////// arguments //////////////////////////////////////////

var plus_arg = function() {
	var sum = 0;
	for (var i = arguments.length - 1; i >= 0; i--) {
		sum += arguments[i];
	}
	return sum;
}
// примет столько параметров, сколько ей дашь и сложит их все вместе
console.log(plus_arg(2,6,2));

////////////////////////////////////////// call & apply ////////////////////////////////////////

// вывксти объект с помощью параметра this этой функции
var speaking = function (what) {
	console.log (what);
	console.log (this.love);
	// console.log (this.normal);
	// console.log(this);
}

var saySomething = {normal: "Meow!", love: "Purr"}
speaking.call(saySomething, saySomething.normal);

speaking.apply(saySomething, ['Meouff!']);

// speaking.call(saySomething);

// speaking('moof');

/////////////////////////////////////////// prorotype //////////////////////////////////////////

// так можно контролировать функционал 2х объектов, модицируя одну функцию
var speak = function (saywhat) { 
	console.log(saywhat);
}

var Cat = function () {
	var name, breed;
	return console.dir(this);
}

Cat.prototype.speak = speak;

firstCat = new Cat;
firstCat.name = "Molly";
firstCat.breed = "Siam";
firstCat.speak('Miu!');


///////////////////////////////////////////   new   ///////////////////////////////////////////

var Dog = function() {
	var name, breed;
	return console.dir(this);
}

Dog.prototype.speak = speak;

// вызов конструктора
firstDog = new Dog;
firstDog.name = "Rover";
firstDog.breed = "Doberman";
firstDog.speak("Woof!");

console.log(firstDog.name);
// console.dir(firstDog);

secondDog = new Dog;
secondDog.name = "Fluffy";
secondDog.breed = "Poodle";

console.log(secondDog.name);


///////////////////////////////////////// objects ///////////////////////////////////////////

var calc = {
	status: 'Awesome',
	// можеть быть литерал функции var literal или анонимная функция
	plus: function (a, b) { // утверждение функции внутри { }
		return (
			console.log(this), // вызываются все параметры объекта, 
			// this указывает на объект в котором находится функция, ее можно вызывать 
			// точками и привязка this произойдет только во время вызова, 
			// атрибут this не будет привязан к этому объекту, пока мы не вызовем метод
			console.log(a+b),
			console.log(arguments),
			console.log(this.status) // параметр status объекта
		)
	}
}

calc.plus(2,2);





// traditional definition
function plus(a,b) {
	var sum = a+b;
	return sum;
}

console.log(plus(1,2));

// definition expression, определение через выражение
var def_exp = function(a,b) {
	return console.log(a+b);
};

def_exp(2,2);

// немедленный вызов, NaN
var def_exp_im = function(a,b) {
	return console.log(a+b);
}();

// немедленный вызов, NaN
var def_exp_im_param = function(a,b) {
	return console.log(a+b);
}(2,2);


// this global object
function this_global(a,b) {
	// метод return можно использовать как функцию
	return (
		console.log(a+b),
		// this получает глобальный объект window (это как почти если бы был доступен весь браузер)
		console.log(this),
		// объект вроде массива, поскольку это не совсем массив, но выглядит очень похоже
		console.log(arguments)
	)
}

this_global(5,5);