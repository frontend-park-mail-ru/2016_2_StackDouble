/**
 * Created by root on 16.09.16.
 */
(function () {
    'use strict'

    // Template string

    let name = 'Nubo';
    let age =2;

    alert(`My name is ${name}. I am ${age} yo!`);

    // Class

    class Animal{
        constructor(options){
            this.name=options.name;
            console.log('Create new instance!')
        }

        sayHello(){
            console.log(`Hello! I am ${this.name}`);
        }
    }

    let animal = new Animal({
        name:'Bob'
    });

    animal.sayHello();

    class Dog extends Animal{
        constructor(options){
            super(options);
            this.someField='foo';
        }

        bark (){
            super.sayHello();
            console.log('Woff-woff')
        }

        static catchDog(dog){
            Dog.__instances.push(dog);
        }
    }

    Dog.__instances = [];

    let bob =new Dog({
        name:'Bob'
    });

    Dog.catchDog(bob);
    bob.bark();
})();