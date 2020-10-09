import { Divider } from "element-ui";
import Vue from "vue";
import Vuex from "vuex";

// 注册vuex
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        musicUrl: "",
        audioRef: {},
        currentMusic: {},
        // 我喜欢的音乐
        likesMusic: []
    },
    mutations: {
        // 当前播放歌曲信息url存储
        getMucicUrlById(state, { data }) {
            state.musicUrl = data.url;
        },
        saveAudioRef(state, audioRef) {
            state.audioRef = audioRef;
            // console.log(audioRef);
        },
        getMusicInfoById(state, { songs }) {
            // 判断我喜欢的音乐中是否有当前播放音乐
            state.likesMusic.forEach(item => {
                // console.log(item);
                if (item.id === songs[0].id) {
                    songs[0].isActive = true;
                }
            });
            // 存储当前播放歌曲的信息
            state.currentMusic = songs[0];
            // console.log(state.currentMusic);
        },
        notify(state, { V }) {
            const h = V.$createElement;
            V.$notify.closeAll();
            // 弹出当前播放歌曲提示框
            V.$notify({
                // title: '当前播放歌曲：',
                duration: 0,
                dangerouslyUseHTMLString: true,
                position: "bottom-left",
                offset: 45,
                customClass: "box",
                showClose: false,
                message: h("div", { class: "current-music-card" }, [
                    h("img", {
                        attrs: {
                            class: "cover",
                            src: state.currentMusic.al.picUrl
                        }
                    }),
                    h("div", { class: "text" }, [
                        h("span", {
                            class: "music-name",
                            domProps: {
                                innerHTML:
                                    state.currentMusic.name.length > 8
                                        ? state.currentMusic.name.substr(0, 8) +
                                          "..."
                                        : state.currentMusic.name
                            }
                        }),
                        h("span", {
                            class: "music-artistName",
                            domProps: {
                                innerHTML:
                                    state.currentMusic.ar[0].name.length > 10
                                        ? state.currentMusic.ar[0].name.substr(
                                              0,
                                              10
                                          ) + "..."
                                        : state.currentMusic.ar[0].name
                            }
                        })
                    ]),
                    h("div", { class: "likes-card" }, [
                        h("span", {
                            class: {
                                iconfont: true,
                                icon_xihuan1: state.currentMusic.isActive,
                                icon_xihuan: !state.currentMusic.isActive
                            },
                            on: {
                                click: e => {
                                    state.currentMusic.isActive = !state
                                        .currentMusic.isActive;
                                    // console.log(e);
                                    const el = e.target;
                                    if (state.currentMusic.isActive) {
                                        el.className = "iconfont icon_xihuan1";
                                        state.likesMusic.unshift(
                                            state.currentMusic
                                        );
                                    } else {
                                        el.className = "iconfont icon_xihuan";
                                        state.likesMusic.forEach(
                                            (item, index) => {
                                                if (
                                                    item.id ===
                                                    state.currentMusic.id
                                                ) {
                                                    state.likesMusic.splice(
                                                        index,
                                                        1
                                                    );
                                                }
                                                console.log(state.likesMusic);
                                            }
                                        );
                                    }
                                }
                            }
                        })
                    ])
                ])
            });
        }
    },
    actions: {
        async getMucicUrlByIdAsync({ commit, dispatch }, { V, id }) {
            // 调用接口获取当前播放歌曲信息
            dispatch("getMusicInfoByIdAsync", { V, id });

            // 根据id使用axios调用接口发起ajax请求
            const { data: res } = await V.$http({
                method: "get",
                url: "/song/url",
                params: {
                    id
                }
            });
            console.log(res);
            // 判断请求是否成功
            if (res.code !== 200) {
                return V.$message.error("歌曲地址请求失败");
            }
            if (res.data[0].url === null) {
                return V.$message.error("当前音乐为vip专属");
            }
            // 成功，通知 对应mutation存储数据
            commit("getMucicUrlById", { data: res.data[0], V });
        },
        async getMusicInfoByIdAsync({ commit, state }, { V, id }) {
            // 根据id使用axios调用接口发起ajax请求
            const { data: res } = await V.$http({
                method: "get",
                url: "/song/detail",
                params: {
                    ids: id
                }
            });
            // console.log(res);
            // 判断请求是否成功
            if (res.code !== 200) {
                return V.$message("error", "当前歌曲信息请求失败");
            }
            // 成功，通知 对应mutation存储数据
            commit("getMusicInfoById", res);
            commit("notify", { V });
        }
    }
});
