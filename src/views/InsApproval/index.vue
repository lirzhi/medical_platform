<template>
    <div style="display: flex;">
        <!-- <common-aside :activeIndex="'6'"></common-aside> -->
        
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">

            <el-form :model="searchForm" label-width="auto" class="SearchForm">

                <!-- <el-form-item prop="doi" label="机构doi" class="SearchFormItem">
                    <el-input v-model="searchForm.doi" style="width: 200px;"></el-input>
                </el-form-item> -->

                <el-form-item prop="name" label="机构名称" class="SearchFormItem">
                    <el-input v-model="searchForm.name" style="width: 200px;"></el-input>
                </el-form-item>

                <el-form-item prop="user" label="机构管理员" class="SearchFormItem">
                    <el-input v-model="searchForm.user" style="width: 200px;"></el-input>
                </el-form-item>

                <!-- <el-form-item label="申请时间" class="SearchFormTimePicker">
                    <el-date-picker
                        v-model="searchForm.applyTimeRange"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item> -->

                <!-- <el-form-item prop="ipAddress" label="机构公网ip地址" class="SearchFormItem">
                    <el-input v-model="searchForm.ipAddress" style="width: 200px;"></el-input>
                </el-form-item> -->

                <el-form-item prop="description" label="机构描述" class="SearchFormItem">
                    <el-input v-model="searchForm.description" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item prop="createTimeRange" label="创建日期" class="SearchFormItem">
                    <el-date-picker
                        v-model="searchForm.createTimeRange"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>          
                </el-form-item>
                <el-form-item prop="updateTimeRange" label="最近修改日期" class="SearchFormItem">
                    <el-date-picker
                        v-model="searchForm.updateTimeRange"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>          
                </el-form-item>

                <el-form-item label="审批状态" class="SearchFormItem">
                    <el-select v-model="searchForm.status" placeholder="请选择">
                        <el-option label="待审批" value="0"></el-option>
                        <el-option label="已通过" value="1"></el-option>
                        <el-option label="未通过" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <el-button type="primary" @click="searchApproval">搜索</el-button>
            <el-divider></el-divider>

            <el-table :data="approvalTable" style="width: 95%;" stripe border @sort-change="handleSortChange">
                <el-table-column  prop="name" label="机构名称" sortable="custom"></el-table-column>
                <el-table-column  prop="user" label="机构管理员" sortable="custom"></el-table-column>
                <!-- <el-table-column prop="doi" label="doi"></el-table-column> -->
                <!-- <el-table-column prop="ipAddress" label="公网ip地址和端口"></el-table-column>
                <el-table-column prop="publicKey" label="访问公钥"></el-table-column> -->
                <el-table-column  prop="description" label="机构描述" sortable="custom"></el-table-column>
                <el-table-column  prop="createTime" label="创建时间" sortable="custom"></el-table-column>
                <el-table-column  prop="updateTime" label="最近修改时间" sortable="custom"></el-table-column>
                <!-- <el-table-column prop="applyTime" label="申请时间"></el-table-column> -->
                <el-table-column  prop="status" label="审批状态" sortable="custom"></el-table-column>
                <el-table-column  prop="operation" label="操作" min-width="120" align="center">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.status === '待审批'" type="primary" @click="passApply(scope.row, scope.$index)" size="mini">通过</el-button>
                        <el-button v-if="scope.row.status === '待审批'" type="danger" @click="rejectApply(scope.row, scope.$index)" size="mini">拒绝</el-button>
                    </template>
                </el-table-column>
            </el-table>


            <div class="block">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page=" pageNo"
                :page-size=" pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue';
import {postForm} from '@/api/data.js';
export default {
    name: "InsApproval",
    components: {
        CommonAside,
    },
    data() {
        return {
            // 审批表格数据
            approvalTable: [],
            total:3,
            pageSize:10,
            pageNo:1,
            sizes:"",
            multipleSelection: [],
            sortField:"",
            isAsc:false,
            approvalStatus:[
                "待审批",
                "已通过",
                "未通过"
            ],
            searchForm: {
                doi: "",
                user:"",
                name: "",
                ipWithPort: "",
                description: "",
                status:"",
                createTimeRange:[],
                updateTimeRange:[]
            },
        };
    },
    mounted() {
        this.searchApproval();
     },
    methods: {
        //多选
        handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //改变显示页数
      handleSizeChange(val) {
            this.size = val;
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.current = val;
            console.log(`当前页: ${val}`);
        },
        //排序方式
        handleSortChange({ prop, order }) {
            this.sortField = prop;
            this.isAsc = order === 'ascending';
            this.searchApproval();
        },
        searchApproval(){
            let params = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                sortField: this.sortField,
                isAsc: this.isAsc,
                // doi: this.searchForm.doi,
                status:this.searchForm.status,
                user: this.searchForm.user,
                name: this.searchForm.name,
                description: this.searchForm.description,
                createTimeStart:this.searchForm.createTimeRange[0],
                createTimeEnd:this.searchForm.createTimeRange[1],
                updateTimeStart:this.searchForm.updateTimeRange[0],
                updateTimeEnd:this.searchForm.updateTimeRange[1]
            };

            postForm('/institution/insSubmit/list', params,{}, this, res =>{
                this.approvalTable = res.data.list.map(item => ({
                    id: item.id,
                    doi: item.doi,
                    user: item.user,
                    publicKey: item.publicKey,
                    ipWithPort: item.ipWithPort,
                    name: item.name,
                    description: "",
                    status:this.approvalStatus[item.status],
                    createTime: new Date(item.createTime).toISOString().split('T')[0],
                    updateTime: new Date(item.updateTime).toISOString().split('T')[0]
                }));
                this.approvalTable = this.approvalTable.filter(item => item.status === '待审批');
                // this.pageNo = res.data.pageNo;
                this.total = res.data.total;
                this.sizes = res.data.pages;
                console.log('机构申请数据已更新:', res);
            });
        },
        // 通过审批
        passApply(row, index) {
            let params = {
                id:row.id,
                status:1
            };
            postForm('/institution/insSubmit/approval', params,{}, this, res =>{
                row.status = this.approvalStatus[1];
                console.log('已通过申请', row, index,res);
            }); 
        },
        // 拒绝审批
        rejectApply(row, index) {
            let params = {
                id:row.id,
                status:2
            };
            postForm('/institution/insSubmit/approval', params,{}, this, res =>{
                row.status = this.approvalStatus[2];
                console.log('已驳回申请', row, index,res);
            }); 
        },
    },
}
</script>

<style scoped>
.SearchForm {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 24px;
}
.SearchFormItem {
    margin: 0 24px 24px 24px;
}
</style>