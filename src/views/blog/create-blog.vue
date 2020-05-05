<template>
  <div class="app-container">
    <el-form ref="submitData" :model="submitData" label-position="left" label-width="70px" style="margin-left:50px;">
      <el-form-item label="标题" prop="title" :rules="{ required: true, message: '请输入标题' }">
        <el-input v-model="submitData.title" style="width: 200px;font-size: 20px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="重要性" prop="important" :rules="[{ required: true, message: '请输入重要程度'},{ type: 'number', message: '重要程度必须为数字值'}]">
        <el-input v-model.number="submitData.important" style="width: 200px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="笔记类别">
        <el-select v-model="submitData.type" placeholder="系统" clearable class="filter-item" style="width: 130px" disabled="">
          <el-option v-for="item in noteTypes" :key="item.key" :label="item.value" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="content" :rules="{required: true, message: '请输入内容' }">
        <div class="editor-container">
          <mavon-editor ref="markdownEditor" v-model="submitData.content" :toolbars="toolbars" style="min-height: 600px;" @change="change" />
        </div>
      </el-form-item>
    </el-form>
    <div class="display-flex">
      <div class="div-size right-flex"><strong>观看次数：</strong>{{ submitData.watch }}</div>
    </div>
    <el-button style="margin-top:80px;" type="primary" icon="el-icon-document" @click="submit">
      保存
    </el-button>
    <el-button style="margin-top:80px;" type="primary" icon="el-icon-document" @click="getHtml">
      获取文本
    </el-button>
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
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { save, getBlogTypes, getBlogDetail } from '@/api/blog'
export default {
  name: 'CreateBlog',
  components: {
    mavonEditor
  },
  data() {
    return {
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      noteTitle: '',
      submitData: {
        title: '',
        content: '',
        html: '',
        type: '',
        important: 10,
        watch: 0
      },
      detailData: {
        id: undefined
      },
      noteTypes: []
    }
  },
  created() {
    if (this.$route.params.type === 'work') {
      this.submitData.type = 'BLOG_WORK'
    } else if (this.$route.params.type === 'code') {
      this.submitData.type = 'CODE_NOTE'
    } else if (this.$route.params.type === 'learn') {
      this.submitData.type = 'LEARN_CONTENT'
    } else if (this.$route.params.type === 'technoligy') {
      this.submitData.type = 'NEW_TECHNOLIGY'
    } else if (this.$route.params.type === 'person') {
      this.submitData.type = 'PERSON_LIKE'
    } else {
      this.submitData.type = 'BLOG_WORK'
    }

    this.noteTitle = this.$route.params.title
    getBlogTypes().then(data => {
      if (data.code === 20000) {
        this.noteTypes = data.data.items
      }
    })

    if (this.$route.params.id) {
      this.detailData.id = this.$route.params.id
      getBlogDetail(this.detailData).then(res => {
        if (res.code === 20000) {
          this.submitData = res.data
        }
      })
    }
  },
  methods: {
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.submitData.html = render
    },
    getHtml() {
      console.log(this.$refs.markdownEditor.d_render)
    },
    submit() {
      this.$refs['submitData'].validate((valid) => {
        if (!valid) {
          return
        }
        save(this.submitData).then(val => {
          if (val.code === 20000) {
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.close()
          } else {
            this.$notify({
              title: '失败',
              message: val.data,
              type: 'error',
              duration: 2000
            })
          }
        })
      })
    },
    close() {
      this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
      this.$router.push(this.$store.state.tagsView.visitedViews[this.$store.state.tagsView.visitedViews.length - 1].path)
    }
  }
}
</script>

<style scoped>

</style>
