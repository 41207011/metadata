<template>
    <section>
        <el-row :gutter="20">
     <el-col :span="7">
         <el-card class="box-card" style="min-height: 290px;">
             <div slot="header" class="clearfix">
                 <span style="line-height: 36px;">消息通讯配置</span>
             </div>
             <div class="text item">
                 <el-form label-width="100px" :model="form1" ref="form1">
                     <el-form-item label="kafka地址" prop="kafka.address"  :rules="form1Rules.address">
                         <el-input placeholder="请填写kafka地址" v-model="form1.kafka.address"></el-input>
                     </el-form-item>
                     <el-form-item label="hadoop地址" prop="hadoop.address" :rules="form1Rules.address">
                         <el-input placeholder="请填写hadoop地址" v-model="form1.hadoop.address" ></el-input>
                     </el-form-item>
                 </el-form>
                 <el-button style="float: right;" type="primary" @click="savePz">保存配置</el-button>
             </div>
         </el-card>
     </el-col>
    <el-col :span="17">
        <el-card class="box-card" style="min-height: 290px;">
            <div slot="header" class="clearfix">
                <span style="line-height: 36px;">数据库配置</span>
            </div>
            <div class="text item">
                <el-table :data="dataBase" highlight-current-row v-loading="listLoading">
                    <el-table-column type="index" label="#" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="name" label="数据库名称" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="address" label="数据库地址" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="operator" label="操作人" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="update_time" label="更新时间" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="create_time" label="创建时间" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="type" label="类型" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                                <el-button type="primary" icon="edit" size="mini" title="编辑"></el-button>
                                <el-button type="danger" icon="delete" size="mini" title="删除"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                     <!--工具条-->
                     <el-col :span="24" class="toolbar">
                         <el-button  type="primary">添加数据库</el-button>
                         <el-pagination layout="sizes,prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="startPageCount" :page-sizes="[10, 25, 50, 100]" style="float:right;" :total="total" >
                         </el-pagination>
                     </el-col>

            </div>
        </el-card>


    </el-col>
        </el-row>
    </section>

</template>


<style scoped>

</style>

<script>
    import {getPz,getPz2,changePz} from '../../api/api'
    export default {
        data() {
            return {
                //表相关
                startPageCount:10,
                total:1,
                page:1,

                form1:{
                    kafka:{address:''},
                    hadoop:{address:''},
                },
                dataBase:[],
                listLoading:false,
                form1Rules:{
                    address:[{required:true,message:'请输入地址'}]
                }

            }
        },
        watch: {},
        methods: {
            handleCurrentChange(val){
                this.page = val
                getPz2({limit:this.startPageCount,offset:this.page*this.startPageCount}).then(res=>{this.dataBase=res.data});
            },
            handleSizeChange(val){
                this.startPageCount = val
                getPz2({limit:this.startPageCount,offset:this.page*this.startPageCount}).then(res=>{this.dataBase=res.data});
            },
            //获取默认kafka和hadoop
            getDefault(){
                getPz({limit:25,offset:0,type:'kafka'}).then(res=>{this.form1.kafka=res.data[0]});
                getPz({limit:25,offset:0,type:'hadoop'}).then(res=>{if(res.data.length>0)this.form1.hadoop=res.data[0]});
                getPz2({limit:this.startPageCount,offset:0}).then(res=>{this.dataBase=res.data});
            },
            savePz(){
               this.$refs['form1'].validate((valid)=>{
                   if(valid){
                       changePz(this.form1).then(res=>{

                       }).catch(err=>{

                       })
                   }
                   else {
                       console.log('error submit!!');
                       return false;
                   }
               })
            },
        },
        mounted() {
            this.getDefault()
        }
    }
</script>
