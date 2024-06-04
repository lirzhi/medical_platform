<template>
    <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex;">
            <img src="favicon.png" style="height: 50px; margin-right: 10px;" />
            <div style="font-size: 25px; line-height: 200%;">医学临床数据交换系统</div>
        </div>
        <div class="r-content" v-show="path !== '/Login'" style="display: flex; align-items: center;">
            <el-badge :value="unreadMessages" class="item">
                <i class="el-icon-bell" style="font-size: 25px; margin-right: 5px;"></i>
            </el-badge>
            <div style="width: 20px;"></div>
            <el-dropdown trigger="click" size="mini" style="display: flex; align-items: center;">
                <el-avatar :size="50" src="userImg.png"></el-avatar>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="logOut">登出</el-dropdown-item>
                    <el-dropdown-item @click.native="modifyPassword">修改密码</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <el-dialog title="修改密码" :visible.sync="modifyPasswordDialogVisible" width="50%"
            :before-close="modifyPasswordCancel">
            <el-form :model="passwordForm" label-width="auto">
                <el-form-item prop="newPassword" label="新密码">
                    <el-input v-model="passwordForm.newPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item prop="confirmPassword" label="确认密码">
                    <el-input v-model="passwordForm.confirmPassword" type="password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="modifyPasswordCancel">取 消</el-button>
                <el-button type="primary" @click="modifyPasswordConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "CommonAside",
    data() {
        return {
            path: '',
            passwordForm: {
                newPassword: '',
                confirmPassword: ''
            },
            modifyPasswordDialogVisible: false,
            unreadMessages: 5, // 假设有5条未读消息
        }  
    },
    props: {
        activeIndex: String,
    },
    mounted() {
        this.path = this.$router.currentRoute.path;
    },
    watch: {
        $route(to, from) {
            this.path = to.path;
        }
    },
    methods: {
        logOut() {
            this.$store.commit('clearToken');
            this.$store.commit('clearUsername');
            this.$store.commit('clearUserType');
            // this.$router.push('/Login');
            window.location.reload();
        },
        modifyPassword() {
            this.modifyPasswordDialogVisible = true;
        },
        modifyPasswordCancel() {
            this.$confirm('不保存而直接关闭可能会丢失本次编辑的信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.modifyPasswordDialogVisible = false;
                this.passwordForm.newPassword = '';
                this.passwordForm.confirmPassword = '';
            }).catch(() => { });
        },
        modifyPasswordConfirm() {
            if (this.passwordForm.newPassword === '') {
                this.$message.error('密码不能为空');
                return;
            }
            if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
                this.$message.error('两次密码不一致');
                return;
            }
            this.$message.success('修改成功');
            this.modifyPasswordDialogVisible = false;
            this.passwordForm.newPassword = '';
            this.passwordForm.confirmPassword = '';
        }
    },
}
</script>

<style scoped>
.r-content .item {
    display: flex;
    align-items: center;
}
.el-icon-bell {
    cursor: pointer;
}
</style>
