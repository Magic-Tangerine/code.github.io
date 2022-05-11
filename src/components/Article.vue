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
                      <!-- v-for='blog in sortbydate' :key="blog.id"  -->
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>2022</span>
                        </template>
                        <el-menu-item index="1-1">
                        <template slot="title">5月</template>
                        </el-menu-item>
                        <el-menu-item index="1-2">
                        <template slot="title">4月</template>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="2"> 
                      <!-- v-for='blog in sortbydate' :key="blog.id"  -->
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>2021</span>
                        </template>
                        <el-menu-item index="2-1">
                        <template slot="title">5月</template>
                        </el-menu-item>
                        <el-menu-item index="2-2">
                        <template slot="title">4月</template>
                        </el-menu-item>
                    </el-submenu>
                    </el-menu>
                </el-col>
            </el-row>
        </el-aside>
          </div>
        <el-main style="min-width: 500px">

              <el-row v-for="blog in sortbydate" :key="blog.id" style="padding-bottom: 20px">
                <el-col :span="24">
                  <el-card :body-style="{ padding: '0px' }">
                    <div class="article" style="padding-left: 20px">
                      <h2 style="float: left">{{ blog.title | snippet_title}}</h2>

                      <el-button type="danger" style="float: right" @click="deleteblog(blog.id)">删除</el-button>
                      <el-button type="primary" style="float: right">修改</el-button>
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
      year:[]
    }
  },
  methods:{
    deleteblog(id){
      var conf = this.$confirm('是否确认删除？','提示',{confirmButtonText: '确认',cancelButtonText: '取消', type: 'warning'})
      .then(()=>{
        axios({
        method: 'delete',
        url: 'http://124.223.164.9:9527/blog/id',
        data: {
          id: id
        }
      })
      location.reload()
      })
    }
  },
  computed:{
    //按日期排序
    sortbydate:function(){
      return sortByKey(this.blogs,'publishDate');
    },

  },
  created(){
    axios.get('http://124.223.164.9:9527/blog/')
    .then((data)=>{
      console.log(data.data.data);
      this.blogs = data.data.data;

    })
  },
};

//去除重复项
function unique(arr) { 
 const res = new Map();
 return arr.filter((arr) => !res.has(arr.publishDate) && res.set(arr.publishDate, 1));
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
.el-aside{
  padding-top: 20px;
  overflow-y: hidden;
}
.el-main{
  width: 80%;
}
.el-button{
  margin: 20px 10px;
}
</style>
