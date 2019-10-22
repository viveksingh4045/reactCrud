const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const INCRoutes = express.Router();
const PORT = 4000;
let  INC = require('./data');
//let Todo = require('./todo.model');
app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://admin:admin@ninjaprogram-xlxya.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})
INCRoutes.route('/').get(function(req, res) {
    INC.find(function(err, incs) {
        if (err) {
            console.log(err);
        } else {
            res.json(incs);
        }
    });
});
INCRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    INC.findById(id, function(err, inc) {
        res.json(inc);
    });
});
INCRoutes.route('/update/:id').post(function(req, res) {
    INC.findById(req.params.id, function(err, inc) {
        if (!inc)
            res.status(404).send("data is not found");
        else
        inc.INC_Description = req.body.INC_Description;
        inc.INC_Subject = req.body.INC_Subject;
        inc.INC_RaisedOn = req.body.INC_RaisedOn;
        inc.INC_ImpactedApplications = req.body.INC_ImpactedApplications;
        inc.INC_Priority = req.body.INC_Priority;
        inc.INC_AssignedTo = req.body.INC_AssignedTo;
        inc.INC_Status = req.body.INC_Status;
        inc.INC_Type = req.body.INC_Type;
        inc.INC_ResolverGroup = req.body.INC_ResolverGroup;
        inc.INC_RouteCause = req.body.INC_RouteCause;
        inc.save().then(inc => {
                res.json('inc updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});
INCRoutes.route('/add').post(function(req, res) {
    let inctrial = new INC(req.body);
    inctrial.save()
        .then(inctrial => {
            res.status(200).json({'INC': 'INC added successfully'});
            res.redirect('/view');
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});
app.use('/incs', INCRoutes);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});