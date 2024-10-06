document.addEventListener('DOMContentLoaded', (event) => {
    loadTableFromLocalStorage();
    document.getElementById('gcodeFile').addEventListener('change', handleFileSelect);
    document.getElementById('updateCostsButton').addEventListener('click', updateSummedCosts);
});

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            parseGcode(content);
        };
        reader.readAsText(file);
    }
}

function parseGcode(content) {
    // Основные регулярные выражения
    const filamentWeightRegex = /Filament\sweight\s\[g\]\s*=\s*([\d\.]+)/;
    const printTimeRegex = /Print\stime\s*=\s*([\d:]+)/;
    const filamentTypeRegex = /Filament\stype\s*=\s*(\w+)/;

    // Альтернативные регулярные выражения
    const alternativeWeightRegex = /\[g\]\s*=\s*([\d\.]+)/;
    const alternativeTimeRegexHMS = /.*=\s*(\d+)h\s*(\d+)m\s*(\d+)s/;
    const alternativeTimeRegexMS = /.*=\s*(\d+)m\s*(\d+)s/;

    // Поиск основных совпадений
    let weightMatch = content.match(filamentWeightRegex);
    let timeMatch = content.match(printTimeRegex);
    const filamentTypeMatch = content.match(filamentTypeRegex);

    // Если вес не найден, ищем альтернативный формат
    if (!weightMatch) {
        weightMatch = content.match(alternativeWeightRegex);
    }

    // Если время не найдено, ищем альтернативные форматы времени
    if (!timeMatch) {
        timeMatch = content.match(alternativeTimeRegexHMS) || content.match(alternativeTimeRegexMS);
    }

    // Извлечение данных или установка значений "Не найдено"
    const weight = weightMatch ? weightMatch[1] : 'Не найдено';
    
    // Для времени, если найден альтернативный формат, форматируем его
    let time;
    if (timeMatch) {
        if (timeMatch.length === 3) { // Формат Xm Xs
            time = `${timeMatch[1]}m ${timeMatch[2]}s`;
        } else if (timeMatch.length === 4) { // Формат Xh Xm Xs
            time = `${timeMatch[1]}h ${timeMatch[2]}m ${timeMatch[3]}s`;
        } else {
            time = timeMatch[1]; // Стандартный формат HH:MM:SS
        }
    } else {
        time = 'Не найдено';
    }

    const filamentType = filamentTypeMatch ? filamentTypeMatch[1] : 'Не найдено';

    console.log("Вес филамента (г):", weight);
    console.log("Время печати:", time);
    console.log("Тип пластика:", filamentType);

    // Обновляем интерфейс (если требуется)
    document.getElementById('filamentWeight').textContent = `Вес филамента: ${weight} г`;
    document.getElementById('printTime').textContent = `Время печати: ${time}`;
    document.getElementById('filamentType').textContent = `Тип пластика: ${filamentType}`;
}

// Пример функции updateSummedCosts
function updateSummedCosts() {
    // Здесь должен быть твой код для обновления стоимости
    console.log("Стоимость обновлена");
}
