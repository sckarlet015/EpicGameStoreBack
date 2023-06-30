const { getPreference, createPreference, getFeedback, pay } = require("../controllers/payController");

const getPay = async (req, res) => {
    try {
        let getpay = await pay(res)
        res.status(200).JSON(getpay)
    } catch (error) {
        console.log(error)
    }
}

const postPay = async(req, res) => {
    try {
        let preference = await getPreference(req)
        console.log(preference);
        let newPreference = createPreference(preference, res)
        return newPreference
    } catch (error) {
        console.log(error)
    }
}

const getFeedPay = async(req, res) => {
    try {
        const feed = await getFeedback(req)
        res.status(200).JSON(feed)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getPay, postPay, getFeedPay}