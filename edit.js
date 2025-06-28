const form=document.getElementById("editForm");
const id=new URLSearchParams(window.location.search).get("id");

async function loadBook(){
    const res=await fetch(`http://localhost:3000/books/${id}`);
    const book=await res.json();
    form.title.value=book.title;
    form.author.value=book.author;
    form.year.value=book.year;
}

loadBook();

form.addEventListener("submit",async (e)=>{
    e.preventDefault();
    const updatedBook={
        title:form.title.value,
        author:form.author.value,
        year:parseInt(form.year.value)
    };

    await fetch(`http://localhost:3000/books/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(updatedBook)
    });

    window.location.href="index.html"
});