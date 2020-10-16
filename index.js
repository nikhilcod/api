const express = require('express');
const employees = require('./employees.js');
const PORT = 3000;

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log(`Listening on port ${PORT}`);
});

app.get('/', (req, res) => {
    // res.send("It is a GET request.");
    res.json({
        message: "API is working ..."
    });
});

app.get('/api/employees', (req, res) => {
    res.json(employees);
});

app.post('/api/employees', (req, res) => {
    //console.log(req.body);
    //res.send('Employees POST request');

    const user = {
        id: employees.length + 1,
        first_name: req.body.first_name,
        gender: req.body.gender
    };

    if (!req.body.first_name) {
        res.status(400);
        return res.json({
            error: "First Name is required ..."
        })
    }

    employees.push(user);
    res.json(user);
});

app.put('/api/employees/:id', (req, res) => {
    const id = req.params.id;
    const first_name = req.body.first_name;
    const gender = req.body.gender;

    const index = employees.findIndex((employees) => {
        return (employees.id == id);
    });

    //console.log(id, req.body, index);

    if (index >= 0) {
        const emp = employees[index];
        emp.first_name = first_name;
        emp.gender = gender;

        res.json(emp);
    } else {
        res.status(404);
        res.end();
        res.json({
            error: "File Not Found"
        })
    }

    // console.log(id);

    // res.json(id);
});

app.delete('/api/employees/:id', (req, res) => {
    const id = req.params.id;

    const index = employees.findIndex((employees) => {
        return (employees.id == id);
    });

    if (index >= 0) {
        const emp = employees[index];

        employees.splice(index, 1);

        res.json(emp);
    } else {
        res.status(404);
        res.json({
            error: "File Not Found"
        })
    }
});

