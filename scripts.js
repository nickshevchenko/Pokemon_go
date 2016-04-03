profileContentStart = '<div class="picture-profile"><img src="';
profileName = '"></div><div class="pokemon-name-profile">';
profileCharsFirst = '</div><div class="characteristics"><div class="col-1-1">';
profileCharsSecond = '</div><div class="col-1-2">';
profileCharsEnd = '</div></div>';
// selecting stats from stats massive
var currentInfo = {};
var statsInfo = function(si){
  return '<div>' + si + '</div>'
};
var parseData = function(ps){
  currentInfo.weight = ps.weight
  types = []
  for(var t = 0; t < ps.types.length; t++){
    types[t] = ps.types[t].type.name
  };
  currentInfo.types = types
  currentInfo.totalMoves = ps.moves.length
  for(var t = 0; t < ps.stats.length; t++){
    currentInfo[ps.stats[t].stat.name] = ps.stats[t].base_stat
  };
};
// placing all required info in "hidden-info" div and selecting types for main pokemon windows
for(var i = 1; i < 13; i++) {
  $.get("http://pokeapi.co/api/v2/pokemon/" +i, function (data){
    parseData(data);
    combineFieldsNames =
      statsInfo('Type') +
      statsInfo('Attack') +
      statsInfo('Defense') +
      statsInfo('HP') +
      statsInfo('SP Attack') +
      statsInfo('SP Defense') +
      statsInfo('Speed') +
      statsInfo('Weight') +
      statsInfo('Total Moves');
    combineTypesNames =
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
    $("#pokemon-" + (data.id)).append('<input type="hidden" value="'+ data.id +'">');	
    for(var y = 0; y < data.types.length; y++) {
      data.types[y].type.name
      prefContent = $("#ability-" + (data.id)).html()
      typeContent = prefContent + "<div class=\""+ data.types[y].type.name +" type\">"+ data.types[y].type.name +"</div>"
      $("#ability-" + (data.id)).html(typeContent);
    };
});
};
// click on pokemon info to open a separate window with all required info
$(function(){
  var previous = "none";
  $(".form").click(function(e){
  	current = $(e.target).parents(".form").children(".pokemon-name").children("input").val();
  	$("#character").html($(e.target).parents(".form").children(".hidden-info").html());
      if(previous == current){
        $("#character").css('display','none');
        previous = "none";
      }
      else{
        $("#character").css('display','block');
        previous = current;
      }
  });
});
// click on Load more
// $('.button').click(function(){
//   var count = $('.form').length;
//   for (var l = count; l < (count+3); l++){
//     $
//   }
// }
