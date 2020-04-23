<template>
  <div class="app-container">
    <div class="app-container">
      <div>
        <h5>程序员工具后端</h5>
        <a target="_blank" :href="programmerNotes">
          <span class="a-inner"><i class="el-icon-document" />programer-tool</span>
        </a>
      </div>
      <div>
        <h5>程序员工具前端</h5>
        <a target="_blank" :href="programmerData">
          <span class="a-inner"><i class="el-icon-document" />programer-tool-spring</span>
        </a>
      </div>
      <div>
        <h5>周报生成器</h5>
        <a target="_blank" :href="weekReport">
          <span class="a-inner"><i class="el-icon-document" />WeekReport</span>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WeekReport',
  data() {
    return {
      programmerNotes: 'https://github.com/duanyy123/programer-tool',
      programmerData: 'https://github.com/duanyy123/programer-tool-spring',
      weekReport: 'https://github.com/duanyy123/weekreport'
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
