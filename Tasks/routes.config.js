const TaskController = require('./Controller/Task.Controller');

exports.routesConfig = function(app) {
    app.post('/tasks/create', [
        TaskController.Create
    ]);
    app.get('/tasks/:taskId', [
        TaskController.getById
    ]);
    app.get('/tasks:page', [
        TaskController.listAll
    ]);
    app.delete('/tasks/:taskId', [
        TaskController.delete
    ])
    app.patch('/tasks/:taskId', [
        TaskController.Patch
    ])
    app.get('/tasks/count', [
        TaskController.Count
    ])
};