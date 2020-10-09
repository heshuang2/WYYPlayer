<template>
    <div class="result-container">
        <!-- 标题 -->
        <div class="title-wrap">
            <h2 class="title" :keywords="(keywords = $route.query.q)">
                {{ this.keywords }}
            </h2>
            <span class="sub-title">找到{{ count }}个结果</span>
        </div>
        <el-tabs v-model="activeIndex">
            <el-tab-pane label="歌曲" name="songs">
                <table class="el-table">
                    <thead>
                        <th></th>
                        <th>操作</th>
                        <th>音乐标题</th>
                        <th>歌手</th>
                        <th>专辑</th>
                        <th>时长</th>
                    </thead>
                    <tbody>
                        <tr
                            class="el-table__row"
                            v-for="(item, index) in goods.songs"
                            :key="index"
                            @dblclick="playMusic(item.id)"
                        >
                            <td>{{ index + 1 }}</td>
                            <td
                                class="iconfont icon_xihuan"
                                :class="{ icon_xihuan1: item.isActive }"
                                @click="toLike(item, $event)"
                            ></td>
                            <td>
                                <div class="song-wrap">
                                    <div class="name-wrap">
                                        <span>{{ item.name }}</span>
                                        <span
                                            class="iconfont icon-mv"
                                            v-if="item.mvid != 0"
                                        ></span>
                                    </div>
                                    <span v-if="item.alias.length != 0">{{
                                        item.alias[0]
                                    }}</span>
                                    <span v-else-if="item.transNames">{{
                                        item.transNames[0]
                                    }}</span>
                                </div>
                            </td>
                            <td>{{ item.artists[0].name }}</td>
                            <td>{{ item.album.name }}</td>
                            <td>{{ item.duration | playTimeFormat }}</td>
                        </tr>
                    </tbody>
                </table>
            </el-tab-pane>
            <el-tab-pane label="歌单" name="playlists">
                <div class="items">
                    <div
                        class="item"
                        v-for="(item, index) in goods.playlists"
                        :key="index"
                        @click="toPlaylist(item.id)"
                    >
                        <div class="img-wrap">
                            <div class="num-wrap">
                                播放量:
                                <span class="num">{{
                                    item.playCount | playNumFormat
                                }}</span>
                            </div>
                            <img :src="item.coverImgUrl" alt="" />
                            <span class="iconfont icon-play"></span>
                        </div>
                        <p class="name">{{ item.name }}</p>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="MV" name="mvs">
                <div class="items mv">
                    <div
                        class="item"
                        v-for="(item, index) in goods.mvs"
                        :key="index"
                        @click="toMv(item.id)"
                    >
                        <div class="img-wrap">
                            <img :src="item.cover" alt="" />
                            <span class="iconfont icon-play"></span>
                            <div class="num-wrap">
                                <div class="iconfont icon-play"></div>
                                <div class="num">
                                    {{ item.playCount | playNumFormat }}
                                </div>
                            </div>
                            <span class="time">{{
                                item.duration | playTimeFormat
                            }}</span>
                        </div>
                        <div class="info-wrap">
                            <div class="name">{{ item.name }}</div>
                            <div class="singer">{{ item.artistName }}</div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!-- 分页器 -->
        <el-pagination
            @current-change="handleCurrentChange"
            background
            layout="prev, pager, next"
            :total="total"
            :current-page="pageNum"
            :page-size="pageSize"
        >
        </el-pagination>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "result",
    data() {
        return {
            keywords: "",
            // tab切换时会改变的数据
            activeIndex: "songs",
            // 搜索数据
            goods: {
                songs: [],
                playlists: [],
                mvs: [],
                newsongs: []
            },
            // 搜索歌曲数据量
            count: 0,
            type: 1,
            //总条数
            total: 0,
            // 页码
            pageNum: 1,
            pageSize: 10
        };
    },
    created() {
        this.getsongs();
    },
    watch: {
        keywords() {
            this.pageNum = 1;
            this.getsongs();
        },
        activeIndex() {
            // songs 歌曲
            // lists 歌单
            // mv mv
            switch (this.activeIndex) {
                case "songs":
                    this.type = 1;
                    this.pageNum = 1;
                    break;
                case "playlists":
                    this.type = 1000;
                    this.pageNum = 1;
                    break;
                case "mvs":
                    this.type = 1004;
                    this.pageNum = 1;
                    break;
            }
            // console.log(this.type);
            this.getsongs();
        }
    },
    methods: {
        ...mapActions(["getMucicUrlByIdAsync"]),
        // 页码改变事件
        handleCurrentChange(val) {
            // 保存页码
            this.pageNum = val;
            // 重新获取数据
            this.getsongs();
        },
        toMv(id) {
            this.$router.push(`/mv?id=${id}`);
        },
        async getsongs() {
            const { data: res } = await this.$http.get("search", {
                params: {
                    keywords: this.$route.query.q,
                    type: this.type,
                    limit: this.type === 1004 ? 8 : 10,
                    offset: (this.pageNum - 1) * (this.type === 1004 ? 8 : 10)
                }
            });
            // console.log(res);
            if (this.type === 1) {
                this.count = res.result.songCount;
            } else if (this.type === 1000) {
                this.count = res.result.playlistCount;
            } else if (this.type === 1004) {
                this.count = res.result.mvCount;
            }
            this.total = this.count;
            let page = this.activeIndex;
            // 获取的数据放入搜索数据中
            this.goods[page] = res.result[page];

            // console.log(this.goods.songs);
        },
        // 点击按钮播放音乐
        playMusic(id) {
            const params = {
                V: this,
                id
            };
            // 播放音乐
            this.getMucicUrlByIdAsync(params);
        },
        // 歌单详情
        toPlaylist(id) {
            this.$router.push(`/playlist?q=${id}`);
        },
        toLike(item, event) {
            console.log(item);
            const el = event.target;
            console.log(el);
        }
    }
};
</script>

<style>
.icon_xihuan1 {
    color: red;
}
</style>
