<template>
    <div class="likes">
        <el-container>
            <el-header height="250px">
                <el-row>
                    <el-col :span="7"
                        ><div class="grid-content covers">
                            <img
                                v-if="this.$store.state.likesMusic.length != 0"
                                :src="this.$store.state.likesMusic[0].al.picUrl"
                            /></div
                    ></el-col>
                    <el-col :span="17"
                        ><div class="grid-content titles">
                            <el-row>
                                <el-col :span="20"
                                    ><div class="grid-content title-left">
                                        <div class="title-name">
                                            <span class="sheet">歌单</span>
                                            <span class="name"
                                                >我喜欢的音乐</span
                                            >
                                        </div>
                                        <div class="title-user">
                                            <el-avatar
                                                class="user-img"
                                                size="medium"
                                            >
                                                user
                                            </el-avatar>
                                            <span class="user">黑房间_</span>
                                            <span class="time"
                                                >2015-05-31创建</span
                                            >
                                        </div>
                                        <div class="play-wrap">
                                            <div class="playbtn">
                                                <span
                                                    class="iconfont icon-circle-play"
                                                ></span>
                                                <span class="text">
                                                    播放全部</span
                                                >
                                            </div>
                                            <div class="sharebtn">
                                                <span
                                                    class="el-icon-share"
                                                ></span>
                                                <span class="text">分享</span>
                                            </div>
                                        </div>
                                    </div></el-col
                                >
                                <el-col :span="4"
                                    ><div class="grid-content title-right">
                                        <div class="count-num">
                                            <span class="text">歌曲数</span>
                                            <span class="num">{{
                                                this.$store.state.likesMusic
                                                    .length
                                            }}</span>
                                        </div>
                                    </div></el-col
                                >
                            </el-row>
                        </div></el-col
                    >
                </el-row>
            </el-header>
            <el-main height="70%">
                <el-tabs v-model="activeName" class="main-tabs">
                    <el-tab-pane class="tabs" label="歌曲列表" name="first">
                        <el-table
                            :data="this.$store.state.likesMusic"
                            style="width: 100%"
                            size="mini"
                            :header-cell-class-name="headerStyle"
                            row-dblclick
                            @row-dblclick="playMusic"
                        >
                            <el-table-column type="index" width="60">
                            </el-table-column>
                            <el-table-column label="操作" width="70">
                                <template slot-scope="scope">
                                    <span
                                        class="iconfont icon_xihuan1"
                                        @click="isLike(scope.row)"
                                    ></span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="音乐标题"
                                width="320"
                            >
                                <template slot-scope="scope">
                                    <span>{{ alia(scope.row) }} </span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="ar[0].name"
                                label="歌手"
                                width="230"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="al.name"
                                label="专辑"
                                width="300"
                            >
                                <template slot-scope="scope">
                                    <span>{{ al(scope.row) }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="dt" label="时长" width="80">
                                <template slot-scope="scope">
                                    {{ scope.row.dt | playTimeFormat }}
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane class="tabs" label="评论" name="second"
                        >评论</el-tab-pane
                    >
                    <el-tab-pane class="tabs" label="收藏者" name="third"
                        >收藏者</el-tab-pane
                    >
                </el-tabs>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import { strLength } from "../common/utils";

export default {
    data() {
        return {
            activeName: "first"
        };
    },
    computed: {
        alia() {
            return row => {
                if (row.alia.length != 0) {
                    let name = row.name + " (" + row.alia[0] + ")";
                    let len = strLength(name);
                    name = len > 50 ? name.othersubstr(0, 50) + "..." : name;
                    return name;
                } else if (row.tns) {
                    let name = row.name + " (" + row.tns[0] + ")";
                    let len = strLength(name);
                    name = len > 50 ? name.othersubstr(0, 50) + "..." : name;
                    return name;
                } else {
                    let name = row.name;
                    let len = strLength(name);
                    name = len > 50 ? name.othersubstr(0, 50) + "..." : name;
                    return name;
                }
            };
        },
        al() {
            return row => {
                let name = row.al.name;
                let len = strLength(name);
                // console.log(name.length);
                name = len > 43 ? name.othersubstr(0, 43) + "..." : name;
                return name;
            };
        }
    },
    methods: {
        ...mapActions(["getMucicUrlByIdAsync"]),
        ...mapMutations(["notify"]),
        // 编写headerStyle，返回class名称tableStyle
        headerStyle({ row, column, rowIndex, columnIndex }) {
            return "tableStyle";
        },
        isLike(row) {
            this.$confirm("确定将选中的歌曲从我喜欢的音乐中删除?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                const el = event.target;
                console.log(this.$store.state.likesMusic);
                this.$store.state.likesMusic.forEach((item, index) => {
                    if (item.id === row.id) {
                        item.isActive = false;
                        this.$store.state.likesMusic.splice(index, 1);
                    }
                    console.log(this.$store.state.likesMusic);
                    // this.notify()
                });
            }).catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除"
                });
            });
        },
         // 点击按钮播放音乐
        playMusic(row) {
            const params = {
                V: this,
                id: row.id
            };
            // 播放音乐
            this.getMucicUrlByIdAsync(params);
        },
    }
};
</script>

<style scope>
.likes {
    width: 100%;
    height: 100%;
}
.likes .el-container {
    height: 100%;
}
.likes .el-header {
    /* background-color: #B3C0D1; */
    color: #333;
    text-align: center;
    line-height: 60px;
}

.likes .covers {
    /* border: 1px solid salmon; */
    height: 250px;
}
.likes .covers img {
    height: 200px;
    width: 200px;
}
.likes .titles {
    /* border: 1px solid sandybrown; */
    height: 250px;
}
.likes .titles .title-left {
    /* background-color: darkorange; */
    height: 250px;
}
.likes .titles .title-right {
    /* background-color: rebeccapurple; */
    height: 250px;
}
.likes .titles .title-left .title-name {
    display: block;
    float: left;
    height: 30px;
    width: 100%;
    line-height: 30px;
    margin-bottom: 10px;
}
.likes .titles .title-left .title-name .sheet {
    /* position: relative; */
    float: left;
    /* bottom: 2px; */
    margin-left: 10px;
    margin-top: 5px;
    font-size: 12px;
    line-height: 20px;
    /* display: inline-block; */
    height: 20px;
    width: 35px;
    border: 1px solid red;
    color: red;
    margin-right: 5px;
}
.likes .titles .title-left .title-name .name {
    font-size: 20px;
    font-weight: 540;
    float: left;
}
.likes .title-left .title-user {
    display: block;
    float: left;
    width: 100%;
    height: 36px;
    line-height: 36px;
    margin-bottom: 10px;
}
.likes .title-left .title-user .user-img {
    float: left;
    margin-left: 10px;
}
.likes .title-left .title-user .user {
    float: left;
    font-size: 15px;
    padding-left: 10px;
}
.likes .title-left .title-user .time {
    float: left;
    font-size: 12px;
    color: #999;
    padding-left: 10px;
}
.likes .title-left .play-wrap {
    display: block;
    width: 100%;
    float: left;
    height: 35px;
}
.likes .title-left .play-wrap .playbtn {
    background-color: rgb(194, 27, 27);
    float: left;
    height: 30px;
    width: 120px;
    border-radius: 5px;
    line-height: 30px;
    margin-left: 10px;
    cursor: pointer;
    font-size: 15px;
}
.likes .title-left .play-wrap .playbtn span {
    color: white;
}
.likes .title-left .play-wrap .playbtn:hover {
    background-color: rgb(168, 18, 18);
}
.likes .title-left .play-wrap .sharebtn {
    float: left;
    border: 1px solid #ccc;
    height: 30px;
    width: 80px;
    border-radius: 5px;
    line-height: 30px;
    margin-left: 10px;
    cursor: pointer;
    font-size: 15px;
}
.likes .title-right .count-num {
    /* background-color: brown; */
    display: inline-block;
    font-size: 13px;
    color: #999;
    text-align: right;
}
.likes .title-right .text {
    display: block;
    height: 20px;
    line-height: 20px;
}
.likes .title-right .num {
    display: block;
    height: 20px;
    line-height: 20px;
}
.likes .el-main .el-tabs__nav {
    margin-left: 80px;
}
.likes .el-main .el-tabs__nav .el-tabs__item {
    padding: 0 30px;
}
.tableStyle {
    border: 0.1px solid #ebeef5;
    font-size: 12px;
    font-weight: 400;
    height: 30px;
}
.likes .el-table th > .cell {
    color: #777;
}

.likes .el-table tbody tr:hover > td {
    background-color: #d6d6d6 !important;
}
.likes .alia {
    color: #999999;
}
</style>
