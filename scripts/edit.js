let name = document.getElementById("name");
let age = document.getElementById("age");
let gender = document.getElementById("gender");
let marks = document.getElementById("marks");
let cohort = document.getElementById("cohort");

let studentId = JSON.parse(localStorage.getItem("studentId"))? JSON.parse(localStorage.getItem("studentId")):"";

async function updateInputBox(){
    try {  
    let res = await fetch(`http://localhost:3000/students/${studentId}`);
    let data = await res.json();
    name.value = data.name;
    age.value = data.age;
    gender.value = data.gender;
    marks.value = data.marks;
    cohort.value = data.cohort;
    }catch(error){
        console.log(error);
    }
}

updateInputBox();

document.getElementById("submitBtn").addEventListener("click" , function(e){
     e.preventDefault();
     editStudent();
     window.location.href = "./index.html";
})

async function editStudent(){
    try{  

        let body = {
            name : name.value,
            age : age.value,
            gender : gender.value,
            marks : marks.value,
            cohort : cohort.value
        }

        let res = await fetch(`http://localhost:3000/students/${studentId}`,{
         method : "PUT",
         body : JSON.stringify(body),
         headers : {"content-type" : "application/json"}
     })

    }catch(error){
        console.log(error);
    }

}