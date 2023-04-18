export class Training {
    id : number;
    name : string;
    description : string;
    price : number;
    quantity : number;

    constructor(id : number, name: string, description : string, quantity : number,price : number,){
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
    }
    getId() { return this.id; }
    getName() { return this.name; }
    getPrice() { return this.price; }
    setPrice(price:number) { this.price = price; }
    getQuantity() { return this.quantity; }
    setQuantity(quantity:number) { this.quantity = quantity; }
    toString() {
        return " id:" + this.id + " " + this.name + " " + this.price + "€";
    }
}
