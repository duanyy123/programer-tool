<template xmlns:overflow="http://www.w3.org/1999/xhtml">
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.needDataSimilar" placeholder="内容" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.systemName" placeholder="系统" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in sourceSelectOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-date-picker v-model="listQuery.createTimeStart" type="date" placeholder="创建时间-开始" style="top:-5px" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" />
      <el-date-picker v-model="listQuery.createTimeEnd" type="date" placeholder="创建时间-结束" style="top:-5px" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" />
      <br>
      <el-date-picker v-model="listQuery.finishTimeStart" type="date" placeholder="完成时间-开始" style="top:-5px" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" />
      <el-date-picker v-model="listQuery.finishTimeEnd" type="date" placeholder="完成时间-结束" style="top:-5px" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" />
      <el-date-picker v-model="listQuery.onlineTimeStart" type="date" placeholder="上线时间-开始" style="top:-5px" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" />
      <el-date-picker v-model="listQuery.onlineTimeEnd" type="date" placeholder="上线时间-结束" style="top:-5px" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" />
      <br>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查找
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>

    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      highlight-current-row
      style="width: 99.9%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" align="center" width="50">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="来源" prop="systemName" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.systemName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="需求内容" prop="needData" align="center" width="200">
        <template slot-scope="{row}">
          <span>{{ row.needData }}</span>
        </template>
      </el-table-column>
      <el-table-column label="需求地址" prop="demoKey" align="center">
        <template slot-scope="{row}">
          <a v-if="row.needUrl!=null" target="_blank" :href="row.needUrl" style="color: #4A9FF9">
            <span class="a-inner"><i class="el-icon-document" />{{ row.needUrl }}</span>
          </a>
        </template>
      </el-table-column>
      <el-table-column label="开发人员" prop="developers" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.developers }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="完成时间" align="center">
        <template slot-scope="{row}">
          <span v-if="row.finishTime!=null">{{ row.finishTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上线时间" align="center">
        <template slot-scope="{row}">
          <span v-if="row.onlineTime!=null">{{ row.onlineTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="margin-left:50px;">
        <el-form-item label="来源" prop="systemName">
          <el-select v-model="temp.systemName" class="filter-item" placeholder="请选择">
            <el-option v-for="item in sourceSelectOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>

        <el-form-item label="需求内容" prop="systemName">
          <el-input v-model="temp.needData" />
        </el-form-item>

        <el-form-item label="需求地址" prop="needData">
          <el-input v-model="temp.needUrl" />
        </el-form-item>
        <el-form-item label="开发人员" prop="developers">
          <el-input v-model="temp.developers" />
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-date-picker v-model="temp.createTime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="请选择日期" />
        </el-form-item>
        <el-form-item label="完成时间" prop="finishTime">
          <el-date-picker v-model="temp.finishTime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="请选择日期" />
        </el-form-item>
        <el-form-item label="上线时间" prop="onlineTime">
          <el-date-picker v-model="temp.onlineTime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="请选择日期" />
        </el-form-item>
        <div />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics" :close-on-click-modal="false">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false"> 确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getPage, fetchPv, save, deleteData } from '@/api/need'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import { MessageBox } from 'element-ui'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'NeedData',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        need_data: undefined,
        systemName: undefined,
        createTimeStart: undefined,
        createTimeEnd: undefined,
        finishTimeStart: undefined,
        finishTimeEnd: undefined,
        onlineTimeStart: undefined,
        onlineTimeEnd: undefined
      },
      calendarTypeOptions,
      sourceSelectOptions: [
      ],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      showReviewer: false,
      temp: {
        id: undefined,
        systemName: undefined,
        keyType: '',
        keyValue: '',
        demoKey: '',
        demoMsg: '',
        isSolved: '',
        solvePerson: '',
        createTime: undefined,
        solveWay: '',
        errorHeart: '',
        needDataSimilar: undefined,
        needUrl: undefined,
        developers: undefined,
        finishTime: undefined,
        onlineTime: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '创建'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
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

        var i = 0
        this.sourceSelectOptions = response.options.sourceSelectOptions.reduce((acc, cur) => {
          acc[i++] = cur.name
          return acc
        }, {})

        i = 0
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        systemName: undefined,
        keyType: '',
        keyValue: '',
        demoKey: '',
        demoMsg: '',
        isSolved: '',
        solvePerson: '',
        createTime: undefined,
        solveWay: '',
        errorHeart: '',
        think: '',
        needData: undefined,
        developers: undefined,
        finishTime: undefined,
        onlineTime: undefined,
        needUrl: undefined
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true

      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          save(this.temp).then(val => {
            this.temp = val.data
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          save(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      MessageBox.confirm('确认操作将删除记录且无法恢复', '删除确认', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteData(row).then(() => {
          this.$notify({
            title: 'Success',
            message: 'Update Successfully',
            type: 'success',
            duration: 2000
          })
        })
        this.list.splice(index, 1)
      })
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
