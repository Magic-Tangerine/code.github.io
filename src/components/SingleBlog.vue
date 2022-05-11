<template>
    <div id="single-blog">
        <el-container>
            <el-side style="width: 20%"></el-side>
            <el-main style="min-width: 1000px">
                <el-card class="box-card">
                    <h1>{{ blog.title }}</h1>
                    <div v-html="code"></div>
                </el-card>
            </el-main>
            <el-side style="width: 20%"></el-side>
        </el-container>
    </div>
</template>

<script>
import axios from 'axios'
import { marked } from 'marked'
    export default{
        name:"single-blog",
        data(){
            return{
                id: this.$route.params.id,
                blog:{},
                code:'',
            }
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
            this.code = marked(this.blog.content);
            console.log(this.code);
            })
        }
    }
</script>

<style>
h1{
    text-align: center;
}
</style>
