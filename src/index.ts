const element = document.querySelectorAll(".list") as NodeListOf<HTMLDivElement>;

function createListeners(container : HTMLDivElement){
    
    const deleteListBtn = container.querySelector(".btn-delete-list") as HTMLButtonElement;
    const openCardCreatorBtn = container.querySelector(".open-add-card") as HTMLButtonElement;
    const closeCardCreatorBtn = container.querySelector(".close-card-creator") as HTMLButtonElement;
    const submitCardCreationBtn = container.querySelector("form") as HTMLFormElement;
    
    deleteListListeners(deleteListBtn);
    openCardCreatorListeners(openCardCreatorBtn);
    closeCardCreatorListeners(closeCardCreatorBtn);
    submitCardCreationListeners(submitCardCreationBtn);
    DragDropListeners(container);
}

function deleteListListeners(deleteListBtn : HTMLButtonElement){
    deleteListBtn.addEventListener("click", (e:Event) => {handleDelete(e.target as HTMLButtonElement,"list")});
}

function openCardCreatorListeners(openCardCreatorBtn : HTMLButtonElement){
    openCardCreatorBtn.addEventListener("click", (e:Event)=>{handleCardCreatorOpen(e.target as HTMLButtonElement, true)});
}
function closeCardCreatorListeners(closeCardCreatorBtn : HTMLButtonElement){
    closeCardCreatorBtn.addEventListener("click", (e:Event)=>{handleCardCreatorOpen(e.target as HTMLButtonElement, false)});
}

function submitCardCreationListeners(submitCardCreationBtn : HTMLFormElement){
    submitCardCreationBtn.addEventListener("submit", handleSubmitForm);
}

function DragDropListeners(container : HTMLDivElement){
    container.addEventListener("dragstart", handleDragStart);
    container.addEventListener("dragover", handleDragOver);
    container.addEventListener('drop', handleDrop);
}

element.forEach((list : HTMLDivElement) => {
    createListeners(list);
});

function handleDelete(btn:HTMLButtonElement, type:string){
    console.log(type);
    if (type == "list"){
        console.log(btn);
        const list = btn.closest(".list") as HTMLDivElement; 
        list.remove();
    }else if ( type == "card"){
        
        const card = btn.closest(".card") as HTMLDivElement; 
        card.remove();
    }
    
    
    
}

function handleCardCreatorOpen(btn : HTMLButtonElement, action:boolean){
    const parent = btn.closest(".list") as HTMLDivElement; 
    const form = parent.querySelector("form") as HTMLFormElement;
    if(action === true){
        form.style.display = "block";
    }else{
        form.style.display = "none";
    }
}

function handleSubmitForm(e:Event){
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const textarea = target.querySelector(".text-add-card") as HTMLTextAreaElement;
    const validationSpan = target.querySelector(".validation") as HTMLSpanElement; 
    if (textarea.value.length === 0){
        validationSpan.textContent = "Please enter a card title";
        
    }else{
        validationSpan.textContent = "";
        const container = target.closest(".list") as HTMLDivElement;
        const cardsContainer = container.querySelector(".list__cards") as HTMLDivElement;
        const card = document.createElement("div") as HTMLDivElement;
        card.className = "card";
        card.draggable = true;
        card.innerHTML = `
        <p>${textarea.value}</p>
        <button>X</button>`;    
        cardsContainer.appendChild(card);
        const btn = card.querySelector("button") as HTMLButtonElement;
        
        btn.addEventListener("click", (e:Event) => {handleDelete(e.target as HTMLButtonElement,"card")});
        DragDropListeners(card);
    }
    
}

let dragSrcElement : HTMLDivElement;
function handleDragStart( e:Event){
    dragSrcElement = e.target as HTMLDivElement;
    
}

// List Creator 
const listcreator = document.querySelector(".list-creator") as HTMLDivElement;
const openListCreatorBtn = listcreator.querySelector(".open-add-list") as HTMLButtonElement;
const submitListCreationBtn = listcreator.querySelector("form") as HTMLFormElement;
const closeListCreatorBtn = listcreator.querySelector(".close-list-creator") as HTMLButtonElement;

openListCreatorBtn.addEventListener("click", (e) => handleOpenListCreator(e.target as HTMLButtonElement,true));
closeListCreatorBtn.addEventListener("click", (e) => handleOpenListCreator(e.target as HTMLButtonElement,false));
submitListCreationBtn.addEventListener("submit", createNewList);
function handleOpenListCreator(btn:HTMLButtonElement, action : boolean){
    const parent = btn.closest(".list-creator") as HTMLDivElement; 
    const form = parent.querySelector("form") as HTMLFormElement;
    if(action === true){
        form.style.display = "block";
    }else{
        form.style.display = "none";
    }

}

function createNewList(e:Event){
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const input = target.querySelector(".list-title") as HTMLInputElement;
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
        `
    const newList = document.createElement("div");
    newList.className = "list";
    newList.draggable = true;
    newList.innerHTML = ListHTML;
    const container = target.closest(".container") as HTMLDivElement;
    
    container.insertBefore(newList,target.parentElement);
    createListeners(newList);
}

function handleDragOver(e:Event){
    e.preventDefault()
    
    
    
}

function handleDrop(e:Event){
    e.stopPropagation();
    const target = e.target as HTMLDivElement;
    if (dragSrcElement.classList.contains("card") && target.classList.contains("list")){
        (target.querySelector(".list__cards") as HTMLDivElement).appendChild(dragSrcElement);

    } else if (dragSrcElement.classList.contains("card") && !target.classList.contains("list")){
        const parent = target.closest(".list");
        if (parent){
            (parent.querySelector(".list__cards") as HTMLDivElement).appendChild(dragSrcElement);
        }
    } if (dragSrcElement.classList.contains("list") && target.classList.contains("list")){
        const ArrayNode = Array.from((target.parentNode as ParentNode).children)
        const indexSrc : number = ArrayNode.indexOf(dragSrcElement);
        const indexTarget : number = ArrayNode.indexOf(target);
        if (indexSrc < indexTarget){
            (target.parentNode as ParentNode).insertBefore(dragSrcElement,target.nextSibling);
        } else {
            (target.parentNode as ParentNode).insertBefore(dragSrcElement,target);
        }      
    }
    
    //
}




console.log(element[0].parentNode);