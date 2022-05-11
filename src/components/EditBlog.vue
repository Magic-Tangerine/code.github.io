<template>
  <el-card id="edit-blog">
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
    <el-form-item label="文章内容">
        <mavon-editor ref="md" v-model="blog.content" prop="content"/>
    </el-form-item>
    
    <el-form-item>
        <el-button type="primary" @click="submitForm('blog')" >确认修改</el-button>
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
        id: this.$route.params.id,
        
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
            { min: 2, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
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
            this.editblog(this.blog.id);
          } else {
            console.log('提交失败！');
            return false;
          }
        });
      },
      resetForm(formtitle) {
        this.$refs[formtitle].resetFields();
      },
      post:function(){
        axios({
          method: 'post',
          url: 'http://124.223.164.9:9527/blog/',
          data: this.blog
        })
        .then(Response=>{
          this.$router.push({path:'/'})
      })
      },
      editblog(id){
        var conf = this.$confirm('是否确认修改？','提示',{confirmButtonText: '确认',cancelButtonText: '取消', type: 'warning'})
        .then(()=>{
            axios({
                method: 'delete',
                url: 'http://124.223.164.9:9527/blog/id',
                data: {
                id: id
                }
            })
            this.post();
        location.reload();
        })
      },
    },
    created(){
        axios({
            method: 'get',
            url: 'http://124.223.164.9:9527/blog/v',
            params: {
            id: this.id
            }
        })
        .then((data)=>{
        //console.log(data.data.data);
        this.blog = data.data.data;
        
        })
    }
  }
</script>

<style>
#edit-blog {
    margin: 50px 20%;
}
.el-form-item {
    margin-top: 50px;
}
</style>
