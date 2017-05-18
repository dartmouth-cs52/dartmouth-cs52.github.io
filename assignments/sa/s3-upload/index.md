---
layout: page
title: SA9 - Uploading images to S3
published: true
---

![AWS S3](http://i.imgur.com/FBAnSyZ.png)

### Overview

Today we'll be learning how to directly upload images to Amazon Web Services Simple Storage Service (S3) on our blog application from Lab 4 and 5. We will be implementing a nice image input for handling image uploads and then these images will directly be uploaded to S3.

Amazon S3 is a popular and reliable storage option for storing files such as images, documents, and videos. By uploading directly to S3, we can reduce server load because our server load no longer needs to handle receiving images from the client. When handling large images, our service will not be able to respond to other web requests as efficiently.


#### Code Flow

In general, the method described in this article follows these simple steps:

- A file is selected for upload by the user in the client;
- The client makes a request to your server, which produces a temporary signature with which to sign the upload request;
- The browser then uploads the file directly to Amazon S3 using the signed request


### Setup

#### S3 Setup

🚀 Setup S3 with Heroku by following this [guide](https://devcenter.heroku.com/articles/s3#s3-setup).

You will now need to edit some of the permissions properties of the target S3 bucket so that the final request has sufficient privileges to write to the bucket. In a web-browser, sign in to the AWS console and select the S3 section. Select the appropriate bucket (or create a new one) and click the ‘Properties’ tab. Select the Permissions section and three options are provided (Add more permissions, Edit bucket policy and Edit CORS configuration).

CORS (Cross-Origin Resource Sharing) will allow your application to access content in the S3 bucket. Each rule should specify a set of domains from which access to the bucket is granted and also the methods and headers permitted from those domains.

![](https://s3.amazonaws.com/heroku-devcenter-files/article-images/2009-imported-1443570539-2009-imported-1443555008-cors1.png)

Locating the ‘Properties’ tab and CORS configuration editor
For this to work in your application, click ‘Add CORS Configuration’ and enter the following XML:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
 <CORSRule>
      <AllowedOrigin>*</AllowedOrigin>
      <AllowedMethod>GET</AllowedMethod>
      <AllowedMethod>POST</AllowedMethod>
      <AllowedMethod>PUT</AllowedMethod>
      <AllowedHeader>*</AllowedHeader>
  </CORSRule>
</CORSConfiguration>
```

🚀 Click 'Save’ in the CORS window and then 'Save’ again in the bucket’s 'Properties’ tab.

This tells S3 to allow any domain access to the bucket and that requests can contain any headers, which is generally fine for testing. When deploying, you should change the 'AllowedOrigin’ to only accept requests from your domain.


#### Heroku Setup

Make a `.env` file in your root directory of your **server**. It should look something like this.

```bash
AWS_ACCESS_KEY_ID=YOUR_KEY_HERE
AWS_SECRET_ACCESS_KEY=YOUR_KEY_HERE
S3_BUCKET=YOUR_BUCKET_NAME_HERE
```

###### Remember to add the `.env` file to your `.gitignore`, since this file should only be used for local testing.

In order for your application to access the AWS credentials for signing upload requests, they will need to be added as configuration variables in Heroku. You can add these environment variables to Heroku for use on your server by running the following command for each of your variables, or you can log into Heroku dashboard and add them there.

```bash
$ heroku config:set AWS_ACCESS_KEY_ID=YOUR_KEY_HERE
```

We set all of these secret keys in a config variable because we don't want to expose these variables directly in code, where they could be potentially stolen.


### Direct Uploading


#### File input component

We need to add some JSX to our frontend in both the `newPost` component and `post` component that allows us to upload images for our cover image.

```javascript
<img id="preview" alt="preview" src={this.state.preview} />
<input type="file" name="coverImage" onChange={this.onImageUpload} />
```

This is the base JSX you would need, you should definitely revamp this to make this look nicer. The `preview` element shows a preview of the new image you just added after you choose it. We have a function `onImageUpload` that handles our input.

```javascript
onImageUpload(event) {
  const file = event.target.files[0];
  // Handle null file
  // Get url of the file and set it to the src of preview
}
```

You can also use external react components such as [react-dropzone](https://react-dropzone.netlify.com/)

#### Redux Actions

Since our post creation no longer relies on the `cover_url` field, we also need to modify the actions that we are calling. We are going to introduce some new actions to get a signed request and upload our image.

However, first let's create a couple of helper functions that are *not* actionCreators:

```javascript
function getSignedRequest(file) {
  const fileName = encodeURIComponent(file.name);
  return axios.get(`${ROOT_URL}/sign-s3?file-name=${fileName}&file-type=${file.type}`);
}
```

```javascript
function uploadFileToS3(signedRequest, file, url) {
  return (dispatch) => {
    return new Promise((fulfill, reject) => {
      axios.put(signedRequest, file, { headers: { 'Content-Type': file.type } }).then((response) => {
        fulfill(url);
      }).catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  };
}
```

We have two helper functions, `getSignedRequest` and `uploadFileToS3` that each return a promise. The reason why we have this pattern is that `uploadFileToS3` requires `getSignedRequest` to return a success call. These functions are used by `uploadCoverImage` which also returns a promise.

```javascript
export function uploadCoverImage(file) {
  return (dispatch) => {
    return getSignedRequest(file).then(
      response => dispatch(uploadFileToS3(response.data.signedRequest, file, response.data.url)),
      error => console.log(error),
    );
  };
}
```

We use our new action `uploadCoverImage` in our `createPostHandler`. Since this action is a promise, we can chain the `uploadCoverImage` action and our original `createPost` or `updatePost` actions. We use promises to chain because we need the image to successfully upload to S3 first, before we can add it to our post.

#### Server

We need some new packages to communicate with s3. `aws-sdk` is used to communicate with s3  and `dotenv` is used to load environment variables from `.env` for your server.

```bash
npm install --save aws-sdk dotenv
```

To setup `dotenv`, we want to call `dotenv.config({ silent: true });` as early as possible in our `server.js`. Then we can access our environment variables by using `process.env.S3_BUCKET`.

We also need a new route on our server to return our signedRequest. Make a new folder under app called `services`, and add a new `s3.js` file.

```javascript

const s3Upload = (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: process.env.S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  };
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    };
    return (res.send(JSON.stringify(returnData)));
  });
};

export default s3Upload;
```

Now in your router, we can add a new route

```javascript
router.get('/sign-s3', (req, res) => {
  s3Upload(req, res);
});
```

#### Required Features

- Add the image upload ability to create post and update post.
- Support the ability to use both URLs and Image Files (what should happen when the user fills out both of these fields)
- Add a route on the backend to return signed requests


#### To Turn In

- github url to your repo

###### Additional Readings

* [Heroku Direct to S3 File Upload](https://devcenter.heroku.com/articles/s3-upload-node)
* [Heroku S3 Setup](https://devcenter.heroku.com/articles/s3)
* [Dotenv Docs](https://github.com/motdotla/dotenv)

###### Footnote
* Ask Jason Feng on slack with any comments, questions, or suggestions!
