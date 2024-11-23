document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tracker-form');
    const symptomList = document.getElementById('symptom-list');
    const symptoms = JSON.parse(localStorage.getItem('symptoms')) || [];

    const saveToLocalStorage = () => {
        localStorage.setItem('symptoms', JSON.stringify(symptoms));
    };

    const renderSymptoms = () => {
        symptomList.innerHTML = '';
        symptoms.forEach((symptom, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>Date:</strong> ${symptom.date} | 
                <strong>Severity:</strong> ${symptom.severity} | 
                <strong>Triggers:</strong> ${symptom.triggers}
            `;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => {
                symptoms.splice(index, 1);
                saveToLocalStorage();
                renderSymptoms();
            };
            li.appendChild(deleteBtn);
            symptomList.appendChild(li);
        });
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const date = document.getElementById('date').value;
        const severity = document.getElementById('severity').value;
        const triggers = document.getElementById('triggers').value;

        if (date && severity) {
            symptoms.push({ date, severity, triggers });
            saveToLocalStorage();
            renderSymptoms();
            form.reset();
        }
    });

    renderSymptoms();
});
