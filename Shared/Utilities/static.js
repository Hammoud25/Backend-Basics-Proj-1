exports.PatchData = (data, model) => {
    if (data.name != null) {
        model.name = data.name;
    }
    if (data.count != null) {
        model.count = data.count;
    }
    if (data.isValidated != null) {
        model.isValidated = data.isValidated;
    }
    return;
}