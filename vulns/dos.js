const express = require("express");
const router = express.Router();

router.post("/list-users", (req, res) => {
    var obj = req.body.users;
    var someArr = [];

    // Potential DoS if obj.length is large.
    for (var item of obj) {
        someArr.push(item);
    }

    //doing something with the code
    res.send(someArr.join(","));
});

module.exports = router;
