"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
const fs = require("fs");
const path = require("path");
class Server {
    constructor(defaultResponse) {
        this.options = {
            key: fs.readFileSync(process.env.PWD + path.sep + 'localhost.key'),
            cert: fs.readFileSync(process.env.PWD + path.sep + 'localhost.crt')
        };
        this.defaultResponse = defaultResponse;
    }
    start() {
        console.log("server --- " + this.defaultResponse);
        https.createServer(this.options, (req, res) => {
            res.writeHead(200);
            res.write(this.defaultResponse);
            res.end("\n");
        }).listen(8000);
    }
}
exports.default = Server;
