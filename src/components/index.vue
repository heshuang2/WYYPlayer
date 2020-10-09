<template>
    <div class="index-container">
        <!-- 导航区域 -->
        <div class="nav">
            <ul>
                <li>
                    <router-link to="/discovery">
                        <span class="iconfont icon-find-music"></span>
                        发现音乐
                    </router-link>
                </li>
                <li>
                    <router-link to="/playlists">
                        <span class="iconfont icon-music-list"></span>
                        推荐歌单
                    </router-link>
                </li>
                <li>
                    <router-link to="/songs">
                        <span class="iconfont icon-music"></span>
                        最新音乐
                    </router-link>
                </li>
                <li>
                    <router-link to="/mvs">
                        <span class="iconfont icon-mv"></span>
                        最新MV
                    </router-link>
                </li>
                <li>
                    <router-link to="/likes">
                        <span class="iconfont icon-icon-test"></span>
                        我喜欢的音乐
                    </router-link>
                </li>
            </ul>
        </div>
        <!-- 主体区域 -->
        <div class="main">
            <router-view></router-view>
        </div>
        <!-- 播放器 -->
        <div class="player">
            <audio ref="audioRef" :src="musicUrl" controls autoplay></audio>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    name: "mainbar",
    data() {
        return {};
    },
    methods: {
        ...mapMutations(["saveAudioRef"])
    },
    computed: {
        ...mapState(["musicUrl"])
    },
    mounted() {
        // 存储音频播放器的引用
        this.saveAudioRef(this.$refs.audioRef);
    }
};
</script>

<style></style>
