const mongoose = require('../../Shared/Services/mongoose.service').mongoose;
const TaskDto = require('../../Shared/Services/DTOs.service').TaskDto;
const Patcher = require('../../Shared/Utilities/static');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: String,
    count: Number,
    isValidated: Boolean
});

TaskSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
TaskSchema.set('toJSON', {
    virtuals: true
});

TaskSchema.findById = function(id) {
    return this.model('Tasks').find({ id: this.id }, id);
};

const Task = mongoose.model('Tasks', TaskSchema);

exports.findById = (id) => {
    return Task.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createTask = async function f(taskData) {
    const task = new Task(taskData);
    return await task.save();
};

exports.list = async() => {
    return await Task.find().then(
        (result) => {
            var dtoList = new Array();
            result.forEach(element => {
                const dto = new TaskDto(element.id, element.name, element.count, element.isValidated);
                dtoList.push(dto);
            });
            return dtoList;
        });
};

exports.delete = async(id) => {
    return await Task.findByIdAndDelete(id);
}

exports.modify = async(id, data) => {
    if (data != null) {
        var tasktoSave = await Task.findById(id);
        Patcher.PatchData(data, tasktoSave);
        tasktoSave.save();
        return;
    }
    throw TypeError('Request must have a body!');
}