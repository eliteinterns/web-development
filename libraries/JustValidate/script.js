const validation = new JustValidate('#myForm', {
    validateBeforeSubmitting: true,
    focusInvalidField: true,
    lockForm: true,
    errorFieldCssClass: 'just-validate-error-field',
    errorLabelStyle: {
        color: 'red',
        fontSize: '13px',
    },
    scrollToFirstError: {
        behavior: 'smooth',
        block: 'center',
    },
});

validation
    .addField('#name', [
        {
            rule: 'required',
            errorMessage: 'Name is required',
        },
        {
            rule: 'minLength',
            value: 3,
            errorMessage: 'Name must be at least 3 characters',
        },
    ])
    .addField('#email', [
        {
            rule: 'required',
            errorMessage: 'Email is required',
        },
        {
            rule: 'email',
            errorMessage: 'Email is invalid',
        },
    ])
    .addField('#password', [
        {
            rule: 'required',
            errorMessage: 'Password is required',
        },
        {
            rule: 'password',
            errorMessage:
                'Password must contain uppercase, lowercase and number',
        },
    ])
    .onSuccess((event) => {
        alert('Form is valid! Submitting...');
        event.target.reset();
    });
