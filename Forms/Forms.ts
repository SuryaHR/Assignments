let users = localStorage.getItem("users") === null? [] : (JSON.parse(localStorage.getItem("users")));
let index = 0;
let inEditMode = false;
let searchUser = "";
 
 function addHandler(){

    document.getElementById("form").classList.remove("d-none");
    document.getElementById("table").classList.add("d-none");
    document.getElementById("button").classList.add("d-none");
    
    // document.getElementById("form").style.display="block";
    // document.getElementById("table").style.display="none";
 }

function submitHandler(event: { preventDefault: () => void; },form: { uName: { value: any; }; emailId: { value: any; }; Age: { value: any; }; cNumber: { value: any; }; reset: () => void; }){

    event.preventDefault();

    let userName = form.uName.value;
    let email = form.emailId.value;
    let age = form.Age.value;
    let Phone = form.cNumber.value;

    if(Phone.length != 10 || userName.length == 0 || age <= 0){
        alert("Invalid Input!!....");
        return;
    }

    for(let user of users){
        if(user.name.toLowerCase() == userName.toLowerCase()){
            alert("User already exists!!...");
            form.reset();
            return;
        }
    }

    if(!inEditMode){
        let User = {name:userName , email:email , age:age , phoneNo:Phone};
        users.push(User);
    }else{
        if(index >= 0){
            users[index].name = userName;
            users[index].email = email;
            users[index].age = age;
            users[index].phoneNo = Phone;

            inEditMode = false;
        }
    }

    localStorage.setItem("users" , JSON.stringify(users));    
    getTable();

    document.getElementById("form").classList.add("d-none");
    document.getElementById("table").classList.remove("d-none");
    document.getElementById("button").classList.remove("d-none");

    //  document.getElementById("form").style.display="none";
    //  document.getElementById("table").style.display="block";

    form.reset();
}

function getTable(usrs = users){

    let Table = "";

    if(usrs.length == 0){
        Table = "<h2>No Records Found!!...</h2>"
    }else{
        Table = "<table class='table table-dark table-striped' cellpadding='5px'cellspacing='5px'><tr><th>ID</th><th>User Name</th><th>Email Id</th><th>Age</th><th>Contact No</th><th>Delete</th><th>Edit</th></tr>";

        for(let i = 0; i < usrs.length; i++){
            Table += "<tr><td>" + (i+1) +  "</td><td>" + usrs[i].name + "</td><td>" + usrs[i].email + "</td><td>" + usrs[i].age + "</td><td>" + usrs[i].phoneNo + "</td><td><button class='fa fa-trash btn btn-danger' onclick='deleteHandler("+i+")'</button></td><td><button class='fa fa-pencil btn btn-info style = font-size:24px' onclick='editHandler("+i+")'</button></td></tr>";
        }

        Table += "</table>";

    }

    
    document.getElementById("table").innerHTML=Table;
}

function deleteHandler(id: number){

    users.splice(id , 1);
    localStorage.setItem("users" , JSON.stringify(users));
    getTable();
}

const cancelHandler= () => {

    document.getElementById("form").classList.add("d-none");
    document.getElementById("table").classList.remove("d-none");
    document.getElementById("button").classList.remove("d-none");

    // document.getElementById("form").style.display="none";
    // document.getElementById("table").style.display="block";
}

function editHandler(id: number){
    inEditMode = true;
    index = id;

    document.getElementById("form").classList.remove("d-none");
    document.getElementById("table").classList.add("d-none");
    document.getElementById("button").classList.add("d-none");

    // document.getElementById("form").style.display="block";
    // document.getElementById("table").style.display="none";

    let name = "";
    let email = "";
    let age = 0;
    let phoneNo = "";

    for(let i=0; i<users.length; i++){
        if(id == i){
            name = users[i].name;
            email = users[i].email;
            age = users[i].age;
            phoneNo = users[i].phoneNo;
        }
    }

    let myForm = document.getElementById("myForm");
    myForm[0].value = name;
    myForm[1].value = email;
    myForm[2].value = age;
    myForm[3].value = phoneNo;
}

function inputChangeHandler(event: { target: { value: string; }; }){
    searchUser = event.target.value;
}


function searchHandler(){
    let myUsers = [];

    myUsers =  users.filter(user => user.name.includes(searchUser) || user.email.includes(searchUser));
    getTable(myUsers);
}