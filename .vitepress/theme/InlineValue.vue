<template>
  <span>{{ displayValue }}</span>
</template>

<script>
export default {
  name: 'InlineValue',
  props: {
    name: {
      type: String,
      required: true,
      validator: value => Object.prototype.hasOwnProperty.call(this.values, value)
    }
  },
  data() {
    return {
      // Здесь храним все общие значения
      values: {
        version: '1.21.8',
        currentYear: new Date().getFullYear()
      }
    }
  },
  computed: {
    displayValue() {
      return this.values[this.name] || ''
    }
  }
}
</script>

<style scoped>
.inline-value {
  display: inline;
  padding: 0;
  margin: 0;
}
</style>