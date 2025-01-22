document.addEventListener("DOMContentLoaded", function () {
    fetch('assets/data.json')
        .then(response => response.json())
        .then(data => {
            const servicesContainer = document.getElementById('services-container2');

            data.services.forEach(service => {
                const serviceDiv = document.createElement('div');
                serviceDiv.classList.add('bg-white', 'p-6', 'rounded-lg', 'shadow-lg', 'relative', 'transition-all', 'transform');

                serviceDiv.innerHTML = `
    <!-- Service Logo (Top-left) -->
    <div class="absolute top-0 left-0 p-2">
        <img src="${service.image}" alt="${service.title}" class="w-12 h-12 mb-2">
    </div>

    <h2 class="text-xl text-yellow-400 font-semibold mb-2 mt-16 pl-16">${service.title}</h2>

    <!-- Only show full description initially -->
    <p class="text-black">${service.fdescription}</p>
`;

                servicesContainer.appendChild(serviceDiv);
            });
        })
        .catch(error => console.error('Error loading services:', error));
});
