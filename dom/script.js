// ON READY
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("filterContent").style.display = "none";
});

// FILTER 
function showFilter() {
    document.getElementById("filterContent").style.display = document.getElementById("filterContent").style.display == "block" ? "none" : "block";
}

function filterArticles() {

    let element = window.event.target;

    let type = "";
    type = element.id == "opinionCheckbox" ? 'opinion' : type;
    type = element.id == "recipeCheckbox" ? 'recipe' : type;
    type = element.id == "updateCheckbox" ? 'update' : type;
    
    let checked = element.checked;
    let articles = document.getElementsByClassName(type);

    for (let i = 0; i < articles.length; i++) {
        articles[i].style.display = checked == true ? "block" : "none";
    }
}


//
function showAddNew() {
        document.getElementById("newContent").style.display = document.getElementById("newContent").style.display == "block" ? "none" : "block";


}

function addNewArticle() {
    let title = document.getElementById("inputHeader").value;
    const text = document.getElementById("inputArticle").value;
    
    typeClass = document.getElementById("opinionRadio").checked ? "opinion" : (document.getElementById("recipeRadio").checked ? "recipe" : "update");
    typeLabel = document.getElementById("opinionRadio").checked ? "Opinion" : (document.getElementById("recipeRadio").checked ? "Recipe" : "Update");
    

    const articleList = document.getElementById("articleList");
    const newArticle = document.createElement("article");
    
    newArticle.className = typeClass;
    newArticle.innerHTML = `
        <span class="marker">${typeLabel}</span>
        <h2>${title}</h2>
        <p>${text}</p>
        <p><a href="moreDetails.html">Read more...</a></p>
    `;

    articleList.appendChild(newArticle);
    document.getElementById("newContent").reset();
    showFilter();
}