var profileContentStart = '<div class="picture-profile"><img src="';
var profileName = '" alt="Pokemon Picture"></div><div class="pokemon-name-profile">';
var profileCharsFirst = '</div><div class="characteristics"><div class="col-1-1">';
var profileCharsSecond = '</div><div class="col-1-2">';
var profileCharsEnd = '</div></div>';
// selecting/parsing stats
var currentInfo = {};
var statsInfo = function (si) {
    'use strict';
    return '<div>' + si + '</div>';
};
var parseData = function (ps) {
    'use strict';
    currentInfo.weight = ps.weight;
    var types = [];
  for (var t = 0; t < ps.types.length; t++) {
      types[t] = ps.types[t].type.name;
    }
    currentInfo.types = types;
    currentInfo.totalMoves = ps.moves.length;
  for (var t = 0; t < ps.stats.length; t++) {
      currentInfo[ps.stats[t].stat.name] = ps.stats[t].base_stat;
    }
};
var getDataAndRender = function (id) {
    'use strict';
    $.get("http://pokeapi.co/api/v2/pokemon/" + id, function (data) {
        parseData(data);
        var combineFieldsNames =
          statsInfo('Type') +
          statsInfo('Attack') +
          statsInfo('Defense') +
          statsInfo('HP') +
          statsInfo('SP Attack') +
          statsInfo('SP Defense') +
          statsInfo('Speed') +
          statsInfo('Weight') +
          statsInfo('Total Moves');
        var combineTypesNames =
          statsInfo(currentInfo.types) +
          statsInfo(currentInfo.attack) +
          statsInfo(currentInfo.defense) +
          statsInfo(currentInfo.hp) +
          statsInfo(currentInfo['special-attack']) +
          statsInfo(currentInfo['special-defense']) +
          statsInfo(currentInfo.speed) +
          statsInfo(currentInfo.weight) +
          statsInfo(currentInfo.totalMoves);
    $("#pokemon-" + (data.id)).html(data.name);
    $("#pokemon-" + (data.id)).siblings(".hidden-info").html(profileContentStart + data.sprites.front_default + profileName
      + data.name + profileCharsFirst + combineFieldsNames + profileCharsSecond + combineTypesNames + profileCharsEnd);
    $("#pokemon-" + (data.id)).append('<input type="hidden" value="' + data.id + '">');
    for (var y = 0; y < data.types.length; y++) {
        data.types[y].type.name;
        var prefContent = $("#ability-" + (data.id)).html();
        var typeContent = prefContent + "<div class=\"" + data.types[y].type.name + " type\">" + data.types[y].type.name + "</div>";
        $("#ability-" + (data.id)).html(typeContent);
      }
    });
};
// click on pokemon info to open a separate window with all required info
for (var i = 1; i < 13; i++) {
    getDataAndRender(i);
  }
$(function () {
    'use strict';
    var previous = "none";
  $(document).on('click', ".form", function (e) {
    var current = $(e.target).parents(".form").children(".pokemon-name").children("input").val();
    $("#character").html($(e.target).parents(".form").children(".hidden-info").html());
        if (previous == current) {
            $("#character").css('display', 'none');
            previous = "none";
        }
         else {
            $("#character").css('display', 'block');
            previous = current;
        }
    });
// click on Load more
    var holderContainer =
    '<div class="holder"><div class="form"><div class="picture"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"></div><div class="pokemon-name" id="pokemon-1"></div><div class="abilities" id="ability-1"></div><div class="hidden-info"></div></div></div>';
  $('.button').click(function (e) {
        e.preventDefault();
    $(".row").last().after('<div class="row"></div>');
        var count = $('.form').length;
    for (var l = count; l < (count + 3); l++) {
        getDataAndRender(l + 1);
        $(".row").last().append(holderContainer.replace(/1/g, (l + 1)));
      }
    });
});
