const fs = require("fs");
const path = require("path");
const imgur = require("imgur-module");
const unique = new Date().getTime().toString();
const mongoose = require("mongoose");

// intilize client id
imgur.setClientId(process.env.IMGUR_CLIENT_ID);

const fileURL = (filename) => {
  return process.env.PRODUCTION_APP_URL + "/images/" + unique + filename;
};
/**
 * @param {string} id Pass the ID you want validated by MongoDB
 * @returns error if id not valid and returns nothing if it is
 */
exports.validateID = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid ID");
};

/**
 * @param {array} ids Pass the IDs you want validated by MongoDB
 * @returns error if id not valid and returns nothing if they are
 */
exports.bulkValidateID = ids => {
  console.log('ids', ids)
  ids.forEach(id => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error(`Invalid ID: ${id}`);
  });
};

/**
 * @param {file} file Pass a file you want uploaded to imgur
 * @returns the file URL if successful but returns error if not
 */
exports.fileUpload = async (file) => {
  const imageURL = await upload(file);
  // uploading image file
  let imgurURL = "";
  let error = false;
  await imgur
    .uploadImgur(imageURL)
    .then(({ success, url }) => {
      if (success) imgurURL = url;
      else {
        error = true;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  if (error) {
    throw new Error("Error Uploading");
  }
  return imgurURL;
};
/** @param {array} images
 *  @returns {array} returns array of links
 *  @description Takes multiple images, uploads them to imgur then returns the links as an array
 *
 */
exports.multiFileUpload = async (images) => {
  let imageNames = [];
  let error = false;
  for await (const image of images) {
    const imageURL = await upload(image);
    await imgur
      .uploadImgur(imageURL)
      .then(({ success, url, message }) => {
        if (success) imageNames = [...imageNames, url];
        else {
          console.log(success);
          console.log(message);
          error = true;
        }
        console.log(url);
      })
      .catch((err) => {
        console.log(err);
      });
    if (error) {
      throw new Error("Error Uploading");
    }
  }
  if (error) imageNames = [];
  // Image Parse End
  return imageNames;
};

const upload = async (file) => {
  const { filename, mimetype, createReadStream } = await file;
  let getFileURL = "";
  await new Promise((res) =>
    createReadStream()
      .pipe(
        fs.createWriteStream(
          path.join(__dirname, "../public/images/", unique + filename)
        )
      )
      .on("close", res)
  )
    .then(() => {
      getFileURL = fileURL(filename);
    })
    .catch((err) => {
      throw new Error("Error uploading image");
    });

  return getFileURL;
};
