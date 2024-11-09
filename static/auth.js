alert("holaaa");
document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const criteria = document.getElementById('criteria').value;

    const response = await fetch(`/cars?criteria=${criteria}}`);
    const cars = await response.json();

    const carsList = document.getElementById('carsList');
    carsList.innerHTML = '';
    cars.forEach(car => {
        const carDiv = document.createElement('div');
        carDiv.innerHTML = `
            <h3>${car.name}</h3>
            <img src="${car.img}">
            <p>Precio: ${car.price}</p>
            <p>${car.materiales} - ${car.color}</p>
            <p>${car.descripcion}</p>
            <button onclick="reserveCar(${car.id})">Reserve</button>
        `;
        carsList.appendChild(carDiv);
    });
});
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login.html', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        window.location.href = 'reservations.html';
    } else {
        alert('Login failed');
    }
});

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/register.html', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        alert('Registration successful');
        window.location.href = 'index.html'; // Redirigir al usuario a la página de inicio
    } else {
        alert('Registration failed');
    }
});