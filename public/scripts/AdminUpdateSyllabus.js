let yList = document.querySelector("#year");
let semList = document.querySelector("#sem");
let subList = document.querySelector("#sub");

yList.addEventListener("change",()=>{
    let n = yList.value;

    if(n==2){
        semList.innerHTML="<option>--Select--</option><option value='3'>3rd</option><option value='4'>4th</option>";
    }
    else if(n==3){
        semList.innerHTML="<option>--Select--</option><option value='5'>5th</option><option value='6'>6th</option>";
    }
    else if(n==4){
        semList.innerHTML="<option>--Select--</option><option value='7'>7th</option><option value='8'>8th</option>";
    }
});

semList.addEventListener("change",()=>{
    let n = semList.value;

    if(n==3){
        subList.innerHTML="<option>--Select--</option><option value='OOP'>OOP</option><option value='COSM'>COSM</option><option value='DS'>DS</option><option value='DSA'>DSA</option><option value='ADV. MATHS'>ADV. MATHS</option><option value='LD'>LD</option>";
    }
    else if(n==4){
        subList.innerHTML="<option>--Select--</option><option value='CA & MP'>CA & MP</option><option value='PPL'>PPL</option><option value='COMM. ENGG.'>COMM. ENGG.</option><option value='DBFS'>DBFS</option><option value='ADV. MATHS'>ADV. MATHS</option><option value='COA'>COA</option>";
    }
    else if(n==5){
        subList.innerHTML="<option>--Select--</option><option value='SP'>SP</option><option value='DBMS'>DBMS</option><option value='CN'>CN</option><option value='TOC'>TOC</option><option value='MP'>MP</option><option value='HCI'>HCI</option>";
    }
    else if(n==6){
        subList.innerHTML="<option>--Select--</option><option value='OS'>OS</option><option value='JAVA'>JAVA</option><option value='AI'>AI</option><option value='WT'>WT</option><option value='ROBOTICS'>ROBOTICS</option><option value='CG'>CG</option>";
    }
    else if(n==7){
        subList.innerHTML="<option>--Select--</option><option value='DAA'>DAA</option><option value='DWDM'>DWDM</option><option value='SE'>SE</option><option value='CD'>CD</option><option value='CST'>CST</option><option value='BDA'>BDA</option><option value='SEMINAR'>SEMINAR</option>";
    }
    else if(n==8){
        subList.innerHTML="<option>--Select--</option><option value='CNM'>CNM</option><option value='INS'>INS</option><option value='ITC'>ITC</option><option value='GT'>GT</option><option value='ACA'>ACA</option><option value='ES'>ES</option>";
    }
});