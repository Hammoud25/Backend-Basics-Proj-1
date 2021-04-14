exports.TaskDto = class TaskToListDto {
    constructor(id, name, count, isValidated) {
        this.id = id;
        this.name = name;
        this.count = count;
        this.isValidated = isValidated;
    }
}