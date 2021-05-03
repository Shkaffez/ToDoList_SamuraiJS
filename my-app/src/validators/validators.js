export const Required = value => value ? undefined : "Field required";

export const emailValidator = email => {
    let regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(regex.test(email) === false) {
        return "Enter correct email"
    } else {
        return undefined;
    }

}

export const composeValidators = (...validators) => value =>
validators.reduce((error, validator) => error || validator(value), undefined);