/*
  First Website
  Name: Katsia Ilunga
  Date: 2025-04-24
  Description: This JavaScript file handles:
   - Form validation for the Contact page
   - Displaying error messages for invalid inputs
   - Responsive menu toggle functionality
   - Form submission handling
   - Phone number validation
   - Proper async/promise handling
*/

// Immediately invoked function expression to prevent global scope pollution
(function() {
    /* Load Function
       Called when the DOM is fully loaded.
       Sets up event listeners for the contact form and mobile menu toggle.
    */
    function load() {
      try {
        // Contact form handling
        let form = document.querySelector('.form form');
        if (form) {
          form.addEventListener('submit', handleFormSubmit);
          form.addEventListener('reset', hideErrors);
        } else {
          console.log('Contact form not found');
        }
  
        // Mobile menu toggle setup
        let menuButton = document.getElementById('menuButton');
        let nav = document.querySelector('nav ul');
        
        if (menuButton && nav) {
          menuButton.addEventListener('click', toggleMenu);
        } else {
          console.error("Menu toggle elements not found");
        }
      } catch (error) {
        console.error('Error during page load:', error);
      }
    }
  
    /* toggleMenu Function
       Handles the mobile menu toggle functionality
    */
    function toggleMenu() {
      try {
        let menuImage = document.getElementById('menu');
        let nav = document.querySelector('nav ul');
        
        let isHidden = nav.style.display === 'none' || nav.style.display === '';
        nav.style.display = isHidden ? 'flex' : 'none';
        menuImage.src = isHidden ? '../images/menu-on.svg' : '../images/menu-off.svg';
      } catch (error) {
        console.error('Error toggling menu:', error);
      }
    }
  
    /* handleFormSubmit Function
       Wrapper for form submission that ensures proper error handling
    */
    async function handleFormSubmit(e) {
      e.preventDefault();
      try {
        await validateForm(e);
      } catch (error) {
        console.error('Form submission error:', error);
        alert('An error occurred while processing your form. Please try again.');
      }
    }
  
    /* validateForm Function
       Validates all form fields and shows errors if needed
    */
    function validateForm(e) {
      return new Promise((resolve) => {
        try {
          let name = document.getElementById('name');
          let email = document.getElementById('email');
          let phone = document.getElementById('phone');
          let subject = document.getElementById('subject');
  
          let nameValue = name.value.trim();
          let emailValue = email.value.trim();
          let phoneValue = phone.value.trim();
          let subjectValue = subject.value.trim();
  
          let valid = true;
  
          // Hide all errors
          hideErrors();
  
          // Validate Name (required)
          if (nameValue === '') {
            showError(name, 'Please enter your name');
            valid = false;
          }
  
          // Validate Email (required and format)
          let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailValue === '') {
            showError(email, 'Please enter your email');
            valid = false;
          } else if (!emailPattern.test(emailValue)) {
            showError(email, 'Please enter a valid email address');
            valid = false;
          }
  
          // Validate Phone Number (optional but must be valid if provided)
          if (phoneValue !== '') {
            let phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            if (!phonePattern.test(phoneValue)) {
              showError(phone, 'Please enter a valid phone number');
              valid = false;
            }
          }
  
          // Validate Subject (required)
          if (subjectValue === '') {
            showError(subject, 'Please enter your message');
            valid = false;
          }
  
          // Resolve the promise based on validation
          if (valid) {
            alert(`Thank you for your message, ${nameValue}! We will contact you soon at ${emailValue}${phoneValue ? ' or ' + phoneValue : ''}.`);
            e.target.reset();
            resolve(true);
          } else {
            resolve(false);
          }
        } catch (error) {
          console.error('Validation error:', error);
          resolve(false);
        }
      });
    }
  
    /* showError Function
       Displays an error message for a specific form field
    */
    function showError(field, message) {
      try {
        let errorElement = field.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error')) {
          errorElement = document.createElement('div');
          errorElement.className = 'error';
          field.parentNode.insertBefore(errorElement, field.nextSibling);
        }
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        field.focus();
      } catch (error) {
        console.error('Error showing error message:', error);
      }
    }
  
    /* hideErrors Function
       Hides all validation error messages
    */
    function hideErrors() {
      try {
        let errors = document.querySelectorAll('.error');
        for (let i = 0; i < errors.length; i++) {
          errors[i].style.display = 'none';
        }
      } catch (error) {
        console.error('Error hiding errors:', error);
      }
    }
  
    // Run when document is ready
    document.addEventListener('DOMContentLoaded', load);
  })();