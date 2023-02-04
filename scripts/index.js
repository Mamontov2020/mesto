const popupElement = document.querySelector(".popup");
const popupBtnOpen = document.querySelector(".profile__edit");
const popupBtnClose = document.querySelector(".popup__close");
const popupBtnSave = document.querySelector(".popup__save");
const profileNameElement = document.querySelector(".profile__name");
const profileProfessionElement = document.querySelector(".profile__profession");
const nameElement = document.querySelector("#name");
const professionElement = document.querySelector("#profession");



function openPopup() {
    nameElement.value = profileNameElement.textContent;
    professionElement.value = profileProfessionElement.textContent;
    popupElement.classList.add("popup__is_opened");
}

function closePopup() {
    popupElement.classList.remove("popup__is_opened");
}

function savePopup() {
    if (nameElement.value !== "" && professionElement.value !== "") {
        profileNameElement.textContent = nameElement.value;
        profileProfessionElement.textContent = professionElement.value;
        closePopup();
    }
    
}


popupBtnOpen.addEventListener("click", openPopup);
popupBtnClose.addEventListener("click", closePopup);
popupBtnSave.addEventListener("click", savePopup);