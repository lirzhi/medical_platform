<template>
    <div style="display: flex;">
        <!-- <common-aside :activeIndex="'2-1'"></common-aside> -->
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">

            <el-form :model="searchForm" label-width="auto" class="SearchForm">
                <el-form-item prop="doi" label="机构doi" class="SearchFormItem">
                    <el-input v-model="searchForm.doi" style="width: 200px;"></el-input>
                </el-form-item>

                <!-- <el-form-item prop="user" label="机构管理员" class="SearchFormItem">
                    <el-input v-model="searchForm.user" style="width: 200px;"></el-input>
                </el-form-item> -->

                <el-form-item prop="name" label="机构名称" class="SearchFormItem">
                    <el-input v-model="searchForm.name" style="width: 200px;"></el-input>
                </el-form-item>

                <!-- <el-form-item prop="ipWithPort" label="机构公网ip地址和端口" class="SearchFormItem">
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
            </el-form>

            <el-button type="primary" @click="searchInstitution">搜索</el-button>
            <el-divider></el-divider>
            <el-table :data="institutionTable" stripe border style="width: 95%;" @sort-change="handleSortChange">
                <el-table-column prop="name" label="机构名称" sortable="custom"></el-table-column>
                <el-table-column prop="doi" label="doi" sortable="custom"></el-table-column>
                <el-table-column prop="user" label="机构管理员" sortable="custom"></el-table-column>
                <el-table-column prop="ipWithPort" label="公网ip地址和端口" min-width="120" sortable="custom"></el-table-column>
                <!-- <el-table-column prop="publicKey" label="访问公钥"></el-table-column> -->
                <el-table-column prop="description" label="机构描述"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" sortable="custom"></el-table-column>
                <el-table-column prop="updateTime" label="最近修改时间" sortable="custom"></el-table-column>
                <el-table-column label="操作" min-width="120" align="center">
                    <template slot-scope="props">
                        <el-button @click.native.prevent="deleteInstitution(props.$index)" type="danger"
                            size="small">
                            删除
                        </el-button>
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
import {postForm} from '@/api/data.js';
export default {
    name: "InstitutionList",
    components: {
        CommonAside,
    },
    data() {
        return {
            // 搜索表单
            searchForm: {
                doi: "",
                user:"",
                name: "",
                ipWithPort: "",
                description: "",
                createTimeRange:[],
                updateTimeRange:[]
            },

            // 项目列表
            institutionTable: [],
            total:3,
            pageSize:10,
            pageNo:1,
            pages:"",
            multipleSelection: [],
            sortField:"",
            isAsc:true
        };
    },
    mounted() { 
        this.searchInstitution();
    },
    methods: {
        handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //改变显示页数
      handleSizeChange(val) {
            this.pageSize = val;
            this.searchInstitution();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.searchInstitution();
            console.log(`当前页: ${val}`);
        },
        //排序方式
        handleSortChange({ prop, order }) {
            this.sortField = prop;
            this.isAsc = order === 'ascending';
            this.searchInstitution();
        },
        searchInstitution() {
            let params = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                sortField: this.sortField,
                isAsc: this.isAsc,
                doi: this.searchForm.doi,
                user: this.searchForm.user,
                name: this.searchForm.name,
                description: this.searchForm.description,
                createTimeStart:this.searchForm.createTimeRange[0],
                createTimeEnd:this.searchForm.createTimeRange[1],
                updateTimeStart:this.searchForm.updateTimeRange[0],
                updateTimeEnd:this.searchForm.updateTimeRange[1]
            };

            postForm('/institution/insList/list', params,{}, this, res =>{
                this.institutionTable = res.data.list.map(item => ({
                    id: item.id,
                    doi: item.doi,
                    user: item.user,
                    publicKey: item.publicKey,
                    ipWithPort: item.ipWithPort,
                    name: item.name,
                    description: "",
                    createTime: new Date(item.createTime).toISOString().split('T')[0],
                    updateTime: new Date(item.updateTime).toISOString().split('T')[0]
                }));
                this.total = res.data.total;
                this.pages = res.data.pages;
                console.log('机构数据已更新:', res);
            });
        },
        deleteInstitution(index) {
            let _this = this;
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let queryParams = {
                    id: this.institutionTable[index].id // 假设查询参数是 id
                };
                postForm(`/institution/insList/delete`,{},queryParams, _this, function(res){
                    _this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                _this.userTable.splice(index, 1);
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
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