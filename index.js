/**
 * How to run the Node JS
 * Open the Terminal to current directory > node index.js(file name)
 
 * for auto deploy
 * Open the Terminal to current directory > nodemon index.js(file name)
 * **/

const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

var HelloPage = "<body style='background-color:black'><center><h1 style='color:gold; font-size: 200px; margin-top: 400px'>First Deployment to the nowhere</h1></center></body>";


const courses = [
    { id: 1, name: 'cours 1' },
    { id: 2, name: 'cours 2' },
    { id: 3, name: 'cours 3' },
    { id: 4, name: 'cours 4' },
    { id: 5, name: 'Jenkins Auto Trigger' }
];

app.get('/', (req, res) => {
    res.send(HelloPage);
});

app.get('/api/courses', (req, res) => {
   
    res.send(courses);
});

app.get('/api/sqrt', (req, res) => {
    var val = 0.0001;
    for(var i = 0; i <= 1000000000; i++){
        val += Math.sqrt(val);
    }
   
    
    res.send('SQRT Value = '+ val);
});

app.get('/api/courses/:id', (req, res) => {
    //res.send(req.params.i d);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id is not found..');
    res.send(course);
});

app.post('/api/courses', (req, res) => {

    // const schema = {
    //     name: Joi.string().min(3).required()
    // };

    // const result = Joi.validate(req.body, schema);

    // if (result.error) {
    //     // 400 Bad Request
    //     res.status(400).send(result.error.details[0].message);
    //     return;
    // }

    console.log('Post methos called...');

    const { error } = validateCourse(req.body);
    if (error) {
        // 400 Bad Request
        return res.status(400).send(result.error.details[0].message);
    }


    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404

    console.log('Put method called...');

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('The course with the given id is not found..');
    }

    // Validate
    // If invalide, return 400 - Bad request
    // const result = validateCourse(req.body); // if eka (result.error) kiyala ganna eka nathinawa yata line eken.
    const { error } = validateCourse(req.body);
    if (error) {
        // 400 Bad Request
        res.status(400).send(error.details[0].message);
        return;
    }

    // Update Cource
    // Return the updatedcourse
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('The course with the given id is not found..');
    }

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
});

// Setting the port.
const port = process.env.PORT || 3004;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// Validation Function
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}