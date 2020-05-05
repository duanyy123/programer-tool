<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getList">
        查找
      </el-button>
      <router-link :to="'/blog/create/work'">
        <el-button class="filter-item" type="primary" icon="el-icon-edit">
          新建
        </el-button>
      </router-link>
    </div>
    <div v-for="item in list" :key="item.id" v-loading="listLoading">
      <div class="display-flex" style="margin-top: 15px; margin-bottom: 15px">
        <div class="div-size left-flex" style="font-size: 20px;">{{ item.title }}</div>
        <div class="div-size right-flex">
          <router-link :to="`/blog/create/work/${item.id}`">
            <el-button class="filter-item" type="primary" size="mini" icon="el-icon-edit">
              修改
            </el-button>
          </router-link>
          <router-link :to="`/blog/watch/${item.title}/${item.id}`">
            <el-button class="filter-item" type="primary" size="mini" icon="el-icon-tickets">
              查看
            </el-button>
          </router-link>
        </div>
      </div>
      <div class="article-line">{{ item.simple }}</div>
      <div class="display-flex">
        <div class="div-size left-flex"><strong>重要程度：</strong>{{ item.important }}</div>
        <div class="div-size right-flex"><strong>观看次数：</strong>{{ item.watch }}</div>
      </div>
    </div>
  </div>
</template>
<style>
  .content{
    color: #8A8A8A;
  }
  .div-size {
    width: 200px;
    height: 30px;
    margin: 0;
    font-size: 5px;
    padding-top: 10px;
  }
  .left-flex{
    width: 80%;
  }
  .right-flex{
    width: 20%;
    text-align: right;
  }
  .display-flex {
  display: flex;
}
  .article-line {
    width: 100%;
    height: 16px;
    line-height: 16px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    -ms-text-overflow: ellipsis;
    white-space:nowrap;
}
</style>
<script>
import { getPage } from '@/api/blog'
export default {
  name: 'WorkBlog',
  components: {
  },
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
        type: 'BLOG_WORK',
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
  activated() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getPage(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
        // this.isOrNotOptions = response.options.isOrNotOptions.reduce((acc, cur) => {
        //   acc[cur.code] = cur.name
        //   return acc
        // }, {})
      })
    }
  }
}
</script>

<style scoped>

</style>
