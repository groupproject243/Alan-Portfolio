'use strict';

// === Toggle Element Visibility ===
const elementToggleFunc = (elem) => elem.classList.toggle("active");

// === Sidebar Toggle ===
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));

// === Testimonials Modal ===
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = () => {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

testimonialsItem.forEach(item => {
  item.addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
});

modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// === Portfolio Filtering ===
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

select.addEventListener("click", () => elementToggleFunc(select));

const filterFunc = (selectedValue) => {
  filterItems.forEach(item => {
    if (selectedValue === "all" || selectedValue === item.dataset.category.toLowerCase()) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

selectItems.forEach(item => {
  item.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

let lastClickedBtn = filterBtn[0];
filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

// === Page Navigation ===
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach(navLink => {
  navLink.addEventListener("click", function () {
    const pageName = this.innerHTML.toLowerCase();
    pages.forEach(page => {
      const isActive = page.dataset.page === pageName;
      page.classList.toggle("active", isActive);
    });
    navigationLinks.forEach(link => link.classList.remove("active"));
    this.classList.add("active");
    window.scrollTo(0, 0);
  });
});

// === Web3Forms Contact Form Integration ===
const contactForm = document.getElementById("contactForm") || document.querySelector("[data-form]");
if (contactForm) {
  const formInputs = contactForm.querySelectorAll("[data-form-input]");
  const formBtn = contactForm.querySelector("[data-form-btn]");

  formInputs.forEach(input => {
    input.addEventListener("input", () => {
      contactForm.checkValidity()
        ? formBtn.removeAttribute("disabled")
        : formBtn.setAttribute("disabled", "");
    });
  });

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    formData.append("access_key", "abc79be2-6f9a-4af0-8d83-e58a3935519b");

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    })
      .then(response => {
        if (response.ok) {
          alert("✅ Message sent successfully!");
          contactForm.reset();
          formBtn.setAttribute("disabled", "");
        } else {
          alert("❌ Failed to send message. Please try again.");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("❌ Network error. Please try later.");
      });
  });
}

// Certificate image click fullscreen modal
document.querySelectorAll('.certificate-img').forEach(img => {
  img.addEventListener('click', function (e) {
    e.preventDefault(); // prevents any default behavior, like form submission
    e.stopPropagation(); // stops the click from bubbling up to parent elements

    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('modalImage');

    modal.style.display = 'block';
    modalImg.src = this.src;
    modalImg.alt = this.alt;
  });
});

function closeModal() {
  document.getElementById('certificateModal').style.display = 'none';
}
