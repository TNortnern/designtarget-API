const Resource = require("../../../models/Resource");
const { validateID, bulkValidateID } = require("../../../helpers");
exports.createResource = async (
  name,
  description,
  image,
  alt,
  category,
  url,
  importance
) => {
  validateID(category);
  // const imageURL = await fileUpload(image);
  image = {
    url: image,
    alt,
  };
  const resource = await new Resource({
    name,
    description,
    category,
    image,
    url,
    importance,
  });
  return resource.save();
};
exports.updateResource = async (
  id,
  name,
  description,
  image,
  alt,
  category,
  url,
  importance
) => {
    if(id) validateID(id)
    if(category) validateID(category)
    const resource = await Resource.findById(id)
  // const imageURL = await fileUpload(image);
  if (name) resource.name = name
  if (description) resource.description = description
  if (image) resource.image.url = image
  if (alt) resource.image.alt = alt
  if (category) resource.category = category
  if (url) resource.url = url
  if (importance) resource.importance = importance
  return resource.save();
};
