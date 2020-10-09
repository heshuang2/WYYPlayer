<template>
    <div class="playlist-container" v-if="playlist != null">
        <div class="top-wrap">
            <div class="img-wrap">
                <!-- 封面 -->
                <img :src="playlist.coverImgUrl" alt="" />
            </div>
            <div class="info-wrap">
                <p class="title">{{ playlist.name }}</p>
                <div class="author-wrap" v-if="playlist.creator != null">
                    <!-- 创建者 -->
                    <img
                        class="avatar"
                        :src="playlist.creator.avatarUrl"
                        alt=""
                    />
                    <span class="name">{{ playlist.creator.nickname }}</span>
                    <span class="time"
                        >{{ playlist.createTime | dateFormat }}创建</span
                    >
                </div>
                <div class="play-wrap">
                    <span class="iconfont icon-circle-play"></span>
                    <span class="text">播放全部</span>
                </div>
                <div class="tag-wrap">
                    <span class="title">标签:</span>
                    <ul>
                        <li v-for="(item, index) in playlist.tags" :key="index">
                            {{ item }}
                        </li>
                    </ul>
                </div>
                <div class="desc-wrap">
                    <span class="title">简介:</span>
                    <div v-if="descDialogVisible === false">
                        <span class="desc" v-if="playlist.description != null">
                            {{
                                playlist.description.length > 80
                                    ? playlist.description.substr(0, 80) + "..."
                                    : playlist.description
                            }}
                        </span>
                        <a
                            v-if="more"
                            class="desc-btn"
                            href="javascript:;"
                            @click="descDialogVisible = !descDialogVisible"
                            >▼</a
                        >
                    </div>
                    <div v-if="descDialogVisible">
                        <span class="desc" v-if="playlist.description != null">
                            {{ playlist.description }}
                        </span>
                        <a
                            v-if="more"
                            class="desc-btn"
                            href="javascript:;"
                            @click="descDialogVisible = !descDialogVisible"
                            >▲</a
                        >
                    </div>
                </div>
            </div>
        </div>
        <el-tabs v-model="activeIndex">
            <el-tab-pane label="歌曲列表" name="1">
                <table class="el-table playlit-table">
                    <thead>
                        <th></th>
                        <th></th>
                        <th>音乐标题</th>
                        <th>歌手</th>
                        <th>专辑</th>
                        <th>时长</th>
                    </thead>
                    <tbody>
                        <tr
                            class="el-table__row"
                            v-for="(item, index) in playlist.tracks"
                            :key="index"
                            @dblclick="playMusic(item.id)"
                        >
                            <td>{{ index + 1 }}</td>
                            <td>
                                <div class="img-wrap">
                                    <img :src="item.al.picUrl" alt="" />
                                    <span
                                        class="iconfont icon-play"
                                        @click="playMusic(item.id)"
                                    ></span>
                                </div>
                            </td>
                            <td>
                                <div class="song-wrap">
                                    <div class="name-wrap">
                                        <span>{{ item.name }}</span>
                                        <span
                                            v-if="item.mv !== 0"
                                            class="iconfont icon-mv"
                                        ></span>
                                    </div>
                                    <span>{{ item.alia[0] }}</span>
                                </div>
                            </td>
                            <td>{{ item.ar[0].name }}</td>
                            <td>{{ item.al.name }}</td>
                            <td>{{ item.dt | playTimeFormat }}</td>
                        </tr>
                    </tbody>
                </table>
            </el-tab-pane>
            <el-tab-pane :label="'评论(' + total + ')'" name="2">
                <!-- 精彩评论 -->
                <div class="comment-wrap">
                    <p class="title">
                        精彩评论<span class="number"
                            >({{ hotComment.length }})</span
                        >
                    </p>
                    <div class="comments-wrap">
                        <div
                            v-for="(item, index) in hotComment"
                            :key="index"
                            class="item"
                        >
                            <div class="icon-wrap">
                                <img :src="item.user.avatarUrl" alt="" />
                            </div>
                            <div class="content-wrap">
                                <div class="content">
                                    <span class="name">{{
                                        item.user.nickname + ": "
                                    }}</span>
                                    <span class="comment">{{
                                        item.content
                                    }}</span>
                                </div>
                                <div
                                    class="re-content"
                                    v-if="item.beReplied.length != 0"
                                >
                                    <span class="name">{{
                                        item.beReplied[0].user.nickname + ": "
                                    }}</span>
                                    <span class="comment">{{
                                        item.beReplied[0].content
                                    }}</span>
                                </div>
                                <div class="date">
                                    {{ item.time | dateFormat }}
                                    <div class="like">
                                        <img
                                            class="imglike"
                                            src="../assets/like.jpg"
                                            alt=""
                                        />({{ item.likedCount }})
                                    </div>
                                </div>
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
                            v-for="(item, index) in newComment"
                            :key="index"
                        >
                            <div class="icon-wrap">
                                <img :src="item.user.avatarUrl" alt="" />
                            </div>
                            <div class="content-wrap">
                                <div class="content">
                                    <span class="name">{{
                                        item.user.nickname + ": "
                                    }}</span>
                                    <span class="comment">{{
                                        item.content
                                    }}</span>
                                </div>
                                <div
                                    class="re-content"
                                    v-if="item.beReplied.length != 0"
                                >
                                    <span class="name">{{
                                        item.beReplied[0].user.nickname + ": "
                                    }}</span>
                                    <span class="comment">{{
                                        item.beReplied[0].content
                                    }}</span>
                                </div>
                                <div class="date">
                                    {{ item.time | dateFormat }}
                                    <div class="like">
                                        <img
                                            class="imglike"
                                            src="../assets/like.jpg"
                                            alt=""
                                        />({{ item.likedCount }})
                                    </div>
                                </div>
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
                >
                </el-pagination>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import {} from "../network/request";
import { mapActions } from "vuex";
export default {
    name: "playlist",
    data() {
        return {
            activeIndex: "1",
            // 总条数
            total: 0,
            // 页码
            page: 1,
            // 歌单详情数据
            playlist: {},
            // 热门评论
            hotComment: [],
            newComment: [],
            descDialogVisible: false
        };
    },
    created() {
        this.getPlaylists();
        this.getHotCommentlists();
        this.getNewCommentlists();
    },
    computed: {
        more() {
            // 是否显示查看更多按钮
            if (
                this.playlist.description != null &&
                this.playlist.description.length > 80
            ) {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        ...mapActions(["getMucicUrlByIdAsync"]),
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        // 获取歌单详情
        async getPlaylists() {
            const { data: res } = await this.$http.get("playlist/detail", {
                params: {
                    id: this.$route.query.q
                }
            });
            // console.log(res);
            this.playlist = res.playlist;
        },
        // 获取评论详情
        async getHotCommentlists() {
            const { data: res } = await this.$http.get("comment/hot", {
                params: {
                    id: this.$route.query.q,
                    type: 2
                }
            });
            // console.log(res);
            this.hotComment = res.hotComments;
        },
        async getNewCommentlists() {
            const { data: res } = await this.$http.get("comment/playlist", {
                params: {
                    id: this.$route.query.q,
                    limit: 20,
                    offset: this.page * 20
                }
            });
            // console.log(res);
            this.total = res.total;
            this.newComment = res.comments;
        },
        // 页码改变事件
        handleCurrentChange(val) {
            // 保存页码
            this.page = val;
            // 重新获取数据
            this.getNewCommentlists();
        },
        playMusic(id) {
            const params = {
                id: id,
                V: this
            };
            // 播放音乐
            this.getMucicUrlByIdAsync(params);
        }
    }
};
</script>

<style></style>
