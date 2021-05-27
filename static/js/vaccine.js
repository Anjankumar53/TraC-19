var district_id = ''
function getdistrictdata() {
    console.log("string test")
    const state_id = document.getElementById("state").value.split('_')[0]
    fetch(" https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + state_id).then(
        (res) => {
            res.json().then((data) => {
                console.log(data);
                if (data.districts.length > 0) {
                    var temp = ""
                    for (let index = 0; index < data.districts.length; index++) {
                        temp += "<tr>";
                        temp += "<td>" + data.districts[index].district_name + "</td>";
                        temp += "<td>" + data.districts[index].district_id + "</td>";
                        console.log()
                    };
                    document.getElementById("data").innerHTML = temp;

                }
            });
        }
    );
}

function getTime() {
    console.log("getTime")
    let today = new Date(Date.now())
    var date = today.getDate()+1
    var month = today.getMonth()+1
    var year = today.getFullYear()

    let time = date + "-" + month + "-" + year
    return time
}
function getvaccinedata() {
    var date = getTime();
    console.log(date)

    district_id = document.getElementById("district_text").value
    fetch("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" + district_id + "&date=" + date).then(
        (res) => {
            res.json().then((data) => {
                console.log(data);
                if (data.sessions.length > 0) {
                    var temp = ""
                    for (let index = 0; index < data.sessions.length; index++) {
                        temp += "<tr>";
                        temp += "<td>" + data.sessions[index].name + "</td>";
                        temp += "<td>" + data.sessions[index].vaccine + "</td>";
                        temp += "<td>" + data.sessions[index].date + "</td>";
                        console.log(index)
                    };
                    document.getElementById("fdata").innerHTML = temp;

                }
                else{
                    temp += "<tr>";
                    temp += "<td>" + "NO data"+ "</td>";
                    temp += "<td>" +"" + "</td>";
                    document.getElementById("fdata").innerHTML = temp;

                }
            });
        }
    );
}
function scam(){
    var temp=""
    district_id=document.getElementById("district_text").value
    if(district_id==265 || district_id==276){
        temp += "<tr>";
        temp += "<td>" + "Bowring medical college"+ "</td>";
        temp += "<td>" +"9036304558" + "</td>";
        document.getElementById("fdata").innerHTML = temp;
        temp += "<tr>";
        temp += "<td>" + "Victoria Hospital"+ "</td>";
        temp += "<td>" +"080-26701150" + "</td>";
        document.getElementById("fdata").innerHTML = temp;
        temp += "<tr>";
        temp += "<td>" + "Command hospital"+ "</td>";
        temp += "<td>" +"-" + "</td>";
        document.getElementById("fdata").innerHTML = temp;
        temp += "<tr>";
        temp += "<td>" + "RajRajeshwari  medical college"+ "</td>";
        temp += "<td>" +"080-28437444" + "</td>";
        document.getElementById("fdata").innerHTML = temp;
    } 
    else if(district_id==270){
        temp=""
        temp += "<tr>";
        temp += "<td>" + "District Hospital"+ "</td>";
        temp += "<td>" +"080-236260" + "</td>";
        document.getElementById("fdata").innerHTML = temp;
    }
    else {
        temp="<tr>"
        temp += "<td>" + "NO data"+ "</td>";
        document.getElementById("fdata").innerHTML = temp;
    }
}