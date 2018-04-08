const validate = (val, rules, connectedValue) => {
  let isValid = true;
  for (let rule in rules) {
    switch (rule) {
      case 'required':
        isValid = isValid && requiredValidator(val)
        break;
      case 'isEmail':
        isValid = isValid && emailValidator(val)
        break;
      case 'minLength':
        isValid = isValid && minLengthValidator(val, rules[rule])
        break;
      case 'maxLength':
        isValid = isValid && maxLengthValidator(val, rules[rule])
        break;
      case 'equalTo':
        isValid = isValid && equalToValidator(val, connectedValue[rule])
        break;
      default:
        isValid = false;
    }
  }
  return isValid
}


const requiredValidator = val => {
  return val.trim().length > 0
}

const emailValidator = val => {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val)
}

const minLengthValidator = (val, minLength) => {
  return val.trim().length >= minLength
}

const maxLengthValidator = (val, maxLength) => {
  return val.trim().length <= maxLength
}

const equalToValidator = (val, checkValue) => {
  return val === checkValue
}

export default validate;
