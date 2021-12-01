let isSound = false,
  isPodomoro = false,
  isPlaylist = false,
  isBg = false,
  isWelcome = true,
  isSetPlaylist = false,
  isConPlaylist = true,
  isShowAbout = false;

var podomoro = document.getElementById("podomoro");
var welcome = document.getElementById("welcome-text");
var elements = document.getElementById("elements");
var playlist = document.getElementById("playlist");
var background = document.getElementById("background");
var conRow = document.getElementById("con-row");
var setPlayList = document.getElementById("setPlaylist");
var btn = document.getElementById("btnSetPlaylist");
var playlistCon = document.getElementById("playlist-container");
var about = document.getElementById("about-con");

function removeElement(id, bool) {
  if (bool && id != null) {
    if (id == welcome) {
      id.classList.remove("d-flex");
    } else if (id.classList.contains("d-block")) {
      id.classList.remove("d-block");
    }
    id.classList.add("d-none");
  }
  bool = false;
}

function addElement(id, bool) {
  if (id != null) {
    id.classList.remove("d-none");
    if (id == welcome) {
      id.classList.add("d-flex");
    } else {
      id.classList.add("d-block");
    }
  }
}

function showSound() {
  removeElement(welcome, isWelcome);
  isWelcome = false;
  removeElement(podomoro, isPodomoro);
  isPodomoro = false;
  removeElement(playlist, isPlaylist);
  isPlaylist = false;
  removeElement(background, isBg);
  isBg = false;
  removeElement(about, isShowAbout);
  isShowAbout = false;
  if (!isSound) {
    addElement(elements, isSound);
    isSound = true;
  } else {
    removeElement(elements, isSound);
    isSound = false;
    addElement(welcome, isWelcome);
    isWelcome = true;
  }
}

function showPodomoro() {
  removeElement(welcome, isWelcome);
  isWelcome = false;
  removeElement(elements, isSound);
  isSound = false;
  removeElement(playlist, isPlaylist);
  isPlaylist = false;
  removeElement(background, isBg);
  isBg = false;
  removeElement(about, isShowAbout);
  isShowAbout = false;
  if (!isPodomoro) {
    addElement(podomoro, isPodomoro);
    isPodomoro = true;
  } else {
    removeElement(podomoro, isPodomoro);
    isPodomoro = false;
    addElement(welcome, isWelcome);
    isWelcome = true;
  }
}

function showPlaylist() {
  if (document.getElementsByClassName("nameList")) {
    removeElement(welcome, isWelcome);
    isWelcome = false;
    removeElement(elements, isSound);
    isSound = false;
    removeElement(podomoro, isPodomoro);
    isPodomoro = false;
    removeElement(background, isBg);
    isBg = false;
    removeElement(about, isShowAbout);
    isShowAbout = false;
    if (!isPlaylist) {
      addElement(playlist, isPlaylist);
      isPlaylist = true;

      if (!isConPlaylist) {
        addElement(playlistCon, isConPlaylist);
        isConPlaylist = true;
        removeElement(setPlayList, isSetPlaylist);
        isSetPlaylist = false;
      }
    } else {
      if (isSetPlaylist) {
        addElement(playlistCon, isConPlaylist);
        isConPlaylist = true;
        removeElement(setPlayList, isSetPlaylist);
        isSetPlaylist = false;
      } else {
        removeElement(playlist, isPlaylist);
        isPlaylist = false;
        addElement(welcome, isWelcome);
        isWelcome = true;
      }
    }
  }
}

function showBackground() {
  removeElement(welcome, isWelcome);
  isWelcome = false;
  removeElement(elements, isSound);
  isSound = false;
  removeElement(podomoro, isPodomoro);
  isPodomoro = false;
  removeElement(playlist, isPlaylist);
  isPlaylist = false;
  removeElement(about, isShowAbout);
  isShowAbout = false;
  if (!isBg) {
    addElement(background, isBg);
    isBg = true;
  } else {
    removeElement(background, isBg);
    isBg = false;
    addElement(welcome, isWelcome);
    isWelcome = true;
  }
}

function showSetPlaylist(id, bool) {
  removeElement(welcome, isWelcome);
  isWelcome = false;
  removeElement(elements, isSound);
  isSound = false;
  removeElement(podomoro, isPodomoro);
  isPodomoro = false;
  removeElement(background, isBg);
  isBg = false;
  removeElement(playlistCon, isConPlaylist);
  isConPlaylist = false;
  removeElement(about, isShowAbout);
  isShowAbout = false;
  if (!isSetPlaylist) {
    addElement(setPlayList, isSetPlaylist);
    isPlaylist = true;
  } else {
    removeElement(setPlayList, isSetPlaylist);
    isPlaylist = false;

    addElement(playlist, isPlaylist);
    isPlaylist = true;
  }
}

function showAbout() {
  removeElement(welcome, isWelcome);
  isWelcome = false;
  removeElement(elements, isSound);
  isSound = false;
  removeElement(podomoro, isPodomoro);
  isPodomoro = false;
  removeElement(background, isBg);
  isBg = false;
  removeElement(playlistCon, isConPlaylist);
  isConPlaylist = false;
  removeElement(setPlayList, isSetPlaylist);
  isSetPlaylist = false;

  if (!isShowAbout) {
    addElement(about, isShowAbout);
    isShowAbout = true;
  } else {
    removeElement(about, isShowAbout);
    isShowAbout = false;

    addElement(welcome, isWelcome);
    isWelcome = true;
  }
}

function changeBackground() {
  var ele = document.getElementsByName("background");
  var id = "";
  var bool = false;
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      id = "img" + ele[i].id.substr(2);
      bool = true;
      break;
    }
  }
  //check null tick
  if (bool) {
    var source = "/media/" + document.getElementById(id).alt;
    if (source.includes(".jpg") || source.includes(".png")) {
      document.getElementById("static").src = source;
      document.getElementById("static").classList.remove("d-none");
      document.getElementById("dynamic").classList.add("d-none");
    } else if (source.includes(".mp4") || source.includes(".mov")) {
      document.getElementById("dynamic").src = source;
      document.getElementById("dynamic").classList.remove("d-none");
      document.getElementById("static").classList.add("d-none");
    }
  }
}

function setPlaylist() {
  //resize box
  showPlaylist();
  isPlaylist = true;
  showSetPlaylist(setPlayList, isSetPlaylist);
  isSetPlaylist = true;
}

function cancel() {
  removeElement(setPlayList, isSetPlaylist);
  isSetPlaylist = false;
  removeElement(playlist, isPlaylist);
  isPlaylist = false;
  addElement(elements, isSound);
  isSound = true;
}

//Return input radio rotate
$('input[type=radio]').click(function(){
  if (this.previous) {
      this.checked = false;
  }
  this.previous = this.checked;
})