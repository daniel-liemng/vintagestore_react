// helper functions
// import url from "./URL";

// image
// flatten
export const flattenProducts = data => {
  return data.map(item => {
    // cloudinary
    let image = item.image.url;

    // local setup, no deployment
    // let image = `${url}${item.image.url}`;
    return { ...item, image };
  });
};

// featured
export const featuredProducts = data => {
  return data.filter(item => {
    return item.featured === true;
  });
};
