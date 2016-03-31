for (var i = 1; i < 13; i++) {
  $.get("http://pokeapi.co/api/v2/pokemon/" +i, function (data){
    $("#pokemon-" + (data.id)).html(data.name);
    for (var y = 0; y < data.types.length;  y++) {
      data.types[y].type.name
      prefContent = $("#ability-" + (data.id)).html()
      typeContent = prefContent + "<div class=\""+ data.types[y].type.name +" type\">"+ data.types[y].type.name +"</div>"
      $("#ability-" + (data.id)).html(typeContent);
    }
  });
};
//div appearance
$(function(){
  $("#formfield").click(function(){
    div = document.createElement('div');
    $(div).addClass("profile").html();
    $("#character").append(div);
    $("#character").css('display','block');
  });
});
