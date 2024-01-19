function showaddUI() {
  const addIcon = document.getElementById("addicon");

  if (addIcon.querySelector(".addicon") === null) {
    addIcon.innerHTML = `
      <div class="addicon">
        <div class="nav">
          <h2>Add Site</h2>
          <div class="closeicon">
            <img src="images/icon/cross.png" alt="">
          </div>
        </div>
        <div class="input">
          <p>Website Url</p>
          <input type="text" placeholder="Website Address">
        </div>
        <div class="buttons">
          <div class="button_cancel">
            <button>cancel</button>
          </div>
          <div class="button_save">
            <button>save</button>
          </div>
        </div>
      </div>
    `;

    document.querySelector(".button_cancel button").addEventListener("click", showaddUI);
    document.querySelector(".addicon .nav .closeicon").addEventListener("click", showaddUI);
    document.querySelector(".buttons .button_save button").addEventListener("click", addSite);

  } else {
    const addIconElem = addIcon.querySelector(".addicon");
    addIconElem.style.animation = "remove-popup-animation 1.1s ease-in-out";
    setTimeout(() => {
      addIcon.innerHTML = ""
      addIconElem.querySelector(".input input").value = "";
    }, 900);
  }
}

// function showaddUI() {
//   if (document.getElementsByClassName("addicon")[0].style.display === "none") {
//     document.getElementsByClassName("addicon")[0].style.display = "grid"
//     document.getElementsByClassName("addicon")[0].style.animation = ""
//     return
//   }
//   document.getElementsByClassName("addicon")[0].style.animation = "remove-popup-animation 1.1s ease-in-out"
//   setTimeout(() => {
//     document.getElementsByClassName("addicon")[0].style.display = "none"
//     document.querySelector(".addicon .input input").value = ""
//   }, 900)
// }

function addSite() {
  let urlRegex = /(?:(?:https?|ftp):\/\/)?(?:[\w-]+\.)+[\w-]+(?:\.\w+)+(?:\/[\w-./?%&=]*)?/gi;
  let input = document.querySelector(".addicon .input input").value
  let foundUrls = input.match(urlRegex);

  if (foundUrls) {
    addwebsite(input);
    showaddUI()
  } else {
    console.log('No URLs found.');
  }
}

let iconjson = {
  url: "",
  icon: ""
}

function addwebsite(URLs) {
  let websiteURL = { ...iconjson }
  let currentApps = localStorage.getItem("apps");
  let appsArray = currentApps ? JSON.parse(currentApps) : [];

  websiteURL.url = URLs
  websiteURL.icon = getBase64Image(`https://www.google.com/s2/favicons?domain=${websiteURL.url}&sz=180`)

  document.getElementsByClassName("icon")[0].outerHTML += `
      <div class="icon addedicon">
        <a href="${websiteURL.url}">
          <img src="${websiteURL.icon}" alt="">
        </a>
      </div>`

  console.log(websiteURL)
  appsArray.push(websiteURL);
  console.log(appsArray)
  localStorage.setItem("apps", JSON.stringify(appsArray));
  appsIDgetter()
}

function loadwebsiteicons() {
  let apps = JSON.parse(localStorage.getItem("apps")) || [];
  for (const websiteURL of apps) {
    document.getElementsByClassName("icon")[0].outerHTML += `
      <div class="icon addedicon">
        <a href="${websiteURL.url}">
          <img src="${websiteURL.icon}" alt="">
        </a>
      </div>`

  }
}

// delete website apps

function deleteApp(params) {
  let apps = JSON.parse(localStorage.getItem("apps"));

  if (params >= 0 && params < apps.length) {
    apps.reverse(); // Reverse the order of apps
    apps.splice(params, 1); // Remove the app at the specified index
    localStorage.setItem("apps", JSON.stringify(apps)); // Update the local storage
    location.reload();
  } else {
    console.log("Invalid index");
  }
}


function appsIDgetter() {
  function deleteApp(params) {
    let apps = JSON.parse(localStorage.getItem("apps"));

    if (params >= 0 && params < apps.length) {
      apps.reverse(); // Reverse the order of apps
      apps.splice(params, 1); // Remove the app at the specified index
      localStorage.setItem("apps", JSON.stringify(apps)); // Update the local storage
      location.reload();
    } else {
      console.log("Invalid index");
    }
  }
  let addedicons = document.querySelectorAll(".right .addedicon") || [];
  for (let index = 0; index < addedicons.length; index++) {
    addedicons[index].addEventListener("contextmenu", (event) => {
      event.preventDefault();

      document.querySelector(".menu").innerHTML = `
      <div class="contextmenu" style="top: ${event.clientY + 10}px;left: ${event.clientX - 162}px;">
        <h3>ID : <span>${index}</span></h3>

        <div class="boxs">
          <div class="box delete"><button>Delete</button></div>
        </div>
      </div>
      `

      document.querySelector(".contextmenu .boxs .delete").addEventListener("click", () => {
        deleteApp(index)
        document.querySelector(".menu").innerHTML = ""
      })

      document.getElementsByClassName("container")[0].addEventListener("click", () => {
        document.querySelector(".menu").innerHTML = ""
      })

    })
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadwebsiteicons();
  appsIDgetter()
  // music
  randommusic()
  music_player()

  document.querySelector(".right .iconupload").addEventListener("click", showaddUI);
});


const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const d = new Date();
let day = weekday[d.getDay()];

document.querySelector(".middle .day").innerHTML = `${day}`;

