const whiteList = ["http://localhost:3000"];

const corsOptions = (req, callback) => {
    let corsOptions;

    console.log(req.header("Origin")); // Origin başlığını konsola yazdır

    if (whiteList.indexOf(req.header("Origin")) !== -1) {
        corsOptions = { origin: true };
    } else {
        corsOptions = { origin: false };
    }

    callback(null, corsOptions);
};

module.exports = corsOptions;