<template>
  <div class="app-container">
    <div class="filter-container" />
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      highlight-current-row
      style="width: 99.9%;"
      :span-method="arraySpanMethod"
    >
      <el-table-column />
    </el-table>
  </div>
</template>

<script>
import { getPage } from '@/api/blog'
export default {
  name: 'WorkBlog',
  data() {
    return {
      tableKey: 0,
      listLoading: true,
      list: null,
      total: 0,
      isOrNotOptions: [],
      listQuery: {
        page: 1,
        limit: 20,
        createTimeStart: undefined,
        createTimeEnd: undefined,
        updateTimeStart: undefined,
        updateTimeEnd: undefined,
        shortTitle: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getPage(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        this.isOrNotOptions = response.options.isOrNotOptions.reduce((acc, cur) => {
          acc[cur.code] = cur.name
          return acc
        }, {})

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    }
  }
}
</script>

<style scoped>

</style>
