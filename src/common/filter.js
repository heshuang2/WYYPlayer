const filters = {
    playTimeFormat: function(originVal) {
        let duration = originVal;
        let min = parseInt(duration / 1000 / 60);
        if (min < 10) {
            min = "0" + min;
        }
        let sec = parseInt((duration / 1000) % 60);
        if (sec < 10) {
            sec = "0" + sec;
        }
        return `${min}:${sec}`;
    },
    playNumFormat: function(playCount) {
        if (playCount > 100000) {
            return parseInt(playCount / 10000) + "万";
        }
        return playCount;
    },
    dateFormat: function(originVal) {
        const dt = new Date(originVal);
        const y = dt.getFullYear();
        const m = (dt.getMonth() + 1 + "").padStart(2, "0");
        const d = (dt.getDate() + "").padStart(2, "0");
        const hh = (dt.getHours() + "").padStart(2, "0");
        const mm = (dt.getMinutes() + "").padStart(2, "0");
        const ss = (dt.getSeconds() + "").padStart(2, "0");
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    }
};
export default vm => {
    Object.keys(filters).forEach(key => {
        vm.filter(key, filters[key]);
    });
};
