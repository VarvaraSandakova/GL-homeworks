//1. Напишите функцию, которая будет возвращать набор уникальных символов, которые были переданы в эту функцию, как аргумент.
// Сортировка - не нужна, строчные и заглавные буквы - 1 символ.
function extractCharacters(str) {
    var arr = str.split('');
    var newArr = [];
    var isPush;

    for(var i = 0; i < arr.length; i++) {
        isPush = true;

        for(var j = 0; j < newArr.length; j++) {
            if(arr[i] == newArr[j]) {
                isPush = false
            }
        }
        if(isPush) {
            newArr.push(arr[i]);
        }
    }

    return newArr;
}

//2. Напишите функцию, которая будет возвращать новую функцию, с помощью которой можно будет выводить в консоль текстовую информацию.
// 2016-06-06T09:55:44.162Z My Logger: some data
// hint: use toISOString method to format Date object

//myLogger({ data: 1 });
// 2016-06-06T09:55:44.162Z My Logger: Object {data: 1}
//myLogger('My data is -', { data: 1 });
// 2016-06-06T09:55:44.162Z My Logger: my data is - Object {data: 1}

function createLogger (prefix) {
    return function (description, data) {
        switch(arguments.length) {
            case 0:
                description = "";
                data = "";
                break;
            case 1:
                data = description;
                description = "";
                break;
        }

        if(typeof data == 'object') {
            data = description + ' ' + 'Object' + ' ' +  JSON.stringify(data)
        } else {
            data = description + ' ' + data;
        }

        var currentDate = new Date().toISOString();
        console.log(currentDate + ' ' + prefix + ':' + data);
    };
}

var myLogger = createLogger('My Logger');

myLogger({data: 1});
myLogger('my data is -', {data: 1});
myLogger();

function createLogger(prefix) {
    return console.log.bind(console, new Date().toISOString() + ' ' +  prefix + ':');
}

var myLogger = createLogger('My Logger');
myLogger('some data');