const express = require('express');
const router = express.Router();
const poolDatabase = require('../database');

router.get('/', async function(req, res){
    const tasks = await poolDatabase.query('SELECT * FROM task');
    console.log(tasks);
    res.json(tasks);
    console.log('el cliente a ingresado a la pagina inicial');
});

router.get('/:id', async function(req, res){
    const {id} = req.params;
    const getTask = await poolDatabase.query('SELECT * FROM task WHERE id =?', [id]);
    res.json(getTask);
});

router.post('/', async function(req, res){
    const {name_task, description_task} = req.body;
    const newTask = {name_task, description_task};
    await poolDatabase.query('INSERT INTO task set ?', [newTask]);
    res.json(newTask);
});

router.put('/:id', async function(req, res){
    const {id} = req.params;
    const {name_task, description_task} = req.body;
    let updateTask = {name_task, description_task};
    await poolDatabase.query('UPDATE task set ? WHERE id = ?', [updateTask, id]);
    res.json(updateTask);
});

router.delete('/:id', async function(req, res){
    const {id} = req.params;
    await poolDatabase.query('DELETE FROM task WHERE id =?', [id]);
    res.json({
        status: "deleted"
    });
});

module.exports = router;