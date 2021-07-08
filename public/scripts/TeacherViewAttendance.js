let adit = document.querySelectorAll(".datait");
let adcse = document.querySelectorAll(".datacse");

for(let i=0;i<adit.length;i++){
    let adarr = adit[i].innerText.split(",");

    anychart.onDocumentReady(function() {
        let data = {
        header: ["Month", "Attendance"],
        rows: [
            ["January", adarr[0]],
            ["February", adarr[1]],
            ["March", adarr[2]],
            ["April", adarr[3]],
            ["May", adarr[4]],
            ["June", adarr[5]],
            ["July", adarr[6]],
            ["August", adarr[7]],
            ["September", adarr[8]],
            ["October", adarr[9]],
            ["November", adarr[10]],
            ["December", adarr[11]],
        ]};
    
        let chart = anychart.column();
        chart.data(data);
        chart.container("containerit"+i);
        chart.draw();
    });
}

for(let i=0;i<adcse.length;i++){
    let adarr = adcse[i].innerText.split(",");

    anychart.onDocumentReady(function() {
        let data = {
        header: ["Month", "Attendance"],
        rows: [
            ["January", adarr[0]],
            ["February", adarr[1]],
            ["March", adarr[2]],
            ["April", adarr[3]],
            ["May", adarr[4]],
            ["June", adarr[5]],
            ["July", adarr[6]],
            ["August", adarr[7]],
            ["September", adarr[8]],
            ["October", adarr[9]],
            ["November", adarr[10]],
            ["December", adarr[11]],
        ]};
    
        let chart = anychart.column();
        chart.data(data);
        chart.container("containercse"+i);
        chart.draw();
    });
}