const inputBtn = document.getElementById('input-btn');
let myLeads = [];
const inputEl = document.getElementById('input-el');
const ulEl = document.getElementById('ul-el');
const deleteBtn = document.getElementById('del-btn');
const tabBtn = document.getElementById('tab-btn');


let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));


//checking if leadsfromLocalStorage is truthy then passsing it into our Leads array
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}



tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
     });
})

  
function render(leads){
    let listItem =  ""
    for(let i = 0; i<leads.length; i++){
        listItem +=  `<li> <a href=${leads[i]} target='_blank'> ${leads[i]}</a> </li>`; 
    }

    ulEl.innerHTML = listItem;
     //Optimizing code by using listitem instead  of ulEl.innerHTML
    //which changes the DOM each time to for loop runs
}

    //more intuitive solution to this.
    /* const li = document.createElement("li");
    li.textContent = myLeads[i];
    ulEl.append(li); */

//Listen for double click on the Btn and deleting from localStorage
deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLeads = [];

    render(myLeads);

    //Alternative to calling the render function
    //ulEl.innerHTML = "";
})

inputBtn.addEventListener('click', function(){

    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);

   
})
    
  
    


