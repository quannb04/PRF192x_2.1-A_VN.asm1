'use strict';

const submitEl = document.getElementById('submit-btn');
const idEl = document.getElementById('input-id');
const nameEl = document.getElementById('input-name');
const ageEl = document.getElementById('input-age');
const typeEl = document.getElementById('input-type');
const weightEl = document.getElementById('input-weight');
const lengthEl = document.getElementById('input-length');
const colorEl = document.getElementById('input-color-1');
const breedEl = document.getElementById('input-breed');
const vaccinatedEl = document.getElementById('input-vaccinated');
const dewormedEl = document.getElementById('input-dewormed');
const sterilizedEl = document.getElementById('input-sterilized');

const tableBodyEl = document.getElementById('tbody');
const healthyBtn = document.getElementById('healthy-btn');
const calculateBtn = document.getElementById('calculate-btn');

const listPet = []

const data1 = {
  id: 'P001',
  name: 'Tom',
  age: 3,
  type: 'Cat',
  weight: 5,
  length: 50,
  breed: 'Tabby',
  color: 'red',
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  date: new Date(2022, 3, 1),
  bmi: '?',
}

const data2 = {
  id: 'P002',
  name: 'Tyke',
  age: 5,
  type: 'Dog',
  weight: 3,
  length: 40,
  breed: 'Mixed Breed',
  color: 'green',
  vaccinated: true,
  dewormed: true,
  sterilized: false,
  date: new Date(2022, 3, 2),
  bmi: '?',
}

listPet.push(data1);
listPet.push(data2);
console.log(listPet);

//add event on submit
submitEl.addEventListener('click', function() {
  const data = {
    id: idEl.value,
    name: nameEl.value,
    age: parseInt(ageEl.value),
    type:typeEl.value,
    weight: parseInt(weightEl.value),
    length: parseInt(lengthEl.value),
    color: colorEl.value,
    breed: breedEl.value,
    vaccinated: vaccinatedEl.checked,
    dewormed: dewormedEl.checked,
    sterilized: sterilizedEl.checked,
    date: new Date(),
    bmi: '?',
  };
  console.log(data);
  
  const validate = validataEl(data)
  // if pet satisfied condition
  if(validate) {
    //add pet con the list
    listPet.push(data);
    //appear on the screen
    renderListPet(listPet);
    //delete document on Form Input
    clearInput();
  }
})

//display listPet
renderListPet(listPet);

function renderListPet(listPet) {
  tableBodyEl.innerHTML = '';

  for (let i = 0; i < listPet.length; i++) {
    const row = document.createElement('tr'); // create a element 'tr'
    row.innerHTML = ` 
      <th scope="row">${listPet[i].id}</th>
      <td>${listPet[i].name}</td>
      <td>${listPet[i].age}</td>
      <td>${listPet[i].type}</td>
      <td>${listPet[i].weight} kg</td>
      <td>${listPet[i].length} cm</td>
      <td>${listPet[i].breed}</td>
      <td><i class="bi bi-square-fill" style="color: ${listPet[i].color}"></i></td>
      <td><i class="bi ${listPet[i].vaccinated ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i></td>
      <td><i class="bi ${listPet[i].dewormed ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i></td>
      <td><i class="bi ${listPet[i].sterilized ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i></td>
      <td>${listPet[i].bmi}</td>
      <td>${listPet[i].date.getDate()}/${listPet[i].date.getMonth()}/${listPet[i].date.getFullYear()}</td>
      <td><button class="btn btn-danger" onclick="deletePet('${listPet[i].id}')">Delete</button></td>
      `;
    tableBodyEl.appendChild(row);
  }
}

//condition of Form Input
function validataEl(data) {
  //no Form Input empty
  let emptyEl = true;
  if (data.id.trim().length === 0) {//trim() delete space around text
    alert('ID still empty, please input!')
    emptyEl = false;
  }
  if (data.name.trim().length === 0) {
    alert('Name still empty, please input!')
    emptyEl = false;
  }
  if (isNaN(data.age)) { //true if not a number
    alert(`Please input your pet's age!`)
    emptyEl = false;
  }
  if (data.type === 'Select Type') {
    alert(`Please choose your pet's type!`)
    emptyEl = false;
  }
  if (isNaN(data.weight)) { //true if not a number
    alert(`Please input your pet's weight!`)
    emptyEl = false;
  }
  if (isNaN(data.length)) { //true if not a number
    alert(`Please input your pet's length!`)
    emptyEl = false;
  }
  if (data.breed === 'Select Breed'){
    alert(`Please choose your pet's Breed!`)
    emptyEl = false;
  }
  
  //Form input staifice condition
  for (let i = 0; i < listPet.length; i++) {
    if(data.id === listPet[i].id) {
      alert(`ID has exited, please choise another ID!`);
      emptyEl = false;
      break;
    }
  }
  if (data.age < 1 || data.age > 15){
    alert('Age must be between 1 and 15!');
    emptyEl = false;
  }
  if (data.weight < 1 || data.weight > 15){
    alert('Weight must be between 1 and 15');
    emptyEl = false;
  }
  if (data.length < 10 || data.length > 100){
    alert('Length must be between 10 and 100!');
    emptyEl = false;
  }
  return emptyEl;
}

//clear Input
function clearInput(){
  idEl.value = "";
  nameEl.value = "";
  ageEl.value = "";
  typeEl.value = 'Select Type';
  weightEl.value = "";
  lengthEl.value = "";
  colorEl.value = '#000000';
  breedEl.value = 'Select Breed';
  vaccinatedEl.checked = false;
  dewormedEl.checked = false;
  sterilizedEl.checked = false;
}

//Delete pet
function deletePet(petId) {
  const areYouSure = confirm("Are you sure?");
  if (areYouSure){
    for (let i = 0; i < listPet.length; i++){
      if(petId === listPet[i].id) {
        listPet.splice(i,1);
        renderListPet(listPet);
      }
    }
  }
}

//Show healthy pet
let checkHealthy = true;

healthyBtn.addEventListener('click', function(){
  if (checkHealthy === true) {
    const healthyList = [];
    for (let i = 0; i < listPet.length; i++){
      if (listPet[i].vaccinated && listPet[i].dewormed && listPet[i].sterilized) {
        healthyList.push(listPet[i]);
      }
    }
    renderListPet(healthyList);
    healthyBtn.textContent = "Show All Pet";
    checkHealthy = false;
  } else {
    renderListPet(listPet);
    healthyBtn.textContent = "Show Healthy Pet";
    checkHealthy = true;
  }
})

//calculate BMI
calculateBtn.onclick = function(){
  for (let i = 0; i < listPet.length; i++){
    listPet[i].bmi = listPet[i].type === "Dog" ? (listPet[i].weight * 703 / listPet[i].length ** 2).toFixed(2) : (listPet[i].weight * 886 / listPet[i].length ** 2).toFixed(2);
  }
  renderListPet(listPet);
}