<template>
  <div class="app-container">
    <a target="_blank" :href="reportUrl">
      <span class="a-inner"><i class="el-icon-document" />压缩链接跳转【不支持IFrame】</span>
    </a>
  </div>
</template>
<script>
export default {
  name: 'PressUtil',
  data() {
    return {
      reportUrl: 'https://tinypng.com/'
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
