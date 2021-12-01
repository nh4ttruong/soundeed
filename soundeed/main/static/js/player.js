var countActive = 0;
var isAvtive = false;
var list_sound = new Array();
var namePlaylist = "Chill & Sound";
var controlSound = document.getElementsByClassName("controlSound");
var controlPanel = document.getElementById("control-panel");
var infoBar = document.getElementById("info");
var currentSID;
var quotes = new Array();

function playStop(id) {
  let x = id.id;
  let icon = x + "Icon";
  currentSID = id;
  if (document.getElementById(x).paused) {
    document.getElementById(x).play();
    document.getElementById(icon).style.color = "#ffd73d";

    countActive++;
    if (countActive == 1) {
      controlPanel.classList.add("active");
    }

    list_sound.push(x);
  } else {
    document.getElementById(x).pause();
    document.getElementById(icon).style.color = "#ffffff";

    if (countActive == 1) {
      controlPanel.classList.remove("active");
      if (infoBar.classList.contains("active")) {
        infoBar.classList.remove("active");
      }
      supportPause(controlSound);
    }
    countActive--;

    let index = list_sound.indexOf(x);
    list_sound.splice(index, 1);
  }
}

function setVolume(id, value) {
  let x = id.id;
  let slider_x = x + "Slider";
  var slider = document.getElementById(slider_x).value;
  document.getElementById(x).volume = parseInt(slider) / 100;
}

function retPlayList() {
  let temp_Playlist = "";
  for (let i = 0; i < list_sound.length; i++) {
    if (i == 0) temp_Playlist = list_sound[i];
    else temp_Playlist = temp_Playlist + "_" + list_sound[i];
  }
  var idPlayList = document.getElementById("playlist_here");
  idPlayList.value = temp_Playlist;
}

function handlePl(input_playlist, id, title) {
  var iconCL = document.getElementById("control" + id);
  namePlaylist = title;
  currentSID = id;

  if (iconCL.classList.contains("fa-play")) {
    supportPause(controlSound);
    iconCL.classList.remove("fa-play");
    iconCL.classList.add("fa-pause");
    pauseSounds(list_sound, true);
    list_sound = input_playlist.split("_");
    runSounds(list_sound, true);
    countActive = list_sound.length;
  } else {
    iconCL.classList.remove("fa-pause");
    iconCL.classList.add("fa-play");
    pauseSounds(list_sound, true);
    list_sound = new Array();
  }
}

function runSounds(pl, additional) {
  for (let x of pl) {
    document.getElementById(x).play();
    document.getElementById(x).volume = 0.4;
    document.getElementById(x + "Icon").style.color = "#ffd73d";
  }
  if (additional) {
    document.getElementById("playlistTitle").textContent = namePlaylist;
    controlPanel.classList.add("active");
    infoBar.classList.add("active");
  }
}

function pauseSounds(pl, additional) {
  for (let x of pl) {
    document.getElementById(x).pause();
    document.getElementById(x).currentTime = 0;
    document.getElementById(x + "Icon").style.color = "#ffffff";
  }
  if (additional) {
    controlPanel.classList.remove("active");
    infoBar.classList.remove("active");
  }
}

function supportPause(control) {
  for (let val of control) {
    val.classList.remove("fa-pause");
    val.classList.add("fa-play");
  }
}

function playSound() {
  if (!controlPanel.classList.contains("active")) {
    runSounds(list_sound, true);
    controlPanel.classList.add("active");
    infoBar.classList.add("active");
    if (controlSound.length != 0 && currentSID != null) {
      document.getElementById('control'+currentSID).classList.add("fa-pause");
      document.getElementById('control'+currentSID).classList.remove("fa-play");
    }
  } else {
    for (let x of list_sound) {
      document.getElementById(x).pause();
      document.getElementById(x + "Icon").style.color = "#ffffff";
    }
    controlPanel.classList.remove("active");
    infoBar.classList.remove("active");

    if (controlSound.length != 0 && currentSID != null) {
      document.getElementById('control'+currentSID).classList.remove("fa-pause");
      document.getElementById('control'+currentSID).classList.add("fa-play");
    }
  }
}

// quotes = ['Change the world by being yourself', 'Every moment is a fresh beginning']

function randomMix() {
  var allSound = document.getElementsByClassName("sounds");
  var randomList = new Array();

  var countSound = document.getElementsByClassName("sounds").length;
  var listIntID = uniqueList(3, countSound);
  countActive = 3;

  pauseSounds(list_sound, true);
  list_sound = new Array();

  for (let x of allSound) {
    randomList.push(x.id);
  }
  
  for (let y of listIntID) {
    list_sound.push(randomList[y]);
  }
  namePlaylist = "Random Sounds";
  runSounds(list_sound, true);
}

function uniqueList(quantity, max){
  const set = new Set()
  while(set.size < quantity) {
    set.add(Math.floor(Math.random() * max))
  }
  return Array.from(set);
}