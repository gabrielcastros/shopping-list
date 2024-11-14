const itemInput = document.getElementById('item-input');
const filterInput = document.getElementById('filter');
const clearButton = document.getElementById('clear');
const form = document.querySelector('form');
const list = document.getElementById('item-list');
const noItemsMsg = document.getElementById('no-items');
const localItems = JSON.parse(localStorage.getItem('items')) || [];

function listItems() {
    if (localItems.length) {
        const storageData = JSON.parse(localStorage.getItem('items'));
        storageData.forEach((item) => {
            addItemToDOM(item.name);
        });

        checkUI();
    }
}
function onAddItemSubmit(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const item = formData.get('item');

    if (item.trim().length === 0) {
        itemInput.style.borderColor = 'red';
        itemInput.value = '';
    } else {
        addItemToDOM(item);
        addItemToLocalStorage(item);
    }
}
function addItemToDOM(item) {
    itemInput.style.borderColor = '#ccc';

    const li = document.createElement('li');
    const capItem = item[0].toUpperCase() + item.substring(1);
    li.innerText = capItem;
    list.appendChild(li);

    const button = createButton(
        'remove-item btn-link text-red',
        'fa-solid fa-xmark',
        li
    );
    li.appendChild(button);

    itemInput.value = '';
    checkUI();
}
function createButton(classes, iconClasses, parent) {
    const button = document.createElement('button');
    button.className = classes;
    parent.appendChild(button);

    const icon = document.createElement('i');
    icon.className = iconClasses;
    button.appendChild(icon);
    icon.addEventListener('click', removeItem);

    return button;
}

function addItemToLocalStorage(item) {
    const newItem = {
        name: item,
    };
    localItems.push(newItem);
    0;
    localStorage.setItem('items', JSON.stringify(localItems));
}

function removeItem(e) {
    const icon = e.currentTarget;
    const parentLi = icon.parentElement.parentElement;
    const storageData = JSON.parse(localStorage.getItem('items'));
    storageData.forEach((item, index) => {
        if (item.name === parentLi.innerText.toLowerCase()) {
            storageData.splice(index, 1);
            localStorage.setItem('items', JSON.stringify(storageData));
        }
    });
    parentLi.remove();

    checkUI();
}

function clearAll() {
    const itemsList = list.querySelectorAll('li');
    itemsList.forEach((item) => {
        item.remove();
    });
    localStorage.clear();
    checkUI();
}

function filterItems(e) {
    const snippet = e.target.value;
    const itemsList = list.querySelectorAll('li');
    itemsList.forEach((item) => {
        item.style.display = 'flex';
        const newName =
            item.innerText[0].toLowerCase() + item.innerText.substring(1);
        if (!newName.includes(snippet)) {
            item.style.display = 'none';
            const activeItems = Array.from(itemsList).filter(
                (item) => item.style.display === 'flex'
            );
            if (activeItems.length === 0) {
                noItemsMsg.style.display = 'block';
            }
            checkUI();
        } else {
            noItemsMsg.style.display = 'none';
            item.style.display = 'flex';
        }
    });
}

function checkUI() {
    const itemsList = list.querySelectorAll('li');
    if (!itemsList.length) {
        filterInput.style.display = 'none';
        clearButton.style.display = 'none';
        noItemsMsg.style.display = 'none';
    } else {
        filterInput.style.display = 'block';
        clearButton.style.display = 'block';
    }
}

function init() {
    form.addEventListener('submit', onAddItemSubmit);
    clearButton.addEventListener('click', clearAll);
    filterInput.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', listItems);

    checkUI();
}

init();
