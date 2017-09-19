//Selecting the necessary DOM elements
const list = $(".student-item");
const listSize = list.length;
const dynamicHtml = $("div.pagination");
const numberOfPages = Math.ceil(listSize/10);
const pageHeader = document.querySelector('.page-header');
const button = document.createElement('button');
const input = document.createElement('input');
const div = document.createElement('div');
const h2 = document.querySelector('h2');

div.className = "student-search";
input.placeholder = "student search";
button.innerText = "Search";
button.className = "SearchButton";

pageHeader.appendChild(div);
div.appendChild(input);
div.appendChild(button);

let h3 = document.querySelectorAll("h3");
let spanner = document.querySelectorAll('span.email');
let buttonClick = document.querySelector(".SearchButton");
let SearchBoxVal = document.querySelector('input');

function showPage(pageNumber,array) {              //Shows the students on the corresponding page
     list.hide();                            //hides all students on the page
     for(var i=0;i<array.length;i+=1){           //loops through all students in our student list
       if(Math.ceil((i+1)/10)==pageNumber){  //Checks if student is on the page,i+1 since index starts from 0
         if(array == list){    // If argument
           $(list[i]).show();
         }
         else{
           $(list[array[i]]).show();
         }
       }
     }
}

function appendPageLinks(pages,array) {
    let htmlString = `<ul><li><a class="active" id="1" href="#">1</a></li>`;  //placeholder string to add user interactivity (click)
    for(let i=2;i<=pages;i+=1){  //Will add more anchor tags incase of more pages
      htmlString += `<li><a href="#" id=${i}>${i}</a></li>`;  //Adding ID as indexvalue to every anchor tag
    }
     dynamicHtml.html(htmlString);  //Using html method to add html to our placeholder Div tag in index.html
     for(let i=1;i<=pages;i+=1){
      $("a#"+i).on('click',()=>{  //Event handler on new anchor tags
        $("a").attr("class","");  //Removes the active class from all anchor tags
        showPage(i,array);  //Shows the page with the corresponding students
        $("a#"+i).attr("class","active")}); //Adds active to the class of the current anchor tag
      }
    }

function searchList() {
    let arrayCheck = [];
    h2.innerText = "STUDENTS";
    let value = SearchBoxVal.value; //Obtain the value of the search input
    var counter = 0;
    list.hide();  //remove the previous page link section
     for(let i=0;i<listSize;i+=1){  //Loop over the student list, and for each student…
       if(h3[i].innerText.startsWith(value) || spanner[i].innerText.startsWith(value) ){  //If the Name or email includes our search query
         arrayCheck.push(i);
         $(list[i]).show(); //Show that list item
         counter += 1;
       }
     }
//
     let number = Math.ceil(counter/10);
     console.log(number);
     $('a').hide();  //Hides all the anchor links at the bottom
//
      console.log(arrayCheck);
      if(counter == 0){
          h2.innerText = "No Students Found!";  //No students found
          $('a').hide();
      }
      if(counter === listSize){
        showPage(1,list);
        appendPageLinks(number,list);
        $('a').show();
      }
      if(counter>10 && counter<listSize){
        appendPageLinks(number,arrayCheck);  //Creates anchor links according to the number of matching students
          showPage(1,arrayCheck);
          for( let i=0; i<number ; i += 1){
            $(`a#${i}`).show();
          }
      }
}

showPage(1,list);  // Initializes the  first page with at the most 10 students (can be less)
appendPageLinks(numberOfPages,list); // Calls the appendPageLinks function to facilitate user interaction
buttonClick.addEventListener('click',()=>{  //Event listener on the search button
  searchList();
 });
