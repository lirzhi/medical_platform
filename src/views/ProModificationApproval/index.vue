<template>
    <div style="display: flex;">
        <!-- <common-aside :activeIndex="'6'"></common-aside> -->
        
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">

            <el-form :model="searchForm" label-width="auto" class="SearchForm">
                <el-form-item prop="projectName" label="项目名称" class="SearchFormItem">
                    <el-input v-model="searchForm.projectName" style="width: 200px;"></el-input>
                </el-form-item>

                <el-form-item prop="institutionName" label="发起机构" class="SearchFormItem">
                    <el-input v-model="searchForm.projectName" style="width: 200px;"></el-input>
                </el-form-item>

                <el-form-item label="申请时间" class="SearchFormTimePicker">
                    <el-date-picker
                        v-model="searchForm.applyTimeRange"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="审批状态" class="SearchFormItem">
                    <el-select v-model="searchForm.approvalStatus" placeholder="请选择">
                        <el-option label="待审批" value="1"></el-option>
                        <el-option label="已通过" value="2"></el-option>
                        <el-option label="未通过" value="3"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <el-button type="primary">搜索</el-button>
            <el-divider></el-divider>

            <el-table :data="approvalTable" style="width: 95%;" stripe border>
                <el-table-column prop="projectName" label="项目名称"></el-table-column>
                <el-table-column prop="institutionName" label="发起机构"></el-table-column>
                <el-table-column prop="projectDoi" label="DOI"></el-table-column>
                <el-table-column prop="remark" label="项目描述"></el-table-column>
                <el-table-column prop="applyTime" label="修改时间"></el-table-column>
                <el-table-column prop="approvalStatus" label="审批状态"></el-table-column>
                <el-table-column label="项目详细信息" min-width="120" align="center">
                    <template slot-scope="props">
                        <el-button @click="getProjectDo(props.row, props.$index)" type="primary"
                            size="small">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="operation" label="操作" min-width="120" align="center">
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
                :current-page="current"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue';
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
                projectName: "",
                institutionName: "",
                // 申请时间范围
                applyTimeRange: undefined,
                approvalStatus: "",
            },

            // 项目列表
            approvalTable: [
                {
                    pid: 1,
                    projectName: "项目1",
                    institutionName: "北京第二医院",
                    projectDoi: "aibd/NT5jkfgvat",
                    remark: "这是北京第二医院的项目1",
                    applyTime: "2021-01-05",
                    approvalStatus: '待审批',
                },
                {
                    pid: 2,
                    projectName: "项目2",
                    institutionName: "北京第二医院",
                    projectDoi: "aibd/oklUvgRK5v",
                    remark: "这是北京第二医院的项目2",
                    applyTime: "2021-01-06",
                    approvalStatus: '待审批',
                },
                {
                    pid: 3,
                    projectName: "项目3",
                    institutionName: "北京第二医院",
                    projectDoi: "aibd/boirgcvtaU",
                    remark: "这是北京第二医院的项目3",
                    applyTime: "2021-01-07",
                    approvalStatus: '待审批',
                },
            ],
            total:3,
            size:1,
            current:1,
            multipleSelection: [],
        };
    },
    mounted() { },
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
        //获取项目实体
        getProjectDo(row, index) {
            this.modifyProjectDialogVisible = true;
            this.modifyProjectIndex = index;
            this.modifyProjectItem = JSON.parse(JSON.stringify(row));
        },
        // 通过审批
        passApply(row, index) {
            console.log('passApply', row, index);
        },
        // 拒绝审批
        rejectApply(row, index) {
            console.log('rejectApply', row, index);
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