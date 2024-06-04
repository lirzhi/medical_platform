<template>
    <div style="height: 80vh; width: 100%; display: flex; justify-content: space-around; align-items: center;">
        <img style="width: 50%;" src="login-img.png" />
        <div>
            <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="login-container">
                <h3 style="text-align: center;">系统登录</h3>
                <el-form-item label="用户名" label-width="80px" prop="username" class="username">
                    <el-input type="input" v-model="form.username" auto-complete="off" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="80px" prop="password" class="password">
                    <el-input type="password" v-model="form.password" auto-complete="off"
                        placeholder="请输入密码"></el-input>
                </el-form-item>
                <div style="display: flex; justify-content: space-around;">
                    <el-button type="primary" @click="login">登录</el-button>
                </div>
            </el-form>
        </div>

    </div>

</template>

<script>
import { loginRequest } from "@/api/data";
export default {
    name: "login",
    data() {
        return {
            form: {
                username: "",
                password: "",
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur",
                    },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                ],
            },
        };
    },
    created() {
        // 监控键盘回车事件
        document.onkeydown = (e) => {
            if (e.keyCode === 13) {
                this.login();
            }
        };
    },
    methods: {
        login() {
            let _this = this;
            if (this.form.username === "" || this.form.password === "") {
                this.$message.warning("用户名或密码不能为空");
                return;
            }

            let params = {
                username: this.form.username,
                password: this.form.password,
            };

            loginRequest('/admin/login', params, _this, function (res) {
                _this.$router.push({ path: "/MainPage" });
            });
        },
    },
};
</script>
<style lang="less" scoped>
.login-container {
    border-radius: 15px;
    background-clip: padding-box;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background-color: white;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}

.login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
}

.login_submit {
    margin: 10px auto 0px auto;
}

</style>