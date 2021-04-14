const TaskModel = require('../Models/Task.Model');

exports.Create = async(req, res) => {
    if (req.body == null) {
        res.status(400).send('Please include a body.');
    }
    await TaskModel.createTask(req.body)
        .then((result) => {
            res.status(201).send({ id: result._id });
        });
};

exports.getById = (req, res) => {
    TaskModel.findById(req.params.taskId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.listAll = async(req, res) => {
    await TaskModel.list(req.params.page)
        .then((result) => {
            res.status(200).send(result);
        });
}

exports.delete = async(req, res) => {
    if (await TaskModel.findById(req.params.taskId) == false) {
        res.status(400).send();
    }
    await TaskModel.delete(req.params.taskId)
    res.status(204).send();
}

exports.Patch = async(req, res) => {
    try {
        await TaskModel.modify(req.params.taskId, req.body);
    } catch (error) {
        console.log(error);
    }
    res.status(204).send();
}

exports.Count = async(req, res) => {
    res.status(200).send(await TaskModel.Count());
}