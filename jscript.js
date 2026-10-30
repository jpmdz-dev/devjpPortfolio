

/* ==========================================
   JPMDZ PORTFOLIO
   COMPLETE JAVASCRIPT
========================================== */


/* ==========================================
   1. DARK MODE / LIGHT MODE
========================================== */

const themeToggle = document.getElementById("theme-toggle");

// Apply the selected theme
function setTheme(theme) {

    const isDark = theme === "dark";

    document.documentElement.classList.toggle("dark-mode", isDark);
    document.body.classList.toggle("dark-mode", isDark);

    // Change theme icon
    if (themeToggle) {

        const icon = themeToggle.querySelector("i");

        if (icon) {
            icon.classList.toggle("fa-moon", !isDark);
            icon.classList.toggle("fa-sun", isDark);
        }

        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );

        themeToggle.setAttribute(
            "title",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );
    }
}


// Load saved theme
let savedTheme = "light";

try {

    const storedTheme = localStorage.getItem("portfolio-theme");

    if (storedTheme === "dark" || storedTheme === "light") {

        savedTheme = storedTheme;

    } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {

        savedTheme = "dark";

    }

} catch (error) {

    console.warn("Unable to load saved theme:", error);

}


// Apply theme when page loads
setTheme(savedTheme);


// Switch between dark and light mode
if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        const isDark =
            document.documentElement.classList.contains("dark-mode");

        const newTheme = isDark ? "light" : "dark";

        setTheme(newTheme);

        // Save selected theme
        try {

            localStorage.setItem("portfolio-theme", newTheme);

        } catch (error) {

            console.warn("Unable to save theme:", error);

        }

    });

}



/* ==========================================
   2. MOBILE BURGER NAVIGATION
========================================== */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");


function setMenu(open) {

    if (!menuToggle || !navMenu) return;

    navMenu.classList.toggle("open", open);

    menuToggle.setAttribute("aria-expanded", String(open));

    menuToggle.setAttribute(
        "aria-label",
        open ? "Close menu" : "Open menu"
    );

    const menuIcon = menuToggle.querySelector("i");

    if (menuIcon) {

        menuIcon.classList.toggle("fa-bars", !open);
        menuIcon.classList.toggle("fa-xmark", open);

    }

}


// Burger button click
if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        const isOpen = navMenu.classList.contains("open");

        setMenu(!isOpen);

    });


    // Close menu after selecting a link
    navMenu.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            setMenu(false);

        });

    });


    // Close menu when pressing Escape
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            setMenu(false);

        }

    });


    // Close menu when clicking outside header
    document.addEventListener("click", function (event) {

        if (!event.target.closest("header")) {

            setMenu(false);

        }

    });


    // Close menu when resizing to desktop
    window.addEventListener("resize", function () {

        if (window.innerWidth > 768) {

            setMenu(false);

        }

    });

}



/* ==========================================
   3. CONTACT FORM
   WEB3FORMS EMAIL SUBMISSION
========================================== */

const contactForm = document.getElementById("contact-form");

const formStatus = document.querySelector(".form-status");


if (contactForm) {

    const nameInput = contactForm.querySelector('[name="name"]');
    const emailInput = contactForm.querySelector('[name="email"]');
    const subjectInput = contactForm.querySelector('[name="subject"]');
    const messageInput = contactForm.querySelector('[name="message"]');

    const submitButton = contactForm.querySelector(
        'button[type="submit"], input[type="submit"]'
    );

    const originalButtonHTML = submitButton
        ? submitButton.innerHTML
        : "";


    const fields = [
        nameInput,
        emailInput,
        subjectInput,
        messageInput
    ].filter(Boolean);


    // Show error message
    function showError(input, message) {

        if (!input) return;

        const group = input.closest(".form-group");

        const errorElement = group
            ? group.querySelector(".error-msg")
            : null;

        if (errorElement) {

            errorElement.textContent = message;

        }

        input.classList.add("input-error");

        input.setAttribute("aria-invalid", "true");

    }


    // Clear error message
    function clearError(input) {

        if (!input) return;

        const group = input.closest(".form-group");

        const errorElement = group
            ? group.querySelector(".error-msg")
            : null;

        if (errorElement) {

            errorElement.textContent = "";

        }

        input.classList.remove("input-error");

        input.removeAttribute("aria-invalid");

    }


    // Validate individual fields
    function validateField(input) {

        if (!input) return false;

        const value = input.value.trim();

        clearError(input);


        // NAME VALIDATION
        if (input === nameInput) {

            if (!value) {

                showError(input, "Please enter your full name.");

                return false;

            }

            if (value.length < 2) {

                showError(input, "Your name must contain at least 2 characters.");

                return false;

            }

            const namePattern =
                /^[\p{L}\p{M}][\p{L}\p{M}\s'.-]*$/u;

            if (!namePattern.test(value)) {

                showError(input, "Please enter a valid name.");

                return false;

            }

        }


        // EMAIL VALIDATION
        if (input === emailInput) {

            if (!value) {

                showError(input, "Please enter your email address.");

                return false;

            }

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(value)) {

                showError(input, "Please enter a valid email address.");

                return false;

            }

        }


        // SUBJECT VALIDATION
        if (input === subjectInput) {

            if (!value) {

                showError(input, "Please enter a subject.");

                return false;

            }

            if (value.length < 3) {

                showError(input, "Subject must contain at least 3 characters.");

                return false;

            }

        }


        // MESSAGE VALIDATION
        if (input === messageInput) {

            if (!value) {

                showError(input, "Please enter your message.");

                return false;

            }

            if (value.length < 5) {

                showError(input, "Message must contain at least 5 characters.");

                return false;

            }

        }

        return true;

    }


    // Validate entire form
    function validateForm() {

        let isValid = true;

        fields.forEach(function (field) {

            if (!validateField(field)) {

                isValid = false;

            }

        });

        return isValid;

    }


    // Validate when leaving an input
    fields.forEach(function (field) {

        field.addEventListener("blur", function () {

            validateField(field);

        });


        // Remove errors when correcting input
        field.addEventListener("input", function () {

            if (field.hasAttribute("aria-invalid")) {

                validateField(field);

            }

        });

    });


    // Submit form
    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        if (formStatus) {

            formStatus.textContent = "";

        }


        // Check validation
        if (!validateForm()) {

            if (formStatus) {

                formStatus.textContent =
                    "Please check the highlighted fields and correct the errors.";

            }

            const firstInvalid = contactForm.querySelector(
                '[aria-invalid="true"]'
            );

            if (firstInvalid) {

                firstInvalid.focus();

            }

            return;

        }


        // Check Web3Forms access key
        const accessKey = contactForm.querySelector(
            '[name="access_key"]'
        );

        if (
            !accessKey ||
            !accessKey.value.trim() ||
            accessKey.value.includes("YOUR_ACCESS_KEY")
        ) {

            if (formStatus) {

                formStatus.textContent =
                    "Please configure your Web3Forms access key.";

            }

            console.error("Web3Forms access key is missing.");

            return;

        }


        // Prepare form data
        const formData = new FormData(contactForm);


        // Sending message status
        if (formStatus) {

            formStatus.textContent = "Sending your message...";

        }

        if (submitButton) {

            submitButton.disabled = true;

            submitButton.textContent = "Sending...";

        }


        try {

            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: formData
                }
            );

            const result = await response.json();


            // Successful submission
            if (response.ok && result.success) {

                if (formStatus) {

                    formStatus.textContent =
                        "Thank you! Your message has been sent successfully.";

                }

                contactForm.reset();

                fields.forEach(clearError);

            } else {

                throw new Error(
                    result.message || "Unable to send your message."
                );

            }


        } catch (error) {

            console.error("Contact form error:", error);

            if (formStatus) {

                formStatus.textContent =
                    "Sorry, something went wrong. Please try again.";

            }

        } finally {

            // Restore submit button
            if (submitButton) {

                submitButton.disabled = false;

                submitButton.innerHTML = originalButtonHTML;

            }

        }

    });

}



/* ==========================================
   4. AUTOMATIC COPYRIGHT YEAR
========================================== */

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}
