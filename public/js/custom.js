$(document).ready(function() {
  function BoardTemplate() {
    console.log("loaded")
    for(var i=1;i<=100;i++) {
      if((i <=10)) {
        $("#"+i).addClass('pull-right');
      } else if((i >20) && (i <31)) {
        $("#"+i).addClass('pull-right');
      }else if((i >40) && (i <51)) {
        $("#"+i).addClass('pull-right');
      }else if((i >60) && (i <71)) {
        $("#"+i).addClass('pull-right');
      }else if((i>80) && (i <91)) {
        $("#"+i).addClass('pull-right');
      }
      if(i%2 == 0) {
        $("#"+i).addClass('square-orange');
      } else {
        $("#"+i).addClass('square-red');
      }
    }
  }
});
