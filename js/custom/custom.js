let studentDetail, data = new Object();
const hostURL = "http://localhost:3000";

(function () {
    getStudentList();
})();

// Student Add form
function validateForm() {
    let choosedClass = document.getElementById("class");
    let choosedSection = document.getElementById("section");

    let fname = document.forms["add_form"]["first_name"].value;
    let lname = document.forms["add_form"]["last_name"].value;
    let studentClass = choosedClass.options[choosedClass.selectedIndex].text;
    let section = choosedSection.options[choosedSection.selectedIndex].text;
    let number = document.forms["add_form"]["number"].value;
    let email = document.forms["add_form"]["email"].value;
    const fullName = fname + ' ' + lname;

    data.name = fullName;
    data.studentClass = studentClass;
    data.section = section;
    data.number = number;
    data.email = email;
    postStudentDetails(data);
}

function getStudentList() {
    const xhttp = new XMLHttpRequest();
    const url = `${hostURL}/api/students`;
    xhttp.open("GET", url);
    xhttp.send();
    xhttp.onreadystatechange = (e) => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            studentDetail = JSON.parse(xhttp.response);
            showStudentList();
        }
    }
}

function postStudentDetails(data) {
    console.log(data);
    const http = new XMLHttpRequest();
    const url = `${hostURL}/api/students`;
    http.open("POST", url, true);
    // http.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    http.setRequestHeader('Content-type','application/json');
    http.send(JSON.stringify(data));
}

function showStudentList() {
    let tableBody = document.getElementById('table-body');
    studentDetail.forEach(element => {
        const row = document.createElement("tr");
        for(let property in element) {
            const column = document.createElement("td");
            column.setAttribute("class", property);
            let makeText = document.createTextNode(element[property]);
            tableBody.appendChild(row).appendChild(column).appendChild(makeText);
        };
        const column = document.createElement("td");
        const editRow = document.createElement("a");
        editRow.setAttribute("id", "edit");
        editRow.setAttribute("href", `student/${element.id}/edit.html`);
        // editRow.setAttribute('onclick', `updateList(${element.id})`);
        let editText = document.createTextNode('edit');
        tableBody.appendChild(row).appendChild(column).appendChild(editRow).appendChild(editText);
    });
}

function updateList(id, data) {
    const http = new XMLHttpRequest();
    const url = `${hostURL}/api/students/${id}`;
    http.open("PUT", url, true);
    http.setRequestHeader('Content-type','application/json');
    http.send(JSON.stringify(data));
    debugger;
}
