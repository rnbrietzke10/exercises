class Vehicle {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  honk() {
    return "Beep";
  }
  toString() {
    return `The vehicle is a ${this.make} ${this.model} from ${this.year}`;
  }
}

// let myFirstVehicle = new Vehicle("Honda", "Monster Truck", 1999);

/*
 * Part Two
 */

class Car extends Vehicle {
  constructor(make, model, year) {
    super(make, model, year);
    this.numWheels = 4;
  }
}

// let myFirstCar = new Car("Toyota", "Corolla", 2005);

/*
 * Part Three
 */

class Motorcycle extends Vehicle {
  constructor(make, model, year) {
    super(make, model, year);
    this.numWheels = 2;
  }

  revEngine() {
    return "VROOM!!!";
  }
}

// let myFirstMotorcycle = new Motorcycle("Honda", "Nighthawk", 2000);

/*
 * Part Four
 */

class Garage {
  constructor(capacity) {
    this.capacity = capacity;
    this.vehicles = [];
  }

  add(vehicle) {
    if (typeof vehicle !== "object" || vehicle === null) {
      return "Only vehicles are allowed here";
    } else if (this.vehicles.length >= this.capacity) {
      return "Sorry, we're full.";
    } else {
      this.vehicles.push(vehicle);
      return "Vehicle added!";
    }
  }
}

let garage = new Garage(2);
