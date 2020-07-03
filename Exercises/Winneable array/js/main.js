
function winnableArray(array,pos) {
  let list_values = pos.map((x) =>array[x]);
  let sum_arr = arr => arr.reduce((a,b)=>a+b,0);
  if (sum_arr(list_values) == (array.length)-1) {
    return true;
  }else{
    return false;
  }
}
function position_array(array){
  let array_pos = [];
  let i = 0;
  if (array[0]<= 0){
    return array_pos;
  }else{
      while(array_pos.indexOf(i) == -1 && i<array.length){
          array_pos.push(i);
          i = array[i]+i;
      }
      return array_pos;
  }      
}
function Enter(){
  let parentElement = document.getElementById("newArray").children;
  let len = parentElement.length;
  let listValues = [];
  
  for (let index = 0; index < len; index++) {
    listValues.push(parentElement[index].value);  
  }
  if (listValues.every(value => {return value != ""})){
    listValues = listValues.map(numStr => parseInt(numStr));
    buildArray_filled(listValues.length,"array",listValues);
    let pos_list = position_array(listValues);
    coloredPos(pos_list,"array");
    let result = winnableArray(listValues,pos_list) ? "result-yes":"result-no";

    let p_child = document.getElementById("finalResult").getElementsByTagName("p");
    console.log(p_child);
    let id_attribute = document.createAttribute("id");
    id_attribute.value = result;
    p_child[0].setAttributeNode(id_attribute);
    }else{
    alert("Please, fill in all array positions");
  }
}

function coloredPos(array,obj){
  let objectPage = document.getElementById(obj);
  let children_ul = objectPage.children[0];
  for (let index of array) {
    
    let li = children_ul.children[index];
      
      li.style = "background-color:coral;";
    }  
    
}

function buildArray_filled(size,element,list){
  let content = "";
  let objectPage = document.getElementById(element);
  let children_ul = objectPage.children[0];
  for (let index = 0; index < size; index++) {
    content += `<li><p type="text">${list[index]}</p></li>`;
    
  }
  children_ul.innerHTML = content;
}
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