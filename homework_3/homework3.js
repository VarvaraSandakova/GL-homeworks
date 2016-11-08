// Task 1
    var object1 = {
        name: 'one',
        number: 5
    };
    var object2 = new Object({
        name: 'two',
        number: 7
    });

    function compareObjects(object1,object2, property) {

        if (object1[property] > object2[property]){
            console.log(object1.name);
        } else {
            console.log(object2.name);
        }
    }
    compareObjects(object1, object2, 'number');

//Task 2

    var collectionOfSongs = [
    {
        name: 'first',
        played: Math.floor(Math.random( ) * 100)

    },
    {
        name: 'second',
        played: Math.floor(Math.random( ) * 100)

    },
    {
        name: 'third',
        played: Math.floor(Math.random( ) * 100)

    },
    {
        name: 'forth',
        played: Math.floor(Math.random( ) * 100)

    },
    {
        name: 'fifth',
        played: Math.floor(Math.random( ) * 100)

    }
    ];

    function favoriteSong (collectionOfSongs){
         var max = collectionOfSongs[0].played;
         var indexMax = 0;
         var winnerSong = {};

        collectionOfSongs.forEach(function (song, index) {
           if(song.played >= max) {
                max = song.played;
               indexMax = index;
           }
    });

         for (var key in collectionOfSongs[indexMax]) {
            winnerSong[key] = collectionOfSongs[indexMax][key];
         }
         winnerSong.index = indexMax;

         return winnerSong;
        }

    favoriteSong(collectionOfSongs);
//Task 3
    function Calculator() {
        this.numbers = [];
    }
    Calculator.prototype.getCurrentSum = function (index) {
        var step;
        var currentSum = 0;

        if(index) {
            step = index
        } else {
            step = this.numbers.length;
        }
        for(var i = 0; i < step; i++) {
            currentSum += this.numbers[i];
        }

        return currentSum;

        };

    Calculator.prototype.add = function (number) {

        var sum;

        this.numbers.push(number);
        var numbersLength = this.numbers.length;
        if(this.numbers.length == 1) {
            sum = this.numbers[numbersLength - 1];
        } else {
            sum = this.numbers[numbersLength - 1] + this.numbers[numbersLength - 2];
        }

       return sum;

    };
    var calc1 = new Calculator();
    var calc2 = new Calculator();
    calc1.add(3);
    calc1.add(8);
    calc1.add(11);
    calc2.add(5);
    calc2.add(12);
    calc2.add(17);

    console.log(calc1.getCurrentSum() + calc2.getCurrentSum());
    console.log(calc1.getCurrentSum(2) + calc2.getCurrentSum(2));
    console.log(calc1.getCurrentSum(3));
    console.log(calc1.getCurrentSum());
