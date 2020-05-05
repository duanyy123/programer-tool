<template>
  <div class="app-container">
    <div>
      <div style="font-size: 40px"><strong>{{ submitData.title }}</strong></div>
      <div style="display: flex; font-size: 8px;background: #D1E1E6;padding: 10px">
        <div style="width: 20%"><strong>笔记类别：</strong>{{ showType }}</div>
        <div style="width: 80%; text-align: right"><strong>重要性：</strong>{{ submitData.important }}</div>

      </div>
      <!--      <p class="markdown-body" style="padding: 10px;" v-html="submitData.html" />-->
      <mavon-editor ref="markdownEditor" v-model="submitData.content" :toolbars="toolbars" :subfield="false" :default-open="openType" :editable="false" style="min-height: 600px;" @change="change" />
      <div class="display-flex">
        <div class="div-size left-flex"><i class="el-icon-timer" /><strong>更新时间：</strong>{{ submitData.updateTime }}</div>
        <div class="div-size right-flex"><i class="el-icon-thumb" /><strong>观看次数：</strong>{{ submitData.watch }}</div>
      </div>
    </div>

    <!--    <el-button style="margin-top:80px;" type="primary" icon="el-icon-document" @click="submit">-->
    <!--      保存-->
    <!--    </el-button>-->
  </div>
</template>
<style scoped>
  @import "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.9.0/github-markdown.css";
  @import "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github.min.css";
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

  .hljs-symbol {
    color: #458;
    font-weight: bold;
}
</style>
<script>
import 'mavon-editor/dist/css/index.css'
import { mavonEditor } from 'mavon-editor'

import { save, getBlogTypes, getBlogDetail } from '@/api/blog'
export default {
  name: 'WatchBlog',

  components: {
    mavonEditor
  },
  data() {
    return {
      openType: 'preview',
      toolbars: {
      },
      noteTitle: '',
      showType: '',
      submitData: {
        title: '',
        content: '',
        html: '',
        type: '',
        important: 10,
        watch: 0,
        updateTime: undefined
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
      document.title = this.$route.params.title
      getBlogDetail(this.detailData).then(res => {
        if (res.code === 20000) {
          this.submitData = res.data
          for (var index in this.noteTypes) {
            if (this.noteTypes[index].key === this.submitData.type) {
              this.showType = this.noteTypes[index].value
            }
          }
          this.submitData.watch = this.submitData.watch + 1
          setTimeout(() => {
            this.silentSubmit()
          }, 1000)
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
    silentSubmit() {
      save(this.submitData)
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

