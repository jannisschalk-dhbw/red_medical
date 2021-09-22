"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
class FileDecrypter {
    constructor() {
        this.algorithm = "aes-256-gcm";
        this.pathSecretKey = process.env.PWD + path.sep + "secret.key";
        this.pathIv = process.env.PWD + path.sep + "iv.txt";
        this.pathEncryptedFile = process.env.PWD + path.sep + "secret.enc";
        this.doDecrypt = () => {
            const secret = fs.readFileSync(this.pathSecretKey);
            const iv = fs.readFileSync(this.pathIv);
            const auth = fs.readFileSync(process.env.PWD + path.sep + "auth.txt");
            // const enc = fs.readFileSync(this.pathEncryptedFile)
            let key = crypto.scryptSync(secret, Buffer.alloc(0), 32);
            const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
            decipher.setAuthTag(auth);
            // TODO: this will cause an error
            // let decrypted = decipher.update(enc, "base64", "utf8");
            // decrypted += decipher.final("utf8");
        };
    }
}
exports.default = FileDecrypter;
