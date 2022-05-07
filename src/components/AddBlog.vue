<template>
  <el-card id="add-blog">
    <el-form :model="blog" :rules="rules" ref="blog" label-width="100px" class="demo-blog">
    <el-form-item label="文章标题" prop="title">
        <el-input v-model="blog.title" style="width: 300px"></el-input>
    </el-form-item>
    <el-form-item label="文章作者" prop="author">
        <el-input v-model="blog.author" style="width: 200px"></el-input>
    </el-form-item>
    <el-form-item label="推送到主页" prop="delivery">
        <el-switch v-model="blog.delivery"></el-switch>
    </el-form-item>
    <el-form-item label="文章类型" prop="type">
        <el-radio v-model="blog.category" label="学习">学习</el-radio>
        <el-radio v-model="blog.category" label="娱乐">娱乐</el-radio>
        <el-radio v-model="blog.category" label="生活">生活</el-radio>
        <el-radio v-model="blog.category" label="其他">其他</el-radio>
    </el-form-item>
    <el-form-item label="文章内容" prop="content">
        <el-input type="textarea" v-model="blog.content" style="width: 80%"></el-input>
    </el-form-item>
    
    <el-form-item>
        <el-button type="primary" @click="submitForm('blog')" >提交文章</el-button>
        <el-button @click="resetForm('blog')">重置</el-button>
    </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import axios from 'axios'
  export default {
      
    data() {
      return {
        blog: {
          id: '',
          title: '',
          author: '',
          pushToPage: "1",
          category: '',
          content: '',
          publishDate:'',
        },
        rules: {
          title: [
            { required: true, message: '请输入文章标题', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          author: [
              {required: true, message: '请输入文章作者', trigger: 'blur'},
          ],
          content: [
            { required: true, message: '请填写文章内容', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formtitle) {
        this.$refs[formtitle].validate((valid) => {
          if (valid) {
            let nowtime = new Date();
            this.blog.publishDate = nowtime;
            alert('submit!');
            this.post();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formtitle) {
        this.$refs[formtitle].resetFields();
      },
      post:function(){
        axios.post("http://124.223.164.9:9527/blog/",this.blog)
        .then((data)=>{
          console.log(data);
        })
      }
    }
  }
</script>

<style>
#add-blog {
    margin: 50px 20%;
}
.el-form-item {
    margin-top: 50px;
}
</style>
