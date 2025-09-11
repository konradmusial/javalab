const inputMiasto = document.getElementById('miasto');
const przycisk = document.getElementById('sprawdz');
const wynik = document.getElementById('wynik');

let miasta = JSON.parse(localStorage.getItem('miasta')) || [];

function pokazpogode(miasto) {
    fetch(`https://wttr.in/${miasto}?format=j1`)
    .then(response => response.json())
    .then(data => {
        const temperatura = data.current_condition[0].temp_C;
        const nowywynik = document.createElement('div');
        nowywynik.textContent = `Temperatura w ${miasto} wynosi ${temperatura}°C`;
        wynik.appendChild(nowywynik);
    })
}

miasta.forEach(miasto => {
    pokazpogode(miasto);
});

przycisk.addEventListener('click', () => {
    const miasto = inputMiasto.value.trim();
    if (!miasta.includes(miasto)) {
        miasta.push(miasto);
        localStorage.setItem('miasta', JSON.stringify(miasta));
    }
    pokazpogode(miasto);
});
