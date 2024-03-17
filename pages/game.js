// size=>המיקום של הפה על המסך
let size = 200, point = 0, time = 31, timerRet, TutRet, dangerRet, checkRet, check1Ret, quick = 0, time1 = 0

document.getElementById("level1").addEventListener("click", () => { quick = 7; })
document.getElementById("level2").addEventListener("click", () => { quick = 5; })
document.getElementById("level3").addEventListener("click", () => { quick = 3; })
document.querySelector("#levels").addEventListener("click", startGame)


// לחיצה על כפתורי מקלדת
document.addEventListener("keydown", moveMouse)
function moveMouse(event) {
  if (event.keyCode == 39) {
    size += 50
    if (size >= 1300)
      size = 1300
    mouse.style.left = size + "px"
  }
  if (event.keyCode == 37) {
    if (size <= 100)
      size = 100
    size -= 50
    if (size <= 100)
      size = 100
    mouse.style.left = size + "px"
  }
}



function startGame() {

  document.getElementById("oraot").style.display = "none"
  document.querySelector("#levels").style.display = "none"
  document.getElementById("background").style.display = "block"
  createMouse();
  createTimer();
  createPoints();
  TutRet = setInterval("createTut()", 500)
  dangerRet = setInterval("createDanger()", 1500)
  checkRet = setInterval("checkTut()", 50);
  check1Ret = setInterval("checkDengere()", 50)
  timerRet = setInterval("Timer()", 1000)
 
  
}

function createMouse() {
  mouse = document.createElement("img")
  mouse.src = "../images/box.png"
  mouse.id = "mouseImg"
  document.body.appendChild(mouse)
}
function createTimer() {
  timer = document.createElement("div")
  timer.id = "timer"
  document.body.appendChild(timer)
  
}
function createPoints() {
  points = document.createElement("div")
  points.id = "sumPoint"
  document.body.appendChild(points)
}
function createTut() {
  // הגרלת מיקום על המסך
  let place = Math.floor(Math.random() * 1000) + 300
  let tut = document.createElement("img")
  tut.src = "../images/tut.png"
  tut.className = "tutImg"
  tut.style.left = place + "px";
  tut.style.animationDuration = quick + "s";
  document.body.appendChild(tut)
}
function createDanger() {
  let place = Math.floor(Math.random() * 1300) + 300
  let danger = document.createElement("img")
  danger.src = "../images/danger.png"
  danger.className = "dangerImg"
  danger.style.left = place + "px";
  danger.style.animationDuration = quick + "s";
  document.body.appendChild(danger)

}
function checkTut() {
  // יצירת מערך של כל התותים
  let tutim = document.querySelectorAll(".tutImg")
  tutim.forEach(i => {
    if (i.getBoundingClientRect().x > mouse.getBoundingClientRect().x &&
      i.getBoundingClientRect().x + i.getBoundingClientRect().width <= mouse.getBoundingClientRect().x + mouse.getBoundingClientRect().width &&
      i.getBoundingClientRect().y >= mouse.getBoundingClientRect().y&& i.getBoundingClientRect().y <= mouse.getBoundingClientRect().y+mouse.getBoundingClientRect().height) {
      console.log(i.getBoundingClientRect().y)
      let udio = document.getElementById("eat");
      udio.play();
      point += 10
      i.style.display = "none";
      document.getElementById("sumPoint").innerHTML = point;
    }
  });
}

function checkDengere() {
  let dengers = document.querySelectorAll(".dangerImg")
  for (const i of dengers) {
    if (i.getBoundingClientRect().x > mouse.getBoundingClientRect().x &&
      i.getBoundingClientRect().x + i.getBoundingClientRect().width <= mouse.getBoundingClientRect().x + mouse.getBoundingClientRect().width &&
      i.getBoundingClientRect().y >= mouse.getBoundingClientRect().y&& i.getBoundingClientRect().y <= mouse.getBoundingClientRect().y+mouse.getBoundingClientRect().height) {
      let udio = document.getElementById("eror");
      udio.play();
      point -= 10
      if (point <= 0)
        point = 0
      i.style.display = "none";
      document.getElementById("sumPoint").innerHTML = point;
    }
  }
}

function Timer() {
  time--
  // תצוגה של הטימר
  if (time >= 10)
    document.querySelector("#timer").innerHTML = "00:" + time
  else
    document.querySelector("#timer").innerHTML = "00:0" + time
  // נגמר המישחק
  if (time == 0) {
    clearInterval(TutRet)
    clearInterval(dangerRet)
    clearInterval(checkRet)
    clearInterval(check1Ret)
    clearInterval(timerRet)

    document.querySelector("#mouseImg").style.display = "none"

    //  פונקציה לשמירת הנתונים ב local storege
    savaLocal()

  }

  function savaLocal() {

    // שליפת רשימת השיאים הנוכחית, אחרת נדרוס את השיאים הקיימים
    let arrNames = JSON.parse(localStorage.getItem("Names"));
    let arrPass = JSON.parse(localStorage.getItem("Passwords"));
    let arrPoints = JSON.parse(localStorage.getItem("Points"));

    const user = localStorage.getItem("Name");
    const password = localStorage.getItem("Pass")
    for (let index = 0; index < arrNames.length; index++) {
      if (arrNames[index] == user && password == arrPass[index]) {
        document.getElementById("endOfGame").style.display = "block";
        // document.getElementById("endBlabla").style.display = "block";
        time1 = setInterval("Timer2()", 1000)
        if (point > arrPoints[index]) {

          document.getElementById("endBlabla").innerHTML = "מספר הנקודות שקיבלת הוא: " + point + "</br> הניצחון המקסימאלי שלך עד כה הוא:  " + arrPoints[index]
            + "</br>😇הגדלת את השיא שלך ב " + (point - arrPoints[index]) + "נקודות" + "</br>" + "!!!!!!!!!!!!!!!!!!" + "כל הכבוד " + user
          arrPoints[index] = point;
          localStorage.setItem("Points", JSON.stringify(arrPoints))

        }
        else {
          // let udio = document.getElementById("endMusic");
          // udio.play();
          document.getElementById("endBlabla").innerHTML = "מספר הנקודות שקיבלת הוא: " + point + "</br> הניצחון המקסימאלי שלך עד כה הוא:  " + arrPoints[index]
            + "</br>😒הפעם לא הצלחת להגדיל את השיא שלך</br> לא נורא" + " " + user + "...אולי בפעם אחרת "

        }

      }
    }

  }
}
function Timer2() {

  if (time1 == 9) {
    document.getElementById("tutGif").style.display = "none"
    document.getElementById("endBlabla").style.display = "block"
    document.getElementById("endBlabla").style.display = "block"

    
  }
  if(time1==18)
  {
window.location.href="game.html"
    clearInterval(time)
  }
  time1++;
}

