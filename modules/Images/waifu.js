const axios = require("axios").default;

module.exports = {
    getRandom: function (min, max) {
        return Math.random() * (max - min) + min;
    },
    getWaifu: function () {
        const waifuPid = this.getRandom(100, 30000);
        return new Promise((res, rej) => {
            axios.get('https://safebooru.org/index.php?page=dapi&s=post&q=index&tags=looking_at_viewer+1girl&limit=1&json=1&pid=' + waifuPid)
                .catch(err => {
                    rej(err);
                })
                .then(response => {
                    waifu = response.data[0];
                    res('https://safebooru.org/images/' + waifu.directory + '/' + waifu.image);
                })
        })
    }
}