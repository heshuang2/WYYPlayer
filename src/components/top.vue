<template>
    <div class="top-container">
        <div class="left-box">
            <div class="icon-wrapper">
                <span class="iconfont icon-home"></span>
                <span class="iconfont icon-sami-select"></span>
                <span class="iconfont icon-full-screen"></span>
            </div>
            <div class="history-wrapper">
                <span class="iconfont icon-arrow-lift" @click="goBack"></span>
                <span class="iconfont icon-arrow-right" @click="goForward"></span>
            </div>
        </div>
        <div class="right-box">
            <div class="el-input el-input--small el-input--prefix">
                <!-- 搜索框 -->
                <input
                    type="text"
                    autocomplete="off"
                    placeholder="搜索"
                    class="el-input__inner"
                    v-model="inputVlaue"
                    @keyup.enter="toResult"
                />
                <span class="el-input__prefix">
                    <i class="el-input__icon el-icon-search"></i>
                </span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "top",
    data() {
        return {
            query: "",
            // 搜索内容
            inputVlaue: ""
        };
    },
    methods: {
        toResult() {
            if (this.inputVlaue == "") {
                this.$message.warning("请输入要搜索的内容");
            } else {
                this.$router.push(`/result?q=${this.inputVlaue}`);
            }
        },
        goBack() {
            this.$router.back();
        },
        goForward() {
            this.$router.forward();
        }
    }
};
</script>

<style scoped></style>
