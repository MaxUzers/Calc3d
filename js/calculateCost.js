function calculateCost() {
    const modelName = document.getElementById('modelName').value;
    const filamentWeight = parseFloat(document.getElementById('filamentWeight').value);
    const filamentCostPerKg = parseFloat(document.getElementById('filamentCost').value);
    const printTime = parseFloat(document.getElementById('printTime').value);
    const electricityCost = parseFloat(document.getElementById('electricityCost').value);
    const maintenanceCost = parseFloat(document.getElementById('maintenanceCost').value);
    const markup = parseFloat(document.getElementById('markup').value);

    if (!modelName || isNaN(filamentWeight) || isNaN(filamentCostPerKg) || isNaN(printTime) || isNaN(electricityCost) || isNaN(maintenanceCost) || isNaN(markup)) {
        alert("Пожалуйста, введите корректные значения для всех полей.");
        return;
    }

    const filamentCost = (filamentWeight / 1000) * filamentCostPerKg;
    const totalElectricityCost = printTime * electricityCost;
    const totalMaintenanceCost = printTime * maintenanceCost;
    const totalCost = filamentCost + totalElectricityCost + totalMaintenanceCost;
    const totalCostWithMarkup = totalCost + (totalCost * (markup / 100));

    document.getElementById('totalCost').textContent = totalCost.toFixed(2);
    document.getElementById('totalCostWithMarkup').textContent = totalCostWithMarkup.toFixed(2);

    addRowToTable(modelName, filamentWeight, filamentCostPerKg, printTime, electricityCost, maintenanceCost, totalCost, totalCostWithMarkup);
    saveTableToLocalStorage();
    updateSummedCosts();
}
