const taskContainer = document.querySelector(".task__container");  // Another way to get the class or select the class like getElementById
const globalStore = [];  //Array of objects // Globally store the data in an array and it might used as local storage
console.log(taskContainer);    // Printing the selected division but here we face Issue 😕
// do not use curly braces when you used backtick.. To use multiline HTML code don't use curly braces use backtick
const generateNewCard = (taskData) =>`
 <div class="col-sm-12 col-md-6 col-lg-4 mt-4 shadow" id = ${taskData.id}>
    <div class="card">
       <div class="card-header d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-outline-success"><i class="fa-solid fa-pen-to-square"></i></button>
      <button type="button" class="btn btn-outline-danger"><i class="fa-solid fa-trash-can"></i></button>
</div>
<div class="card-body">
 <img class ="card-img-top" src= ${taskData.imageUrl} class="card-img-top" alt="...">
 <h5 class="card-title fw-bolder text-primary">${taskData.taskTitle}</h5>
 <p class="card-text">${taskData.taskDescription}</p>
 <a href="#" class="btn btn-primary">${taskData.taskType}</a>
</div>
</div>
</div>
  `;
const loadInitialCardData = () =>{

  //local storage to get tasky card data
  const getCardData = localStorage.getItem("tasky"); //getItem returns an item based on the id you give here id is "tasky"

  //Converting array of object to normal object
  // here we are using destructuring. {cards} is an object and this JSON.parse(getCardData) entire is parsed data inside the object and it works in destructuring format and data will get into the cards. Therefore cards is object of object
  const {cards} = JSON.parse(getCardData); // parse() is the reverse method of stringify // here we are creating const called taskData and parsing our getCardData and Converting into normal object
   //Why we are converting the objects in array format? Because local storage accepts the data in array format
  //loop over those array of task object to create HTML card, inject it to DOM
  cards.map((cardObject) =>{  //map can iterate through any thing which has multiple element not in just array
    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData)); // Here this function generates the previous card when after refreshing
    //Updating our globalStore
    globalStore.push(cardObject); // here we are Updating the globalStore with the help of local storage
  })


}
const saveChanges = () => {   // Used this function because inside modal we have save changes button for that
  const taskData = {         // We are creating key value pairs and back tickmis ude used to see result in unique manner
    id: `${Date.now()}`,    // ${Date.now()} is used to generate id uniquely
    //${xyz} xyz can change in near future      // $ is used to dynamically render some values here Date.now changes every second it generates new value
    imageUrl: document.getElementById("imageurl").value,  // document is the parent of DOM so it will get element by it's unique id inside the quotes
    taskTitle: document.getElementById("tasktitle").value, // getting the element by id here document is HTML code and we are geting id from it thats why
    taskType: document.getElementById("tasktype").value,
    taskDescription: document.getElementById("taskdescription").value // it is basically to get the values that we were given as input


  }; // we paste the card here because we want the things like image,task title etc should be change
    // ${xyz} This will vary according to the user input thats why we used ${}


  // beforeend attribute is used because we want to add our new card to added RHS untill the space is over
  // It will add new card in the adjacent of present card
  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject)); // It extracts the recent child and add whatever you want to add whatever the adjacent is available there
  globalStore.push(taskData); // Here want to add these data present in taskData using push method because globalStore is an array why we pushing? because we want to store our cards in local storage that is array

  // Below method is used because we directly cannot store the data in localStorage
  // Many people use the localStorage and we have to provide an unique id to uniquely identify the stored objects... here tasky is unique id
  // If tasky is used by anyone else on the internet then there will be probability that it will come to local storage that is why we are using id uniquely

  //localStorage.setItem("tasky",globalStore); // localStorage represent my entire storage , setItem is one of the method of local storage... here we are setting the globalStore item to localStorage
 // inspect->Application->localStorage there it show key value pair and object of object(nested object - inside the object of object)
 // JSON.stringify() - It basically takes object of object and converts it into array of object simple it is
 // stringify takes some key value pair
   localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));  // curly braces is there because it takes key value pair like dictionary //setItem basically sets the attribute or items that we passes to our local storage
  // The O/P will be {"cards":[{"id:2413425432", "imageUrl": image address}]}

};

// Issues like on refreshing the added card gets dissapears
//Adding functionality in edit and delete button

//API- Application Programming interface
// local storage- Accessing apllication via local storage..here we don't know DB implementation
// And we want to store the cards in local storage while refreshing no data loss we want
// Local storage implementation helps to dive into advance document object manipulation
//i= Interface - Interface is the middle man
