const axios = require('axios').default;
const {
    Canvas,
    resolveImage
} = require("canvas-constructor");

const {
    registerFont
} = require("canvas");

registerFont(__dirname + "/../../assets/sfuir.ttf", {
	family: "SF UI Regular",
});
registerFont(__dirname + "/../../assets/sfuib.ttf", {
	family: "SF UI Bold",
});

const ColorThief = require('colorthief');

const ColorContrastChecker = require("color-contrast-checker");
const ccc = new ColorContrastChecker();

module.exports = {
    generate: function (trackId, artists, track) {
        return new Promise(async (res, rej) => {
            axios.get("http://45.138.72.227:3000/track/?id=" + trackId)
                .catch(err => rej)
                .then(async data => {
                    data = data.data;
                    const coverUrl = data.album.images[0].url;
                    const canvas = new Canvas(900, 270);
                    const cover = await resolveImage(coverUrl);
                    const color = await ColorThief.getPalette(coverUrl, 2);
                    if(!ccc.isLevelAA(utils.rgbToHex(color[0]), utils.rgbToHex(color[1]))){
                        color[1] = utils.getForeground(color[0]);
                    }
                    res(canvas
                        .setTextFont("48px SF UI Bold")
                        .setColor(utils.rgbToHex(color[0]))
                        .printRoundedRectangle(0, 0, 900, 270, 20)
                        .printRoundedImage(cover, 30, 30, 210, 210, 20)
                        .setColor(utils.rgbToHex(color[1]))
                        .printText(track, 275, 127)
                        .setTextFont("28px SF UI Regular")
                        .printText(artists, 275, 170)
                        .toBuffer())
                });
        });
    }
};

let utils = {
    getForeground: function (rgb) {
        luminance = this.getLuminance(rgb);
        console.log(testWhite, testBlack, luminance);
        return (luminance < 160) ? "#ffffff" : "#000000";
    },
    getLuminance: function (rgb) {
        luminance = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]);
        return luminance;
    },
    componentToHex: function (c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    },
    rgbToHex: function (rgb) {
        return "#" + this.componentToHex(rgb[0]) + this.componentToHex(rgb[1]) + this.componentToHex(rgb[2]);
    }
};