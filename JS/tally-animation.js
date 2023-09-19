let tally = document.querySelector(".tally");
let arrowRight = document.querySelector(".right-triangle");
let arrowLeft = document.querySelector(".left-triangle");

tally.addEventListener("mouseenter", tallyEnter);
tally.addEventListener("mouseleave", tallyOut);
tally.addEventListener("click", formSubmit);

function tallyEnter(){
    tally.style.animation = "3s expand ease-out";
    tally.style.height = "400px";
    arrowRight.style.animation = "3s follow-down ease-out";
    arrowLeft.style.animation = "3s follow-down ease-out";
    arrowRight.style.top = "48vh";
    arrowLeft.style.top = "48vh";
}

function tallyOut(){
    setTimeout(() =>{
        tally.style.animation = "2s contract ease-in";
        arrowRight.style.animation = "2s follow-up ease-in";
        arrowLeft.style.animation = "2s follow-up ease-in";
        tally.style.height = "281px";
        arrowRight.style.top = "33vh";
        arrowLeft.style.top = "33vh";
    }, 5000);
}

function formSubmit(e){
    e.preventDefault();
    let date1 = document.querySelector("#loan-start").value;
    let date2 = document.querySelector("#loan-end").value;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "../operations/tally-date.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("date1="+date1+"&date2="+date2);
    xhr.onload = function () {
        if(xhr.getResponseHeader("content-type") === "application/json"){
            if(document.querySelector(".spanOut") != null){
                document.querySelector(".spanOut").remove();
            }
            let obj = JSON.parse(xhr.responseText);
            document.querySelector("#output-1").innerHTML = obj.day;
            document.querySelector("#output-2").innerHTML = obj.month;
            document.querySelector("#output-3").innerHTML = obj.year;
        }else{
            if(document.querySelector(".spanOut") === null){
                let span = document.createElement("span");
                span.className = "spanOut";
                span.innerHTML = xhr.responseText;
                span.style.textAlign = "Center";
                span.style.flex = "1 0 100%";
                span.style.marginTop = "10px";
                span.style.fontSize = "28px";
                document.querySelector("#form").append(span);
            }

        }
    }
}