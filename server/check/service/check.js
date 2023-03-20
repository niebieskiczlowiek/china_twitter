const check = async (req, res) => {
    const data = req.body;

    console.log(data)
    
    console.log("Connection works!");

    return res.status(200).json({ success: true });
};

module.exports = {
    check,
};