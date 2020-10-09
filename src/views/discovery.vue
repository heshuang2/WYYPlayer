<template>
    <div class="discovery-container">
        <!-- 轮播图 -->
        <el-carousel class="" :interval="4000" type="card">
            <el-carousel-item v-for="(item, index) in banners" :key="index">
                <img :src="item.imageUrl" alt="" />
            </el-carousel-item>
        </el-carousel>
        <!-- 推荐歌单 -->
        <div class="recommend">
            <h3 class="title">
                推荐歌单
            </h3>
            <div class="items">
                <div
                    class="item"
                    v-for="(item, index) in recommend"
                    :key="index"
                    @click="toPlaylist(item.id)"
                >
                    <div class="img-wrap">
                        <div class="desc-wrap">
                            <span class="desc">{{ item.copywriter }}</span>
                        </div>
                        <img :src="item.picUrl" alt="" />
                        <span class="iconfont icon-play"></span>
                    </div>
                    <p class="name">{{ item.name }}</p>
                </div>
            </div>
        </div>
        <!-- 最新音乐 -->
        <div class="news">
            <h3 class="title">
                最新音乐
            </h3>
            <div class="items">
                <div class="item" v-for="(item, index) in songs" :key="index">
                    <div class="img-wrap">
                        <!-- 封面 -->
                        <img :src="item.picUrl" alt="" />
                        <span
                            class="iconfont icon-play"
                            @click="playMusic(item.id)"
                        ></span>
                    </div>
                    <div class="song-wrap">
                        <div class="song-name">{{ item.name }}</div>
                        <div class="singer">
                            {{ item.song.artists[0].name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 推荐MV -->
        <div class="mvs">
            <h3 class="title">推荐MV</h3>
            <div class="items">
                <div class="item" v-for="(item, index) in mvs" :key="index">
                    <div class="img-wrap">
                        <div class="desc-wrap">
                            <span class="desc">{{ item.copywriter }}</span>
                        </div>
                        <img :src="item.picUrl" alt="" />
                        <span class="iconfont icon-play"></span>
                        <div class="num-wrap">
                            <div class="iconfont icon-play"></div>
                            <div class="num">{{ item.playCount }}</div>
                        </div>
                    </div>
                    <div class="info-wrap">
                        <div class="name">{{ item.name }}</div>
                        <div class="singer">{{ item.artistName }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "discovery",
    data() {
        return {
            // 轮播图数据
            banners: [],
            // 推荐歌单数据
            recommend: [],
            // 最新音乐数据
            songs: [],
            // 推荐mv数据
            mvs: []
        };
    },
    created() {
        this.getbannerList();
        this.getrecommendList();
        this.getsongsList();
        this.getmvsList();
    },
    methods: {
        ...mapActions(["getMucicUrlByIdAsync"]),
        // 轮播图
        async getbannerList() {
            const { data: res } = await this.$http.get("banner");
            console.log(res);
            this.banners = res.banners;
        },
        // 推荐歌单
        async getrecommendList() {
            const { data: res } = await this.$http.get("personalized");
            // console.log(res);
            this.recommend = res.result;
            // console.log(this.recommend);
        },
        // 最新音乐
        async getsongsList() {
            const { data: res } = await this.$http.get("personalized/newsong");
            // console.log(res);
            this.songs = res.result;
        },
        async getmvsList() {
            const { data: res } = await this.$http.get("personalized/mv");
            console.log(res);
            this.mvs = res.result;
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
        }
    }
};
</script>

<style></style>
