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
  name: 'SQLHelper',
  data() {
    return {
      reportUrl: 'http://localhost:6623/pages/o2o.html'
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
