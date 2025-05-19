
function basicAlert() {
    Swal.fire({
        title: 'Basic Alert',
        html: 'This is a <strong>custom HTML</strong> message.',
        icon: 'info',
        confirmButtonText: 'OK'
    });
}

function successAlert() {
    Swal.fire({
        title: 'Success!',
        text: 'Your action was successful.',
        icon: 'success',
        confirmButtonText: 'Great!'
    });
}

function errorAlert() {
    Swal.fire({
        title: 'Oops!',
        text: 'Something went wrong.',
        icon: 'error',
        confirmButtonText: 'Retry'
    });
}

function warningAlert() {
    Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, do it!',
        cancelButtonText: 'Cancel'
    });
}

function inputAlert() {
    Swal.fire({
        title: 'Enter your name',
        input: 'text',
        inputLabel: 'Your name',
        inputPlaceholder: 'Type here...',
        showCancelButton: true,
        confirmButtonText: 'Submit'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(`Hello, ${result.value}!`);
        }
    });
}

function toastAlert() {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Signed in successfully',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
    });
}