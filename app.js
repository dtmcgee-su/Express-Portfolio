const express = require('express');
const{ projects }  = require('./data.json');

const app = express();
app.use(express.json());
app.use('/static', express.static('public'));

app.set('view engine', 'pug');

//Routes
app.get('/', (req, res, next) => {
    // res.locals = data.projects;
    res.render('index', {projects});
});

app.get('/about', (req, res, next) => {
    res.render('about');
});

app.get('/projects/:id', (req, res, next) => {
    const id = req.params.id;
    const project = projects[id];
    if (project){
        res.render('project', { project })
    } else {
        next();
    }
});

//Error Handling
app.use((req, res, next) => {
    const err = new Error('Sorry! This page does not exist!');
    err.status = 404;
    next(err);
});

// app.use((err, req, res, next) => {
//     if (err.status === 404){
//         res.locals.err = err;
//         res.status(err.status);
//         res.render('error');
//     } else {
//         // err.status = 500;
//         err.message = 'Error: server issue';
//         res.status = err.status;
//         res.render('error');
//     }
 
//     console.log(err.status, err.message);
// });

app.listen(3000, () => {
    console.log('You are live using port 3000!');
});