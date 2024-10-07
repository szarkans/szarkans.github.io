# Бан-лист

<table id="banned-players-table">
        <thead>
            <tr>
                <th>Ник забаненного</th>
                <th>Причина</th>
                <th>Кто забанил</th>
                <th>На сколько</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
</table>

<script>
        // Замените 'https://example.com/api/banned_players' на URL вашего веб-сервера
        fetch('https://api.catcraftmc.ru/banned-players')
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector('#banned-players-table tbody');

                data.forEach(player => {
                    const row = document.createElement('tr');

                    // Ник забаненного
                    const nameCell = document.createElement('td');
                    nameCell.textContent = player.name;
                    row.appendChild(nameCell);

                    // Причина
                    const reasonCell = document.createElement('td');
                    reasonCell.textContent = player.reason;
                    row.appendChild(reasonCell);

                    // Кто забанил
                    const sourceCell = document.createElement('td');
                    sourceCell.textContent = player.source;
                    row.appendChild(sourceCell);

                    // На сколько
                    const expiresCell = document.createElement('td');
                    expiresCell.textContent = player.expires === 'forever' ? 'Навсегда' : player.expires;
                    row.appendChild(expiresCell);

                    tableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            });
</script>