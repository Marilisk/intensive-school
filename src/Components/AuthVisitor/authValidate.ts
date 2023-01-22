export let errors = {
    fio: '',
    email: '',
    phone: '',
};

export function validateEmail(value:string) {
    let error = '';
    if (!value) {
        error = 'введите корректный email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'некорректный email';
    }
    return error;
};

/* export function validatePhone(value:string) {
    let error = '';
    if (value.length < 6) {
        error = 'введите номер телефона';
    } else if ( !value.match(/^[+]{0,1}[ \-()0-9]{7,17}$/) ) {
        error = 'введите номер телефона в формате 7 777 777 77 77';
    }
    return error;
} */

export function validateFio(value:string) {
    let error = '';
    if (value.length < 3) {
        error = 'введите имя длиннее 3 символов';
    } 
    return error;
}

