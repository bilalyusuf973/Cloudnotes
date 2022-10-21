const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')

//ROUTE 1: create notes using : POST 'api/notes/newnote'. Login required

router.post('/newnote', fetchuser, [
    body('title', 'Title cannot be blank').exists(),
    body('description', 'Description must be atleast 5 characters').isLength({min: 5})], async (req, res)=>{

    // check for errors and if there are errors then show them
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        
        const note = await Notes.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
            code: req.body.code
        });

        res.json(note);

    } catch (error) {
        res.status(400).send({error: 'Internal server error'});
    }

});


//ROUTE 2: fetch all notes of a user using : GET 'api/notes/fetchallnotes'. Login required

router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    
    try {

        const notes = await Notes.find({user: req.user.id});
        res.json(notes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!"); 
    }
});


//ROUTE 3: update an existing note of a user using : PUT 'api/notes/updatenote'. Login required

router.put('/updatenote/:id', fetchuser, async (req, res)=>{

    try {

        const {title, description, tag, code} = req.body;

        const newNote = {};
    
        if(title) {newNote.title = title};
        if(description) {newNote.description = description};
        if(tag) {newNote.tag = tag};
        if(code) {newNote.code = code};
    
        //find note in the database with a corresponding id to be updated
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found!")};
    
        //verify that the user is changing his own notes not others
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed!");
        }
    
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        
        res.json({note});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");        
    }

});


//ROUTE 4: deleting an existing note of a user using : DELETE 'api/notes/deletenote'. Login required

router.delete('/deletenote/:id', fetchuser, async (req, res)=>{

    try {

        //find note in the database with a corresponding id to be deleted
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found!")};

        //verify that the user is deleting his own notes not others
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed!");
        }

        note = await Notes.findByIdAndDelete(req.params.id);


        res.json({"Success" : "Note has been deleted"});   

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }

});

module.exports = router;