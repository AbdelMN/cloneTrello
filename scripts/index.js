"use strict";
// -----------  Listeners Creation  -----------
function createListeners(container, type) {
    if (type == "list") {
        const deleteListBtn = container.querySelector(".btn-delete-list");
        const openCardCreatorBtn = container.querySelector(".open-add-card");
        const closeCardCreatorBtn = container.querySelector(".close-card-creator");
        const submitCardCreationBtn = container.querySelector("form");
        deleteListBtn.addEventListener("click", (e) => { handleDelete(e.target, "list"); });
        openCardCreatorBtn.addEventListener("click", (e) => { handleCardCreatorOpen(e.target, true); });
        closeCardCreatorBtn.addEventListener("click", (e) => { handleCardCreatorOpen(e.target, false); });
        submitCardCreationBtn.addEventListener("submit", handleSubmitForm);
        DragDropListeners(container);
    }
    else if (type == "card") {
        const btn = container.querySelector("button");
        btn.addEventListener("click", (e) => { handleDelete(e.target, "card"); });
        DragDropListeners(container);
    }
    else if (type == "listcreator") {
        const openListCreatorBtn = container.querySelector(".open-add-list");
        const submitListCreationBtn = container.querySelector("form");
        const closeListCreatorBtn = container.querySelector(".close-list-creator");
        openListCreatorBtn.addEventListener("click", (e) => handleOpenListCreator(e.target, true));
        closeListCreatorBtn.addEventListener("click", (e) => handleOpenListCreator(e.target, false));
        submitListCreationBtn.addEventListener("submit", createNewList);
    }
}
function DragDropListeners(container) {
    container.addEventListener("dragstart", handleDragStart);
    container.addEventListener("dragover", handleDragOver);
    container.addEventListener('drop', handleDrop);
}
// --- Handle Deletetion for Lists or cards (type : "list" or "card")
function handleDelete(btn, type) {
    console.log(type);
    if (type == "list") {
        console.log(btn);
        const list = btn.closest(".list");
        list.remove();
    }
    else if (type == "card") {
        const card = btn.closest(".card");
        card.remove();
    }
}
// --- Handle Open or Close for Card Creator (action : true = open, false = close)
function handleCardCreatorOpen(btn, action) {
    const parent = btn.closest(".card__creator");
    const form = parent.querySelector("form");
    if (action === true) {
        form.style.display = "block";
        btn.style.display = "none";
    }
    else {
        const addCardBtn = parent.querySelector(".open-add-card");
        addCardBtn.style.display = "block";
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
    }
    else {
        validationSpan.textContent = "";
        const container = target.closest(".list");
        const cardsContainer = container.querySelector(".list__cards");
        const card = document.createElement("div");
        card.className = "card";
        card.draggable = true;
        card.innerHTML = `
        <p>${textarea.value}</p>
        <button>X</button>`;
        cardsContainer.appendChild(card);
        createListeners(card, "card");
    }
}
// -----------  List Creator  -----------
function handleOpenListCreator(btn, action) {
    const parent = btn.closest(".list-creator");
    const form = parent.querySelector("form");
    if (action === true) {
        btn.style.display = "none";
        form.style.display = "block";
    }
    else {
        const addListBtn = parent.querySelector(".open-add-list");
        addListBtn.style.display = "block";
        form.style.display = "none";
    }
}
function createNewList(e) {
    e.preventDefault();
    const target = e.target;
    const input = target.querySelector(".list-title");
    const ListHTML = `
    
        <div class="list__header">
            <h3>${input.value}</h3>
            <button class="btn-delete-list">X</button>
        </div>            
    
        <div class="list__cards"></div>

        <div class="card__creator">
            
            <button class="open-add-card">Add a card</button>
            <form>
                <span class="validation"></span>
                <textarea name="text-add-card" class="text-add-card" placeholder="Type title here for this card"></textarea>
                <div class="controls-section">
                    <button class="btn-add-card__submit">
                        Ajouter une carte</button>
                    <button type='button' class="close-card-creator">X</button>
                </div>
            </form>
        </div>       
        `;
    const newList = document.createElement("div");
    newList.className = "list";
    newList.draggable = true;
    newList.innerHTML = ListHTML;
    const container = target.closest(".container");
    container.insertBefore(newList, target.parentElement);
    createListeners(newList, "list");
}
// -----------  Drag & Drop  -----------
let dragSrcElement;
function handleDragStart(e) {
    dragSrcElement = e.target;
}
function handleDragOver(e) {
    e.preventDefault();
}
function handleDrop(e) {
    e.stopPropagation();
    const target = e.target;
    if (dragSrcElement.classList.contains("card") && target.classList.contains("list")) {
        target.querySelector(".list__cards").appendChild(dragSrcElement);
    }
    else if (dragSrcElement.classList.contains("card") && !target.classList.contains("list")) {
        const parent = target.closest(".list");
        if (parent) {
            parent.querySelector(".list__cards").appendChild(dragSrcElement);
        }
    }
    if (dragSrcElement.classList.contains("list") && target.classList.contains("list")) {
        const ArrayNode = Array.from(target.parentNode.children);
        const indexSrc = ArrayNode.indexOf(dragSrcElement);
        const indexTarget = ArrayNode.indexOf(target);
        if (indexSrc < indexTarget) {
            target.parentNode.insertBefore(dragSrcElement, target.nextSibling);
        }
        else {
            target.parentNode.insertBefore(dragSrcElement, target);
        }
    }
}
// -----------  Main  -----------
const element = document.querySelectorAll(".list");
element.forEach((list) => {
    createListeners(list, "list");
});
const listcreator = document.querySelector(".list-creator");
createListeners(listcreator, "listcreator");
