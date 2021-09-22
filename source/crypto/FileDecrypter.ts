import * as path from 'path'
import * as fs from "fs"
import * as crypto from "crypto";

class FileDecrypter {


	algorithm: string = "aes-256-gcm";
	pathSecretKey: string = process.env.PWD + path.sep + "secret.key"
	pathIv: string = process.env.PWD + path.sep + "iv.txt"
	pathEncryptedFile: string = process.env.PWD + path.sep + "secret.enc"


	doDecrypt = () => {
		const secret = fs.readFileSync(this.pathSecretKey)
		const iv = fs.readFileSync(this.pathIv)
		const auth = fs.readFileSync(process.env.PWD + path.sep + "auth.txt")

		// const enc = fs.readFileSync(this.pathEncryptedFile)


		let key = crypto.scryptSync(secret, Buffer.alloc(0), 32);

		const decipher: crypto.DecipherGCM = crypto.createDecipheriv(this.algorithm, key, iv) as crypto.DecipherGCM
		decipher.setAuthTag(auth);

		// TODO: this will cause an error
		// let decrypted = decipher.update(enc, "base64", "utf8");
		// decrypted += decipher.final("utf8");


	}
}

export default FileDecrypter;