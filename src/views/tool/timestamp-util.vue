<template>
  <div class="app-container">
    <iframe
      style="border:none;width: 100%; min-height: 750px"
      :src="reportUrl"
    />
  </div>
</template>
<script>
export default {
  name: 'TimestampUtil',
  data() {
    return {
      reportUrl: 'https://tool.lu/timestamp/'
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
