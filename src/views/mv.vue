<template>
    <div class="mv-container">
        <div class="mv-wrap">
            <h3 class="title">mv详情</h3>
            <!-- mv -->
            <div class="video-wrap">
                <video controls :src="mvUrl"></video>
            </div>
            <!-- mv信息 -->
            <div class="info-wrap">
                <div class="singer-info">
                    <div class="avatar-wrap">
                        <img :src="mvDetail.cover" alt="" />
                    </div>
                    <span class="name">{{ mvDetail.artistName }}</span>
                </div>
                <div class="mv-info">
                    <h2 class="title">{{ mvDetail.name }}</h2>
                    <span class="date">发布：{{ mvDetail.publishTime }}</span>
                    <span class="number"
                        >播放：{{ mvDetail.playCount | playNumFormat }}次</span
                    >
                    <p class="desc" v-if="mvDetail.desc != undefined">
                        {{ mvDetail.desc }}
                    </p>
                </div>
            </div>
            <!-- 精彩评论 -->
            <div class="comment-wrap" v-if="this.hotComments.length != 0">
                <p class="title">
                    精彩评论<span class="number"
                        >({{ hotComments.length }})</span
                    >
                </p>
                <div class="comments-wrap">
                    <div
                        class="item"
                        v-for="(item, index) in hotComments"
                        :key="index"
                    >
                        <div class="icon-wrap">
                            <img :src="item.user.avatarUrl" alt="" />
                        </div>
                        <div class="content-wrap">
                            <div class="content">
                                <span class="name"
                                    >{{ item.user.nickname }}：</span
                                >
                                <span class="comment">{{ item.content }}</span>
                            </div>
                            <div
                                class="re-content"
                                v-if="item.beReplied.length != 0"
                            >
                                <span class="name"
                                    >{{ item.beReplied[0].user.nickname }}:
                                </span>
                                <span class="comment">{{
                                    item.beReplied[0].content
                                }}</span>
                            </div>
                            <div class="date">{{ item.time | dateFormat }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 最新评论 -->
            <div class="comment-wrap">
                <p class="title">
                    最新评论<span class="number">({{ total }})</span>
                </p>
                <div class="comments-wrap">
                    <div
                        class="item"
                        v-for="(item, index) in comments"
                        :key="index"
                    >
                        <div class="icon-wrap">
                            <img :src="item.user.avatarUrl" alt="" />
                        </div>
                        <div class="content-wrap">
                            <div class="content">
                                <span class="name"
                                    >{{ item.user.nickname }}：</span
                                >
                                <span class="comment">{{ item.content }}</span>
                            </div>
                            <div
                                class="re-content"
                                v-if="item.beReplied.length != 0"
                            >
                                <span class="name"
                                    >{{ item.beReplied[0].user.nickname }}:
                                </span>
                                <span class="comment">{{
                                    item.beReplied[0].content
                                }}</span>
                            </div>
                            <div class="date">{{ item.time | dateFormat }}</div>
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
                :page-size="5"
                :limit="limit"
            >
            </el-pagination>
        </div>
        <div class="mv-recommend">
            <h3 class="title">相关推荐</h3>
            <div class="mvs">
                <div class="items">
                    <div
                        class="item"
                        v-for="(item, index) in simiMvs"
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
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "mv",
    data() {
        return {
            // 总条数
            total: 0,
            // 页码
            page: 1,
            // 页容量
            limit: 10,
            // mv播放地址
            mvUrl: "",
            // 推荐mv
            simiMvs: [],
            // mv详情
            mvDetail: [],
            // 热门评论
            hotComments: [],
            // 最新评论
            comments: []
        };
    },
    created() {
        this.getMVUrl();
        this.getSimiMv();
        this.getMvDetail();
        this.getMvComment();
    },
    methods: {
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.page = val;
            this.getMvComment();
        },
        toMv(id) {
            this.$router.push(`/mv?id=${id}`);
            this.getMVUrl();
            this.getSimiMv();
            this.getMvDetail();
            this.getMvComment();
            this.page = 1;
        },
        // 获取mv播放地址
        async getMVUrl() {
            const { data: res } = await this.$http.get("mv/url", {
                params: {
                    id: this.$route.query.id
                }
            });
            this.mvUrl = res.data.url;
        },
        // 获取相关mv
        async getSimiMv() {
            const { data: res } = await this.$http.get("simi/mv", {
                params: {
                    mvid: this.$route.query.id
                }
            });
            // console.log(res);
            this.simiMvs = res.mvs;
        },
        // 获取mv详情
        async getMvDetail() {
            const { data: res } = await this.$http.get("mv/detail", {
                params: {
                    mvid: this.$route.query.id
                }
            });
            // console.log(res);
            this.mvDetail = res.data;
        },
        // 获取mv评论
        async getMvComment() {
            const { data: res } = await this.$http.get("comment/mv", {
                params: {
                    id: this.$route.query.id,
                    limit: this.limit,
                    offset: (this.page - 1) * this.limit
                }
            });
            // console.log(res);
            if (this.hotComments == "") {
                this.hotComments = res.hotComments;
            }
            this.comments = res.comments;
            this.total = res.total;
        }
    }
};
</script>

<style></style>
