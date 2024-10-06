function parseGcode(content) {
    console.log("Parsing G-code content...");

    // Поиск веса филамента
    const filamentUsedMatch = content.match(/; filament used \[g\] =\s*([\d.]+)/i);
    if (filamentUsedMatch) {
        document.getElementById('filamentWeight').value = parseFloat(filamentUsedMatch[1]);
        console.log("Filament weight found:", filamentUsedMatch[1]);
    } else {
        console.error("Filament weight not found.");
    }

    // Поиск времени печати
    const printTimeMatch = content.match(/(\d+h\s*\d+m\s*\d+s|\d+h\s*\d+m|\d+m\s*\d+s)/i);
    if (printTimeMatch) {
        // Извлекаем время
        const timeParts = printTimeMatch[1].match(/(\d+h)?\s*(\d+m)?\s*(\d+s)?/i);
        const hours = timeParts[1] ? parseFloat(timeParts[1]) : 0;
        const minutes = timeParts[2] ? parseFloat(timeParts[2]) : 0;
        const seconds = timeParts[3] ? parseFloat(timeParts[3]) : 0;

        // Корректный расчет времени в часах
        const totalHours = hours + (minutes / 60) + (seconds / 3600);
        document.getElementById('printTime').value = totalHours.toFixed(2);

        console.log("Print time found:", totalHours);
    } else {
        console.error("Print time not found.");
    }
}
