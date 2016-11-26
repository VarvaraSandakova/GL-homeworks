$(function() {
    var name = $('.name'),
        height = $('.height'),
        mass = $('.mass'),
        hairColor = $('.hair-color'),
        skinColor = $('.skin-color'),
        eyeColor = $('.eye-color'),
        birthYear = $('.birth-year'),
        gender = $('.gender'),
        numberOfHero = 1,
        mainInformationBlock = $('.main-information'),
        filmsBlock = $('.films'),
        loaderBlock = $('.loader');

    function prevHero() {
        numberOfHero--;
        if(numberOfHero < 1) {
            numberOfHero = 88
        }
        getHero(numberOfHero);
    }
    function nextHero() {
        numberOfHero++;
        if(numberOfHero > 88) {
            numberOfHero = 1;
        }
        getHero(numberOfHero);
    }

    /**
     * Initialization of application
     */
    function initialize() {
        $(window).on('keydown', keydownHandler);
        $('.prev-hero').on('click', prevHero);
        $('.next-hero').on('click', nextHero);

        getHero(numberOfHero);
    }

    /**
     *
     * @param id {Number} - id of hero
     * @param obj{Object} - object with hero's or film's information
     * @param isFilms{Boolean} - define is argument object of films or not
     *
     * function save data to localStorage
     */
    function saveData(id, obj, isFilms) {
        obj = JSON.stringify(obj);

        if(isFilms) {
            localStorage.setItem('films_' + id, obj);
        } else {
            localStorage.setItem('hero_' + id, obj);
        }
    }

    function keydownHandler(e) {
        switch (e.keyCode) {
            case 37:
                prevHero();
                break;
            case 39:
                nextHero();
                break;
        }
    }

    /**
     *
     * @param response{Object} - object with information about hero
     *
     * function draws main information about hero based on ajax response
     */
    function drawMainInformation(response) {
        name.html(response.name);
        height.html(response.height);
        mass.html(response.mass);
        hairColor.html(response.hair_color);
        skinColor.html(response.skin_color);
        eyeColor.html(response.eye_color);
        birthYear.html(response.birth_year);
        gender.html(response.gender);

    }

    /**
     * @param films{Array} - all films of some id
     *
     * function draws information about film
     */
    function drawFilmsInformation(films) {
        var filmsElement = $('.films');
        filmsElement.empty();

        films.forEach(function(film) {
            filmsElement.append('<p class="film">' + film.name + '</p>');
        })
    }

    /**
     * @param url (url) - url of film
     *
     * function get information about film based on ajax response
     * return id and title of films
     */
    function getFilm(url) {
        return fetch(
            url,
            {
                method: "GET"
            }
        ).then(function(response){
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.indexOf("application/json") !== -1) {
                return response.json();
            }	else {
                console.log("not JSON!");
            }
        }).then(function(filmObj) {
            return {
                name: "Episode " + filmObj.episode_id + ": " + filmObj.title,
            };
        })
        .catch(function (e) {
            $('.main-content').empty().append('<h1>Sorry, films can not be loaded. Please try again later</h1>');
        });
    }

    /**
     *
     * @param id{Number} - id of Hero
     *
     * function draws information about hero based on ajax response or saved data in localStorage
     */
    function getHero(id) {
        if(!localStorage.getItem('films_' + id) && !localStorage.getItem('hero_' + id)) {
            mainInformationBlock.addClass('hidden');
            filmsBlock.addClass('hidden');
            loaderBlock.removeClass('hidden');

            return fetch('https://swapi.co/api/people/' + id + '/', {
                method: 'GET'
            })
                .then(function(response) {
                    return response.json();
                })
                .then(function(heroResponse){
                    drawMainInformation(heroResponse);
                    saveData(id, heroResponse, false);

                    return heroResponse.films
                })
                .then(function(films) {
                    var allFilms = films.map(film => getFilm(film));
                    return Promise.all(allFilms);
                })
                .then(function(filmsObj) {
                    drawFilmsInformation(filmsObj);
                    saveData(id, filmsObj, true);

                    mainInformationBlock.removeClass('hidden');
                    filmsBlock.removeClass('hidden');
                    loaderBlock.addClass('hidden');
                })
                .catch(function(e) {
                    $('.main-content').empty().append('<h1>Sorry, something went wrong. Please try again later</h1>');
                });
        } else {
            drawMainInformation(JSON.parse(localStorage.getItem('hero_' + id)));
            drawFilmsInformation(JSON.parse(localStorage.getItem('films_' + id)));
        }
    }

    //Initialization of application
    initialize();
});


