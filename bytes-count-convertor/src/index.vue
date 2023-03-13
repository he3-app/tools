<template>
  <div>
    <p>
      {{ inputValue }} {{ inputUnit }} = {{ convertedValue }} {{ outputUnit }}
    </p>
    <form>
      <label for="inputValue">Input Value:</label>
      <input id="inputValue" v-model="inputValue" type="number" />
      <br />
      <label for="inputUnit">Input Unit:</label>
      <select id="inputUnit" v-model="inputUnit">
        <option v-for="unit in units" :value="unit">{{ unit }}</option>
      </select>
      <br />
      <label for="outputUnit">Output Unit:</label>
      <select id="outputUnit" v-model="outputUnit">
        <option v-for="unit in units" :value="unit">{{ unit }}</option>
      </select>
    </form>
  </div>
</template>

<script>
function convertUnit(value, fromUnit, toUnit) {
  const units = {
    B: 1,
    KB: 1024,
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024,
    TB: 1024 * 1024 * 1024 * 1024,
    PB: 1024 * 1024 * 1024 * 1024 * 1024,
    KiB: 1000,
    MiB: 1000 * 1000,
    GiB: 1000 * 1000 * 1000,
    TiB: 1000 * 1000 * 1000 * 1000,
    PiB: 1000 * 1000 * 1000 * 1000 * 1000,
  }

  return (value * units[fromUnit]) / units[toUnit]
}

export default {
  data() {
    return {
      inputValue: 0,
      inputUnit: 'B',
      outputUnit: 'B',
      units: [
        'B',
        'KB',
        'MB',
        'GB',
        'TB',
        'PB',
        'KiB',
        'MiB',
        'GiB',
        'TiB',
        'PiB',
      ],
    }
  },
  computed: {
    convertedValue() {
      return convertUnit(this.inputValue, this.inputUnit, this.outputUnit)
    },
  },
}
</script>
