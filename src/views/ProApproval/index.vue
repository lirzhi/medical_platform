<template>
    <div style="display: flex;">
        <!-- <common-aside :activeIndex="'6'"></common-aside> -->
        
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">

            <el-form :model="searchForm" label-width="auto" class="SearchForm">
                <el-form-item prop="name" label="项目名称" class="SearchFormItem">
                    <el-input v-model="searchForm.name" style="width: 200px;"></el-input>
                </el-form-item>

                <el-form-item prop="doi" label="项目doi" class="SearchFormItem">
                    <el-input v-model="searchForm.doi" style="width: 200px;"></el-input>
                </el-form-item>

                <el-form-item prop="institutionDoi" label="发起机构doi" class="SearchFormItem">
                    <el-input v-model="searchForm.institutionDoi" style="width: 200px;"></el-input>
                </el-form-item>

                <el-form-item prop="involvedInstitutionDoi" label="参与机构doi" class="SearchFormItem">
                    <el-input v-model="searchForm.involvedInstitutionDoi" style="width: 200px;"></el-input>
                </el-form-item>

                <el-form-item prop="description" label="项目描述" class="SearchFormItem">
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

                <!-- <el-form-item label="申请时间" class="SearchFormTimePicker">
                    <el-date-picker
                        v-model="searchForm.applyTimeRange"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item> -->

                <el-form-item label="审批状态" class="SearchFormItem">
                    <el-select v-model="searchForm.status" placeholder="请选择">
                        <el-option label="待审批" value="0"></el-option>
                        <el-option label="已通过" value="1"></el-option>
                        <el-option label="未通过" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <el-button type="primary" @click="searchProSubmit()">搜索</el-button>
            <el-divider></el-divider>

            <el-table :data="approvalTable" style="width: 95%;" stripe border>
                <el-table-column prop="projectName" label="项目名称"></el-table-column>
                <el-table-column prop="projectDoi" label="DOI"></el-table-column>
                <el-table-column prop="institutionDoi" label="发起机构doi"></el-table-column>
                <!-- <el-table-column prop="involvedInstitutionDoi" label="除发起机构以外机构doi"></el-table-column> -->
                <el-table-column prop="contactInfo" label="联系方式"></el-table-column>
                <el-table-column prop="contactEmail" label="联系邮箱"></el-table-column>
                <el-table-column prop="description" label="项目描述"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column prop="updateTime" label="最近修改时间"></el-table-column>
                <el-table-column prop="applyDocumentAddress" label="审批材料地址"></el-table-column>
                <el-table-column prop="approvalStatus" label="审批状态"></el-table-column>
                <!-- <el-table-column label="项目详细信息" min-width="120" align="center">
                    <template slot-scope="props">
                        <el-button @click="getProjectDo(props.row, props.$index)" type="primary"
                            size="small">查看</el-button>
                    </template>
                </el-table-column> -->
                <el-table-column prop="operation" label="操作" min-width="200" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="passApply(scope.row, scope.$index)"
                            size="mini">通过</el-button>
                        <el-button type="danger" @click="rejectApply(scope.row, scope.$index)"
                            size="mini">拒绝</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNo"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue';
import { postForm } from '@/api/data';
export default {
    name: "InsApproval",
    components: {
        CommonAside,
    },
    data() {
        return {
            // 审批表格数据
            // 搜索表单
            searchForm: {
                name: "",
                institutionDoi: "",
                involvedInstitutionDoi:"",
                doi:"",
                description:"",
                status:"",
                createTimeRange:[],
                updateTimeRange:[]
            },
            approvalStatus:[
                "待审批",
                "已通过",
                "未通过"
            ],

            // approvalTable: [{
            //     id: 1,
            //     projectDoi: "doi",
            //     projectName: "project1",
            //     institutionDoi: "doi1",
            //     involvedInstitutionDoi: "doi2,doi3",
            //     allInsDoi: "",
            //     description: "",
            //     approvalStatus:"待审批",
            //     contactInfo:"111111",
            //     contactEmail:"112@qq.com",
            //     createTime:"2024-05-24",
            //     updateTime:"2024-05-28"
            // }],
            approvalTable: [{
                id: 1,
                projectDoi: "",
                projectName: "",
                institutionDoi: "",
                involvedInstitutionDoi: "",
                allInsDoi: "",
                description: "",
                approvalStatus:"",
                contactInfo:"",
                contactEmail:"",
                createTime:"",
                updateTime:""
            }],
            total:1,
            pageSize:10,
            pageNo:1,
            sizes:"",
            multipleSelection: [],
            sortField:"",
            applyDocumentAddress:"",
            isAsc:false
        };
    },
    mounted() { 
        this.searchProSubmit();
    },
    methods: {
        //多选
        handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //改变显示页数
      handleSizeChange(val) {
            this.pageSize = val;
            this.searchProSubmit();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.searchProSubmit();
            console.log(`当前页: ${val}`);
        },

        searchProSubmit() {
            let params = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                sortField: this.sortField,
                isAsc: this.isAsc,
                doi: this.searchForm.doi,
                institutionDoi: this.searchForm.institutionDoi,
                involvedInstitutionDoi: this.searchForm.involvedInstitutionDoi,
                name: this.searchForm.name,
                description: this.searchForm.description,
                applyDocumentAddress:this.searchForm.applyDocumentAddress,
                status:this.searchForm.status
            };

            postForm('/project/proSubmit/list', params,{}, this, res =>{
                this.approvalTable = res.data.list.map(item => ({
                    id: item.id,
                    projectDoi: item.doi,
                    ProjectName: item.name,
                    institutionDoi: item.institutionDoi,
                    involvedInstitutionDoi: item.involvedInstitutionDoi,
                    allInsDoi: item.allInsDoi,
                    description: item.description,
                    approvalStatus:this.approvalStatus[item.status],
                    contactInfo:item.contactInfo,
                    contactEmail:item.contactEmail,
                    createTime: new Date(item.createTime).toISOString().split('T')[0],
                    updateTime: new Date(item.updateTime).toISOString().split('T')[0]
                }));
                this.pageNo = res.data.pageNo;
                this.total = res.data.total;
                this.pageSize = res.data.pageSize;
                console.log('机构数据已更新:', res);
            });
        },
        
        //获取项目实体
        getProjectDo(row, index) {
            this.modifyProjectDialogVisible = true;
            this.modifyProjectIndex = index;
            this.modifyProjectItem = JSON.parse(JSON.stringify(row));
        },
        // 通过审批
        passApply(row, index) {
            let params = {
                id:row.id,
                status:1
            };
            postForm('/project/proSubmit/approval', params,{}, this, res =>{
                row.status = this.approvalStatus[1];
                console.log('已通过建项申请', row, index,res);
            }); 
        },
        // 拒绝审批
        rejectApply(row, index) {
            let params = {
                id:row.id,
                status:2
            };
            postForm('/project/proSubmit/approval', params,{}, this, res =>{
                row.status = this.approvalStatus[2];
                console.log('已拒绝建项申请', row, index,res);
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