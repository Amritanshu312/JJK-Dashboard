function randommusic() {
  fetch('music/music.json')
    .then((response) => response.json())
    .then((json) => {
      let data = JSON.parse(localStorage.getItem('previousTrack'));
      let randomdata = Math.floor(Math.random() * json.length);

      while (data === randomdata && json.length > 1) {
        randomdata = Math.floor(Math.random() * json.length);
      }

      const randomTrack = json[randomdata];
      localStorage.setItem('previousTrack', JSON.stringify(randomdata));

      document.querySelector(".music_right .info .title").innerHTML = randomTrack.name
      document.querySelector(".music_right .info .createrName").innerHTML = randomTrack.actorName
      document.querySelector(".music_player .image img").src = `music/img/${randomTrack.image}`
      document.querySelector("audio").src = `music/${randomTrack.song}`

      document.querySelector(".musicrightclick h3 span").innerHTML = randomTrack.name
      document.querySelectorAll(".musicrightclick h3 span")[1].innerHTML = randomTrack.actorName

    })
    .catch((error) => {
      console.error('Error fetching music:', error);
    });
}


function music_player() {

  let audio = document.querySelector("audio");
  let playButton = document.querySelectorAll(".control img")[1];
  playButton.addEventListener("click", () => {
    if (!audio.paused && !audio.ended) {
      playButton.src = `images/icon/Play.png`;
      document.querySelector(".music_player").style.filter = ""
      audio.pause();
    } else {
      playButton.src = `images/icon/Pause.png`;
      document.querySelector(".music_player").style.filter = "drop-shadow(0px 0px 6px white)"
      audio.play();

    }
  });


  document.querySelectorAll(".control img")[2].addEventListener("click", () => {
    audio.currentTime = audio.currentTime + 3;
  })

  document.querySelectorAll(".control img")[0].addEventListener("click", () => {
    audio.currentTime = audio.currentTime - 3;
  })

  document.querySelector(".image img").addEventListener("contextmenu", (event) => {

    event.preventDefault();
    console.log(event);
    document.getElementsByClassName("musicrightclick")[0].style.display = "block"
    document.getElementsByClassName("musicrightclick")[0].style.top = `${event.clientY - 203}px`
    document.getElementsByClassName("musicrightclick")[0].style.left = `${event.clientX}px`
    document.getElementsByClassName("container")[0].addEventListener("click", () => {
      document.getElementsByClassName("musicrightclick")[0].style.display = "none"
    })


  })
}

function nextmusic() {
  let track = parseInt(localStorage.getItem("previousTrack"));
  let nextTrack = track + 1;

  fetch('music/music.json')
    .then((response) => response.json())
    .then((json) => {
      const totalTracks = json.length;

      if (nextTrack >= totalTracks) {
        nextTrack = 0; // Reset to the first track if reached the end
      }

      const randomTrack = json[nextTrack];
      localStorage.setItem('previousTrack', JSON.stringify(nextTrack));

      document.querySelector(".music_right .info .title").innerHTML = randomTrack.name;
      document.querySelector(".music_right .info .createrName").innerHTML = randomTrack.actorName;
      document.querySelector(".music_player .image img").src = `music/img/${randomTrack.image}`;
      document.querySelector("audio").src = `music/${randomTrack.song}`;

      document.querySelector(".musicrightclick h3 span").innerHTML = randomTrack.name;
      document.querySelectorAll(".musicrightclick h3 span")[1].innerHTML = randomTrack.actorName;
    })
    .catch((error) => {
      console.error('Error fetching music:', error);
    });
}

function prevmusic() {
  let track = parseInt(localStorage.getItem("previousTrack"));
  let prevTrack = track - 1;

  fetch('music/music.json')
    .then((response) => response.json())
    .then((json) => {
      const totalTracks = json.length;

      if (prevTrack < 0) {
        prevTrack = totalTracks - 1; // Set to the last track if going before the first track
      }

      const randomTrack = json[prevTrack];
      localStorage.setItem('previousTrack', JSON.stringify(prevTrack));

      document.querySelector(".music_right .info .title").innerHTML = randomTrack.name;
      document.querySelector(".music_right .info .createrName").innerHTML = randomTrack.actorName;
      document.querySelector(".music_player .image img").src = `music/img/${randomTrack.image}`;
      document.querySelector("audio").src = `music/${randomTrack.song}`;

      document.querySelector(".musicrightclick h3 span").innerHTML = randomTrack.name;
      document.querySelectorAll(".musicrightclick h3 span")[1].innerHTML = randomTrack.actorName;
    })
    .catch((error) => {
      console.error('Error fetching music:', error);
    });
}



document.querySelector(".delete button").addEventListener("click", nextmusic)
document.querySelectorAll(".delete button")[1].addEventListener("click", prevmusic)

