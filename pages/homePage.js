let time = 0
time = setInterval("Timer1()", 1000)
// טימר שיגרום להבאת הטופס מאוחר יותר 
function Timer1() {

    if (time == 1)
        document.getElementById("gameName").style.display = "block"
    else if (time == 5) {
        document.getElementById("boxDetalis").style.display = "block"
        clearInterval(time)
    }
    time++;
}
document.getElementById("fname").addEventListener("focus",()=>{
    let n=document.getElementById("fname");
n.style.backgroundColor="rgb(102 204 255)"
})
document.getElementById("pwd").addEventListener("focus",()=>{
    let n=document.getElementById("pwd");
n.style.backgroundColor="rgb(102 204 255)"
})
document.getElementById("submit").addEventListener("click", () => {
    console.log("enter to loop")

    //המרת הנתונים למערכים
    let arrNames = JSON.parse(localStorage.getItem("Names"));
    let arrPass = JSON.parse(localStorage.getItem("Passwords"));
    let arrPoints = JSON.parse(localStorage.getItem("Points"))

    // שומרים את הנתון הנוכחי
    let singleName = document.getElementById("fname").value;
    let pass = document.getElementById("pwd").value;
    //בדיקה אם המשתמש קיים
    let IsExsist = false;
    if (arrNames) {
        for (let index = 0; index < arrNames.length; index++) {
            if (arrNames[index] == singleName && arrPass[index] == pass)
                IsExsist = true;
        }
    }
    else {//מקצה מערך חדש
        arrNames = [];
        arrPass = [];
        arrPoints = [];
    }
    //אם לא ,דחיפת הנתונים לתוך המערכים
    if (!IsExsist) {
        arrNames.push(singleName);
        arrPass.push(pass);
        //הציון הראשון
        arrPoints.push(0);
    // המרת כל הנתונים לתוך המישתנים על מנת שנוכל להתעסק איתם ב לוקל...
        localStorage.setItem("Names", JSON.stringify(arrNames))
        localStorage.setItem("Passwords", JSON.stringify(arrPass))
        localStorage.setItem("Points", JSON.stringify(arrPoints))

    }
    //שינוי הנתונים על מנת שנוכל להישתמש בהם אחר כך
    localStorage.setItem("Name", singleName);
    localStorage.setItem("Pass", pass);


    //פתיחת העמוד מישחק
    window.open("pages/game.html")
})
