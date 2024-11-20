<template>
    <div>
      <DataTable :value="bannedPlayers" responsiveLayout="scroll" paginator :rows="30" :rowsPerPageOptions="[30, 50]" style="width: 100%;" >
        <Column field="name" header="Ник забаненного">
          <template #body="slotProps">
            <div style="display: flex; align-items: center; gap: 8px;">
              <img
                :src="`http://cravatar.eu/avatar/${slotProps.data.name}/100.png`"
                alt="Игрок"
                width="50"
                height="50"
                style="flex-shrink: 0; border-radius: 5px;"
              />
              <span>{{ slotProps.data.name }}</span>
            </div>
          </template>
        </Column>
        <Column field="reason" header="Причина" />
        <Column field="source" header="Кто забанил">
          <template #body="slotProps">
            <div style="display: flex; align-items: center; gap: 8px;">
              <img
                :src="slotProps.data.source === 'Всекотец'
                  ? 'http://cravatar.eu/avatar/Szarkan/100.png'
                  : `http://cravatar.eu/avatar/${slotProps.data.source}/100.png`"
                alt="Админ"
                width="50"
                height="50"
                style="flex-shrink: 0; border-radius: 5px;"
              />
              <span>{{ slotProps.data.source }}</span>
            </div>
          </template>
        </Column>
        <Column field="expires" header="Когда разбан?" />
      </DataTable>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  
  const bannedPlayers = ref([]);
  
  const removeMinecraftColorCodes = (text) =>
    text.replace(/§[0-9A-FK-ORa-fk-or]/g, '');
  
  const fetchBannedPlayers = async () => {
    try {
      const response = await fetch('https://api.catcraftmc.ru/banned-players.json');
      const data = await response.json();
  
      // Сортируем данные по дате создания (от новых к старым)
      const sortedData = data.sort((a, b) => new Date(b.created) - new Date(a.created));
  
      // Преобразуем данные для таблицы
      bannedPlayers.value = sortedData.map((player) => ({
        name: removeMinecraftColorCodes(player.name),
        reason: removeMinecraftColorCodes(player.reason),
        source: removeMinecraftColorCodes(player.source),
        expires:
          player.expires === 'forever'
            ? 'Никогда'
            : player.expires.replace('+0000', ''),
      }));
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };
  
  onMounted(fetchBannedPlayers);
  </script>
  
  <style>
  /* Дополнительные стили для таблицы, если необходимо */
  </style>
  