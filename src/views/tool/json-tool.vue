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
  name: 'JsonTool',
  data() {
    return {
      reportUrl: 'https://www.json.cn/'
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
