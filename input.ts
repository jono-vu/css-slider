const slides = [
  `Sample Text`,
  `<img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
      style="width: 100%; height: 100%; object-fit: cover"
    />`,
  `<img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
    />`,
];

const options = {
  classPrefix: "fp-slider-",
  CSSVariables: {
    ["color-primary"]: "black",
    ["margin"]: "10px",
    ["thumb-size"]: "20px",
    ["fade-duration"]: "0.5s",
  },
  minify: false,
  infinite: true,
};

export { slides, options };
