$("#container").fadeIn();
TweenMax.from("#container", 0.4, { scale: 0, ease: Sine.easeInOut });
TweenMax.to("#container", 0.4, { scale: 1, ease: Sine.easeInOut });

$("#close-btn").click(function () {
  TweenMax.from("#container", 0.4, { scale: 1, ease: Sine.easeInOut });
  TweenMax.to("#container", 0.4, {
    left: "0px",
    scale: 0,
    ease: Sine.easeInOut,
  });
});

/* Forgotten Password */
$("#forgotten").click(function () {
  $("#container").fadeOut(function () {
    $("#forgotten-container").fadeIn();
  });
});
