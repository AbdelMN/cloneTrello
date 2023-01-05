"use strict";
const element = document.querySelectorAll(".list");
function createListeners(container) {
    console.log(container);
    const deleteListBtn = container.querySelector(".btn-delete-list");
    const openCardCreatorBtn = container.querySelector(".open-add-card");
    const closeCardCreatorBtn = container.querySelector(".close-card-creator");
    const submitCardCreationBtn = container.querySelector("form");
    deleteListListeners(deleteListBtn);
    openCardCreatorListeners(openCardCreatorBtn);
    closeCardCreatorListeners(closeCardCreatorBtn);
    submitCardCreationListeners(submitCardCreationBtn);
    DragDropListeners(container);
}
function deleteListListeners(deleteListBtn) {
    deleteListBtn.addEventListener("click", handleListDelete);
}
function openCardCreatorListeners(openCardCreatorBtn) {
    openCardCreatorBtn.addEventListener("click", (e) => { handleCardCreatorOpen(e.target, true); });
}
function closeCardCreatorListeners(closeCardCreatorBtn) {
    closeCardCreatorBtn.addEventListener("click", (e) => { handleCardCreatorOpen(e.target, false); });
}
function submitCardCreationListeners(submitCardCreationBtn) {
    submitCardCreationBtn.addEventListener("submit", handleSubmitForm);
}
function DragDropListeners(container) {
    container.addEventListener("dragstart", handleDragStart);
    container.addEventListener("dragover", handleDragOver);
    container.addEventListener('drop', handleDrop);
}
element.forEach((list) => {
    createListeners(list);
});
function handleListDelete(e) {
    const btnTarget = e.target;
    const parent = btnTarget.closest(".list");
    parent.remove();
}
function handleCardCreatorOpen(btn, action) {
    const parent = btn.closest(".list");
    const form = parent.querySelector("form");
    if (action === true) {
        form.style.display = "block";
    }
    else {
        form.style.display = "none";
    }
}
function handleSubmitForm(e) {
    e.preventDefault();
    const target = e.target;
    const textarea = target.querySelector(".text-add-card");
    const validationSpan = target.querySelector(".validation");
    if (textarea.value.length === 0) {
        validationSpan.textContent = "Please enter a card title";
        return;
    }
    else {
        validationSpan.textContent = "";
    }
    const container = target.closest(".list");
    const cardsContainer = container.querySelector(".list__cards");
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = textarea.value;
    cardsContainer.appendChild(card);
}
function handleDragStart(e) {
    //
}
function handleDragOver(e) {
    //
}
function handleDrop(e) {
    //
}
