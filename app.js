let classes = [];
function addClass() {
    const className = document.getElementById('class-name').value;
    const grade = document.getElementById('grade').value;
    const type = document.getElementById('type').value;
    classes.push({ className, grade, type });
    displayClasses();
}
function displayClasses() {
    const classList = document.getElementById('class-list');
    classList.innerHTML = '';
    classes.forEach((cls) => {
        const li = document.createElement('li');
        li.textContent = `${cls.className} - ${cls.grade} (${cls.type})`;
        classList.appendChild(li);
    });
}
function addRow() {
    const table = document.getElementById('class-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    cell1.innerHTML = '<input type="text" required oninput="calculateGPA()">';
    cell2.innerHTML = `
        <select required onchange="calculateGPA()">
            <option value="A">A</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="B-">B-</option>
            <option value ="C+">C+</option>
            <option value="C">C</option>
            <option value="C-">C-</option>
            <option value="D+">D+</option>
            <option value="D">D</option>
            <option value="D-">D-</option>
            <option value="F">F</option>
        </select>`;
    cell3.innerHTML = `
        <select required onchange="calculateGPA()">
            <option value="regular">Regular</option>
            <option value="honors">Honors</option>
            <option value="ap">AP/IB</option>
        </select>`;
    cell4.innerHTML = '<input type="number" min="0" step="0.5" required oninput="calculateGPA()">';
    cell5.innerHTML = '<button type="button" class="delete" onclick="deleteRow(this)">Delete</button>';
}
function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    calculateGPA();
}
function calculateGPA() {
    const table = document.getElementById('class-table').getElementsByTagName('tbody')[0];
    const rows = table.getElementsByTagName('tr');
    let totalUnweightedPoints = 0;
    let totalWeightedPoints = 0;
    let totalCredits = 0;
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const className = cells[0].getElementsByTagName('input')[0].value;
        const grade = cells[1].getElementsByTagName('select')[0].value;
        const type = cells[2].getElementsByTagName('select')[0].value;
        const credits = parseFloat(cells[3].getElementsByTagName('input')[0].value);
        if (className && grade && type && !isNaN(credits)) {
            let points = 0;
            switch (grade) {
                case 'A': points = 4; break;
                case 'A-': points = 3.7; break;
                case 'B+': points = 3.3; break;
                case 'B': points = 3; break;
                case 'B-': points = 2.7; break;
                case 'C+': points = 2.3; break;
                case 'C': points = 2; break;
                case 'C-': points = 1.7; break;
                case 'D+': points = 1.3; break;
                case 'D': points = 1; break;
                case 'D-': points = 0.7; break;
                case 'F': points = 0; break;
            }
            totalUnweightedPoints += points * credits;
            if (type === 'honors') {
                points += 0.5;
            } else if (type === 'ap') {
                points += 1;
            }
            totalWeightedPoints += points * credits;
            totalCredits += credits;
        }
    }
    const unweightedGPA = totalUnweightedPoints / totalCredits;
    const weightedGPA = totalWeightedPoints / totalCredits;
    document.getElementById('unweighted-gpa').textContent = unweightedGPA.toFixed(2);
    document.getElementById('weighted-gpa').textContent = weightedGPA.toFixed(2);
}
