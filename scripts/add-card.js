const popupCardElement = document.querySelector(".popup_add_card");
const popupBtnOpen = document.querySelector(".profile__add-button");
const popupBtnClose = document.querySelector(".card_close");
const cardNameElement = document.querySelector(".card_name");
const cardSrcElement = document.querySelector(".src_card");
const cardElement = document.querySelector("#card-name");




function openPopup() {
    cardElement.value = cardNameElement.textContent;
    cardSrcElement.value = cardSrcElement.textContent;
    popupCardElement.classList.add("popup_is-opened");
}

export function closePopup() {
    popupCardElement.classList.remove("popup_is-opened");
}



popupBtnOpen.addEventListener("click", openPopup);
popupBtnClose.addEventListener("click", closePopup);