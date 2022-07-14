function renderBoard() {
    emptyInner('mainContent');
    renderBoardTasks();
}

function renderBoardTasks() {
    document.getElementById('mainContent').innerHTML = /*html*/ `
        <div class="board">
            <div class="headline">
                <div class="headlinetitle">BOARD</div>
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
                <div class="boardContentPosition">
                    <div class="boardContentStyle">
                        <div class="boardtitle">TO DO</div>
                        <div class="toDO boardBg1" id="toDo" ondrop="moveTo('toDo')" ondragover="allowDrop(event)"></div>
                    </div>
                    <div class="boardContentStyle">
                        <div class="boardtitle">IN PROGRESS</div>
                        <div class="inPro boardBg2" id="inPro" ondrop="moveTo('inPro')" ondragover="allowDrop(event)"></div>
                    </div>
                    <div class="boardContentStyle">
                        <div class="boardtitle">TESTING</div>
                        <div class="testing boardBg3" id="testing" ondrop="moveTo('testing')" ondragover="allowDrop(event)"></div>
                    </div>
                    <div class="boardContentStyle">
                        <div class="boardtitle">DONE</div>
                        <div class="done boardBg4" id="done" ondrop="moveTo('done')" ondragover="allowDrop(event)"></div>
                        <div class="wegdamit">DONE</div>
                    </div>
                </div>
            </div>    
        </div>
    `;
    updateHTML();
}


function renderBoardContent(element) {
    return /*html*/ `
            <div id="toDOTask${element['id']}" draggable="true" ondragstart="startDragging(${element['id']})" class="boardBox"> 
                <div class="toDoposition">
                    <div>
                        <div class="blCardtitle"><b>${element['title']}</b></div>
                        <div>${element['category']}</div>
                        <div>${element['created']}</div>
                        <div>Due: ${element['date']}</div>  
                        <div class="blCardtitle">Urgency: ${element['urgency']}</div>
                        <div class="tododescrip">${element['description']}</div>
                    </div>
                    <div><button class="boardbtn" onclick="deleteBoardTask(${element['id']})"><img style="bottom: 126px; right: 0px;" class="boardbtnimg" src="img/trash.png"></button>
                    <div>
                        <!-- <img class="empImgboard" src="${element['employerImg']}"> -->
                        <div class="empImgboard">${element['employer']}</div>
                    </div>
                </div>
                </div>
            </div>
        `;
}


async function initBoard() {
    await downloadFromServer();
    boardToDo = JSON.parse(backend.getItem('boardToDo')) || [];
}


function deleteBoardTask(id) {
    initBoard();
    for (let i = 0; i < boardToDo.length; i++) {
        if (boardToDo[i]['id'] == id) {
            boardToDo.splice(i, 1);
        }
    }
    save();
    renderBoard();
}


let currentDraggedElement;
function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


function moveTo(board) {
    for (let i = 0; i < boardToDo.length; i++) {
        const content = boardToDo[i].id;
        if (content == currentDraggedElement)
            boardToDo[i]['board'] = board;
        updateHTML();
    }
}


function updateHTML() {
    let toDo = boardToDo.filter(t => t['board'] == 'toDo');
    document.getElementById('toDo').innerHTML = '';
    for (let index = 0; index < toDo.length; index++) {
        const element = toDo[index];
        document.getElementById('toDo').innerHTML += renderBoardContent(element);
    }
    let inPro = boardToDo.filter(t => t['board'] == 'inPro');
    document.getElementById('inPro').innerHTML = '';
    for (let index = 0; index < inPro.length; index++) {
        const element = inPro[index];
        document.getElementById('inPro').innerHTML += renderBoardContent(element);
    }
    let testing = boardToDo.filter(t => t['board'] == 'testing');
    document.getElementById('testing').innerHTML = '';
    for (let index = 0; index < testing.length; index++) {
        const element = testing[index];
        document.getElementById('testing').innerHTML += renderBoardContent(element);
    }
    let done = boardToDo.filter(t => t['board'] == 'done');
    document.getElementById('done').innerHTML = '';
    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        document.getElementById('done').innerHTML += renderBoardContent(element);
    }
}


async function save() {
    await backend.setItem('boardToDo', JSON.stringify(boardToDo));
    initBoard();
}