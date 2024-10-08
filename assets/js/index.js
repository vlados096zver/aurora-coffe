// modal

const modalBtnCta = document.querySelectorAll('[data-modal="modal_cta"]'),
    modalCta = document.querySelector('.modal--cta'),
    modalBtnClose = document.querySelector('.btn__modal-close'),
    modalInner = document.querySelector('.modal__form-wrapper');

modalBtnCta.forEach(item => {
    item.addEventListener('click', () => {
        modalCta.classList.add('modal--active');
        document.body.style.overflow = 'hidden';
    });
});

modalBtnClose.addEventListener('click', () => {
    modalCta.classList.remove('modal--active');
    document.body.style.overflow = 'auto';

    let formTitleSuccess = document.querySelector('.form__title--success');
    if (formTitleSuccess) {
        mainForm.classList.remove('modal__form--hidden');
        mainForm.reset();
        modalInner.removeChild(formTitleSuccess);
    }
});

// form valid

let mainForm = document.querySelector('#form-modal'),
    emailForm = document.querySelector('#form-mail');

mainForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let nameField = mainForm.querySelector('input[name="name"]');
    let phoneField = mainForm.querySelector('input[name="phone"]');

    let nameValue = nameField.value.trim();
    let phoneValue = phoneField.value.trim();

    let isValid = true;

    clearErrors();

    let namePattern = /^[a-zA-Z]{2,15}$/;
    if (nameValue === '') {
        showError(nameField, 'Name cannot be empty');
        isValid = false;
    } else if (!namePattern.test(nameValue)) {
        showError(nameField, 'Name must contain 2 to 15 Latin letters');
        isValid = false;
    }

    let phonePattern = /^[+]?[0-9]{6,}$/;
    if (phoneValue === '') {
        showError(phoneField, 'Phone cannot be empty');
        isValid = false;
    } else if (!phonePattern.test(phoneValue)) {
        showError(phoneField, 'Phone must contain at least 6 digits and may start with a plus sign');
        isValid = false;
    }

    if (isValid) {
        console.log('form send...');
        mainForm.classList.add('modal__form--hidden');

        let successAnswer = document.createElement('h2');
        successAnswer.classList.add('form__title', 'form__title--success');
        successAnswer.textContent = 'Form submitted successfully!';

        modalInner.appendChild(successAnswer);

        // mainForm.submit();
    }
});

emailForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let emailField = emailForm.querySelector('input[name="email"]');

    let emailValue = emailField.value.trim();

    let isValid = true;

    clearErrors(emailForm);

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue === '') {
        showError(emailField, 'Email cannot be empty', true);
        isValid = false;
    } else if (!emailPattern.test(emailValue)) {
        showError(emailField, 'Enter a valid email address', true);
        isValid = false;
    }

    if (isValid) {
        let successAnswer = document.createElement('div');
        successAnswer.classList.add('form__success');
        successAnswer.innerHTML = '<p>Sign up successful!</p>';


        emailForm.insertAdjacentElement('afterend', successAnswer);


        setTimeout(() => {
            emailForm.reset();
            successAnswer.remove();
        }, 2500);
    }
});

function showError(input, message) {
    let error = document.createElement('span');
    error.classList.add('error-message');
    error.innerText = message;
    input.parentElement.appendChild(error);

    input.addEventListener('input', function () {
        let value = input.value.trim();
        if (value) {
            if (input === mainForm.querySelector('input[name="name"]') && /^[a-zA-Z]{2,15}$/.test(value)) {
                error.remove();
            }
            if (input === mainForm.querySelector('input[name="phone"]') && /^[+]?[0-9]{6,}$/.test(value)) {
                error.remove();
            }
            if (input === emailForm.querySelector('input[name="email"]') && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                error.remove();
            }
        }
    });
}

function clearErrors() {
    let errors = document.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());
}

// burger

const headerBurger = document.querySelector('.header__burger'),
    headerNav = document.querySelector('.header__nav');

headerBurger.addEventListener('click', () => {
    headerBurger.classList.toggle('header__burger--active');
    headerNav.classList.toggle('header__nav--active')
});

headerNav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        headerNav.classList.remove('header__nav--active');
        headerBurger.classList.remove('header__burger--active');
    }
});


// swiper

var swiper = new Swiper(".review__slider", {
    loop: true,
    speed: 500,
    slidesPerView: 1,
    navigation: {
        nextEl: ".review-btn--next",
        prevEl: ".review-btn--prev",
    },

});


// filter

const filterBtn = document.querySelectorAll('button[data-category]');
const productItemCategory = document.querySelectorAll('.product__item[data-category]');

filterBtn.forEach(item => {
    item.addEventListener('click', () => {
        const category = item.getAttribute('data-category');
        
        productItemCategory.forEach(product => {
            const productCategory = product.getAttribute('data-category');
            if (category === 'all' || productCategory === category) {
                product.style.display = 'flex';
            } else {
                product.style.display = 'none';
            }
        });

        filterBtn.forEach(btn => btn.classList.remove('btn-cta--active'));
        item.classList.add('btn-cta--active');
    });
});
