function addRowToTable(modelName, filamentWeight, filamentCostPerKg, printTime, electricityCost, maintenanceCost, totalCost, totalCostWithMarkup) {
    const table = document.getElementById('costTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td>${modelName}</td>
        <td>${filamentWeight}</td>
        <td>${filamentCostPerKg}</td>
        <td>${printTime}</td>
        <td>${electricityCost}</td>
        <td>${maintenanceCost}</td>
        <td>${totalCost.toFixed(2)}</td>
        <td>${totalCostWithMarkup.toFixed(2)}</td>
        <td><input type="checkbox" onchange="updateSummedCosts()"></td>
        <td><button onclick="deleteRow(this)">Удалить</button></td>
    `;
}

function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    saveTableToLocalStorage();
    updateSummedCosts();
}

function saveTableToLocalStorage() {
    const table = document.getElementById('costTable').getElementsByTagName('tbody')[0];
    const rows = table.getElementsByTagName('tr');
    const data = [];

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const rowData = {
            modelName: cells[0].textContent,
            filamentWeight: cells[1].textContent,
            filamentCostPerKg: cells[2].textContent,
            printTime: cells[3].textContent,
            electricityCost: cells[4].textContent,
            maintenanceCost: cells[5].textContent,
            totalCost: cells[6].textContent,
            totalCostWithMarkup: cells[7].textContent,
            checked: cells[8].getElementsByTagName('input')[0].checked
        };
        data.push(rowData);
    }

    localStorage.setItem('costTableData', JSON.stringify(data));
}

function loadTableFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('costTableData'));
    if (data) {
        const table = document.getElementById('costTable').getElementsByTagName('tbody')[0];
        for (const rowData of data) {
            const newRow = table.insertRow();
            newRow.innerHTML = `
                <td>${rowData.modelName}</td>
                <td>${rowData.filamentWeight}</td>
                <td>${rowData.filamentCostPerKg}</td>
                <td>${rowData.printTime}</td>
                <td>${rowData.electricityCost}</td>
                <td>${rowData.maintenanceCost}</td>
                <td>${rowData.totalCost}</td>
                <td>${rowData.totalCostWithMarkup}</td>
                <td><input type="checkbox" ${rowData.checked ? 'checked' : ''} onchange="updateSummedCosts()"></td>
                <td><button onclick="deleteRow(this)">Удалить</button></td>
            `;
        }
    }
}
