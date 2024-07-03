// Fetch all countries on load
fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(data => {
        let tblCountries = document.getElementById("tblCountries");

        let tblBody = '';
        data.forEach(element => {
            tblBody += `<tr onclick="showCountryDetails('${element.name.common}')">
                            <td>${element.name.common}</td>
                            <td><img src="${element.flags.png}" alt="Flag of ${element.name.common}" width="50"></td>
                        </tr>`;
        });

        tblCountries.innerHTML = tblBody;
    });

// Function to search for a specific country
function serchCuntrie() {
    let searchValue = document.getElementById("txtSearchValue").value;
    let countryCard = document.getElementById("countryCard");
    let offitalName = document.getElementById("offitalName");
    let name = document.getElementById("name");
    let img = document.getElementById("img");
    let tbl = document.getElementById("tbl");

    console.log(searchValue);
    fetch(`https://restcountries.com/v3.1/name/${searchValue}`)
        .then(res => res.json())
        .then(data => {
            if (data && data.length > 0) {
                let country = data[0];
                offitalName.innerText = country.name.official;
                name.innerText = country.name.common;
                img.innerHTML = `<img src="${country.flags.png}" alt="Flag of ${country.name.common}" width="100">`;

                let tblBody = `
                    <tr>
                        <th>Capital</th>
                        <td>${country.capital ? country.capital[0] : 'No capital available'}</td>
                    </tr>
                    <tr>
                        <th>Region</th>
                        <td>${country.region}</td>
                    </tr>
                    <tr>
                        <th>Population</th>
                        <td>${country.population.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <th>Languages</th>
                        <td>${Object.values(country.languages).join(', ')}</td>
                    </tr>
                    <tr>
                        <th>Currencies</th>
                        <td>${Object.values(country.currencies).map(c => c.name).join(', ')}</td>
                    </tr>
                `;

                tbl.innerHTML = tblBody;
                countryCard.style.display = 'block';
            } else {
                countryCard.style.display = 'none';
            }

            console.log(data);
        })
        .catch(err => {
            console.error(err);
            countryCard.style.display = 'none';
        });
}

// Function to show country details in modal
function showCountryDetails(countryName) {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(res => res.json())
        .then(data => {
            if (data && data.length > 0) {
                let country = data[0];
                document.getElementById('modalOfficialName').innerText = country.name.official;
                document.getElementById('modalCommonName').innerText = country.name.common;
                document.getElementById('modalImg').innerHTML = `<img src="${country.flags.png}" alt="Flag of ${country.name.common}" width="100">`;

                let modalTblBody = `
                    <tr>
                        <th>Capital</th>
                        <td>${country.capital ? country.capital[0] : 'No capital available'}</td>
                    </tr>
                    <tr>
                        <th>Region</th>
                        <td>${country.region}</td>
                    </tr>
                    <tr>
                        <th>Population</th>
                        <td>${country.population.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <th>Languages</th>
                        <td>${Object.values(country.languages).join(', ')}</td>
                    </tr>
                    <tr>
                        <th>Currencies</th>
                        <td>${Object.values(country.currencies).map(c => c.name).join(', ')}</td>
                    </tr>
                `;

                document.getElementById('modalTbl').innerHTML = modalTblBody;
                let countryModal = new bootstrap.Modal(document.getElementById('countryModal'), {});
                countryModal.show();
            }
        })
        .catch(err => {
            console.error(err);
        });
}
