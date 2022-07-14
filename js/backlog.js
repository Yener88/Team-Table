function renderBacklog() {
    emptyInner('mainContent');
    renderBacklogTasks();
}


function renderBacklogTasks() {
    document.getElementById('mainContent').innerHTML = /*html*/ `
        <div class="board">
            <div class="headline">
                <div class="headlinetitle">BACKLOG</div>
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
                <div class="blContent">
                <div class="blBacklog">
                    <div class="blHeadlines">
                        <div>ASSIGNED TO</div>
                        <div>TITLE</div>
                        <div>CATEGORY</div>
                        <div>DATE</div>
                    </div>
                    <div id="blBacklog" class="blBacklog"></div>
                </div>
            </div>
        </div>
    `;
    renderBacklogContent();
}


function renderBacklogContent() {
    emptyInner('blBacklog');
    for (let i = 0; i < allTasks.length; i++) {
        let task = allTasks[i];
        document.getElementById('blBacklog').innerHTML += /*html*/ `
            <div id="blTask${i}">
                <div class="backlogCard">
                    <div class="blCard1">
                    <div class="invisible">${task['employerImg']}</div>
                        <div>${task['title']}</div>
                        <div><b>${task['category']}</b></div>
                        <div>${task['date']}</div>  
                    </div>
                    <div class="blCard2">
                        <div><button class="deletebtn" onclick="deleteTask(${i})">
                        <img class="deletebtnimg" src="img/trash.png">
                        </button></div>
                        <div><button class="boardbtn" onclick="toBoard(${i})">
                        <img class="boardbtnimg" src="img/board.png">
                        </button></div>
                    </div>
                </div>
            </div>
        `;
    }
    
}


async function deleteTask(i) {
    allTasks.splice(i, 1);
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    renderBacklogContent();
}


async function toBoard(i) {
    allTasks[i].id = getRandomID(allTasks);
    boardToDo.push(allTasks[i]);
    await backend.setItem('boardToDo', JSON.stringify(boardToDo));
    deleteTask(i);
    console.log(boardToDo);
}