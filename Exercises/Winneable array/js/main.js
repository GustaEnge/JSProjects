//This function will evaluate if the array (passed by argument) is winneable following its own values as steps taken.
function winnableArray(array,pos) {
  let list_values = pos.map((x) =>array[x]);
  let sum_arr = arr => arr.reduce((a,b)=>a+b,0);//this sum will be compared, if array-position values reached the last position by adding each other
  if (sum_arr(list_values) == (array.length)-1) {
    return true;
  }else{
    return false;
  }
}
//As values into the array point to the next element, so this function will return all values (the positions) strictly following the values. In other words, the iterator (increment*) will follow the array values
function position_array(array){
  let array_pos = [];
  let i = 0;
  if (array[0]<= 0){
    return array_pos;
  }else{
      while(array_pos.indexOf(i) == -1 && i<array.length){
          array_pos.push(i);
          i = array[i]+i;//*increment i plus the value it points to
      }
      return array_pos;
  }      
}

//this will be triggered when clicked on HTML, this way will call almost all essential functions for this project to work properly
function Enter(){
  let parentElement = document.getElementById("newArray").children;
  let len = parentElement.length;
  let listValues = [];
  
  for (let index = 0; index < len; index++) {
    listValues.push(parentElement[index].value);  
  }
  if (listValues.every(value => {return value != ""})){
    let size = listValues.length;
    listValues = listValues.map(numStr => parseInt(numStr));
    buildArray_filled(size,"array",listValues);
    let pos_list = position_array(listValues);
    setTimeout(() => {
    coloredPos(pos_list,"array",size);
    let result = winnableArray(listValues,pos_list) ? "result-yes":"result-no";
    let p_child = document.getElementById("finalResult").getElementsByTagName("p");
    let id_attribute = document.createAttribute("id");
    id_attribute.value = result;
    p_child[0].setAttributeNode(id_attribute);


  }, pos_list.length*500);    
    
    }else{
    alert("Please, fill in all array positions");
  }
}

//This function simulates common sleep methods to wait n milisec after proceeding by using Promise
function sleep(ms){
  return new Promise (resolve => setTimeout(resolve, ms))
}
//This function will print the result below Enter button and will color every position that match li tags and the evaluated array
async function coloredPos(array,obj,size_values_array){
  let objectPage = document.getElementById(obj);
  let children_ul = objectPage.children[0];
  for (let index of array) {
    let color = "background-color:coral;";
    let li = children_ul.children[index];
    console.log(index);
    if (index == size_values_array-1){
      color = "background-color:rgb(30, 146, 39);"
    }
    await sleep(500).then(() => {li.style = color;})   
  }  
    
}
//This one will build a similar array to the input with fields already filled 
function buildArray_filled(size,element,list){
  let content = "";
  let objectPage = document.getElementById(element);
  let children_ul = objectPage.children[0];
  for (let index = 0; index < size; index++) {
    content += `<li><p type="text">${list[index]}</p></li>`;
    
  }
  children_ul.innerHTML = content;
}
//Dynamically will provide input fields according to the value of the first Input (length of array)
function buildArray(size,element="newArray"){
  let content = "";
  let container_array = document.getElementById(element);
  for (let index = 0; index < size; index++) {
    content += `<input type="text" class="item" minlength="0" maxlength="2" pattern= "[0-9]">`
    
  }
  container_array.innerHTML = content;
  
}

let arraySize_field = document.getElementById("arraySize");
let size = 0;
//Here an addEventListener to get every change on input tag allowing to know the size of array
arraySize_field.addEventListener("input",(event) => {
  let value = event.target.value;
  if (isNaN(value)){
    alert("This is not a number.")
    arraySize_field.value = "";
  }else{
    size = parseInt(event.target.value);
    buildArray(size);
    
  }
    
  });
