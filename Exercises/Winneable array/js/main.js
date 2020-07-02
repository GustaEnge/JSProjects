
function winnableArray(array) {
if (array[0]<= 0 || array[-1]>0 || Math.sum(position_array(array))!= (array.length)-1){
  cond = false;
}else{
  cond =  true;
}
  let cond = furthest_reached >= last_idx?"Winnable":"Not Winneable";
  return cond;
  
}
function position_array(array){
    let array_var = array.map(parseInt); 
    let array_pos = [];
    let i = 0;
    let next_elem = (x) => array[x]+x;
    let cond = false;
    while(!cond){
        if (array_var[i] == 0){
            cond = true;
        }            
        if (array_var[i] != 0) {
            array_pos.push(array_var[i]);
        }
        if (Math.abs(array_var[i]+array_var[next_elem(i)]) == 0){
            cond = true;
            }
        i = next_elem(i);
    }
    return array_pos;
}
function Enter(){
  let parentElement = document.getElementById("newArray").children;
  let len = parentElement.length;
  let listValues = [];
  
  for (let index = 0; index < len; index++) {
    listValues.push(parentElement[index].value);  
  }
  if (listValues.every(value => {return value != ""})){
    buildArray_filled(listValues.length,"array",listValues);
    //let result = winnableArray(listValues,"array");  
    //coloredPos(position_array(listValues),"array");    
    coloredPos(listValues,"array");    
    //alert(`This is a ${result} array.`);
  }else{
    alert("Please, fill in all array positions");
  }
}

function coloredPos(array,obj){
    let objectPage = document.getElementById(obj);
    let children_ul = objectPage.children[0];
    for (let index = 0; index < array.length; index++) {
    
      let li = children_ul.children[index];
      
      li.style = "background-color:green;";
    }  
    
}

function buildArray_filled(size,element,list){
  let content = "";
  let objectPage = document.getElementById(element);
  let children_ul = objectPage.children[0];
  console.log(children_ul);
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