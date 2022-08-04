async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


async function init() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    console.log('allTasks');
}


async function addUser() {
    allTasks.push('John');
    await backend.setItem('allTasks', JSON.stringify(allTasks));
}


function deleteUser() {
    backend.deleteItem('allTasks');
}
// CLASSLIST MANAGMENT
// addClass('','');
function addClass(id, className) {
    document.getElementById(id).classList.add(className);
}

// removeClass('','');
function removeClass(id, className) {
    document.getElementById(id).classList.remove(className);
}

// emptyInner('');
function emptyInner(id) {
    document.getElementById(id).innerHTML = ``;
}


function responsiveRender() {
    removeClass('responsivMain','d-none')
}


function responsiveClose() {
    addClass('responsivMain','d-none');
}


function hideDate() {
    let dtToday = new Date();
    let month = dtToday.getMonth() + 1;
    let day = dtToday.getDate();
    let year = dtToday.getFullYear();
    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();
    let minDate = year + '-' + month + '-' + day;
    document.getElementById('taskDate').setAttribute('min', minDate);
}