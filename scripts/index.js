const popupElement = document.querySelector(".popup");
const popupBtnOpen = document.querySelector(".profile__edit");
const popupBtnClose = document.querySelector(".popup__close");

popupBtnOpen.addEventListener("click", openPopup);
popupBtnClose.addEventListener("click", closePopup);

function openPopup() {
    popupElement.classList.add("popup__is-opened");
}

function closePopup() {
    popupElement.classList.remove("popup__is-opened");
}
