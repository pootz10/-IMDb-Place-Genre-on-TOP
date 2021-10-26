// ==UserScript==
// @name        [IMDb] Place Genre on TOP
// @namespace   pootz10
// @description Place Genres above, between title and rating, v1.1 add movie release date too
// @include     http*://www.imdb.com/title/*
// @exclude     https://www.imdb.com/title/*/reference
// @version     v1.3
// @history     v1.3 - add MetaScore rating (when exists) left side of imdb rate
// @history     v1.2 - fixed issue where the script fails while opening multiple imdb's links at the same time
// @history     v1.1 - add movie release date too
// @history     v1.0 - first code
// @license     GNU
// @require     http://code.jquery.com/jquery-2.1.4.min.js
// @updateURL   https://github.com/pootz10/IMDb-Place-Genre-on-TOP/raw/main/IMDb_Place_Genre_on_TOP.user.js
// @downloadURL https://github.com/pootz10/IMDb-Place-Genre-on-TOP/raw/main/IMDb_Place_Genre_on_TOP.user.js
// @grant       GM_addStyle
// ==/UserScript==

const changeHeader = async() => {

    var date = await $('div[data-testid="title-details-section"] div.ipc-metadata-list-item__content-container:first > ul > li > a');
    date.addClass("ipc-link ipc-link--baseAlt ipc-link--inherit-color");
    date.css("::before");

    var genre = await $('li[data-testid="storyline-genres"]').text();
    genre = genre.replaceAll(/(Genres?)/gm, '<b>Genre: <font color="aqua">');
    genre = genre.replaceAll(/((?<!\-)[A-Z])/gm, " $1");
    genre = genre + "</b></font>";

    var beforeCastCrew = await $('ul.ipc-inline-list:eq(1) > li.ipc-inline-list__item[role="presentation"]:eq(0)');
    beforeCastCrew.prepend(genre).prepend(afterGenre).prepend(date);

    var afterGenre = await $('ul.ipc-inline-list:eq(1) > li.ipc-inline-list__item[role="presentation"]:eq(0) > a');
    afterGenre.prop("id", "genre");
    afterGenre.css("::before");
    beforeCastCrew.append(afterGenre);

    var metascore = await $('li.ipc-inline-list__item > a.ipc-link > span.three-Elements > span.score > span.score-meta').clone();

    var beforeIMDbrate = await $('div.RatingBar__RatingContainer-sc-85l9wd-0 > div.RatingBar__ButtonContainer-sc-85l9wd-1:first > div:first > a:first');
    beforeIMDbrate.prepend(metascore);

};

changeHeader();

GM_addStyle (`
    #genre::before {
                display: inline-block;
                margin: 0 .5rem .2rem;
                content: '';
                font-size: 1rem;
                line-height: .5rem;
                padding: 1px;
                border-radius: 50%;
                vertical-align: middle;
                background-color: currentColor;
    }
` );
