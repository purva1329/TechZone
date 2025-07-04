let watch={
    cname:"titan",
    des:"aster fs1 pro smart",
    price:5000
}

let student=new Object();
student.name="purva";
student.age=18;
student.marks=97;
console.log(student);


function employee(id,name,salary)
{
    this.id=id;
    this.name=name;
    this.salary=salary;
}


let book={
    title:"harry potter",
    author:"j.k.rowling",
    price:500,
    gener:["fiction","fantasy"],
    info:function(params){
        return `${this.title} by ${this.author} is a ${this.gener} book`
    }
}
console.log(book.gener[0]);


