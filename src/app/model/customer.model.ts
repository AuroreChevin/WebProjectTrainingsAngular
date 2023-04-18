export class Customer {
    
    name : string;
    firstname : string;
    address : string;
    phone : string;
    email : string;

    constructor(name: string, firstname : string, address : string, phone : string, email : string){
        this.name = name;
        this.firstname = firstname;
        this.address = address;
        this.phone = phone;
        this.email = email;
    }
}
