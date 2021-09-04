// ==UserScript==
// @name        [IMDb] Place Genre on TOP
// @namespace   pootz10
// @description Place Genres above, between title and rating
// @include     http*://www.imdb.com/title/*
// @exclude     https://www.imdb.com/title/*/reference
// @version     v1.0
// @history     v1.0 - first code
// @license     GNU
// @require     http://code.jquery.com/jquery-2.1.4.min.js
// @updateURL   https://github.com/pootz10/IMDb-Place-Genre-on-TOP/raw/main/IMDb_Place_Genre_on_TOP.user.js
// @downloadURL https://github.com/pootz10/IMDb-Place-Genre-on-TOP/raw/main/IMDb_Place_Genre_on_TOP.user.js
// @grant       GM_addStyle
// ==/UserScript==

var genre = $('li[data-testid="storyline-genres"]').text();
genre = genre.replaceAll(/(Genres?)/gm, '<b>Genre: <font color="aqua">');
genre = genre.replaceAll(/((?<!\-)[A-Z])/gm, " $1");
genre = genre + "</b></font>";

var beforeCastCrew = $('ul.ipc-inline-list:eq(1) > li.ipc-inline-list__item[role="presentation"]:eq(0)');
beforeCastCrew.prepend(genre);

var afterGenre = $('ul.ipc-inline-list:eq(1) > li.ipc-inline-list__item[role="presentation"]:eq(0) > a');
afterGenre.prop("id", "genre");
afterGenre.css("::before");
beforeCastCrew.append(afterGenre);

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
