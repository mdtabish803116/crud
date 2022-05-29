let name = document.getElementById("name");
let age = document.getElementById("age");
let gender = document.getElementById("gender");
let marks = document.getElementById("marks");
let cohort = document.getElementById("cohort");

document.getElementById("submitBtn").addEventListener("click" , function(e){
      e.preventDefault();
    if(name.value != "" && age.value != "" && gender.value != "" && marks.value != "" && cohort.value != ""){
        createStudent();
        document.getElementById("validForm").style.display = "none";
        alert("You have added the student details succesfully");
    }else {
        document.getElementById("validForm").style.display = "block";
    }

})

async function createStudent(){
    try {  
  let res = await fetch("http://localhost:3000/students" , { 
      method : "POST",
      body : JSON.stringify({ 
          name : name.value,
          age : age.value,
          gender : gender.value,
          marks : marks.value,
          cohort : cohort.value
      }),

      headers : { 
            "content-type": "application/json"
      }
  });
    displayData();

    }catch(error){
         console.log(error);
    }
}

async function getData(){
    try{  
    let res = await fetch("http://localhost:3000/students");
    let data = await res.json();
    return data;
    }catch(error){
        console.log(error);
    }
}


async function displayData(){
    let data = await getData();
    document.querySelector("#tableContainer>#studentTable>tbody").innerHTML = "";
    data.forEach((user , index) => {
          let row = document.createElement("tr");
          let td1 = document.createElement("td");
          td1.innerText = index + 1;
          let td2 = document.createElement("td");
          td2.innerText = user.id;
          let td3 = document.createElement("td");
          td3.innerText = user.name;
          let td4 = document.createElement("td");
          td4.innerText = user.age;
          let td5 = document.createElement("td");
          td5.innerText = user.gender;
          let td6 = document.createElement("td");
          td6.innerText = user.marks;
          let td7 = document.createElement("td");
          td7.innerText = user.cohort;
          let td8 = document.createElement("td");
          td8.innerText = "Delete";
          td8.style.cursor = "pointer";
          td8.addEventListener("click" , function(){
              deleteFunction(user.id)
              displayData();
              console.log("hii");
          })

          let td9 = document.createElement("td");
          td9.innerText = "Edit";
          td9.style.cursor = "pointer";
          row.append(td1 , td2 , td3 , td4 , td5 , td6 , td7 , td8 , td9);
          document.querySelector("#tableContainer>#studentTable>tbody").append(row);
    })
}

async function deleteFunction(id){  
     try{  
    let res =  await fetch(`http://localhost:3000/students/${id}` ,{
          method : "DELETE",
      })

     }catch(error){
      console.log(error);
      }
}

displayData();