const { Router } = require("express");

const routes = Router();

routes.get("/",(req,res) => {
    return res.send("0");
});

module.exports = routes;