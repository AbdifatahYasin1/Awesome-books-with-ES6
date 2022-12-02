import {
  displayBooks,
  displayForm,
  contact,
  displayContact,
  showBooksOnly,
  showOnlyContact,
  showOnlyForm,
} from "./modules/view.js";

let form = document.querySelector("#form");
let Author = document.querySelector(".Author");
let Title = document.querySelector(".Title");
let msg = document.getElementById("msg");
let bookText = document.getElementById("book-text");
// let containerbooks = document.querySelector(".container-books");
// let container = document.querySelector(".container");
let list = document.querySelector(".list");
const addNew = document.querySelector(".addNew");
// const contact = document.querySelector("#contact");
// const displayContact = document.querySelector("#display_contact");
// const displayBooks = document.querySelector("#display_list");
// const displayForm = document.querySelector("#display_form");
// const date = document.querySelector(".date");

class Book {
  constructor() {}

  static validateInputData(title, author) {
    if (title.length < 1 || author.length < 1) {
      return false;
    }
    return true;
  }

  save(title, author) {
    let books = [];
    if (localStorage.getItem("book") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("book"));
    }
    let book = { text1: title, text2: author };
    books.push(book);
    localStorage.setItem("book", JSON.stringify(books));
  }

  static addBook(title, author) {
    const isValidInput = this.validateInputData(title, author);
    if (!isValidInput) console.log("Enter Valid Input");
    else {
      let book = new Book(title, author);
      book.save(title, author);
      this.renderBooks();
    }
  }

  static removeBook(title, author) {
    let books = [];

    if (localStorage.getItem("book") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("book"));
    }
    books.forEach((book, index) => {
      if (book.text1 === title && book.text2 === author) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("book", JSON.stringify(books));
    this.renderBooks();
  }
  static renderBooks() {
    bookText.innerHTML = "";
    let books = [];
    if (localStorage.getItem("book") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("book"));

      books.forEach((book) => {
        bookText.innerHTML += `
            <div class="wrapper">
                <p>${book.text1}</p>
                <p>${book.text2}</p>
                <button onclick="deleteBook('${book.text1}', '${book.text2}')">Remove</button>
                </div>
            `;
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", Book.renderBooks());

form.addEventListener("submit", (e) => {
  e.preventDefault();
  Book.addBook(Title.value, Author.value);
  Title.value = "";
  Author.value = "";
});

function deleteBook(text1, text2) {
  Book.removeBook(text1, text2);
}

///this is new
