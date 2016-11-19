// 0. Создать функицю, которая принимает строку селектор и возвращает:
// - undefined - если ничего не найдено
// - найденную ноду - если она одна
// - массив нод - если их несколько
// - если в функцию передать ноду, функция возвращает ее тип (Node, Text, Comment etc)
    function createSelector(selector) {
        var result;
        if ( typeof selector === 'string' ) {
            result = document.querySelectorAll(selector);
            if ( result.length === 1 ) {
                result = result[0];
            } else if ( result.length === 0 ) {
                result = undefined;
            };
        } else if ( selector instanceof Node ) {
            result = selector.nodeType;
        }
        return result;
    }
    var li = createSelector('li'),
        liOne = createSelector('.one');


    console.log(liOne);
    console.log(li);
    console.log(createSelector("footer"));
    console.log(createSelector(liOne));

// 1. Создать функцию, которая принимает строку селектор и возвращает:
//  - undefined - если ничего не найдено
// - найденую ноду - если она одна
// - первую найденную ноду - если их несколько

    function createSelect(sel) {
        var result;
        if ( typeof sel === 'string' ) {
            result = document.querySelectorAll(sel);
            if ( result.length === 0 ) {
                result = undefined;
            } else {
                result = result[0];
            }
        };
        return result;
    }
    var firstLi = createSelect('li'),
        li = createSelect('li.two'),
        wrap = createSelect('wrap');
    console.log(firstLi);
    console.log(li);
    console.log(wrap);
//2  Создать функцию аналог функции DOM insertBefore, но вставляет не до, а после указанного элемента.
    Node.prototype.insertAfter = function(newElem, referenceElem) {
        this.insertBefore(newElem, referenceElem.nextSibling);
    };
    var div1 = document.querySelector("#div1"),
        parentDiv = div1.parentNode,
        div2 = document.createElement('div');
    div2.textContent = "Lorem ipsum dolor sit amet.";
    parentDiv.insertAfter(div2, div1);

// 3. Создать функцию, которая выдает значение атрибута или ставит его значение.
//     Чтение.
//     Что имеется в виду - Допустим есть элемент:
//     <titanic style="float:none"></titanic>
//     Если передать в функцию 'style' - она должна выдать "float:none"
// <ninja color="black" visibility="hidden"></ninja>
//     Если передать в функцию 'color' - она должна выдать "black"
// Установка.
//     Что имеется в виду - Допустим есть элемент:
//     <lego></lego>
// Если передать в функцию два параметра - атрибут и значение, то нода должна выглядеть
//
// <lego style="display:block"></lego>
//     Если значение этого атрибута уже задано, устанавливается новое значение.
//     Было:
// <chucknorris speed="5"></chucknorris>
//     После вызова функции с передачей атрибута и значения (speed Infinity):
// <chucknorris speed="Infinity"></chucknorris>
    Element.prototype.manageAttribute = function(attr, attrValue) {
        if ( attrValue === undefined ) {
            if ( this.hasAttribute(attr) ) {
                return this.getAttribute(attr);
            } else {
                throw new Error("there is no " + attr + " attribute");
            };
        } else {
            this.setAttribute(attr, attrValue);
        };
    };
    var p1 = document.querySelector('#p');
    console.log(p1.manageAttribute("class"));
    p1.manageAttribute("style", "background-color: blue");
// 4. С помощью JS создайте шахматное поле:
//  - контейнер поля
// - 64 ребёнка (ячейки) элементы (проще позиционировать с помощью float)
// - ячейки раскрашены белым и черным
// - нужные атрибуты и стили задавайте с помощью JS

    var ul = document.createElement('ul');

    ul.style.setProperty('border-color','#000');
    ul.style.setProperty('border','1px solid');
    ul.style.setProperty('width','376px');
    ul.style.setProperty('height','376px');
    ul.style.setProperty('list-style','none');
    ul.style.setProperty('padding-left','0px');
    document.body.appendChild(ul);

    var fragment = document.createDocumentFragment();
    var newRow = true;

    for (var i = 0; i < 64; i++) {

        var list = document.createElement('li');
        list.style.setProperty('width','45px');
        list.style.setProperty('height','45px');
        list.style.setProperty('border','1px solid');
        list.style.setProperty('float','left');


        if(i%8 == 0) {
            newRow = !newRow
        }
        if ((i % 2)- newRow == 0) {
            list.style.setProperty('background-color', '#fff');
        }else {
            list.style.setProperty('background-color', '#000');
        };

        fragment.appendChild(list);
    };

    ul.appendChild(fragment);
