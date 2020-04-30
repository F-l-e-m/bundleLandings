const patterns = {
    email: /\S+@\S+\.\S+/,
    password: /^[a-z0-9а-яё]+$/i
};

const dynamicDataAttrKeys = {
  dataValid: 'data-valid',
  dataValue: 'data-value'
};

const dynamicDataAttrValues = {
    valid: 'valid',
    invalid: 'invalid',
    empty: 'empty',
    value: 'value'
};

const errorMessage = {
    email: {
        empty: 'Укажите e-mail',
        incorrect: 'Некорректный email'
    },
    password: {
        empty: 'Укажите пароль',
        short: 'Слишком короткий пароль',
        incorrect: 'Пароль не должен содержать спецсимволов!'
    }
};

export default class Validator {
    constructor(form) {
        this.form = form;
    }

    _addEvent(input) {
        switch (input.dataset.input) {
            case 'email':
                this.validateEmail(input);
                break;
            case 'pass':
                this.validatePassword(input);
                break;
        }
    }

    _getErrorBlock(type) {
        return this.form.querySelector(`[data-text-error-bind="${type}"]`)
    }

    validateEmail(input) {
        let errorBlock = this._getErrorBlock('email');
        if (errorBlock) this._validateEmailWithErrorBlock(input, errorBlock);
        else this._validateEmailWithoutErrorBlock(input);
    }

    validatePassword(input) {
        let errorBlock = this._getErrorBlock('pass');
        if (errorBlock) this._validatePasswordWithErrorBlock(input, errorBlock);
        else this._validatePasswordWithoutErrorBlock(input);
    }

    _validateEmailWithErrorBlock(input, errorBlock) {
        input.setAttribute(dynamicDataAttrKeys.dataValid, dynamicDataAttrValues.invalid);
        errorBlock.style.display = 'block';
        let value = input.value;
        const emailRegexp = patterns.email;
        if (!value) {
            input.setAttribute(dynamicDataAttrKeys.dataValid, dynamicDataAttrValues.invalid);
            input.setAttribute(dynamicDataAttrKeys.dataValue, dynamicDataAttrValues.empty);
            errorBlock.style.display = 'block';
            errorBlock.innerText = errorMessage.email.empty;
        } else {
            input.setAttribute(dynamicDataAttrKeys.dataValue, dynamicDataAttrValues.value);
            if (emailRegexp.test(value)) {
                input.setAttribute(dynamicDataAttrKeys.dataValid, dynamicDataAttrValues.valid);
                errorBlock.innerText = '';
                errorBlock.style.display = 'none';
            } else {
                input.setAttribute(dynamicDataAttrKeys.dataValid, dynamicDataAttrValues.invalid);
                errorBlock.style.display = 'block';
                errorBlock.innerText = errorMessage.email.incorrect;
            }
        }
    }

    _validateEmailWithoutErrorBlock(input) {
        input.setAttribute(dynamicDataAttrKeys.dataValid, dynamicDataAttrValues.invalid);
        let value = input.value;
        const emailRegexp = patterns.email;
        if (!value) {
            input.setAttribute(dynamicDataAttrKeys.dataValid, dynamicDataAttrValues.invalid);
            input.setAttribute(dynamicDataAttrKeys.dataValue, dynamicDataAttrValues.empty);
        } else {
            input.setAttribute(dynamicDataAttrKeys.dataValue, dynamicDataAttrValues.empty);
            if (emailRegexp.test(value)) {
                input.setAttribute(dynamicDataAttrKeys.dataValid, dynamicDataAttrValues.valid);
            } else {
                input.setAttribute(dynamicDataAttrKeys.dataValid, dynamicDataAttrValues.invalid);
            }
        }
    }

    _validatePasswordWithErrorBlock(input, errorBlock) {
        errorBlock.style.display = 'block';
        input.setAttribute(dynamicDataAttrKeys.dataValue, dynamicDataAttrValues.invalid);
        let value = input.value;
        const countPasswordLength = 6;
        const regex = new RegExp(patterns.password);
        if (!value) {
            input.setAttribute(dynamicDataAttrKeys.dataValue, dynamicDataAttrValues.empty);
            input.setAttribute(dynamicDataAttrKeys.dataValid, dynamicDataAttrValues.invalid);
            errorBlock.style.display = 'block';
            errorBlock.innerText = errorMessage.password.empty;
        } else {
            input.setAttribute(dynamicDataAttrKeys.dataValue, dynamicDataAttrValues.value);
            input.setAttribute(dynamicDataAttrKeys.dataValid, dynamicDataAttrValues.valid);
            errorBlock.style.display = 'none';
            const passwordIsCorrect = regex.test(value);
            if (value.length < countPasswordLength) {
                input.setAttribute(dynamicDataAttrKeys.dataValid, dynamicDataAttrValues.invalid);
                errorBlock.style.display = 'block';
                errorBlock.innerText = errorMessage.password.short;
            } else if (!passwordIsCorrect) {
                input.setAttribute(dynamicDataAttrKeys.dataValid, dynamicDataAttrValues.invalid);
                errorBlock.style.display = 'block';
                errorBlock.innerText = errorMessage.password.incorrect;
            }
        }
    }

    _validatePasswordWithoutErrorBlock(input) {
        input.setAttribute(dynamicDataAttrKeys.dataValid, dynamicDataAttrValues.invalid);
        let value = input.value;
        const countPasswordLength = 6;
        const regex = new RegExp(patterns.password);
        if (!value) {
            input.setAttribute(dynamicDataAttrKeys.dataValue, dynamicDataAttrValues.empty);
            input.setAttribute(dynamicDataAttrKeys.dataValid, dynamicDataAttrValues.invalid);
        } else {
            input.setAttribute(dynamicDataAttrKeys.dataValue, dynamicDataAttrValues.value);
            input.setAttribute(dynamicDataAttrKeys.dataValue, dynamicDataAttrValues.value);
            input.setAttribute(dynamicDataAttrKeys.dataValid, dynamicDataAttrValues.valid);
            const passwordIsCorrect = regex.test(value);
            if (value.length < countPasswordLength) {
                input.setAttribute(dynamicDataAttrKeys.dataValid, dynamicDataAttrValues.invalid);
            } else if (!passwordIsCorrect) {
                input.setAttribute(dynamicDataAttrKeys.dataValid, dynamicDataAttrValues.invalid);
            }
        }
    }

    start(input) {
        this._addEvent(input);
    }
};
