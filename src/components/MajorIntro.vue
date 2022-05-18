<template>
    <div id="majorintro">
        <el-container>
            <el-side style="width: 20%"></el-side>
            <el-main style="min-width: 1000px">
                <el-card class="box-card">
                    <div>
                        <h1>杭州电子科技大学2智能财务（软件工程）专业介绍</h1>
                        <h2>一、专业名称：</h2>
                        <p>智能财务（软件工程）</p>
                    </div>
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
        name:"majorintro",
        data(){
            return{
                code:'',
            }
        },
    }
</script>