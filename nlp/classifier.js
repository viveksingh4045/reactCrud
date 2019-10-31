var _ = require("underscore");

var natural = require('natural');

var classifier = new natural.BayesClassifier;

const express = require('express');

const cors = require('cors')

const app = express()

app.use(cors())

const mongoose = require('mongoose')

const Post = require('./database/models/data')

const fs = require('fs')

mongoose.connect('mongodb+srv://admin:admin@ninjaprogram-xlxya.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

//mongoose.connect('mongodb+srv://admin:admin@ninjaprogram-xlxya.mongodb.net/NinjaProgramme?retryWrites=true&w=majority')

Post.find().lean().exec(function (err, posts) {
    //    console.log((JSON.stringify(posts)));
    fs.writeFileSync('./data.json', (JSON.stringify(posts)));
}
)
// var postnew = require('./data.json')

// var filtered = _.where(JSON.parse(postnew), {INC_Status: "Resolved"});
// console.log(filtered) 
// // let x = 'Resolved'
// // x = this.state.posts.filter((y) => {
// //     // fs.writeFilesync('/student-2.json', y.INC_Status.toString().toLowerCase().indexOf(this.state.x.toString().toLowerCase()) !== -1)

// //     console.log(y.INC_Status.toString().toLowerCase().indexOf(this.state.x.toString().toLowerCase()) !== -1)

// // })



//var classifier = new natural.LogisticRegressionClassifier; 

//Training data

//     const data = require("./abs.json")
const data1 = require("./data.json")

//Add  Training Externally

data.forEach(item => {
        classifier.addDocument(item.Summary, item.Description)
    })

data1.forEach(item => {
        classifier.addDocument(item.INC_Description, item.INC_RouteCause)
    })

//Train

classifier.train();

    //Persisting and Saving

    classifier.save('incidentclassifier.json', function (err, classifier) { });

    //Classify/Predict

    app.get('/classify/:desc', (req, res) => {
        let desc = req.params.desc;
        console.log(desc)
        console.log('writing response')
        res.end(classifier.classify(desc))
    })

// console.log(classifier.classify('Need account summary'))

// console.log(classifier.classify('1626'));

// console.log(classifier.classify('API Issue'));

// console.log(classifier.classify('Need transaction summary'))

// console.log(classifier.classify('Need customer information'))



app.listen(8080, () => {
        console.log('App Listening to given port')
    })
