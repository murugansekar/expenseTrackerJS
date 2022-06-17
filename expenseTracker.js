const myForm = document.querySelector('#my-form')
const expenseamountInput = document.querySelector('#expenseamount');
const descriptionInput = document.querySelector('#description');
const categoryInput = document.querySelector('#category')
const msg = document.querySelector('.msg');
myForm.addEventListener('submit', onSubmit);
document.addEventListener('DOMContentLoaded', DisplayExpenses)

function DisplayExpenses()
{
  let myObj_deserialized = JSON.parse(localStorage.getItem('myObj'))
  var html = ""
  for(var i=0;i<myObj_deserialized.length;i++)
  {
    html+='<li>' + myObj_deserialized[i].expenseamount +" - " + myObj_deserialized[i].description +" - " + myObj_deserialized[i].category + ' <button onclick="deleteRow('+i+')"> Delete Expense </button>' + ' <button onclick="editRow('+i+')"> Edit Expense </button>' + '</li>'  
  }
  document.getElementById("output").innerHTML = html   
}

function onSubmit(e) 
{
  e.preventDefault();
  if(expenseamountInput.value === '' || descriptionInput.value === '' || categoryInput.value === '') 
  {
    msg.innerHTML = 'Please enter all fields*';
    msg.style.color = 'red'
    setTimeout(() => msg.remove(), 5000);
  } 
  else 
  {
    var ObjectsPresent=[]
    if(localStorage.getItem('myObj'))
    {
      ObjectsPresent=JSON.parse(localStorage.getItem('myObj'))
    }
    let myNewObj={expenseamount:expenseamountInput.value,description:descriptionInput.value,category:categoryInput.value}
    ObjectsPresent.push(myNewObj)
    let ObjectsPresent_serialized = JSON.stringify(ObjectsPresent)
    localStorage.setItem('myObj',ObjectsPresent_serialized)
    expenseamountInput.value = '';
    descriptionInput.value = '';
    categoryInput.value = '';
    DisplayExpenses();
  }
}

function deleteRow(i)
{
  let myObj_deserialized = JSON.parse(localStorage.getItem('myObj'))
  myObj_deserialized.splice(i,1)
  localStorage.setItem('myObj',JSON.stringify(myObj_deserialized))
  DisplayExpenses();
}

function editRow(i)
{
  let myObj_deserialized = JSON.parse(localStorage.getItem('myObj'))
  expenseamountInput.value = myObj_deserialized[i].expenseamount;
  descriptionInput.value = myObj_deserialized[i].description;
  categoryInput.value = myObj_deserialized[i].category;
  deleteRow(i);
}