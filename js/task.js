let allTasks = [];
let boardToDo = [];
let title;
let date;
let category;
let urgency;
let description;
let employer = [];
let img = [];
let newTask;
let board;
let id;
let today = new Date().toLocaleString('de');
let all;
let expanded = false;


function showCheckboxes() {
    let checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
        document.getElementById('employer').innerHTML = ``;
        document.getElementById('employer').innerHTML = `-`;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
        document.getElementById('employer').innerHTML = ``;
        document.getElementById('employer').innerHTML = `+`;
    }
}


async function addTask() {
    title = document.getElementById('taskTitle');
    date = document.getElementById('taskDate');
    category = document.getElementById('category');
    urgency = document.getElementById('urgency');
    description = document.getElementById('taskDescription');
    newTask = {
        'id': getRandomID(allTasks),
        'title': title.value,
        'date': date.value,
        'category': category.value,
        'urgency': urgency.value,
        'description': description.value,
        'board': 'toDo',
        'created': today,
        'employer': employer,
        'employerImg': img
    };
    allTasks.push(newTask);
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    checkbox();
    cleanValues();
    console.log(allTasks);
}


function getRandomID(allTasks) {
    let newID = Math.floor(Math.random() * new Date().getTime());
    console.log(newID);
    return allTasks.some(elem => elem.uid == newID) ? getRandomID(allTasks) : newID;
}


function cleanValues() {
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDate').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('urgency').value = '';
    document.getElementById('category').value = '';
    document.getElementById('employer').value = '';
    checkUncheck(this);
    employer = [];
    img = [];
}


function checkbox() {
    let checked = false;
    if (document.querySelector('#one:checked')) {
        checked = true;
        employer.push('<br>Y.B.');
        img.push(`<img class="empImgBl" src='./img/officeyener.jpg'>`);
    }
    if (document.querySelector('#two:checked')) {
        checked = true;
        employer.push('<br>J.R.');
        img.push(`<img class="empImgBl" src='./img/officejan.jpg'>`);
    }
    if (document.querySelector('#three:checked')) {
        checked = true;
        employer.push('<br>P.H.');
        img.push(`<img class="empImgBl" src='./img/officepat.png'>`);
    }
    if (document.querySelector('#four:checked')) {
        checked = true;
        employer.push('<br>Guest');
        img.push(`<img class="empImgBl" src='./img/office1.jpg'>`);
    }
}


function checkUncheck(main) {
    all = document.getElementsByName('uncheck');
    for (let a = 0; a < all.length; a++) {
        all[a].checked = main.checked;
    }
}


function renderTask() {
    emptyInner('mainContent');
    document.getElementById('mainContent').innerHTML = /*html*/ `
        <div class="board">
            <form onsubmit="return false">
                <div class="headline">
                    <div class="headlinetitle">ADD TASK</div>
                    <span class="headlinetitletext">Learning Managment System Project</span>
                </div>
                <div id="responsivMain" class="d-none">
                    <div class="responsivPosition">
                        <div onclick="responsiveClose()" class="responsiveClose"><img class ="responsivCloseImg" src="./img/close.png"></div>
                        <nav>
                            <div class="sidebarMenu">
                                <ul class="innerMenu">
                                    <li><a href="index.html"><img class="navbarimg" src="./img/logo.png"></a></li>
                                    <li class="sideBar" onclick="renderBoard()">BOARD</li>
                                    <li class="sideBar" onclick="renderBacklog()">BACKLOG</li>
                                    <li class="sideBar" onclick="renderTask()">ADD TASK</li>
                                    <li class="sideBar" onclick="renderHelp()">HELP</li>
                                </ul>
                            </div>
                        </nav>
                        <footer class="footerDiv">
                        <div class="footer">
                            <div class="footerimprint" onclick="renderImprint()">Imprint</div>
                            <div class="footerpolicy" onclick="renderPolicy()">Policy</div>
                        </div>
                        </footer>
                    </div>
                </div>
                <div class="responsivMenu d-none" onclick="responsiveRender()"><img class="responsivImg" src="./img/menu.png">
                </div>
                <div class="taskinnerwindow">
                    <div class="boardRow1">
                        <div class="left dflexcolumn">
                            <span class="taskinnerwindowtitle">TITLE</span>
                            <input class="taskmargin taskinputstyle" name="title" id="taskTitle" maxlength="40" minlength="4" type="text" placeholder="Title...">
                        </div>
                        <div class="right dflexcolumn">
                            <span class="taskinnerwindowtitle">DUE DATE</span>
                            <input style="cursor: pointer;" class="taskmargin taskinputstyle" name="date" id="taskDate" type="text" onfocus="(this.type='date')" onblur="(this.type='text')" placeholder="- select date -">
                        </div>
                    </div>
                    <div class="boardRow2">
                        <div class="left">
                            <span class="taskinnerwindowtitle">CATEGORY</span>
                            <select name="category" id="category" class="left dflexcolumn taskmargin taskinputstyle">
                                <option value="" disabled selected>- select category -</option>
                                <option value="Development">Development</option>
                                <option value="Design">Design</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Marketing">Other</option>
                            </select>
                        </div>
                        <div class="right">
                            <span class="taskinnerwindowtitle">URGENCY</span>
                            <select  name="urgency" id="urgency" class="left dflexcolumn taskmargin taskinputstyle">
                                <option value="" disabled selected>- select     urgency -</option>
                                <option class="urgencyhigh" value="High">High</option>
                                <option class="urgencymedium" value="Medium">Medium</option>
                                <option class="urgencylow" value="Low">Low</option>
                            </select>
                        </div>
                    </div>
                    <div class="boardRow3">
                        <div class="left">
                            <span class="taskinnerwindowtitle">DESCRIPTION</span>
                            <textarea class="taskinputstyletext"  id="taskDescription" type="textfield" placeholder="Description..."></textarea>
                        </div>
                        <div class="right">
                            <span class="taskinnerwindowtitle">ASSIGNED TO</span>
                            <div class="multiselect">
                                <div class="selectBox" onclick="showCheckboxes()">
                                    <div id="employer">
                                    +
                                    </div>
                                    <div class="overSelect"></div>
                                    </div>
                                    <div id="checkboxes">
                                    <label for="one">
                                    <input type="checkbox" id="one" name="uncheck"/><img class="checkboximg" src="./img/officeyener.jpg">Y.B.</label> 
                                    <label for="two">
                                    <input type="checkbox" id="two" name="uncheck"/><img class="checkboximg" src="./img/officejan.jpg">J.R.</label>
                                    <label for="three">
                                    <input type="checkbox" id="three" name="uncheck"/><img class="checkboximg" src="./img/officepat.png">P.H.</label>
                                    <label for="four">
                                    <input type="checkbox" id="four" name="uncheck"/><img class="checkboximg" src="./img/office1.jpg">Guest</label>
                                </div>
                            </div>
                            <div class="employers"></div>
                            <div class="btnTask">
                                <button onclick="cleanValues()"class="taskmargin" id="cancelTask">CANCEL</button>
                                <button onclick="addTask()" id="createTask">CREATE TASK</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    `;
    hideDate();
}