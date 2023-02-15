//array
const arr = [2, 6, 8, 4];
const newArr = [...arr, 1, 9]
console.log(newArr);

//objects
const Person = {
    City: "Virar",
    Country: "India",
    Phone: 9372455048
}
const Human = {
    name: "Sid",
    Phone: 8208465375,
    ...Person,
    age: 28
}
console.log(Human)