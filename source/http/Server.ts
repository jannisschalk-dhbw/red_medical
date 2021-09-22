import * as https from 'https';
import * as fs from 'fs';
import * as path from "path"

interface Server {
    defaultResponse: string
}

class Server implements Server {

    constructor(defaultResponse: string) {
        this.defaultResponse = defaultResponse;
    }

    options = {
        key: fs.readFileSync(process.env.PWD + path.sep + 'localhost.key'),
        cert: fs.readFileSync(process.env.PWD + path.sep + 'localhost.crt')
    };
      
    start() {
        https.createServer(this.options, (req, res) => {
            res.writeHead(200);
            res.write(this.defaultResponse)
            res.end("\n");
          }).listen(8000);
    }
}

export default Server
