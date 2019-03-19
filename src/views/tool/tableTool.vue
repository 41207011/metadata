<template>
    <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
        <span class="pageShow">显示<u> 10条数据 </u> 从 <font> {{startPage}} </font>-<font> {{endPage}} </font></span>
        <div style="float: right;">
            <el-checkbox-group v-model="tableFilter">
                <el-checkbox label="排除子类型"></el-checkbox>

                <el-checkbox label="排除子标签"></el-checkbox>

                <el-checkbox label="显示历史实体"></el-checkbox>
            </el-checkbox-group>
        </div>
    </el-col>

    <!--列表-->
    <el-table :data="showUser" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
              style="width: 100%;">
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column type="index" label="#" width="60" sortable>
        </el-table-column>
        <el-table-column prop="name" label="名称" sortable>
            <template scope="scope">
                <a href="#">{{scope.row.name}}</a>
            </template>
        </el-table-column>
        <el-table-column prop="owner" label="拥有者" sortable>
        </el-table-column>
        <el-table-column prop="description" label="描述" sortable>
        </el-table-column>
        <el-table-column prop="type" label="类型" sortable>
            <template scope="scope">
                <a href="#">{{scope.row.type}}</a>
            </template>
        </el-table-column>
        <el-table-column prop="tag" label="标签" width="300" sortable>
            <template scope="scope">
                <el-button size="small" type="" v-for="details in scope.row.tag" class="tagbtn">{{details}}<i
                        class="el-icon-delete2 el-icon--right"></i></el-button>
                <el-tooltip content="添加" placement="right">
                    <el-button size="small" icon="plus" type="primary" class="addbtn"
                               @click="showTagModal"></el-button>
                </el-tooltip>
            </template>
        </el-table-column>
        <el-table-column prop="term" label="术语" width="300" sortable>
            <template scope="scope">
                <el-button size="small" type="" class="tagbtn" v-for="details in scope.row.term">{{details}}<i
                        class="el-icon-delete2 el-icon--right"></i></el-button>
                <el-tooltip content="添加" placement="right">
                    <el-button size="small" icon="plus" type="primary" class="addbtn" @click="showTermModal"></el-button>
                </el-tooltip>

            </template>
        </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
        <el-button type="info" @click="batchRemove" :disabled="this.sels.length===0">分配标签</el-button>
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10"
                       :total="total" style="float:right;">
        </el-pagination>
    </el-col>

    <!--添加标签界面-->
    <el-dialog title="添加标签" v-model="addTagFormVisible" :close-on-click-modal="false">
        <div>
            <el-select v-model="addTagForm.name" auto-complete="off" placeholder="---从下拉列表中选择一个分类---"
                       style="width: 60%;">
                <el-option :label="tagOne" v-for="tagOne in addTagForm.tagList" :value="tagOne">

                </el-option>
            </el-select>
            <el-col style="float: right;width: 30%;margin-top: 9px;">
                <el-checkbox label="传播" v-model="addTagForm.tagFilterOne"></el-checkbox>
                <el-checkbox label="应用有效期" style="margin-left: 52px;"
                             v-model="addTagForm.tagFilterTwo"></el-checkbox>
            </el-col>
        </div>
        <br>
        <hr>
        <el-button type="info" style="float: right;margin-bottom: 20px; " size="small" @click="addTimeOne"
                   v-if="addTagForm.addTimeBtn"><i class="fa fa-plus"></i>添加有效期
        </el-button>
        <el-col class="box" :span="24" v-if="addTagForm.addTimeBtn">
            <el-col class="box2" :span="24" v-for="(timeOne,index) in addTagForm.time">
                <el-date-picker v-model="timeOne.startTime" type="datetime" placeholder="开始时间"></el-date-picker>
                <el-date-picker v-model="timeOne.endTime" type="datetime" placeholder="结束时间"
                                style="margin-left: 10px; ;"></el-date-picker>
                <el-select v-model="timeOne.timeZone" placeholder="选择时区" style="margin-left: 10px; ;">
                    <el-option :value="timeZoneOne" v-for="timeZoneOne in addTagForm.timeZoneList">{{timeZoneOne}}
                    </el-option>
                </el-select>
                <el-button icon="delete" type="danger" title="删除" @click="deleteTimeOne(index)"
                           style="margin-left: 20px; ;"></el-button>
            </el-col>
        </el-col>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="addTagFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
    </el-dialog>

    <!--添加术语界面-->
    <el-dialog title="将术语分配给实体" v-model="addTermFormVisible" :close-on-click-modal="false">
        <el-input placeholder="搜索字词" v-model="addTermForm.searchWord" style="margin-bottom: 10px"></el-input>
        <el-tree
                class="filter-tree"
                :data="addTermForm.data2"
                :props="addTermForm.defaultProps"
                :filter-node-method="filterNode"
                ref="tree2">
        </el-tree>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="addTermFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="addSubmit" :loading="addLoading">分配</el-button>
        </div>
    </el-dialog>
    </section>
</template>


<style scoped>

</style>

<script>
    export default {
        data() {
            return {
                //添加标签页面
                addTagForm: {
                    name: '',
                    tagList: ['tag1', 'tag2'],
                    tagFilterOne: true,
                    tagFilterTwo: false,
                    time: [
                    ],
                    timeZoneList: ['时区一', '时区二'],
                    addTimeBtn: false
                },
                //添加术语页面
                addTermForm:{
                    searchWord:'',
                    data2: [
                        {
                            id: 1,
                            label: '一级 1',
                            children: [{
                                id: 4,
                                label: '二级 1-1',
                                children: [{
                                    id: 9,
                                    label: '三级 1-1-1'
                                }, {
                                    id: 10,
                                    label: '三级 1-1-2'
                                }]
                            }]
                        }, {
                            id: 2,
                            label: '一级 2',
                            children: [{
                                id: 5,
                                label: '二级 2-1'
                            }, {
                                id: 6,
                                label: '二级 2-2'
                            }]
                        }, {
                            id: 3,
                            label: '一级 3',
                            children: [{
                                id: 7,
                                label: '二级 3-1'
                            }, {
                                id: 8,
                                label: '二级 3-2'
                            }]
                        }],
                    defaultProps: {
                        children: 'children',
                        label: 'label'
                    },
                },
                users: [],
                allUser: [],
                showUser: [],
                total: 0,
                tableFilter: [],
                startPage: 0,
                endPage: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
                addTagFormVisible: false,//添加标签模态框是否显示
                addTermFormVisible:false,//添加术语模态框是否显示
                addLoading: false,
                addFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ]
                }
            }
        },
        watch: {
            //监测添加标签模态框应用有效期是否选中
            'addTagForm.tagFilterTwo': function () {
                if (this.addTagForm.tagFilterTwo) {
                    this.addTagForm.time = [{'startTime': '', 'endTime': '', 'timeZone': ''}];
                    this.addTagForm.addTimeBtn = true
                }
                else {
                    this.addTagForm.time = [];
                    this.addTagForm.addTimeBtn = false
                }
            },
            //监测添加标签模态框中应用有效期数组长度
            'addTagForm.time':function () {
                if(this.addTagForm.time.length===0){
                    this.addTagForm.addTimeBtn = false;
                    this.addTagForm.tagFilterTwo = false
                }
            },
            //检测术语过滤输入框
            'addTermForm.searchWord'(val) {
                this.$refs.tree2.filter(val)
            },
        },
        methods: {
            //页码转换
            handleCurrentChange(val) {
                this.page = val;
                console.log(val)
                this.getUsers()
                console.log(this.total)
            },
            //假数据获取
            setAllUser() {
                this.allUser = [];
                for (let key = 1; key <= 50; key++) {
                    let json = {
                        name: '姓名' + key,
                        owner: '拥有者' + key,
                        description: '描述' + key,
                        type: "类型" + key,
                        tag: ["标签一", "标签二"],
                        term: ["术语一", "术语二"]
                    };
                    this.allUser.push(json)
                }
                this.total = this.allUser.length

            },
            //获取用户列表
            getUsers() {
                this. this.setAllUser();
                this.listLoading = true;
                setTimeout(() => {
                    this.showUser = this.allUser.slice(this.page * 10 - 10, this.page * 10);
                    this.startPage = this.page * 10 - 9;
                    this.endPage = this.page * 10;
                    this.listLoading = false
                }, 1000);

            },
            //显示添加标签模态框
            showTagModal: function () {
                this.addTagFormVisible = true;
                this.addTagForm.time = [];
                this.addTagForm.tagFilterOne=true;
                this.addTagForm.addTimeBtn = false;
                this.addTagForm.tagFilterTwo=false;
                this.addTagForm.name='';

            },
            //显示添加术语页面
            showTermModal:function () {
                this.addTermFormVisible = true
            },
            //
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            //添加一个有效期
            addTimeOne: function () {
                this.addTagForm.time.push({'startTime': '', 'endTime': '', 'timeZone': ''})
            },
            //删除一个有效期
            deleteTimeOne: function (index) {
                this.addTagForm.time.splice(index,1)
            },
            //批量删除
            batchRemove: function () {
                var ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = {ids: ids};
                    batchRemoveUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });
                }).catch(() => {

                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
        },
        mounted() {
            this.getUsers();
        },
    }
</script>
