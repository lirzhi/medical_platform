<template>
    <div style="width: 250px;" v-show="path !== '/Login'">
        <el-menu :default-active="activeIndex" class="el-menu-demo"  @select="handleSelect" :unique-opened="false">
            <el-menu-item index="0">系统总览</el-menu-item>
            <el-submenu v-show="isAdmin" index="1">
                <template slot="title">机构管理</template>
                <el-menu-item index="1-1">现有机构管理</el-menu-item>
                <el-menu-item index="1-2">待组网机构管理</el-menu-item>
            </el-submenu>
            <el-submenu v-show="isAdmin" index="2">
                <template slot="title">项目管理</template>
                <el-menu-item index="2-1">现有项目</el-menu-item>
                <el-menu-item index="2-2">建项审批</el-menu-item>
                <!-- <el-menu-item index="2-3">项目修改审批</el-menu-item> -->
            </el-submenu>   
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "CommonAside",
    data() {
        return {
            isAdmin: false,
            activeIndex: '0',
            path: '',
        };
    },
    mounted() {
        this.isAdmin = this.$store.state.user.userType === 'admin';
        this.path = this.$router.currentRoute.path;
        if(this.path === '/Login') {
            this.activeIndex = '0';
        }
        else if(this.path === '/MainPage') {
            this.activeIndex = '0';
        }
        else if (this.path === '/InstitutionList') {
            this.activeIndex = '1-1';
        }
        else if (this.path === '/InsApproval') {
            this.activeIndex = '1-2';
        }
        else if (this.path === '/ProjectList') {
            this.activeIndex = '2-1';
        }
        else if (this.path === '/ProApproval') {
            this.activeIndex = '2-2';
        }
        else if (this.path === '/ProModificationApproval') {
            this.activeIndex = '2-3';
        }
        
    },
    watch: {
        $route(to, from) {
            this.path = to.path;
            console.log(this);
        },
        // 由于有 admin 和 user 的切换，为了切换时重新加载页面，所以监听 userType
        // 直接修改 activeIndex 没用，只能重新加载页面
        "$store.state.user.userType": {
            handler:function(oldVal, newVal) {
                if(newVal === '') {
                    window.location.reload();
                }
            },
            deep:true
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
            if (key === '0') {
                this.$router.push('/MainPage')
            } else if (key === '1-1') {
                this.$router.push('/InstitutionList')
            } else if (key === '1-2') {
                this.$router.push('/InsApproval')
            } else if (key === '2-1') {
                this.$router.push('/ProjectList')
            } else if(key === '2-2') {
                this.$router.push('/ProApproval')
            } else if (key === '2-3') {
                this.$router.push('/ProModificationApproval')
            } 
        },
    },
}
</script>

<style scoped>
</style>