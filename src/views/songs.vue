<template>
    <div class="songs-container">
        <div class="tab-bar">
            <span class="item" @click="type = 0" :class="{ active: type === 0 }"
                >全部</span
            >
            <span class="item" @click="type = 7" :class="{ active: type === 7 }"
                >华语</span
            >
            <span
                class="item"
                @click="type = 96"
                :class="{ active: type === 96 }"
                >欧美</span
            >
            <span class="item" @click="type = 8" :class="{ active: type === 8 }"
                >日本</span
            >
            <span
                class="item"
                @click="type = 16"
                :class="{ active: type === 16 }"
                >韩国</span
            >
        </div>
        <!-- 底部的table -->
        <!-- <el-table :data="newSongs" v-infinite-scroll="load">
            <el-table-column type="index" width="50px"></el-table-column>
            <el-table-column prop="name" width="300px"></el-table-column>
        </el-table> -->
        <table class="el-table playlit-table" >
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
                    v-for="(item, index) in newSongs"
                    :key="index"
                    @dblclick="playMusic(item.id)"
                >
                    <td>{{ index + 1 }}</td>
                    <td>
                        <div class="img-wrap">
                            <img :src="item.album.picUrl" alt="" />
                            <span class="iconfont icon-play"></span>
                        </div>
                    </td>
                    <td>
                        <div class="song-wrap">
                            <div class="name-wrap">
                                <span>{{ item.name }}</span>
                                <span
                                    v-if="item.mvid !== 0"
                                    @click="toMv(item.mvid)"
                                    class="iconfont icon-mv"
                                ></span>
                            </div>
                            <span v-if="item.alias.length != 0">{{
                                item.alias[0]
                            }}</span>
                        </div>
                    </td>
                    <td>{{ item.album.artists[0].name }}</td>
                    <td>{{ item.album.name }}</td>
                    <td>{{ item.duration | playTimeFormat }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "songs",
    data() {
        return {
            count: 0,
            newSongs: [],
            type: 0
        };
    },
    created() {
        this.getNewSonglist();
    },
    watch: {
        type() {
            // this.type = type
            this.getNewSonglist();
        }
    },
    methods: {
        ...mapActions(["getMucicUrlByIdAsync"]),
        async getNewSonglist() {
            const { data: res } = await this.$http.get("top/song", {
                params: {
                    type: this.type
                }
            });
            console.log(res);
            // this.count = res.data.length;
            this.newSongs = res.data;
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
    }
};
</script>

<style></style>
