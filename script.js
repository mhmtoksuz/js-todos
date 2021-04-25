const input = document.querySelector('#task');
const ekleBtn = document.querySelector('#liveToastBtn');
const list = document.querySelector('#list');
const addingList = document.querySelector('.addingList');

let items;

//load items
loadItems();

function loadItems() {
    items = getItemsFromLS();
    items.forEach(function(item){
        createElement(item);
    });
}
//event listener
list.addEventListener('click',function(e){
    deleteItem(e);
    checkedControls(e);
})

//Ekle button
function newElement(e){
    if(input.value ==''){
        showAlert('Input bos birakilamaz','danger');
    }else{
        //create element
        createElement(input.value);
        //add localstorage
        setItemToLs(input.value);

        input.value = '';
    }
}

//create elements
function createElement(text){
    //create li
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(text));

    //create span
    const span = document.createElement('span');
    span.className = 'close';
    span.innerText = 'x';

    //add to ul
    li.appendChild(span);
    list.appendChild(li);
}

// delete item
function deleteItem(e){
    if(e.target.className === 'close'){
        if(confirm('Silmek istediginden emin misin?')){
            showAlert('Kurs Silindi','danger');
            e.target.parentElement.remove();

            //delete item from LS
            deleteItemFromLS(e.target.parentElement.textContent);
        }
    }
}

//delete all elements
function deleteAllItems(e){
    if (confirm('Emin misin')) {
        while(list.firstChild){
         list.removeChild(list.firstChild);
        }
     }
     localStorage.clear();
}

//checked controls
function checkedControls(e){
    if(e.target.className==='checked'){
        e.target.classList.remove('checked');
    }else{
        e.target.classList.add('checked');
    }
}

 //Alert message function
function showAlert(message, className) {
     let alert = `
     <div class="alert alert-${className}">
     ${message}
     </div>
 `;
     const row = document.querySelector('.row');
     row.insertAdjacentHTML('beforebegin', alert);

    setTimeout(() => {
         document.querySelector('.alert').remove();
     }, 2000);
 }

//Localstorage area
//Set items to LS
function setItemToLs(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}

//Get items from LS
function getItemsFromLS(){
    if(localStorage.getItem('items')=== null){
        items = [];
    }else{
        items= JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

//Delete items from LS
function deleteItemFromLS(text){
    items = getItemsFromLS();
    items.forEach(function(item,index){
        if(item===text){
            items.splice(index,1);
        }
    });
    localStorage.setItem('items',JSON.stringify(items));
}