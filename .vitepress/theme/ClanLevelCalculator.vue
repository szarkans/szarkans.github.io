<template>
  <div class="calc-container">
    <div class="left-side">
      <label for="number-input">Сколько уровней клана нужно:</label><br />
      <input
        type="number"
        id="number-input"
        v-model.number="number"
        style="width: 100px; padding: 5px; font-size: 16px;"
      /><br />
      <div class="preset-buttons">
        <button
          v-for="preset in presets"
          :key="preset"
          @click="setPreset(preset)"
        >
          {{ preset }} ур.
        </button>
      </div>
    </div>
    <div class="right-side">
      <div id="result-title">Очков нужно</div>
      <div id="result">{{ result.toFixed(2) }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClanLevelCalculator",
  data() {
    return {
      number: 0, // Текущее значение уровня
      presets: [10, 20, 30, 50, 100], // Значения для кнопок
    };
  },
  computed: {
    result() {
      // Формула расчета
      return 1.2 * 50 * this.number * (this.number + 1) / 2;
    },
  },
  methods: {
    setPreset(value) {
      // Установить значение из пресета
      this.number = value;
    },
  },
};
</script>

<style>
.calc-container {
  display: flex;
}
.left-side {
  flex: 1;
}
.right-side {
  flex: 1;
  margin-left: 50px;
}
.preset-buttons button {
  margin: 5px 5px 0 0;
  padding: 0 15px;
  font-size: 16px;
  border: #4f2dbe solid 1px;
  border-radius: 15px;
}
.preset-buttons button:hover {
  color: #4f2dbe;
  cursor: pointer;
}
#result-title {
  font-size: 24px;
  margin-bottom: 10px;
}
#result {
  font-size: 32px;
}
</style>
