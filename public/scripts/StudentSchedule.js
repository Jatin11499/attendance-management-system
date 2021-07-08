let rows = document.querySelectorAll(".table_rows");
let d = new Date();
let h = d.getHours();
let m = d.getMinutes();
let btn = document.querySelectorAll(".btn-success");
let cn = document.querySelectorAll(".class_name");

for(let i=0;i<cn.length;i++){
    if(cn[i].innerText==""){
        btn[i].style.visibility="hidden";
    }
}

if(h==8 && m<55){
    rows[0].classList.add("table-info");
    btn[0].disabled=false;
}
else if((h==8 && m>=55) || (h==9 && m<50)){
    rows[1].classList.add("table-info");
    btn[1].disabled=false;
}
else if((h==9 && m>=50) || (h==10 && m<45)){
    rows[2].classList.add("table-info");
    btn[2].disabled=false;
}
else if(h==11 && m<55){
    rows[3].classList.add("table-info");
    btn[3].disabled=false;
}
else if((h==11 && m>=55) || (h==12 && m<50)){
    rows[4].classList.add("table-info");
    btn[4].disabled=false;
}
else if((h==12 && m>=50) || (h==13 && m<45)){
    rows[5].classList.add("table-info");
    btn[5].disabled=false;
}

for(let i=0;i<btn.length;i++){
    if(btn[i].innerText!=="Marked"){
        btn[i].innerText="Present";
    }
    else{
        btn[i].style.backgroundColor="#007bff";
        btn[i].style.border="1px solid #007bff";
        btn[i].disabled=true;
    }
}