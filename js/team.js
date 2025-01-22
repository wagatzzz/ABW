fetch('assets/data.json')
    .then((response) => response.json())
    .then((data) => {
        const teamContainer = document.getElementById('team-container');
        
        data.employees.forEach((profile) => {
            const teamMember = document.createElement('li');
            
            const profileCard = document.createElement('div');
            profileCard.className = 'flex items-center gap-x-6';

            const img = document.createElement('img');
            img.className = 'size-16 rounded-full';
            img.src = profile.image;
            img.alt = profile.name;

            const textContainer = document.createElement('div');

            const name = document.createElement('h3');
            name.className = 'text-base/7 font-semibold tracking-tight text-gray-900';
            name.textContent = profile.name;

            const role = document.createElement('p');
            role.className = 'text-sm/6 font-semibold text-blue-600';
            role.textContent = profile.position;

            textContainer.appendChild(name);
            textContainer.appendChild(role);
            profileCard.appendChild(img);
            profileCard.appendChild(textContainer);
            teamMember.appendChild(profileCard);

            teamContainer.appendChild(teamMember);
        });
    })
    .catch((error) => console.error('Error fetching data:', error));
