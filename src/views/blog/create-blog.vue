<template>
  <div class="app-container">
    <div style="padding-top: 10px;padding-bottom: 10px">
      标题： <el-input v-model="submitData.title" style="width: 200px;font-size: 20px;" class="filter-item" />
    </div>
    <div class="editor-container">
      <markdown-editor ref="markdownEditor" v-model="content1" height="300px" />
    </div>
    <el-button style="margin-top:80px;" type="primary" icon="el-icon-document" @click="getHtml">
      Get HTML
    </el-button>
    <div v-html="html" />
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
const content = `
**This is test**

* vue
* element
* webpack

`
export default {
  name: 'CreateBlog',

  components: {
    MarkdownEditor
  },
  data() {
    return {
      content1: content,
      html: '',
      submitData: {
        title: ''
      }
    }
  },
  methods: {
    getHtml() {
      this.html = this.$refs.markdownEditor.getHtml()
      console.log(this.html)
    }
  }
}
</script>

<style scoped>

</style>
