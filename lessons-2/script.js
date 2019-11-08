// 1. 
    var a = 1, b = 1, c, d;
c = ++a; alert(c);           // 2 Увеличение значения на единицу и присваивание его переменной.
d = b++; alert(d);           // 1 Присваивание значения переменной, а затем увеличние на единицу
c = (2+ ++a); alert(c);      // 5 Увеличение полученного значения a на единицу и на два
d = (2+ b++); alert(d);      // 4 Увеличение полученного значения b на два
alert(a);                    // 3 а дважды увеличивалось на единицу
alert(b);                    // 3 б дважды увеличивалось на единицу

//2.x=5


//3.
    var a = +prompt( 'Введите число a' ),
        b = +prompt( 'Введите число b' );
    if ( isNaN(a) || isNaN(b) ) {
        alert( 'Необходимо ввести числа!' );
    }
    else if ( a >= 0 && b >= 0 ) {
        alert( a - b );
    }
    else if ( a < 0 && b < 0 ) {
        alert( a * b );
    }
    else {
        alert( a + b );
    }

//4.
    var a,
        arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    function input_a () {
        a = prompt('Введите число от 1 до 15');
        if (a !== null && (a < 1 || a > 15 || isNaN(a))) {
            input_a();
        }
    }
    input_a();
    switch(a) {
        case 1:
            alert(arr);
            break;
        case 15:
            alert(a);
            break;
        case null:
            break;
        default:
            alert(arr.slice(a - 1));
    }

//5.

function add ( a, b ) {
    return a + b;
}
function sub ( a, b ) { 
    return a - b;
}
function div ( a, b ) { 
    return a / b;
}
function mul ( a, b ) { 
    return a * b;
}



//6.
function mathOperation ( arg1, arg2, operation ) {
    switch (operation) {
        case '+':
            return add ( arg1, arg2 );
            break;
        case '-':
            return sub ( arg1, arg2 );
            break;
        case '/':
            return div ( arg1, arg2 );
            break;
        case '*':
            return mul ( arg1, arg2 );
            break;
    }
}

//7.
alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) true

//8.
function power( val, pow ) {
    if ( pow === 0 ) {
        return 1;
    }
    else {
        return val * power( val, pow - 1);
    }
}