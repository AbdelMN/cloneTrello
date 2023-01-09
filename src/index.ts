// -----------  Listeners Creation  -----------
function createListeners(container : HTMLDivElement, type:string){
    if (type == "list"){
        const deleteListBtn = container.querySelector(".btn-delete-list") as HTMLButtonElement;
        const openCardCreatorBtn = container.querySelector(".open-add-card") as HTMLButtonElement;
        const closeCardCreatorBtn = container.querySelector(".close-card-creator") as HTMLButtonElement;
        const submitCardCreationBtn = container.querySelector("form") as HTMLFormElement;
        
        deleteListBtn.addEventListener("click", (e:Event) => {handleDelete(e.target as HTMLButtonElement,"list")});
        openCardCreatorBtn.addEventListener("click", (e:Event)=>{handleCardCreatorOpen(e.target as HTMLButtonElement, true)});
        closeCardCreatorBtn.addEventListener("click", (e:Event)=>{handleCardCreatorOpen(e.target as HTMLButtonElement, false)});
        submitCardCreationBtn.addEventListener("submit", handleSubmitForm);
        DragDropListeners(container);
    } else if (type == "card"){
        const btn = container.querySelector("button") as HTMLButtonElement;
        btn.addEventListener("click", (e:Event) => {handleDelete(e.target as HTMLButtonElement,"card")});
        DragDropListeners(container);
    } else if (type =="listcreator"){
        
        const openListCreatorBtn = container.querySelector(".open-add-list") as HTMLButtonElement;
        const submitListCreationBtn = container.querySelector("form") as HTMLFormElement;
        const closeListCreatorBtn = container.querySelector(".close-list-creator") as HTMLButtonElement;

        openListCreatorBtn.addEventListener("click", (e) => handleOpenListCreator(e.target as HTMLButtonElement,true));
        closeListCreatorBtn.addEventListener("click", (e) => handleOpenListCreator(e.target as HTMLButtonElement,false));
        submitListCreationBtn.addEventListener("submit", createNewList);
    }
}

function DragDropListeners(container : HTMLDivElement){
    container.addEventListener("dragstart", handleDragStart);
    container.addEventListener("dragover", handleDragOver);
    container.addEventListener('drop', handleDrop);
}

// --- Handle Deletetion for Lists or cards (type : "list" or "card")
function handleDelete(btn:HTMLButtonElement, type:string){
    console.log(type);
    if (type == "list"){
        console.log(btn);
        const list = btn.closest(".list") as HTMLDivElement; 
        list.remove();
    } else if ( type == "card"){
        
        const card = btn.closest(".card") as HTMLDivElement; 
        card.remove();
    } 
}

// --- Handle Open or Close for Card Creator (action : true = open, false = close)
function handleCardCreatorOpen(btn : HTMLButtonElement, action:boolean){
    const parent = btn.closest(".card__creator") as HTMLDivElement; 
    const form = parent.querySelector("form") as HTMLFormElement;
    if(action === true){
        form.style.display = "block";
        btn.style.display = "none";
    } else{
        const addCardBtn = parent.querySelector(".open-add-card") as HTMLButtonElement;
        addCardBtn.style.display = "block";
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
    } else {
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
        createListeners(card,"card");
    }
}



// -----------  List Creator  -----------
function handleOpenListCreator(btn:HTMLButtonElement, action : boolean){
    const parent = btn.closest(".list-creator") as HTMLDivElement; 
    const form = parent.querySelector("form") as HTMLFormElement;
    if(action === true){
        btn.style.display = "none";
        form.style.display = "block";
    }else{
        const addListBtn = parent.querySelector(".open-add-list") as HTMLButtonElement;
        addListBtn.style.display = "block";
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
    createListeners(newList,"list");
}


// -----------  Drag & Drop  -----------
let dragSrcElement : HTMLDivElement;
function handleDragStart( e:Event){
    dragSrcElement = e.target as HTMLDivElement;    
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
}

// -----------  Main  -----------
const element = document.querySelectorAll(".list") as NodeListOf<HTMLDivElement>;
element.forEach((list : HTMLDivElement) => {
    createListeners(list,"list");
});

const listcreator = document.querySelector(".list-creator") as HTMLDivElement;
createListeners(listcreator,"listcreator");
