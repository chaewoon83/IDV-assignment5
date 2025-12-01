let outputElement = document.getElementById('psi-table');
let timestamp = document.getElementById('timestamp');

async function fetchAndDisplayRawJSON() {
    try {
        const response = await fetch('https://api-open.data.gov.sg/v2/real-time/api/psi');
        
        if (!response.ok) {
             throw new Error(`Cannot fetch data from URL: ${response.status}`);
        }
        
        const data = await response.json();

        const timestampData = data.data.items[0].timestamp; 
        timestamp.textContent = timestampData;
        
        outputElement.innerHTML = createTable(data.data.items[0].readings)


    } catch (error) {
        console.error("API request failed:", error);
    }
}

function createTable(psiData) {
    const headers = Object.keys(psiData);

    let table = '<table id="psi-data">';

    table += '<thead><tr>';
    ['type\\Region','west','east','central','south','north'].forEach(region => {
        table += `<th scope="region">${region.toUpperCase()}</th>`;
    });
    table += '</tr></thead>';

    table += '<tbody>';
    headers.forEach(item => {
        table += '<tr>';
        table += `<th>${item}</th>`;

        Object.keys(psiData[item]).forEach(key => {
            let value = psiData[item][key];
            if(value > 40){
                dangerClass = "danger"
            }
            else if (value > 20){
                dangerClass = "warning"
            }
            else {
                dangerClass = "safe";
            }
            table += `<td class="${dangerClass}">${value}</td>`;
        });
        table += '</tr>';
    });
    table += '</tbody>';

    table += '</table>';
    
    return table;
}


fetchAndDisplayRawJSON();