import express from 'express'
const app = express()
import mongoose from 'mongoose'
import PersonModel from './Model'
import * as dotenv from 'dotenv'

dotenv.config();


//1
app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
})

mongoose.connect(process.env.CONNECTION_MONGOOSE)
.then(
    () => {
        console.log('Conncection to mongoose successful');
    }
)
.catch(
    (err) => {
        console.error(err);
    }
)

//3
let person = new PersonModel({
    name: 'Ali',
    age: 25,
    favoriteFoods: ['Pizza', 'Chawarma', 'Spaghetti']
})
person.save((err, data) => {
    if (err) { console.log(err) }
})

//4
let doc = PersonModel.create([
    {
        name: 'Mariem',
        age: 28,
        favoriteFoods: ['Talgiatelli', 'Chickenwings', 'Boritos']
    },
    {
        name: 'Ahmed',
        age: 44,
        favoriteFoods: ['Lasagna', 'Risotto']
    },
    {
        name: 'Mounir',
        age: 33,
        favoriteFoods: ['Hamburger', 'Takos']
    },
    {
        name: 'Salma',
        age: 26,
        favoriteFoods: ['manouché', 'Brik', 'Kafteji']

    }
])

//5
var searchName = function (name, done) {

    let query = PersonModel.find({ name: name })
    query.exec(function (err, data) {
        if (err) return done(err)
        return done(null, data);
    });
}

//6
var searchFood = function (food, done) {
    PersonModel.findOne({ favoriteFoods: `Takos` }, function (err, data) {
        if (err) {
            return done(err);
        }
        return done(null, data);

    });

};

//7
var searchId = (Id, done) => {
    PersonModel.findById(Id, (err, data) => err ? done(err) : done(null, data));
};

//8
var searchAndSave = function (Id, done) {
    let newFoodToADD = 'Marka';
    let Person = PersonModel.findById(Id, function (err, person) {
        if (err) return console.log(err);
        person.favoriteFoods.push(newFoodToADD);
        person.save(function (err, data) {
            if (err) console.log(err);
            done(null, data)
        });
    })
}

//9
var searchAndSaveOne = function (name, done) {
    let newAge = 20;

    PersonModel.findOneAndUpdate(
        { name: name },
        { age: newAge },
        { new: true },
        (err, data) => {
            if (err) {
                done(err);
            }
            done(null, data);
        }
    )
};

//10
var deleteId = function (Id, done) {
    PersonModel.findByIdAndRemove(Id, (err, data) => err ? done(err) : done(null, data));
};

//11
var deleteManyPerson = function (done) {
    let name = "Salma";
    PersonModel.deleteMany({ name: name }, function (err, data) {
        if (err) {
            done(err);
        } else {
            done(null, data);
        }
    });
};

//12
var chainSearch = function (done) {
    let food = "Pizza";
    let jsonObject = { favoriteFoods: food };
    PersonModel.find(jsonObject).sort({ name: 1 }).limit(2).select({ age: 0 }).exec((err, data) => {
        (err) ? done(err) : done(null, data);
    })
};
