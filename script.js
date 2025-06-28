const form=document.getElementById('bookForm');
const bookList=document.getElementById("bookList");

form.addEventListener("submit",async (e) =>{
    e.preventDefault();
    const data={
        title:form.title.value,
        author:form.author.value,
        year:parseInt(form.year.value)
    };

    await fetch("http://localhost:3000/books",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });

    form.reset();
    loadBooks();
});

async function loadBooks(){
    const res=await fetch("http://localhost:3000/books/");
    const books=await res.json();
    bookList.innerHTML="";
    books.forEach(book =>{
        bookList.innerHTML +=`
        <div>
        <strong>${book.title}</strong> by ${book.author}  (${book.year})
        <button onclick="deleteBook('${book._id}')"> Delete </button>
        <a href="edit.html?id=${book._id}">Edit</a>
        </div>
        `;
    });

}
loadBooks();

async function deleteBook(id){
    await fetch(`http://localhost:3000/books/${id}`,{
        method:"DELETE"
    });
    loadBooks();
}