// BUILD YOUR SERVER HERE
//imports
const  express = require('express');
const server = express();
const Users = require('./users/model');

//global middleware
server.use(express.json())

//POST /api/users
server.post('/api/users', (req,res) =>{
    const {name, bio} = req.body;
    Users.insert({name, bio})
        .then(users =>{
            if (!users){
                res.status(400).json({message: "Please provide name and bio for the user"})
            }else {
                res.status(201).json(users)
            }
        })
        .catch(err =>{
            res.status(500).json({message: "There was an error while saving the user to the database"})
        })
})

//GET /api/users
server.get('/api/users', (req,res) =>{
    Users.find()
    .then(users =>{
        res.status(200).json(users)
    })
    .catch(err =>{
        res.status(500).json({message : "The users information could not be retrieved"});
    })
})

//GET ID /api/users/:id
server.get('/api/users/:id', (req, res) =>{

    const {id} = req.params;
    const {name, bio} = req.body;

    Users.findById(id)
        .then(user =>{
            if(!user) {
                res.status(404).json({message: "The user with the specified ID does not exist"})
            } else {
                res.json(user)
            }
        })
        .catch(err =>{
            res.status(500).json({message: "The user information could not be retrieved"})
        })
})

//DELETE BY ID
server.delete('/api/users/:id', (req, res)  =>{
    const {id} = req.params;
    Users.remove(id) 
        .then(removed =>{
            if(!removed){
                res.status(404).json(`{ message: "The user with the specified ID= ${id} does not exist" }`)
            } else {
                res.json(removed)
            }
        })
        .catch(err =>{
            res.status(500).json({ message: "The user could not be removed" })
        })
})

//PUT BY ID update

server.put('/api/users/:id', (req,res) =>{
    const {id} = req.params;
    const {name, bio} = req.body;

    Users.update(id, {name, bio})
        .then(updateUser =>{
            if(!updateUser){
                res.status(404).json({message: 'the user with the specified ID does not exist'})
            } else if(!name || !bio){
                res.status(400).json({message: 'please provide name  and bio'})
            }else {
                res.json(updateUser)
            }
        })
        .catch(err =>{
            res.status(500).json({message: 'The user information could not be modified'})
        })
})

module.exports = server; // EXPORT YOUR SERVER instead of {} //this is exactly like export  default  on react
