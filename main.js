
let items = JSON.parse(localStorage.getItem('items')) || [
    {   
        id: 1,
        image: 'https://images.satu.kz/195912219_iphone-14-pro.jpg',
        title: 'IPhone 14',
        description: 'IPhone 14 128Gb black',
        price: '100 000тг',
        isInStock: false
    },{ 
        id: 2,
        image: 'https://ggonline.kz/upload/iblock/bef/3s7kndy58wv123058ajye36udogrrl8i/8.JPG',
        title: 'Сумка',
        description: 'Сумка Fendi',
        price: '10 000тг',
        isInStock: true
    },{
        id: 3,
        image: 'https://paulinesalon.ru/image/cache/data/mymood-mydress/mm-holly-maxi-01-700x1050.jpg',
        title: 'Платье',
        description: 'Платье Red M',
        price: '23 000тг',
        isInStock: false
    }
]

let mainContent = document.getElementById('main-content')

let modal = document.getElementById('modal-window')
function openModal(){
    modal.style.display = 'flex'
}
function closeModal(){
    modal.style.display = 'none'
}
let addBtn = document.getElementById('add-btn')
let close_btn = document.getElementById('close-btn')

addBtn.addEventListener('click', addObj)
close_btn.addEventListener('click', closeModal)

let imgInput = document.getElementById('img-input')
let titleInput = document.getElementById('title-input')
let descInput = document.getElementById('desc-input')
let priceInput = document.getElementById('price-input')

function addObj(){
    let newObj = {
        id: items.length + 1,
        image: imgInput.value,
        title: titleInput.value,
        description: descInput.value,
        price: priceInput.value,
        isInStock: true
    };
    if(!imgInput.value){
        newObj.image = 'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101027/112815900-no-image-available-icon-flat-vector.jpg?ver=6'
    }
    items.push(newObj);
    localStorage.setItem('items', JSON.stringify(items));
    closeModal();
    showItems();
}



function showItems(){
    let blogsValue = '';

    for(item of items){
        blogsValue += `
            <div class="card" style="width: 21rem;">
                <img src=${item.image} class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.description}</p>
                    <p class="card-price">${item.price}</p>
                    <a href="#" class="btn btn-primary" onclick="checkStock(${item.id})">Check Stock</a>
                    <a href="#" class="btn btn-danger" data-id="${item.id}" onclick="deleteItem(event)">Delete</a>
                </div>
            </div>
            `
    }
    mainContent.innerHTML = blogsValue
}

function checkStock(productId){
    for(product of items){
        if(product.id === productId){
            if(product.isInStock){
                alert('Yes');
            }else{
                alert('No stock')
            }
            return;
        }
    }
}

function deleteItem(event){
    const id = parseInt(event.target.dataset.id);
    const deletedItem = items.find(item => item.id === id);
    items = items.filter(item => item.id !== id);
    const deletedItems = JSON.parse(localStorage.getItem('deletedItems')) || [];
    deletedItems.push(deletedItem);
    localStorage.setItem('deletedItems', JSON.stringify(deletedItems));
    localStorage.setItem('items', JSON.stringify(items))
    showItems();
}

let returnBtn = document.getElementById('return-btn')

function returnItem(){
    const deletedItems = JSON.parse(localStorage.getItem('deletedItems')) || [];
    items.push(...deletedItems);
    localStorage.setItem('items', JSON.stringify(items));
    localStorage.removeItem('deletedItems');
    showItems();
}

showItems();