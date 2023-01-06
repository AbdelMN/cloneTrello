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
    deleteListBtn.addEventListener("click", handleListDelete);
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

function handleListDelete(this: HTMLElement, e:Event){
    const btnTarget = e.target as HTMLButtonElement;
    const parent = btnTarget.closest(".list") as HTMLDivElement; 
    parent.remove();
    
    
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
        return;
    }else{
        validationSpan.textContent = "";
    }
    const container = target.closest(".list") as HTMLDivElement;
    const cardsContainer = container.querySelector(".list__cards") as HTMLDivElement;
    const card = document.createElement("div") as HTMLDivElement;
    card.className = "card";
    card.draggable = true;
    card.innerHTML = textarea.value;    
    cardsContainer.appendChild(card);
    DragDropListeners(card);
    
    
}

let dragSrcElement : HTMLDivElement;
function handleDragStart( e:Event){
    dragSrcElement = e.target as HTMLDivElement;
    
}


function handleDragOver(e:Event){
    e.preventDefault()
    
    
    
}

function handleDrop(this: HTMLElement, e:Event){
    e.stopPropagation();
    const target = e.target as HTMLDivElement;
    if (dragSrcElement.classList.contains("card") && target.classList.contains("list")){
        (target.querySelector(".list__cards") as HTMLDivElement).appendChild(dragSrcElement);

    }else if (dragSrcElement.classList.contains("card") && !target.classList.contains("list")){
        const parent = target.closest(".list");
        if (parent){
            (parent.querySelector(".list__cards") as HTMLDivElement).appendChild(dragSrcElement);
        }
    }if (dragSrcElement.classList.contains("list") && target.classList.contains("list")){
        const ArrayNode = Array.from((target.parentNode as ParentNode).children)
        const indexsrc : number = ArrayNode.indexOf(dragSrcElement);
        const indextarget :number = ArrayNode.indexOf(target);
        if (indexsrc < indextarget){
            target.parentNode?.insertBefore(dragSrcElement,target.nextSibling);
        }else{
            target.parentNode?.insertBefore(dragSrcElement,target);
        }
        
        
        

    }
    
    //
}




console.log(element[0].parentNode);