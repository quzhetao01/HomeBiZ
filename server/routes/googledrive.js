const express = require('express');
const { google} = require('googleapis');
const path = require('path');
const multer = require('multer');
const stream = require('stream');
const uploadRouter = express.Router();

const upload = multer();

const KEYFILEPATH = path.join(__dirname + "/credentials.json");
const SCOPES = ['https://www.googleapis.com/auth/drive']
const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
})

const uploadFile = async (fileObject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    const {data} = await google.drive({
        version: 'v3',
        auth: auth,
    }).files.create({
        media: {
            mimeType: fileObject.mimetype,
            body: bufferStream,
        },
        requestBody: {
            name: fileObject.original,
            parents: ['1aYqBOzYE8Eahy2WGWjYorJ0aZfTPpbpV']
        },
        fields: 'id,name'
    })
    console.log(data);
    // console.log(`Uploaded file ${data.name} ${data.id}`);
    return data.id;
}

uploadRouter.post("/", upload.any(), async (req, res) => {
    try {
        console.log("body", req.body.file);
        console.log("files", req.files);
        const {body, files} = req;
        // for (let f = 0; f < files.length; f += 1) {
        const imageID = await uploadFile(files[0]);
        // }
        res.status(200).send(imageID);
    } catch (err) {
        console.log(err);
    }
})

uploadRouter.get("/:id", async (req, res) => {
    const drive = google.drive({version: 'v3', auth: auth})
    try {
        const response = await drive.files.get({
            fileId: req.params.id,
            fields: 'webContentLink'
        });
        const imageUrl = response.data.webContentLink;
        res.status(200).send(imageUrl);
    } catch (err) {
        console.log(err);
    }
})

module.exports = uploadRouter;