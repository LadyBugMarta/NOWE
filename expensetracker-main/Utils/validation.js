exports.required = (obj, fields) => {
    const isValid = true;
    for (const field of fields) {
        if (!obj[field]) {
           return false;
        }
    }

    return isValid;
};