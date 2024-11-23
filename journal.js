document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('journal-form');
    const entryInput = document.getElementById('journal-entry');
    const entriesList = document.getElementById('entries-list');
    const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];

    const saveToLocalStorage = () => {
        localStorage.setItem('journalEntries', JSON.stringify(entries));
    };

    const renderEntries = () => {
        entriesList.innerHTML = '';
        entries.forEach((entry, index) => {
            const li = document.createElement('li');
            li.textContent = entry;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => {
                entries.splice(index, 1);
                saveToLocalStorage();
                renderEntries();
            };
            li.appendChild(deleteBtn);
            entriesList.appendChild(li);
        });
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const entry = entryInput.value.trim();
        if (entry) {
            entries.push(entry);
            saveToLocalStorage();
            renderEntries();
            form.reset();
        }
    });

    renderEntries();
});
