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
    let today = new Date()
    var date = today.getDate() + 1
    var month = today.getMonth()
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
            });
        }
    );
}
function scam(){
    var temp
    temp += "<tr>";
    temp = "<td>" + "scam"+ "</td>";
    temp += "<td>" + "scam"+ "</td>";
    temp += "<td>" + "scam"+ "</td>";
    document.getElementById("fdata").innerHTML = temp;
}