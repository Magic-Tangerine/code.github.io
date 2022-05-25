<template>
  <div id="v-main" style="min-width: 1365px">
      <el-container>
        <el-aside style="width: 10%;"></el-aside>
        <el-container>
          <el-main>
            <el-row v-for="blog in sortbydate1" :key="blog.id">
              <el-col :span="24">
                <el-card :body-style="{ padding: '0px' }">
                  <div class="pic"><router-link type="primary" :to="'/blog/' + blog.id"><img :src="blog.backgroundUrl" class="image"></router-link></div>
                  <div class="article">
                    <router-link type="primary" :to="'/blog/' + blog.id"><h3 style="text-align: center">{{ blog.title}}</h3></router-link>
                    <router-link type="primary" :to="'/blog/' + blog.id"><span>{{ blog.content | snippet}}</span></router-link>
                    <router-link type="primary" :to="'/blog/' + blog.id"><el-button type="text" class="button">查看全文</el-button></router-link>
                    <div class="bottom clearfix">
                      <time class="time">发布时间：{{blog.publishDate | snippet_date}}</time>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            
          </el-main>
          <el-aside>
            <el-card class="box-card" style="margin-top: 20px;">
              <div slot="header" class="clearfix">
                <span>公告</span>
                
              </div>
              <div class="text item">
                网站正在积极搭建中。。。
              </div>
            </el-card>

            <el-card class="box-card" style="margin-top: 20px;">
              <div slot="header" class="clearfix">
                <span>近期文章</span>
                <el-button style="float: right; padding: 3px 0" type="text"><router-link to="/article">更多文章>></router-link></el-button>
              </div>
              <div v-for='blog in sortbydate' :key="blog.id" class="text item">
                <a href="">{{blog.title | snippet_title}}</a>
              </div>
            </el-card>

            <el-card class="box-card" style="margin-top: 20px;">
              <div slot="header" class="clearfix">
                <span>文章分类</span>
                <el-button style="float: right; padding: 3px 0" type="text"><router-link to="/article">更多文章>></router-link></el-button>
              </div>
              <div v-for="category,index in categories" :key="index" class="text item">
                {{category}}
              </div>
            </el-card>

            <el-card class="box-card" style="margin-top: 20px;">
              <div slot="header" class="clearfix">
                <span>网站资讯</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
              </div>
              <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
              </div>
            </el-card>
          </el-aside>
        </el-container>
        <el-aside style="width: 10%;"></el-aside>
      </el-container>
  </div>
</template>

<script>
import axios from 'axios'
import { marked } from 'marked'
export default {
  name: 'v-main',
  data(){
    return{
      blogs:[],
      blogs1:[],
      categories:[],
    }
  },
  // created(){
  //   axios.get('https://jsonplaceholder.typicode.com/posts')
  //   .then((data)=>{
  //     console.log(data.data);
  //     this.blogs = data.data.slice(0,5);
  //   })
  // },
  computed:{
    //按日期排序
    sortbydate:function(){
      return sortByKey(this.blogs1,'publishDate');
    },
    sortbydate1:function(){
      return sortByKey(this.blogs,'publishDate');
    },
  },
  created(){
    axios.get('http://124.223.164.9:9527/blog/')
    .then((data)=>{

      data.data.data.forEach(item=>{
        item.content=this.gettext(marked(item.content));
        if(item.pushToPage == "1"){
          this.blogs.push(item);
          this.categories.push(item.category);
        }
      })
      this.blogs = sortByKey(this.blogs,'publishDate');
      this.blogs = this.blogs.slice(0,6);
      this.blogs1 = data.data.data;
      this.blogs1 = sortByKey(this.blogs1,'publishDate');
      this.blogs1 = this.blogs1.slice(0,4);

      this.categories = this.unique(this.categories);
    })
  },
}

//key值排序
function sortByKey(array,key){
  return array.sort(function(a,b){
    var x=a[key];
    var y=b[key];
    return ((x>y)?-1:((x<y)?1:0));
  })
}
</script>

<style scoped>
  .image {
        object-fit: cover;
        width: 100%;
        height: 100%;
        display: inline-block;
        border: none;
        border-radius: 10px;
        
  }

  .image:hover{
    size: 110%;
  }

  .el-row {
    padding-bottom: 14px;
  }

  .pic {
    float: left;
    height: 100%;
    width: 50%;
    
  }

  .pic img{
    padding-right: 10px;
    cursor: pointer;
    transition: all 0.5s;
  }

  .pic img:hover{
    transform: scale(1.05);
  }

  .article {
    padding: 10px 10px;
    float: left;
    height: 100%;
    width: 40%;
  }

  .el-card {
    height: 200px;
  }

  .article a{
    text-decoration: none;
  }

  .article a:visited{
    color: black;
  }

  .article a:hover{
    color: #409EFF;
  }

  .clearfix a:visited{
    color: #409EFF;
    
  }
  .clearfix a{
    text-decoration: none;
  }
</style>
