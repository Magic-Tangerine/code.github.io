<template>
  <div id="student">
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
                        <span>导师</span>
                        </template>
                        <el-submenu index="1-1">
                        <template slot="title">导师组1</template>
                        <el-menu-item index="1-1-1">舒亚非</el-menu-item>
                        </el-submenu>
                        <el-submenu index="1-2">
                        <template slot="title">导师组2</template>
                        <el-menu-item index="1-2-1">XXX</el-menu-item>
                        </el-submenu>
                        <el-submenu index="1-3">
                        <template slot="title">导师组3</template>
                        <el-menu-item index="1-3-1">XXX</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>学生</span>
                        </template>
                        <!-- <el-submenu index="2-1">
                        <template slot="title">班干部</template>
                        <el-menu-item index="2-1-1">XXX</el-menu-item>
                        </el-submenu>
                        <el-submenu index="1-2">
                        <template slot="title">优秀学员</template>
                        <el-menu-item index="2-2-1">XXX</el-menu-item>
                        </el-submenu> -->
                        <el-submenu index="1-3">
                        <template slot="title">所有学生</template>
                        <router-link v-for="student,index in students" :key=student.studentId :to="'/person/student/' + student.studentId"><el-menu-item :index="2-3-index">{{ student.studentName }}</el-menu-item></router-link> 
                        
                        </el-submenu>
                    </el-submenu>
                    </el-menu>
                </el-col>
            </el-row>
        </el-aside>
          </div>
        <el-main style="min-width: 1000px">
            <el-card class="box-card">
              
              <h1>{{singlestudent.studentName}}</h1>
              <h3>学号 </h3>{{singlestudent.studentId}}
              <h3>个人介绍</h3>
              <p>{{singlestudent.studentIntro}}</p>
            </el-card>
        </el-main>
        <el-aside style="width: 20%"></el-aside>
      </el-container>

    
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'student',
  data(){
    return{
      students:[],
      id: this.$route.params.id,
      singlestudent: {}
    }
  },
  methods:{
      changedata(){
          this.id = this.$route.params.id;
          axios({
            method: 'get',
            url: 'http://124.223.164.9:9527/student/v',
            params: {
            id: this.id
            }
        })
        .then((data)=>{
        console.log(data.data.data);
        this.singlestudent = data.data.data;
        })
      }
  },
  watch:{
      $route(){
          this.changedata();
      }
  },
  created(){
    axios.get('http://124.223.164.9:9527/student/')
    .then((data)=>{
      console.log(data.data.data);
      this.students = data.data.data;
    }),
    axios({
            method: 'get',
            url: 'http://124.223.164.9:9527/student/v',
            params: {
            id: this.id
            }
        })
        .then((data)=>{
        console.log(data.data.data);
        this.singlestudent = data.data.data;
        })
  }
}
</script>

<style>
 .el-aside {
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
 }
</style>
