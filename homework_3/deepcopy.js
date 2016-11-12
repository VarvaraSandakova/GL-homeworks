//deep copy
var varya = {
    name: "Varya",
    age: 24,
    skills: {
        js:true,
        css:true
    }
};

//first method

function cloneObject(varya) {
    if (varya === null || typeof varya !== 'object') {
        return varya;
    }

    var temp = varya.constructor();
    for (var key in varya) {
        temp[key] = cloneObject(varya[key]);
    }

    return temp;
};

var anya = (cloneObject(varya));
anya.name = "Anya";

console.log(varya);
console.log(anya);

//second method

var anya = (JSON.parse(JSON.stringify(varya)));
anya.name = "Anya";

console.log(varya);
console.log(anya);

//third method

var anya = $.extend(true, {}, varya);
anya.name = "Anya";

console.log(varya);
console.log(anya);
