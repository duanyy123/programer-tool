<template xmlns:overflow="http://www.w3.org/1999/xhtml">
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.content" placeholder="内容" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.fromSys" placeholder="系统" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in sourceSelectOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-date-picker v-model="listQuery.sStart" type="date" placeholder="创建时间-开始" style="top:-5px" />
      <el-date-picker v-model="listQuery.sEnd" type="date" placeholder="创建时间-结束" style="top:-5px" />
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
      <el-table-column label="来源" prop="fromSys" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.fromSys }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类名" prop="className" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.className }}</span>
        </template>
      </el-table-column>
      <el-table-column label="方法名" prop="method" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.method }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否线上环境" prop="isReal" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ isOrNotOptions[row.isReal] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="唯一类型" prop="keyType" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.keyType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="唯一值" prop="keyValue" align="center">
        <template slot-scope="{row}">
          <span>{{ row.keyValue }}</span>
        </template>
      </el-table-column>
      <el-table-column label="关键词" prop="demoKey" align="center">
        <template slot-scope="{row}">
          <span>{{ row.demoKey }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否解决" prop="isSolved" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.isSolved }}</span>
        </template>
      </el-table-column>
      <el-table-column label="解决人" prop="solvePerson" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.solvePerson }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="解决方式" prop="solveWay" align="center">
        <template slot-scope="{row}">
          <span>{{ row.solveWay }}</span>
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
          <el-button v-if="row.errorPhotoUrl" type="warning" size="mini" @click="handlePhoto(row)">
            图片
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="margin-left:50px;">
        <el-form-item label="来源" prop="fromSys">
          <el-select v-model="temp.fromSys" class="filter-item" placeholder="请选择">
            <el-option v-for="item in sourceSelectOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="类名" prop="className">
          <el-input v-model="temp.className" />
        </el-form-item>
        <el-form-item label="方法名" prop="method">
          <el-input v-model="temp.method" />
        </el-form-item>
        <el-form-item label="是否线上环境">
          <el-select v-model="temp.isReal" class="filter-item" placeholder="请选择">
            <el-option v-for="(item,index) in isOrNotOptions" :key="index" :label="isOrNotOptions[index]" :value="index" />
          </el-select>
        </el-form-item>
        <el-form-item label="唯一类型" prop="keyType">
          <el-input v-model="temp.keyType" />
        </el-form-item>
        <el-form-item label="唯一值" prop="keyValue">
          <el-input v-model="temp.keyValue" />
        </el-form-item>
        <el-form-item label="问题简述" prop="demoKey">
          <el-input v-model="temp.demoKey" />
        </el-form-item>
        <el-form-item label="问题详情" prop="demoMsg">
          <el-input v-model="temp.demoMsg" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="解决情况" prop="isSolved">
          <el-input v-model="temp.isSolved" />
        </el-form-item>
        <el-form-item label="解决人" prop="solvePerson">
          <el-input v-model="temp.solvePerson" />
        </el-form-item>
        <el-form-item label="解决方式" prop="solveWay">
          <el-input v-model="temp.solveWay" />
        </el-form-item>
        <el-form-item v-if="temp.id" label="是否有图">
          <el-select v-model="temp.needPicture" class="filter-item" placeholder="请选择">
            <el-option v-for="item in pictureOptions" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
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
        <el-button v-if="temp.needPicture" type="warning" @click="editPicture()">编辑图片</el-button>
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
    <el-dialog :visible.sync="dialogUploadVisible" title="图片上传" :close-on-click-modal="false">
      <el-upload
        ref="upload"
        class="upload-demo"
        action="http://localhost:6623/upload/multifileUpload"
        :file-list="fileList"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :auto-upload="false"
        :data="extraData"
        :name="uploadName"
        :on-success="handleAvatarSuccess"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <el-button @click="lookPhoto(temp.id)">查看图片</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeUpload()"> 取消</el-button>
      </span>
    </el-dialog>
    <el-image-viewer
      v-if="showViewer"
      :z-index="imageIndex"
      :on-close="closeViewer"
      :url-list="photos"
    />
  </div>
</template>
<style>
   .el-upload-list__item {
      transition: none !important;
    }
  .fixed-width .el-button--mini {
    padding: 2px 2px;
    width: 40px;
    margin: 4px;
}
</style>
<script>
import { getPage, fetchPv, save, deleteData, getPhotoList } from '@/api/code'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import { MessageBox } from 'element-ui'
import elImageViewer from 'element-ui/packages/image/src/image-viewer'

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
  name: 'CodeBug',
  components: {
    Pagination,
    elImageViewer
  },
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
      fileList: [],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        content: undefined,
        fromSys: undefined,
        timestampStart: undefined,
        timestampEnd: undefined,
        sStart: undefined,
        sEnd: undefined
      },
      imageIndex: 5000,
      calendarTypeOptions,
      sourceSelectOptions: [
      ],
      solveTypeOptions: [],
      photos: [],
      showViewer: false, // 显示查看器
      isOrNotOptions: [],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      pictureOptions: [{ code: 1, name: '有图' }, { code: 0, name: '无图' }],
      sqlOptions: [{ code: 1, name: '有SQL' }, { code: 0, name: '无SQL' }],
      showReviewer: false,
      temp: {
        id: undefined,
        fromSys: undefined,
        className: undefined,
        method: undefined,
        keyType: '',
        keyValue: '',
        demoKey: '',
        demoMsg: '',
        isSolved: '',
        solvePerson: '',
        createTime: '',
        solveWay: '',
        needPicture: 0,
        isReal: undefined,
        errorPhotoUrl: '',
        solvedSqlUrl: '',
        needSQL: ''
      },
      dialogFormVisible: false,
      dialogUploadVisible: false,
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
      extraData: { type: 'test', id: '1' },
      uploadName: 'file',
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleAvatarSuccess(response, file, fileList) {
      if (response.code === 20000) {
        this.temp.errorPhotoUrl = response.data.errorPhotoUrl
      }
    },
    closeUpload() {
      this.$refs.upload.clearFiles()
      // this.dialogUploadVisible = false
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      if (this.temp.id) {
        const index = this.fileList.findIndex(f => f.url === file.url)
        this.lookPhotoPreview(this.temp.id, index)
      }
    },
    lookPhotoPreview(id, index) {
      getPhotoList(id).then(response => {
        var tempImgList = [...response.data.items]
        var temp = []
        for (let i = 0; i < index; i++) {
          temp.push(tempImgList.shift())
        }
        this.photos = tempImgList.concat(temp)
        this.showViewer = true
        setTimeout(() => {
        }, 1.5 * 1000)
      })
    },
    editPicture() {
      var id = this.temp.id
      this.extraData = { type: 'UP_C_PIC', id: id }
      if (this.temp.errorPhotoUrl) {
        getPhotoList(id).then(response => {
          var tList = []
          this.photos = response.data.items
          for (var index in this.photos) {
            var photo = this.photos[index]
            tList[index] = { url: photo }
          }
          this.fileList = tList
          this.dialogUploadVisible = true
        })
      } else {
        this.fileList = []
        this.dialogUploadVisible = true
      }
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    // 关闭查看器
    closeViewer() {
      this.showViewer = false
    },
    formatTime(date, fmt) {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          var str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
        }
      }
      return fmt
    },
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
        this.solveTypeOptions = response.options.solveTypeOptions.reduce((acc, cur) => {
          acc[i++] = cur.name
          return acc
        }, {})

        this.isOrNotOptions = response.options.isOrNotOptions.reduce((acc, cur) => {
          acc[cur.code] = cur.name
          return acc
        }, {})

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1

      if (this.listQuery.sStart === undefined || this.listQuery.sStart === null) {
        this.listQuery.timestampStart = undefined
      } else {
        this.listQuery.timestampStart = this.formatTime(this.listQuery.sStart, 'yyyy-MM-dd hh:mm:ss')
      }

      if (this.listQuery.sEnd === undefined || this.listQuery.sEnd === null) {
        this.listQuery.timestampEnd = undefined
      } else {
        this.listQuery.timestampEnd = this.formatTime(this.listQuery.sEnd, 'yyyy-MM-dd hh:mm:ss')
      }
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    handlePhoto(row) {
      var id = Object.assign({}, row).id
      this.lookPhoto(id)
    },
    lookPhoto(id) {
      getPhotoList(id).then(response => {
        this.photos = response.data.items
        this.showViewer = true
        setTimeout(() => {
        }, 1.5 * 1000)
      })
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
        fromSys: undefined,
        className: undefined,
        method: undefined,
        keyType: '',
        keyValue: '',
        demoKey: '',
        demoMsg: '',
        isSolved: '',
        solvePerson: '',
        createTime: '',
        solveWay: '',
        needPicture: 0,
        isReal: undefined,
        errorPhotoUrl: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.temp.needPicture = 0
      this.temp.needSQL = 0
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
      this.temp.needPicture = this.temp.errorPhotoUrl ? 1 : 0
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
