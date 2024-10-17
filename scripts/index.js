class Activity {
    constructor(id, title, description, imgUrl){
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

class Repository {
    constructor(){
        this.activities = [];
        this.id = 0;
    }

    getAllActivities(){
        return this.activities;
    }

    createActivity(title, description, imgUrl){
        this.id++;
        const activity = new Activity(this.id, title, description, imgUrl);
        this.activities.push(activity);
    }

    deleteActivity(id){
        this.activities = this.activities.filter((activity) => activity.id !== id);
        return this.activities;
    }
}

const repository = new Repository();

function createActivityCard(activity) {
    const { title, description, imgUrl } = activity;
    const divCard = document.createElement("div");
    const elementH3 = document.createElement("h3");
    const elementP = document.createElement("p");
    const elementImg = document.createElement("img");

    elementH3.innerHTML = title;
    elementP.innerHTML = description;
    elementImg.src = imgUrl;

    divCard.classList.add("activity-card"); 
    elementH3.classList.add("card-title"); 
    elementP.classList.add("card-description");
    elementImg.classList.add("card-image"); 

    divCard.appendChild(elementH3);
    divCard.appendChild(elementP);
    divCard.appendChild(elementImg);

    return divCard;
}

function appendActivityCard(){
    container = document.querySelector("[data-cards]")
    container.innerHTML = ""

    const activities = repository.getAllActivities();
    const activitiesCards = activities.map(activity => createActivityCard(activity));
    activitiesCards.forEach(card => container.appendChild(card));
}

function handler(event) {
    event.preventDefault();
    const tituloInput = document.querySelector("[data-nombre]");
    const descripcionInput = document.querySelector("[data-descripcion]");
    const linkImgInput = document.querySelector("[data-linkImg]");

    const titulo = tituloInput.value;
    const descripcion = descripcionInput.value;
    const linkImg = linkImgInput.value;

    if (linkImg === "" || descripcion === "" || titulo === "") {
        return alert("Faltan completar datos");
    }

    repository.createActivity(titulo, descripcion, linkImg);
    appendActivityCard();

    tituloInput.value = "";
    descripcionInput.value = "";
    linkImgInput.value = "";
}

btn = document.querySelector("[data-form-btn")
btn.addEventListener("click", handler)