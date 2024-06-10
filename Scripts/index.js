const navbarToggler = document.querySelector('.navbar-toggler');
const offcanvasNav = document.querySelector('.offcanvas-nav');
const offcanvas = new bootstrap.Offcanvas(offcanvasNav);

navbarToggler.addEventListener('click', () => {
    offcanvas.toggle();
});