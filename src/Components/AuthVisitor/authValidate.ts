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


export function validateFio(value:string) {
    let error = '';
    if (value.length < 4) {
        error = 'введите имя длиннее 3 символов';
    } 
    return error;
}

