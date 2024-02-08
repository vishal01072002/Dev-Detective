const searchbar = document.querySelector(".search-bar");
const profileContent = document.querySelector(".content-body");

const root = document.documentElement.style;

const get = (className) => {
  return document.querySelector(`.${className}`);
};

const url = "https://api.github.com/users/";

const avtar = get("avtar");
const input = get("input");
const error = get("no-results");
const search = get("search-btn");
const userName = get("user-name");
const userId = get("user-id");
const userDate = get("user-date");
const bio = get("bio");
const repo = get("repo");
const follow = get("follow");
const follower = get("follower");
const locations = get("location");
const page = get("page");
const twiter = get("twiter");
const company = get("company");
const modeTheme = get("theme");
const modeText = get("mode-text");
const modeIcon = get("mode-icon");
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

//initial
let information;
let darkMode = false;
let githubUser = "vishal01072002";
localStorage.setItem("dark-mode",true);
error.style.display="none";
fetchData(githubUser);


async function fetchData(user) {
  try {
  const data = await fetch(`${url}${user}`);
  information = await data.json();
  console.log("1");
  console.log(information);
  updateUI(information)
} catch (e) {
  
  console.log("error aa gaya");
  throw(e);
}
}

// event listners

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && input.value !== "") {
    fetchData(input.value);
  }
});

input.addEventListener('input',()=>{
  error.style.display="none";
})

search.addEventListener("click", () => {
  if (input.value !== "") {
    fetchData(input.value);
  }
});

modeTheme.addEventListener('click',()=>{
  if(darkMode === false){
    darkMode = true;
    modeText.innerText="LIGHT"
    setDarkMode();
  }
  else{
    darkMode = false;
    modeText.innerText="DARK"
    console.log("dark");
    setLightMode();
  }
})

function setDarkMode() {
  root.setProperty("--lm-bg", "#141D2F");
  root.setProperty("--lm-bg-content", "#1E2A47");
  root.setProperty("--lm-text", "white");
  root.setProperty("--lm-text-alt", "white");
  root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
  //modetext.innerText = "LIGHT";
  modeIcon.src = "assets/sun-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(1000%)");
  darkMode = true;
  //localStorage.setItem("dark-mode", true);
}
function setLightMode() {
  root.setProperty("--lm-bg", "#F6F8FF");
  root.setProperty("--lm-bg-content", "#FEFEFE");
  root.setProperty("--lm-text", "#4B6A9B");
  root.setProperty("--lm-text-alt", "#2B3442");
  root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
  // modetext.innerText = "DARK";
  modeIcon.src = "assets/moon-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(100%)");
  darkMode = false;
  // localStorage.setItem("dark-mode", false);
}

function updateUI(info) {
  if(info.message == "Not Found"){
    error.style.display="block";
    return;
  }
  avtar.src = info.avatar_url;
  userName.innerText = info.name;
  userId.innerText = `@${info.login}`;
  userId.href = info.html_url;
  follower.innerText = info.followers;
  follow.innerText = info.following;
  repo.innerText = info.public_repos;
  bio.innerText = info.bio === null ? "This profile has no bio" : info.bio;
  page.innerText = info.blog === "" ? "Not available" : info.blog;
  twiter.innerText =
    info.twitter_username === null ? "Not available" : info.twitter_username;
  company.innerText = info.company === null ? "Not available" : info.company;
  locations.innerText =
    info.location === null ? "Not available" : info.location;
  // console.log((info.created_at).slice(0,10).split("-"));
  const dateArry = info.created_at.slice(0, 10).split("-");
  userDate.innerText = `Joined ${dateArry[2]} ${month[dateArry[1] - 1]} ${
    dateArry[0]
  }`;
}
