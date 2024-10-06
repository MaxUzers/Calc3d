function updateSummedCosts() {
    const table = document.getElementById('costTable').getElementsByTagName('tbody')[0];
    const rows = table.getElementsByTagName('tr');
    let summedTotalCost = 0;
    let summedTotalCostWithMarkup = 0;

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const checkbox = cells[8].getElementsByTagName('input')[0];
        if (checkbox.checked) {
            summedTotalCost += parseFloat(cells[6].textContent);
            summedTotalCostWithMarkup += parseFloat(cells[7].textContent);
        }
    }

    document.getElementById('summedTotalCost').textContent = summedTotalCost.toFixed(2);
    document.getElementById('
