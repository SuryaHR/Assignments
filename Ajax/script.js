const geturl = "https://lwl-ems.herokuapp.com/api/ems/all";
const posturl = "https://lwl-ems.herokuapp.com/api/ems/";

let employees = [];

const getEmployees = () => {

    employees = [];

    fetch(geturl, {
        method: "GET"
    }).then(result => {
        return result.json();
    }).then(emps => {
        for(let employee of emps)
            employees.push(employee);
        EmployeeDetails();
    });
}

function EmployeeDetails() {
    let empDetails = "";

    if(employees.length == 0){
        empDetails = "<h2>No Details Found!..</h2>"
    }else{
        empDetails += "<table class='table table-primary table-striped' cellpadding='5px'cellspacing='5px'><tr><th>ID</th><th>Name</th><th><Email</th><th>Salary</th><th>Delete</th></tr>";

        for(let i=0; i<employees.length; i++){
            empDetails += "<tr><td>" + employees[i].id + "</td><td>" + employees[i].name +"</td><td>" + employees[i].email + "</td><td>" + employees[i].salary + "</td><td><button class='btn btn-danger' onclick='deleteEmployees("+employees[i].id+")'>Delete</button></td></tr>";

        }

        empDetails += "</table>"
    }

    document.getElementById("table").innerHTML=empDetails;
}


function setEmployees(event , form) {
    event.preventDefault();

    let empName = form.empName.value;
    let email = form.emailId.value;
    let salary = form.salary.value;

    let userData = {name : empName , email : email , salary : salary };

    fetch(posturl , {
        method: "POST",

        body:JSON.stringify(userData),

        headers:{
            'content-type': 'application/json'
        }
    }).catch(error => {
        console.log(error);
    });

    form.reset();
}

function deleteEmployees(id) {
    //https://lwl-ems.herokuapp.com/api/ems/{id}
    fetch(posturl+id, {
        method: "DELETE",
        headers:{
            'content-type': 'application/json'
        }
    }).then(() => {
        getEmployees();
    }).catch(error => {
        console.log(error);
    });
}
