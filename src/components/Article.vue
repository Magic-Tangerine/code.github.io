<template>

  <div id="article">
    <el-container>
          <el-aside style="width: 10%"></el-aside>
          <div class="aside">
        <el-aside>
            <el-row class="tac">
                <el-col :span="24">
                    <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>2022年</span>
                        </template>
                        <el-menu-item index="1-1">
                        <template slot="title">导师组1</template>
                        </el-menu-item>
                        <el-menu-item index="1-2">
                        <template slot="title">导师组2</template>
                        </el-menu-item>
                    </el-submenu>
                    </el-menu>
                </el-col>
            </el-row>
        </el-aside>
          </div>
        <el-main style="min-width: 500px">

              <el-row v-for="blog in blogs" :key="blog.id" style="padding-bottom: 20px">
                <el-col :span="24">
                  <el-card :body-style="{ padding: '0px' }">
                    <div class="article" style="padding-left: 20px">
                      <h2>{{ blog.title}}</h2>
                      <span>{{ blog.content | snippet}}</span>
                      <el-button type="text" class="button">查看全文</el-button>
                      <div class="bottom clearfix">
                        <time class="time">发布时间：{{blog.publishDate | snippet_date}}</time>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
           
        </el-main>
        <el-aside style="width: 20%"></el-aside>
      </el-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'article',
  data () {
    return {
      blogs:[],
    }
  },
  created(){
    axios.get('http://124.223.164.9:9527/blog/')
    .then((data)=>{
      console.log(data.data.data);
      this.blogs = data.data.data;
    })
  },
}
</script>

<style scoped>
.el-aside{
  padding-top: 20px;
  overflow-y: hidden;
}
.el-main{
  width: 80%;
}
</style>
