class Human {
    /*
    //old way
    constructor() {
        this.gender =  "Female";
    }
    printGender() {
        console.log(this.gender);
    }
    */
   //new way
   gender = "Female";
   printGender = () => {
    console.log(this.gender);
   }
}

class Person extends Human {
    /*
    //old way
    constructor() {
        super(); // have to do this
        this.name = "Sid";
        this.gender = "Male";
    }
    printName() {
        console.log(this.name);
    }
    */
   //new way
   name = "Sid";
   gender = "Male";
   printName = () => {
    console.log(this.name);
   }
}

const pers = new Person()
pers.printName();
pers.printGender();