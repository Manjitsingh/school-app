"use strict";

var studentDetail = void 0,
    data = new Object();
var hostURL = "http://localhost:3000";

(function () {
    getStudentList();
})();

// Student Add form
function validateForm() {
    var choosedClass = document.getElementById("class");
    var choosedSection = document.getElementById("section");

    var fname = document.forms["add_form"]["first_name"].value;
    var lname = document.forms["add_form"]["last_name"].value;
    var studentClass = choosedClass.options[choosedClass.selectedIndex].text;
    var section = choosedSection.options[choosedSection.selectedIndex].text;
    var number = document.forms["add_form"]["number"].value;
    var email = document.forms["add_form"]["email"].value;
    var fullName = fname + ' ' + lname;

    data.name = fullName;
    data.studentClass = studentClass;
    data.section = section;
    data.number = number;
    data.email = email;
    postStudentDetails(data);
}

function getStudentList() {
    var xhttp = new XMLHttpRequest();
    var url = hostURL + "/api/students";
    xhttp.open("GET", url);
    xhttp.send();
    xhttp.onreadystatechange = function (e) {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            studentDetail = JSON.parse(xhttp.response);
            showStudentList();
        }
    };
}

function postStudentDetails(data) {
    console.log(data);
    var http = new XMLHttpRequest();
    var url = hostURL + "/api/students";
    http.open("POST", url, true);
    // http.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    http.setRequestHeader('Content-type', 'application/json');
    http.send(JSON.stringify(data));
}

function showStudentList() {
    var tableBody = document.getElementById('table-body');
    studentDetail.forEach(function (element) {
        var row = document.createElement("tr");
        for (var property in element) {
            var _column = document.createElement("td");
            _column.setAttribute("class", property);
            var makeText = document.createTextNode(element[property]);
            tableBody.appendChild(row).appendChild(_column).appendChild(makeText);
        };
        var column = document.createElement("td");
        var editRow = document.createElement("a");
        editRow.setAttribute("id", "edit");
        editRow.setAttribute("href", "student/" + element.id + "/edit.html");
        // editRow.setAttribute('onclick', `updateList(${element.id})`);
        var editText = document.createTextNode('edit');
        tableBody.appendChild(row).appendChild(column).appendChild(editRow).appendChild(editText);
    });
}

function updateList(id, data) {
    var http = new XMLHttpRequest();
    var url = hostURL + "/api/students/" + id;
    http.open("PUT", url, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.send(JSON.stringify(data));
    debugger;
}