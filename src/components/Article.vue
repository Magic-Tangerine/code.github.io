<template>

  <div id="article">
    <el-container>
          <el-aside style="width: 10%"></el-aside>
          <div class="aside">
        <el-aside>
          <div class="fliter-ele">年份</div>
          <br><br>
          <div>
            <el-radio-group v-model="yearsel">
              <el-radio-button label="全部"></el-radio-button>
              <el-radio-button v-for="year,index in years" :key="index" :label="year"></el-radio-button>
            </el-radio-group>
          </div>
          <br><br>
          <div class="fliter-ele">月份</div>
          <br><br>
          <div>
            <el-radio-group v-model="monthsel">
              <el-radio-button label="全部"></el-radio-button>
              <el-radio-button v-for="o in 12" :key="o" :label="o"></el-radio-button>
            </el-radio-group>
          </div>
          <br><br>
          <div class="fliter-ele">类型</div>
          <br><br>
          <div>
            <el-radio-group v-model="categorysel">
              <el-radio-button label="全部"></el-radio-button>
              <el-radio-button v-for="category,index in categories" :key="index" :label="category"></el-radio-button>
            </el-radio-group>
          </div>
        </el-aside>
          </div>
        <el-main style="min-width: 500px">

              <el-row v-for="blog in sortbydate" :key="blog.id" style="padding-bottom: 20px">
                <el-col :span="24">
                  <el-card :body-style="{ padding: '0px' }">
                    <div class="article" style="padding-left: 20px">
                      <router-link type="primary" :to="'/blog/' + blog.id"><h2 style="float: left">{{ blog.title | snippet_title}}</h2></router-link>
                      

                      <el-button type="danger" style="float: right" @click="deleteblog(blog.id)">删除</el-button>
                      <router-link type="primary" :to="'/blog/edit/' + blog.id"><el-button type="primary" style="float: right">修改</el-button></router-link>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-card :body-style="{ padding: '0px' }">
                    <div style="padding-left: 20px">
                      <router-link to="/article/add"><el-button style="float: right" type="primary">添加文章</el-button></router-link>
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
      fliterblogs:[],
      years:[],
      categories:[],
      yearsel:'全部',
      monthsel:'全部',
      categorysel:'全部'
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
    },
    fliterblog(){
      
      this.fliterblogs = [];
      this.blogs.forEach(item=>{
        var flag = 1;
        if(this.yearsel!="全部" && item.year != this.yearsel){
          flag = 0;
        }
        if(this.monthsel!="全部" && item.month != this.monthsel){
          flag = 0;
        }
        if(this.categorysel!="全部" && item.category != this.categorysel){
          flag = 0;
        }
        if(flag == 1){
          
          this.fliterblogs.push(item);
        }
      })
    }
  },

  watch:{
    yearsel: function(){
      this.fliterblog()
    },
    monthsel: function(){
      this.fliterblog()
    },
    categorysel: function(){
      this.fliterblog()
    },
  },
  computed:{
    //按日期排序
    sortbydate:function(){
      return sortByKey(this.fliterblogs,'publishDate');
    },

  },
  created(){
    axios.get('http://124.223.164.9:9527/blog/')
    .then((data)=>{
      data.data.data.forEach(item=>{
        item.year = this.getyear(item.publishDate);
        item.month = this.getmonth(item.publishDate) + 1;
        this.years.push(item.year);
        this.categories.push(item.category);
      })
      this.blogs = data.data.data;
      this.fliterblogs = data.data.data;
      this.years = unique(this.years);
      this.categories = unique(this.categories);
    })
  },
};

//去除重复项
function unique(arr) { 
 let res = new Map();
 return arr.filter((item) => {
   return !res.has(item) && res.set(item, 1);
 });
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
.fliter{
  float: left;
  margin: 0;
  padding: 0;
}
.fliter button{
  margin: 0;
  padding: 0;
  font-size: 15px;
}

.fliter li{
  list-style: none;
  float: left;
  margin-left: 20px;
  
}

.fliter-ele{
  float: left;
  font-size: 20px;
}

</style>
