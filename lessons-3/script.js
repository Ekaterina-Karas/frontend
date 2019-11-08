//Задание 1
var prime = [ 2 ],
    num = 2;
while ( num <= 100) {
    var numcheck = 1;
    for ( var i = 0; i < prime.length; i++) {
        if ( num % prime[ i ] === 0) {
            numcheck = 0;
        }
    }
    if ( numcheck === 1 ) {
        prime.push( num );
    }
    num++;
}
console.log ( prime );

//Задание 2
var shop = [], sum = 0;

for(var i=0;i<15;i++){
    shop[i] = parseInt(Math.random() * 300 *652);
    console.log("Товар № "+(i+1)+" стоит "+shop[i])
    sum += shop[i];
}
console.log("Стоимость всех товаров = "+sum);

//Задание 4
for(var number = 0; number <= 9; document.write(number++ + " ")){}
		

//Задание 5
for(var i = 1, pyramid = " "; i <= 20; i++){
				pyramid += "x";
				console.log(pyramid);
			}
		