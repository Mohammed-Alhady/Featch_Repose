// the road map to create the project 

/*
    1 - fetch the data 
    2 - check null 
    3 - show message if it is null 
    4 - create spans if there are data 
    5 - delete old data and show new data
    6 - add the data in the local storage
*/

// Main vars 

let theInput = document.querySelector(".get-repo input");
let getBtn = document.querySelector(".get-repo .get-btn");
let dataHolder = document.querySelector(".show-data");

getBtn.onclick = () => {
    getRepos();
}

function getRepos() {
    if (theInput.value === "") {
        // done
        let span = "<span>Please write a github username.</span>";
        dataHolder.innerHTML = span;
    } else {
        // fetch repos
        dataHolder.innerHTML = "";
        fetchData(theInput.value);
    }
}

function createRepos(repoName) { 
    // create repos
    // "<div class \"repo\">repoName.name <span class = visit>Visit</span></div>"

    // create the main div
    let holderDiv = document.createElement("div");

    // repo name
    holderDiv.className = "repo";
    holderDiv.innerHTML = repoName.name;

    // repo stars
    let repoStars = document.createElement("span");
    // let repoStarsTxt = document.createTextNode(` `);
    repoStars.innerHTML = `<i class="fa-solid fa-star"></i> ${repoName.stargazers_count}`
    repoStars.className = "repo-stars";
    holderDiv.appendChild(repoStars);

    // url repo link 
    let spanURLRepoLink = document.createElement("a");
    let spanURLRepoLinkTxt = document.createTextNode("Visit");
    spanURLRepoLink.className = "span-URL-Link";
    spanURLRepoLink.style.display = "block";
    spanURLRepoLink.appendChild(spanURLRepoLinkTxt);
    spanURLRepoLink.target = "blank";
    spanURLRepoLink.href = repoName.html_url;
    holderDiv.appendChild(spanURLRepoLink);

    // append the main div to the window 
    dataHolder.append(holderDiv);
}

function fetchData(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
    .then((response) => response.json())
    .then((data) => {
        if(data.length < 1) {
            let span = "<span>there is no user has this username</span>";
            span.className = "repo";
            dataHolder.innerHTML = span;
        } else {
            data.forEach((element) => {
            createRepos(element);
        });
        }
    })
}