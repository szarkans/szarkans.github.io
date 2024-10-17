---
icon: fontawesome/solid/hammer
description: Бан-лист Кошкокрафта
---

# Бан-лист

Мы понимаем, как выглядят некоторые причины банов, но если в причине написано обзывательство, то это означает какое-то типичное нарушение (гриферство, воровство или подобное).

<style>
    /* Добавляем стили для ячейки с ником */
    .player-name-cell {
        display: flex;
        align-items: center;
    }
    .player-name-cell img {
        margin-right: 10px; /* Отступ между изображением и ником */
    }
    .md-grid {
        max-width: 90rem;
    }
</style>

<table id="banned-players-table">
    <thead>
        <tr>
            <th>Ник забаненного</th>
            <th>Причина</th>
            <th>Кто забанил</th>
            <th>Когда разбан?      </th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>

<script>
    fetch('https://api.catcraftmc.ru/banned-players.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#banned-players-table tbody');

            // Сортируем данные по дате создания (от новых к старым)
            data.sort((a, b) => new Date(b.created) - new Date(a.created));

            data.forEach(player => {
                const row = document.createElement('tr');

                // Удаляем цветовые коды из текста
                const playerName = removeMinecraftColorCodes(player.name);
                const playerReason = removeMinecraftColorCodes(player.reason);
                const playerSource = removeMinecraftColorCodes(player.source);
                const playerExpires = player.expires === 'forever' ? 'Никогда' : player.expires.replace("+0000", "");

                // Ник забаненного с изображением
                const nameCell = document.createElement('td');
                nameCell.classList.add('player-name-cell'); // Добавляем класс для стилизации

                const nameImage = document.createElement('img');
                nameImage.src = `http://cravatar.eu/avatar/${playerName}/100.png`;
                nameImage.width = 50; // Размер изображения
                nameImage.height = 50;
                nameImage.style.flexShrink = '0'; // Предотвращаем сжатие изображения

                const nameText = document.createElement('span');
                nameText.textContent = playerName;

                nameCell.appendChild(nameImage);
                nameCell.appendChild(nameText);
                row.appendChild(nameCell);

                // Причина
                const reasonCell = document.createElement('td');
                reasonCell.textContent = playerReason;
                row.appendChild(reasonCell);

                // Кто забанил с изображением
                const sourceCell = document.createElement('td');
                sourceCell.classList.add('player-name-cell'); // Используем тот же класс для стилизации

                const sourceImage = document.createElement('img');
                if (playerSource === 'Всекотец') {
                    sourceImage.src = 'http://cravatar.eu/avatar/Szarkan/100.png';
                } else {
                    sourceImage.src = `http://cravatar.eu/avatar/${playerSource}/100.png`;
                }
                sourceImage.width = 50;
                sourceImage.height = 50;
                sourceImage.style.flexShrink = '0';

                const sourceText = document.createElement('span');
                sourceText.textContent = playerSource;

                sourceCell.appendChild(sourceImage);
                sourceCell.appendChild(sourceText);
                row.appendChild(sourceCell);

                // На сколько
                const expiresCell = document.createElement('td');
                expiresCell.textContent = playerExpires;
                row.appendChild(expiresCell);

                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Ошибка при получении данных:', error);
        });

    // Функция для удаления цветовых кодов Майнкрафта
    function removeMinecraftColorCodes(text) {
        return text.replace(/§[0-9A-FK-ORa-fk-or]/g, '');
    }
</script>
