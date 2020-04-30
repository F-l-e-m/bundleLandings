import api from './api.js';
import Validator from './validation.js';

export default class AuthForm {
    constructor(form) {
        this.mainBlock = document.querySelector(form);
        this.inputsDOMElements = this.mainBlock.querySelectorAll('[data-input]');
    }

    init() {
        const validator = new Validator(this.mainBlock);
        this.inputsDOMElements.forEach(item => {
            item.addEventListener('input', () => {
                validator.start(item);
            });
        });
    }

    registration() {
        const btn = this.mainBlock.querySelector('[data-btn="registration"]');
        btn.addEventListener('click', e  => {
            e.preventDefault();
            const validInputs = Array.from(this.inputsDOMElements).filter(item => {
                return item.dataset.valid === 'valid' && item.value !== '';
            });
            if (validInputs.length === this.inputsDOMElements.length) {
                api.userRegistration();
            }
        });
    }
}
