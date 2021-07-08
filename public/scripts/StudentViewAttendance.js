let sideLinks = document.querySelectorAll(".all_sidebar_links");
let ah = document.querySelector(".attend_hide");
let cellsp = document.querySelectorAll(".student_view_main div p");
let cellsdiv = document.querySelectorAll(".student_view_main div");
let att1 = document.querySelectorAll(".attend_entries1");
let att2 = document.querySelectorAll(".attend_entries2");
let att3 = document.querySelectorAll(".attend_entries3");
let cellsh = document.querySelectorAll(".sva_subname");
let cellst = document.querySelectorAll(".cell_time");

sideLinks[1].classList.add("active_sidebar");

ah.style.display="none";

for(let i=0;i<cellsh.length;i++){
    if(cellsh[i].innerText==""){
        cellsh[i].innerText="-";
    }
}

let d = new Date();
let date = d.getDate();

for(let i=0;i<cellsp.length;i++){
    if(parseInt(cellsp[i].innerText)<=parseInt(date)){
        cellsdiv[i].style.backgroundColor = "rgb(255, 104, 104)";
    }
    if(parseInt(cellsp[i].innerText)<=0){
        cellsp[i].style.visibility="hidden";
        cellsdiv[i].style.backgroundColor = "white";
        cellsdiv[i].style.border = "none";
    }
    cellst[i].style.display="none";
}

for(let i=0;i<att1.length;i++){
    for(let j=0;j<cellsp.length;j++){
        if(cellsp[j].innerText==att1[i].innerText && cellsh[j].innerText==att3[i].innerText && cellst[j].innerText==att2[i].innerText){
            cellsdiv[j].style.backgroundColor = "lightgreen";
        }
    }
}

for(let i=0;i<cellsh.length;i++){
    if(cellsh[i].innerText=="-"){
        cellsdiv[i].style.backgroundColor = "white";
        cellsh[i].style.visibility="hidden";
    }
}