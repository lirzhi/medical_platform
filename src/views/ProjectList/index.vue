<template>
    <div style="display: flex;">
        <!-- <common-aside :activeIndex="'2-1'"></common-aside> -->
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

            </el-form>

            <el-button type="primary" @click="searchProject">搜索</el-button>
            <el-divider></el-divider>

            <el-table :data="projectTable" label-width="auto" stripe border style="width: 95%;" @sort-change="handleSortChange">
                <el-table-column prop="projectName" label="项目名称" sortable="custom"></el-table-column>
                <el-table-column prop="projectDoi" label="DOI" sortable="custom"></el-table-column>
                <el-table-column prop="institutionDoi" label="发起机构doi" sortable="custom"></el-table-column>
                <el-table-column prop="involvedInstitutionDoi" label="除发起机构以外机构doi" sortable="custom"></el-table-column>
                <el-table-column prop="contactInfo" label="联系方式" sortable="custom"></el-table-column>
                <el-table-column prop="contactEmail" label="联系邮箱"sortable="custom"></el-table-column>
                <el-table-column prop="description" label="项目描述" sortable="custom"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" sortable="custom"></el-table-column>
                <el-table-column prop="updateTime" label="最近修改时间" sortable="custom"></el-table-column>
                <!-- <el-table-column prop="allInsDoi" label="所有机构doi"></el-table-column> -->
                <!-- <el-table-column label="项目详细信息" min-width="120" align="center">
                    <template slot-scope="props">
                        <el-button @click="getProjectDo(props.row, props.$index)" type="primary"
                            size="small">查看</el-button>
                    </template>
                </el-table-column> -->
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
    name: "ProjectList",
    components: {
        CommonAside,
    },
    data() {
        return {
            // 搜索表单
            searchForm: {
                name: "",
                institutionDoi: "",
                involvedInstitutionDoi:"",
                doi:"",
                description:"",
            },

            // 项目列表
            projectTable: [],
            total:3,
            pageSize:10,
            pageNo:1,
            sizes:"",
            multipleSelection: [],
            sortField:"",
            isAsc:false
        };
    },
    mounted() {
        this.searchProject();
     },
    methods: {
        //多选
        handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //改变显示页数
      handleSizeChange(val) {
            this.pageSize = val;
            this.searchProject();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.searchProject();
            console.log(`当前页: ${val}`);
        },
        //排序方式
        handleSortChange({ prop, order }) {
            this.sortField = prop;
            this.isAsc = order === 'ascending';
            this.searchProject();
        },
        searchProject() {
            let params = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                sortField: this.sortField,
                isAsc: this.isAsc,
                doi: this.searchForm.doi,
                institutionDoi: this.searchForm.institutionDoi,
                involvedInstitutionDoi: this.searchForm.involvedInstitutionDoi,
                name: this.searchForm.name,
                description: this.searchForm.description
            };

            postForm('/project/proList/list', params,{}, this, res =>{
                this.projectTable = res.data.list.map(item => ({
                    id: item.id,
                    projectDoi: item.doi,
                    ProjectName: item.name,
                    institutionDoi: item.institutionDoi,
                    involvedInstitutionDoi: item.involvedInstitutionDoi,
                    allInsDoi: item.allInsDoi,
                    description: item.description,
                    contactInfo:item.contactInfo,
                    contactEmail:item.contactEmail,
                    createTime: new Date(item.createTime).toISOString().split('T')[0],
                    updateTime: new Date(item.updateTime).toISOString().split('T')[0]
                }));
                this.total = res.data.total;
                this.pages = res.data.pages;
                console.log('机构数据已更新:', res);
            });
        },

        getProjectDo(row, index) {
            this.modifyProjectDialogVisible = true;
            this.modifyProjectIndex = index;
            this.modifyProjectItem = JSON.parse(JSON.stringify(row));
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