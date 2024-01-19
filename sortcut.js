function sortinput(e) {
  let Inputvalue = e.target.value;
  let boxs = document.querySelectorAll(".sortcut .boxs .box")

  for (const divData of boxs) {
    let value2 = divData.getElementsByTagName("span")[0].innerHTML
    let value = divData.getElementsByTagName("span")[1].innerHTML


    if (value.toLowerCase().includes(Inputvalue.toLowerCase()) || value2.toLowerCase().includes(Inputvalue.toLowerCase())) {
      divData.style.animation = "reverse-sort-search-animation 0.3s ease-in-out"
      divData.style.display = "flex"
    } else {
      divData.style.animation = "sort-search-animation 0.3s ease-in-out"
      setTimeout(() => {
        divData.style.display = "none"
      }, 200)
    }
  }
}

document.addEventListener('keyup', function (e) {
  if (e.ctrlKey && e.key === 'y') {
    let sortcut_document = document.querySelector(".sortcut")
    if (sortcut_document == null) {
      document.getElementById("sortcut").innerHTML = `
      <div class="sortcut">
    <div class="input">
      <div class="search"><img src="images/icon/search.png" alt=""></div>
      <input type="text" placeholder="Search or run commands">
      <div class="sortcut-key">
        <span>ctrl</span>
        <span>y</span>
      </div>
    </div>

    <div class="boxs">
      <div class="box" id="song_detail">
        <span class="highlight">Song Detail</span>
        <span>Get currently playing song</span>
      </div>

      <div class="box" id="search_songs">
        <span class="highlight">Search Song</span>
        <span>Search songs that is downloaded</span>
      </div>

      <div class="box" id="generate_icon">
        <span class="highlight">Add Website</span>
        <span>Add a website link to generate new app icon</span>
      </div>


    </div>
  </div>
      `
      document.querySelector(".sortcut .input input").addEventListener("input", sortinput);

      // box click event
      document.getElementById("song_detail").addEventListener("click", getCurrentlyPlayingsong)
      document.getElementById("search_songs").addEventListener("click", searchsongs)
      document.getElementById("generate_icon").addEventListener("click", () => {
        document.getElementById("sortcut").innerHTML = ``
        showaddUI()
      })

      document.getElementsByClassName("container")[0].addEventListener("click", () => {
        document.getElementById("sortcut").innerHTML = ``
      })

    } else document.getElementById("sortcut").innerHTML = ``

  }
}, false);

function getCurrentlyPlayingsong() {
  document.querySelector(".sortcut .boxs").innerHTML = `
      <div class="songisnfo">
        <div class="imags">
            <img src="${document.querySelector(".container .left .music_player .image img").src}" alt="" />
        </div>
        <div class="songis-info">
            <div class="songnamee">Name : <span>${document.querySelector(".container .left .music_player .info .title").innerHTML}</span></div>
            <div class="actornamee">Actor Name : <span>${document.querySelector(".container .left .music_player .info .createrName").innerHTML}</span></div>
        </div>
      </div>
  `
  document.getElementsByClassName("container")[0].addEventListener("click", () => {
    document.getElementById("sortcut").innerHTML = ``
  })
}




function searchsongs() {
  document.querySelector(".sortcut .input input").placeholder = "Search Songs";
  document.querySelector(".sortcut .boxs").innerHTML = '';

  fetch('music/music.json')
    .then((response) => response.json())
    .then((json) => {
      for (let index = 0; index < json.length; index++) {
        const data = json[index];
        const box = document.createElement('div');
        box.classList.add('box', `musicsong${index}`);
        box.innerHTML = `
          <span class="highlight">${data.actorName}</span>
          <span>${data.name}</span>
        `;
        box.addEventListener("click", (i) => {
          localStorage.setItem('previousTrack', JSON.stringify(index));
          document.querySelector(".music_right .info .title").innerHTML = data.name;
          document.querySelector(".music_right .info .createrName").innerHTML = data.actorName;
          document.querySelector(".music_player .image img").src = `music/img/${data.image}`;
          document.querySelector("audio").src = `music/${data.song}`;
          document.querySelector(".musicrightclick h3 span").innerHTML = data.name;
          document.querySelectorAll(".musicrightclick h3 span")[1].innerHTML = data.actorName;
        });
        document.querySelector(".sortcut .boxs").appendChild(box);
      }
    });
}