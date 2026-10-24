/* ================================
   MANDARAMBONG
   Main JavaScript
================================ */


/* ================================
   MOBILE MENU
================================ */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
});


const mobileLinks = document.querySelectorAll(".mobile-menu a");

mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
    });
});


/* ================================
   MEMBER MODAL
================================ */

const memberCards = document.querySelectorAll(".member-card");

const memberModal = document.getElementById("memberModal");
const closeMemberModal = document.getElementById("closeMemberModal");

const modalName = document.getElementById("modalName");
const modalCourse = document.getElementById("modalCourse");
const modalDescription = document.getElementById("modalDescription");
const modalSkills = document.getElementById("modalSkills");
const modalProjects = document.getElementById("modalProjects");


memberCards.forEach(card => {

    card.addEventListener("click", () => {

        const name = card.dataset.name;
        const course = card.dataset.course;
        const year = card.dataset.year;
        const description = card.dataset.description;
        const skills = card.dataset.skills;
        const projects = card.dataset.projects;

        modalName.textContent = name;

        modalCourse.textContent =
            `${course} • ${year}`;

        modalDescription.textContent =
            description;

        modalSkills.textContent =
            skills;

        modalProjects.textContent =
            projects;

        memberModal.classList.add("active");

        document.body.style.overflow = "hidden";
    });

});


closeMemberModal.addEventListener("click", () => {

    memberModal.classList.remove("active");

    document.body.style.overflow = "auto";

});


/* ================================
   PROJECT FILTER
================================ */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projectCards =
    document.querySelectorAll(".project-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter =
            button.dataset.filter;


        projectCards.forEach(card => {

            const category =
                card.dataset.category;


            if (filter === "all" || category === filter) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});


/* ================================
   PROJECT MODAL
================================ */

const projectModal =
    document.getElementById("projectModal");

const closeProjectModal =
    document.getElementById("closeProjectModal");

const projectModalTitle =
    document.getElementById("projectModalTitle");

const projectModalDescription =
    document.getElementById("projectModalDescription");

const projectModalTechnologies =
    document.getElementById("projectModalTechnologies");

const projectModalRole =
    document.getElementById("projectModalRole");


const projectButtons =
    document.querySelectorAll(".view-project");


projectButtons.forEach(button => {

    button.addEventListener("click", (event) => {

        event.stopPropagation();

        const card =
            button.closest(".project-card");


        const title =
            card.dataset.title;

        const description =
            card.dataset.description;

        const technologies =
            card.dataset.technologies;

        const role =
            card.dataset.role;


        projectModalTitle.textContent =
            title;

        projectModalDescription.textContent =
            description;

        projectModalTechnologies.textContent =
            technologies;

        projectModalRole.textContent =
            role;


        projectModal.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


closeProjectModal.addEventListener("click", () => {

    projectModal.classList.remove("active");

    document.body.style.overflow = "auto";

});


/* ================================
   CLOSE MODALS BY CLICKING OUTSIDE
================================ */

memberModal.addEventListener("click", (event) => {

    if (event.target === memberModal) {

        memberModal.classList.remove("active");

        document.body.style.overflow = "auto";

    }

});


projectModal.addEventListener("click", (event) => {

    if (event.target === projectModal) {

        projectModal.classList.remove("active");

        document.body.style.overflow = "auto";

    }

});


/* ================================
   ESC KEY
================================ */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        memberModal.classList.remove("active");

        projectModal.classList.remove("active");

        mobileMenu.classList.remove("active");

        document.body.style.overflow = "auto";

    }

});


/* ================================
   CONTACT FORM
================================ */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const message =
        document.getElementById("message").value.trim();


    if (name === "" || email === "" || message === "") {

        formMessage.textContent =
            "Please complete all fields.";

        formMessage.style.color =
            "#ff6b6b";

        return;

    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        formMessage.textContent =
            "Please enter a valid email address.";

        formMessage.style.color =
            "#ff6b6b";

        return;

    }


    formMessage.textContent =
        "Message sent successfully! Thank you for contacting MANDARAMBONG.";

    formMessage.style.color =
        "#00d9ff";


    contactForm.reset();

});


/* ================================
   SCROLL REVEAL
================================ */

const revealElements =
    document.querySelectorAll(
        ".section-heading, .member-card, .project-card, .glass-box, .timeline-item"
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform = "translateY(30px)";

    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

});


const revealOnScroll = () => {

    const windowHeight =
        window.innerHeight;


    revealElements.forEach(element => {

        const elementTop =
            element.getBoundingClientRect().top;


        if (elementTop < windowHeight - 80) {

            element.style.opacity = "1";

            element.style.transform =
                "translateY(0)";

        }

    });

};


window.addEventListener(
    "scroll",
    revealOnScroll
);


revealOnScroll();


/* ================================
   NAVBAR SCROLL EFFECT
================================ */

const navbar =
    document.querySelector(".navbar");


window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.background =
            "rgba(4, 13, 24, 0.92)";

        navbar.style.borderBottomColor =
            "rgba(0, 217, 255, 0.25)";

    } else {

        navbar.style.background =
            "rgba(6, 17, 31, 0.75)";

        navbar.style.borderBottomColor =
            "rgba(0, 217, 255, 0.12)";

    }

});