function renderHelp() {
    emptyInner('mainContent');
    document.getElementById('mainContent').innerHTML = /*html*/`
        <div class="board">
            <div class="headline">
                <div class="headlinetitle">HELP</div>
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
                <div class="hcontactposition">
                    <div class="hcontact">Contact</div> <br>
                    <div class="tutorialstyle">                
                        Click the following link <br>to download a tutorial for use.<br><br><a class="tutorialstylelink" href="http://yener-bas.developerakademie.net/Gruppenarbeit/download/tutorial.pdf" target="_blank">download tutorial as pdf</a>
                        <br><br>
                        <div>or u can send us your question!</div><br>
                    </div>    
                    <form class="hcontactstyle" action="http://yener-bas.developerakademie.net/Gruppenarbeit/send_mail.php" method="POST">       
                        <input name="name" type="name" maxlength="40" minlength="4" placeholder="your name..." id="hname" required>
                        <textarea name="message" type="message" placeholder="write your message here..." id="hmessage" maxlength="500" minlength="15" required></textarea> <br>
                        <button class="hsubmitbtn" type="submit">send mail</button>
                    </form>
                </div>
            </div>
        </div>        
    `;
}