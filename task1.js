
const student = {
  name: "Purva",
  age: 20,
  course: "Computer Technology",
  address: {
    street: "Katraj",
    city: "Pune",
    pincode: 411009
  },
  marks: {
    semester1: {
      java: 95,
      DSN: 93
    },
    semester2: {
      java: 98,
      web: 92
    }
  }
};

console.log("City:", student.address.city);          
console.log("Java Marks:", student.marks.semester2.java); 