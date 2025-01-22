// Select the button and the mobile menu
const menuButton = document.querySelector('button[aria-controls="mobile-menu"]');
const mobileMenu = document.getElementById('mobile-menu');

// Add click event listener to the button
menuButton.addEventListener('click', () => {
    // Check the current state of the menu
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';

    // Toggle the aria-expanded attribute
    menuButton.setAttribute('aria-expanded', !isExpanded);

    // Toggle visibility of the mobile menu
    mobileMenu.classList.toggle('hidden');

    // Toggle the icons
    const menuIcon = menuButton.querySelector('svg:first-of-type'); // Menu icon
    const closeIcon = menuButton.querySelector('svg:last-of-type'); // Close icon

    if (!isExpanded) {
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    } else {
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
});


// Fetch the About Us data from the JSON file
async function loadAboutUs() {
    try {
        const response = await fetch('assets/data.json');
        if (!response.ok) throw new Error('Failed to fetch About Us data');

        const data = await response.json();

        // Update the About Us section
        const line1 = document.getElementById('line1');
        const line2 = document.getElementById('line2');
        const author = document.getElementById('author');

        line1.textContent = data.aboutUs.line1;
        line2.textContent = data.aboutUs.line2;
        author.textContent = data.aboutUs.author;

    } catch (error) {
        console.error('Error loading About Us data:', error);
    }
}

// Call the function to load the data
loadAboutUs();

document.addEventListener("DOMContentLoaded", () => {
    const servicesContainer = document.getElementById("services-container");

    // Fetch data from data.json
    fetch("assets/data.json")
        .then((response) => response.json())
        .then((data) => {
            const services = data.services;

            // Generate HTML for each service
            services.forEach((service) => {
                const serviceCard = `
                <div class="p-4 bg-white rounded-xl shadow-lg flex flex-col items-center text-center">
                  <img class="h-12 w-12 mb-4" src="${service.image}" alt="${service.title} Logo">
                  <div class="text-lg font-medium text-black">${service.title}</div>
                  <p class="text-sm text-slate-500">${service.description}</p>
                </div>
              `;

                // Append the card to the container
                servicesContainer.innerHTML += serviceCard;
            });
        })
        .catch((error) => console.error("Error loading services:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const testimonialsContainer = document.getElementById("testimonials-container");
    const nextButton = document.getElementById("next-testimonial");

    // Fetch testimonials from data.json
    fetch("assets/data.json")
      .then((response) => response.json())
      .then((data) => {
        const testimonials = data.testimonials;
        let currentIndex = 0;

        // Function to render a testimonial
        const renderTestimonial = (index) => {
          const testimonial = testimonials[index];
          testimonialsContainer.innerHTML = `
            <figure class="flex flex-col items-center text-center w-full">
              <figcaption>
                <div class="font-bold text-black text-lg">${testimonial.name}</div>
                <div class="text-gray-600 text-sm italic">${testimonial.position}</div>
              </figcaption>
              <blockquote class="mt-4 text-xl font-medium text-gray-500 sm:text-2xl">
                <p>“${testimonial.text}”</p>
              </blockquote>
            </figure>
          `;
        };

        // Render the first testimonial initially
        renderTestimonial(currentIndex);

        // Function to move to the next testimonial
        const nextTestimonial = () => {
          currentIndex = (currentIndex + 1) % testimonials.length;
          renderTestimonial(currentIndex);
        };

        // Automatically change testimonials every 5 seconds
        const interval = setInterval(nextTestimonial, 10000);

        // Click event for manual navigation
        nextButton.addEventListener("click", () => {
          nextTestimonial();
          clearInterval(interval); // Reset the timer when manually clicked
          setInterval(nextTestimonial, 10000); // Restart the timer
        });
      })
      .catch((error) => console.error("Error loading testimonials:", error));
});


document.addEventListener("DOMContentLoaded", () => {
    const partnersContainer = document.getElementById("partners-container");

    // Fetch partners from data.json
    fetch("assets/data.json")
      .then((response) => response.json())
      .then((data) => {
        const partners = data.partners; // Assuming `partners` is an array of objects { logo, name }

        // Render partner logos dynamically
        partnersContainer.innerHTML = partners.map(partner => `
            <img class="max-h-16 w-auto object-contain" 
                 src="${partner.logo}" 
                 alt="${partner.name}" 
                 width="150" height="45">
        `).join('');
      })
      .catch((error) => console.error("Error loading partners:", error));
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("assets/data.json")
        .then(response => response.json())
        .then(data => {
            // Company Info
            document.getElementById("company-logo").src = data.companyInfo.logo;
            document.getElementById("company-description").textContent = data.companyInfo.description;

            // Contact Info
            document.getElementById("contact-location").textContent = data.contactInfo.location;
            document.getElementById("contact-phone").textContent = data.contactInfo.phone;
            document.getElementById("contact-marketing").textContent = data.contactInfo.marketingEmail;
            document.getElementById("contact-design").textContent = data.contactInfo.designEmail;

            // Social Links
            const socialLinks = document.getElementById("social-links");
            const icons = {
                facebook: "fab fa-facebook fa-lg",
                linkedin: "fab fa-linkedin fa-lg",
                instagram: "fab fa-instagram fa-lg"
            };
            Object.keys(data.socialLinks).forEach(platform => {
                let a = document.createElement("a");
                a.href = data.socialLinks[platform];
                a.className = "text-gray-400 hover:text-white";
                a.innerHTML = `<i class="${icons[platform]}"></i>`;
                socialLinks.appendChild(a);
            });
        })
        .catch(error => console.error("Error loading footer data:", error));
});

