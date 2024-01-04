const UNCOMPLETED_LIST_BOOK_ID = "books";
const COMPLETED_LIST_BOOK_ID = "completed-books";
const BOOK_ITEMID = "itemId";

function makeBook (booktitle, bookauthor, textyear, isCompleted ) {

    const textTitle = document.createElement("h2");
    textTitle.innerText = booktitle;

    const textAuthor = document.createElement("h3");
    textAuthor.innerText = bookauthor;

    const textYear = document.createElement('p');
    textYear.innerText = textyear;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(textTitle, textAuthor, textYear)

    const container = document.createElement("div");
    container.classList.add("item", "shadow")
    container.append(textContainer);
    
    if(isCompleted){
        container.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        container.append(
            createCheckButton(),
            createTrashButton()
        

        );
    }

    return container;
}

function createUndoButton() {
    return createButton("undo-button", function(event){
        undoTaskFromCompleted(event.target.parentElement);
    });
}

function createTrashButton() {
    return createButton("trash-button", function(event){
        removeTaskFromCompleted(event.target.parentElement);
    });
}

function createCheckButton() {
    return createButton("check-button", function(event){
        addTaskToCompleted(event.target.parentElement);
    });
}

function createButton(buttonTypeClass , eventListener ) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}


function addBook() {
    const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const textBook = document.getElementById("title").value;
    const textAuthor = document.getElementById("author").value;
    const textyear = document.getElementById("year").value;

    const book = makeBook(textBook, textAuthor, textyear, false);
    const bookObject = composeBookObject(textBook, textAuthor, textyear, false);

    book[BOOK_ITEMID]= bookObject.id;
    books.push(bookObject);

    uncompletedBOOKList.append(book);
    updateDataToStorage();
}
function addTaskToCompleted(taskElement ) {
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskAuthor = taskElement.querySelector(".inner > h3").innerText;
    const taskTextyear = taskElement.querySelector(".inner > p").innerText;
    
    const newBook = makeBook(taskTitle, taskAuthor, taskTextyear, true);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID]= book.id;

    listCompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function removeTaskFromCompleted(taskElement ) {

    const bookPosition= findBookIndex(taskElement[BOOK_ITEMID]);
    books.splice(bookPosition,1);

    taskElement.remove();
    updateDataToStorage();

}

function undoTaskFromCompleted(taskElement ){
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskAuthor = taskElement.querySelector(".inner > h3").innerText;
    const taskTextyear = taskElement.querySelector(".inner > p").innerText;

    const newBook = makeBook(taskTitle, taskAuthor, taskTextyear, false);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    listUncompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();

}
