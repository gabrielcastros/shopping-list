const itemInput = document.getElementById('item-input');
const filterInput = document.getElementById('filter');
const clearButton = document.getElementById('clear');
const form = document.querySelector('form');
const list = document.getElementById('item-list');
const noItemsMsg = document.getElementById('no-items');
let itemsList = list.querySelectorAll('li');

if (!itemsList.length) {
    filterInput.style.display = 'none';
    clearButton.style.display = 'none';
    noItemsMsg.style.display = 'none';
} else {
    filterInput.style.display = 'block';
    clearButton.style.display = 'block';
}
function addItem(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const item = formData.get('item');

    if (item.trim().length === 0) {
        itemInput.style.borderColor = 'red';
        itemInput.value = '';
    } else {
        noItemsMsg.style.display = 'none';
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
        if ((filterInput.style.display = 'none')) {
            filterInput.style.display = 'block';
            clearButton.style.display = 'block';
        }
    }
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

function removeItem(e) {
    const icon = e.currentTarget;
    const parentLi = icon.parentElement.parentElement;
    parentLi.remove();
    const itemsList = list.querySelectorAll('li');

    if (!itemsList.length) {
        filterInput.style.display = 'none';
        clearButton.style.display = 'none';
        noItemsMsg.style.display = 'none';
    }
}

function clearAll() {
    const itemsList = list.querySelectorAll('li');
    itemsList.forEach((item) => {
        item.remove();
    });
    filterInput.style.display = 'none';
    clearButton.style.display = 'none';
    noItemsMsg.style.display = 'none';
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
            if (!activeItems.length) {
                noItemsMsg.innerText = 'No itens found';
                noItemsMsg.style.display = 'block';
            }
        } else {
            noItemsMsg.style.display = 'none';
            item.style.display = 'flex';
        }
    });
}

form.addEventListener('submit', addItem);
clearButton.addEventListener('click', clearAll);
filterInput.addEventListener('input', filterItems);
