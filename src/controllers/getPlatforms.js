const { Platform } = require("../db.js");

const getPlatforms = async function(){
    try {
        const platforms = await Platform.findAll();
        return platforms;
    } catch (error) {
        throw new Error(error);
    };
};

module.exports = getPlatforms