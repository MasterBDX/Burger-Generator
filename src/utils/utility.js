const updateObject = (oldState,updateProps)=>{
      return {
                ...oldState,
                ...updateProps
             }
}

export default updateObject


export const inputGenerator = (inputtype, config, validators, value) => {
      let valid = false
      if (inputtype === 'select') {
          valid = true;
      }
      return {
          inputtype: inputtype,
          config: config,
          value: value,
          validators: validators,
          valid: valid,
          touched: false
      }
  }

export const  checkValidity = (value, rules) => {
      let isValid = true
      if (rules.required) {
          isValid = value !== '' && isValid;
      }
      if (rules.minLength) {
          isValid = value.length >= rules.minLength && isValid
      }
      return isValid
  }