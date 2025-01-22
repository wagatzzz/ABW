// Fetch data from data.json and display it dynamically
fetch('assets/data.json')
.then((response) => response.json())
.then((data) => {
    const packagesContainer = document.getElementById('packages-container');
    const packages = data.packages;

    packages.forEach((pkg) => {
        const packageCard = document.createElement('div');
        packageCard.className = 'package-card';

        // Package title with recommended tag next to it
        const title = document.createElement('h3');
        title.textContent = pkg.title;

        // Highlight recommended packages
        if (pkg.recommended) {
            const recommendedTag = document.createElement('div');
            recommendedTag.className = 'recommended';
            recommendedTag.textContent = 'Recommended';
            title.appendChild(recommendedTag);
        }

        packageCard.appendChild(title);

        // Services listed from the top
        const serviceList = document.createElement('ul');
        pkg.services.forEach((service) => {
            const listItem = document.createElement('li');
            listItem.textContent = service;
            serviceList.appendChild(listItem);
        });
        packageCard.appendChild(serviceList);

        // Get Quote button
        const getQuoteButton = document.createElement('div');
        getQuoteButton.className = 'get-quote';
        getQuoteButton.textContent = 'Get Quote';
        packageCard.appendChild(getQuoteButton);

        // Append card to container
        packagesContainer.appendChild(packageCard);
    });
})
.catch((error) => console.error('Error fetching data:', error));