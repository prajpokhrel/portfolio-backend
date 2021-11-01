const errorConditions = (errors) => {
    errors.forEach((err) => {
        switch (err.code) {
            case "string.empty":
                err.message = "Input field value should not be empty!";
                break;
            case "string.alphanum":
                err.message =  "Input field value should have alpha-numeric characters only!";
                break;
            case "string.min":
                err.message = `Input field value should have at least ${err.local.limit} characters!`;
                break;
            case "string.max":
                err.message = `Input field value should have at least ${err.local.limit} characters!`;
                break;
            case "string.pattern.base":
                err.message = 'Password must contain 1 UPPERCASE, 1 lowercase, 1 numeric, 1 special and must be 8 characters long.';
                break;
            case "date.base":
                err.message = 'Looks like you forgot to add the required date!';
                break;
            case "array.base":
                err.message = 'Looks like you forgot something!';
                break;
        }
    });
    return errors;
}

module.exports.errorConditions = errorConditions;