<template>
    <div class="playlists-container" v-if="this.topList != null">
        <!-- 同步 -->
        <div class="top-card" @click="toPlaylist(topList.id)">
            <div class="icon-wrap">
                <img :src="topList.coverImgUrl" alt="" />
                <div class="num-wrap">
                    🎧
                    <span class="num">{{
                        topList.playCount | playNumFormat
                    }}</span>
                </div>
            </div>
            <div class="content-wrap">
                <div class="tag">精品歌单</div>
                <div class="title">
                    {{ topList.name }}
                </div>
                <div class="info">
                    {{ topList.description }}
                </div>
            </div>
            <img :src="topList.coverImgUrl" alt="" class="bg" />
            <div class="bg-mask"></div>
        </div>
        <div class="tab-container">
            <!-- tab栏 顶部 -->
            <div class="tab-bar">
                <span
                    class="item"
                    @click="tag = '全部'"
                    :class="{ active: tag === '全部' }"
                    >全部</span
                >
                <span
                    class="item"
                    @click="tag = '欧美'"
                    :class="{ active: tag === '欧美' }"
                    >欧美</span
                >
                <span
                    class="item"
                    @click="tag = '华语'"
                    :class="{ active: tag === '华语' }"
                    >华语</span
                >
                <span
                    class="item"
                    @click="tag = '流行'"
                    :class="{ active: tag === '流行' }"
                    >流行</span
                >
                <span
                    class="item"
                    @click="tag = '说唱'"
                    :class="{ active: tag === '说唱' }"
                    >说唱</span
                >
                <span
                    class="item"
                    @click="tag = '摇滚'"
                    :class="{ active: tag === '摇滚' }"
                    >摇滚</span
                >
                <span
                    class="item"
                    @click="tag = '民谣'"
                    :class="{ active: tag === '民谣' }"
                    >民谣</span
                >
                <span
                    class="item"
                    @click="tag = '电子'"
                    :class="{ active: tag === '电子' }"
                    >电子</span
                >
                <span
                    class="item"
                    @click="tag = '轻音乐'"
                    :class="{ active: tag === '轻音乐' }"
                    >轻音乐</span
                >
                <span
                    class="item"
                    @click="tag = '影视原声'"
                    :class="{ active: tag === '影视原声' }"
                    >影视原声</span
                >
                <span
                    class="item"
                    @click="tag = 'ACG'"
                    :class="{ active: tag === 'ACG' }"
                    >ACG</span
                >
                <span
                    class="item"
                    @click="tag = '怀旧'"
                    :class="{ active: tag === '怀旧' }"
                    >怀旧</span
                >
                <span
                    class="item"
                    @click="tag = '治愈'"
                    :class="{ active: tag === '治愈' }"
                    >治愈</span
                >
                <span
                    class="item"
                    @click="tag = '旅行'"
                    :class="{ active: tag === '旅行' }"
                    >旅行</span
                >
            </div>
            <!-- tab的内容区域 -->
            <div class="tab-content">
                <div class="items">
                    <div
                        class="item"
                        v-for="(item, index) in list"
                        :key="index"
                        @click="toPlaylist(item.id)"
                    >
                        <div class="img-wrap">
                            <div class="num-wrap">
                                🎧
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
            </div>
        </div>
        <!-- 分页器 -->
        <el-pagination
            @current-change="handleCurrentChange"
            background
            layout="prev, pager, next"
            :total="total"
            :current-page="page"
            :page-size="20"
        >
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: "recommend",
    data() {
        return {
            // 总条数
            total: 0,
            // 页码
            page: 1,
            pageSize: 10,
            // 分类
            tag: "全部",
            // 顶部精品歌单
            topList: {},
            // 歌单列表
            list: []
        };
    },
    created() {
        this.getHighQuality();
        this.getTopPlaylist();
    },
    watch: {
        tag() {
            this.page = 1;
            this.getHighQuality();
            this.getTopPlaylist();
        }
    },
    methods: {
        handleCurrentChange(val) {
            this.page = val;
            this.getTopPlaylist();
            // console.log(`当前页: ${val}`);
        },
        // 获取精品歌单
        async getHighQuality() {
            const { data: res } = await this.$http.get(
                "top/playlist/highquality",
                {
                    params: {
                        limit: 1,
                        cat: this.tag
                    }
                }
            );
            //  console.log(res);
            this.topList = res.playlists[0];
        },
        // 获取歌单列表
        async getTopPlaylist() {
            const { data: res } = await this.$http.get("top/playlist", {
                params: {
                    limit: this.pageSize,
                    cat: this.tag,
                    total: true,
                    offset: (this.page - 1) * this.pageSize
                }
            });
            //  console.log(res);
            this.list = res.playlists;
            this.total = res.total;
        },
        toPlaylist(id) {
            this.$router.push(`/playlist?q=${id}`);
        }
    }
};
</script>

<style></style>
