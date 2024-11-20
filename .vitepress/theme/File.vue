<template>
  <div class="file" @click="downloadFile">
    <div class="file-icon">
      📄
    </div>
    <Divider layout="vertical" />
    <div class="file-info">
      <div class="file-name">
        {{ displayName }}
      </div>
      <div class="file-size" v-if="fileSize">
        {{ formattedSize }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "File",
  props: {
    filePath: {
      type: String,
      required: true, // Путь к файлу обязателен
    },
    fileAlias: {
      type: String,
      default: "", // Алиас названия файла для отображения
    },
  },
  data() {
    return {
      fileSize: null, // Храним вес файла (в байтах)
    };
  },
  computed: {
    // Отображаемое название файла
    displayName() {
      return this.fileAlias || this.filePath.split("/").pop();
    },
    // Форматируем размер файла (в байтах, КБ, МБ)
    formattedSize() {
      if (this.fileSize >= 1024 * 1024) {
        return (this.fileSize / (1024 * 1024)).toFixed(2) + " MB";
      } else if (this.fileSize >= 1024) {
        return (this.fileSize / 1024).toFixed(2) + " KB";
      }
      return this.fileSize + " B";
    },
  },
  methods: {
    // Функция загрузки файла
    downloadFile() {
      const link = document.createElement("a");
      link.href = this.filePath;
      link.download = this.filePath.split("/").pop(); // Настоящее название файла
      link.click();
    },
    // Запрос размера файла
    async fetchFileSize() {
      try {
        const response = await fetch(this.filePath, { method: "HEAD" });
        if (!response.ok) {
          console.error(`Ошибка HTTP: ${response.status} при запросе ${this.filePath}`);
          return;
        }
        const size = response.headers.get("content-length");
        if (size) {
          this.fileSize = parseInt(size, 10);
        } else {
          console.warn("Не удалось получить размер файла: отсутствует заголовок content-length");
        }
      } catch (error) {
        console.error("Ошибка при запросе размера файла:", error);
      }
    }

  },
  mounted() {
    this.fetchFileSize(); // Получаем размер файла при загрузке компонента
  },
};
</script>

<style scoped>
.file {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  border: 1px solid var(--p-content-border-color);;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.file:hover, .file:focus, .file:hover .file-size {
  color: var(--cc-main);
}

.file-icon {
  font-size: 24px;
}

.file-info {
  display: flex;
  flex-direction: column;
}

.file-name {
  font-weight: bold;
}

.file-size {
  font-size: 12px;
  color: #666;
}
</style>
