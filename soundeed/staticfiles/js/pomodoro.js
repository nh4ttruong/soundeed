var runPodo = function () {
  if (podo.phase == 0) {
    //period
    
    $("#periodSS").css({
      'color': "rgba(72, 224, 117, 0.801)",
      'text-shadow': "0 0 20px #eee",
    });

    $("#breakSS").css({
      'color': "#eeeeee",
      'text-shadow': "0 0 20px #eee",
    });

    if (Math.ceil(podo.progress * 60) < podo.period * 60) {
      podo.progress += 1 / 60;
      podo.floatHeight += 194 / 60 / podo.period;
      $(".timer-visible").css("height", Math.ceil(podo.floatHeight) + "px");
      $("#mins").text(Math.floor(podo.period - podo.progress));
      $("#secs").text(Math.floor((podo.period - podo.progress) * 60) % 60);
    } else {
      podo.phase = 1;
      podo.progress = 0;
      podo.floatHeight = 0;
      $(".timer-backboard i").css("color", "rgba(228, 64, 64, 0.788)"); //red
      $(".timer-visible").css("height", "0px");
      $(".timer-visible i").css("color", "#eeeeeec9"); //green
      $(".time-left").css("color", "#eeeeeec9");
      $("#mins").text(podo.break);
      $("#secs").text("0");
    }
  } else {
    //break
    $("#breakSS").css({
      'color': "rgba(228, 64, 64, 0.788)",
      'text-shadow': "0 0 20px #eee",
    });

    $("#periodSS").css({
      'color': "#eeeeee",
      'text-shadow': "0 0 20px #eee",
    });

    if (Math.ceil(podo.progress * 60) < podo.break * 60) {
      podo.progress += 1 / 60;
      podo.floatHeight += 194 / 60 / podo.break;
      console.log(podo.floatHeight);
      $(".timer-visible").css("height", Math.ceil(podo.floatHeight) + "px");
      $("#mins").text(Math.floor(podo.break - podo.progress));
      $("#secs").text(Math.floor((podo.break - podo.progress) * 60) % 60);
    } else {
      podo.phase = 0;
      podo.progress = 0;
      podo.floatHeight = 0;
      $(".timer-backboard i").css("color", "#eeeeeec9"); //grey
      $(".timer-visible").css("height", "0px");
      $(".timer-visible i").css("color", "rgba(72, 224, 117, 0.801)"); //green
      $(".time-left").css("color", "#eeeeeec9");
      $("#mins").text(podo.period);
      $("#secs").text("0");
    }
  }
  //alarm
  if ($("#mins").text() == "0" && $("#secs").text() == "4") {
    const alarm = new Audio("/static/audio/alarm.mp3");
    alarm.play();
  }
};

var resetPodo = function () {
  if (podo.intId) window.clearInterval(podo.intId);
  podo.paused = 1;
  podo.reset = 1;
  podo.period = 1;
  podo.break = 1;
  podo.phase = 0;
  podo.progress = 0;
  podo.intId = 0;
  podo.floatHeight = 0;
  $(".timer-backboard i").css("color", "#eeeeeec9"); //grey
  $(".timer-visible").css("height", "0px");
  $(".timer-visible i").css("color", "rgba(72, 224, 117, 0.801)"); //green
  $(".time-left").css("color", "#eeeeeec9");
  $("#mins").text(podo.period);
  $("#secs").text("0");
  $("#period").text(podo.period);
  $("#break").text(podo.period);
  if ($("#toggle").hasClass("btn-pause")) {
    $("#toggle")
      .removeClass("btn-pause")
      .addClass("btn-noselect")
      .text("Start");
  } else {
    $("#toggle").removeClass("btn-run").addClass("btn-noselect").text("Start");
  }
  $("#breakSS").css({
    color: "#ffffff",
  });
  $("#periodSS").css({
    color: "#ffffff",
  });
};

var podo = {
  period: 1,
  break: 1,
  phase: 0, //0 period, 1 break
  paused: 1,
  progress: 0,
  reset: 1,
  intId: 0,
  floatHeight: 0,
  run: runPodo,
  clearAll: resetPodo,
};

$(document).ready(function () {
  $("#s-down").click(function () {
    if (Number($("#period").text() > 1 && podo.reset)) {
      $("#period").text(Number($("#period").text()) - 1);
      $("#mins").text($("#period").text());
    }
  });

  $("#s-up").click(function () {
    if (Number($("#period").text() < 60 && podo.reset)) {
      $("#period").text(Number($("#period").text()) + 1);
      $("#mins").text($("#period").text());
    }
  });

  $("#b-down").click(function () {
    if (Number($("#break").text() > 1 && podo.reset))
      $("#break").text(Number($("#break").text()) - 1);
  });

  $("#b-up").click(function () {
    if (Number($("#break").text() < 60 && podo.reset))
      $("#break").text(Number($("#break").text()) + 1);
  });

  $("#toggle").click(function () {
    if ($("#toggle").hasClass("btn-noselect")) {
      $("#toggle")
        .removeClass("btn-noselect")
        .addClass("btn-run")
        .text("Starting");
      $(".timer .timer-visible i").css("color", "rgba(72, 224, 117, 0.801)");
    } else if ($("#toggle").hasClass("btn-run")) {
      $("#toggle").removeClass("btn-run").addClass("btn-pause").text("Pause");

      $(".timer .timer-visible i").css("color", "rgba(255, 255, 0, 0.705)");
    } else {
      $("#toggle")
        .removeClass("btn-pause")
        .addClass("btn-run")
        .text("Starting");

      $(".timer .timer-visible i").css("color", "rgba(72, 224, 117, 0.801)");
    }

    if (podo.paused) {
      if (podo.reset) {
        //fresh run
        podo.reset = 0;
        podo.period = Number($("#period").text());
        podo.break = Number($("#break").text());
      }
      podo.intId = window.setInterval(podo.run, 1000);
      podo.paused = 0;
    } else {
      podo.paused = 1;
      window.clearInterval(podo.intId);
    }
  });

  $("#reset").click(function () {
    podo.clearAll();
  });
});
