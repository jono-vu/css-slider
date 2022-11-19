import fs from "fs";
import prettier from "prettier";

import { generateCSS, generateHTML } from "./functions";
import { options, slides } from "./input";

fs.writeFileSync(
  "./output/compiled.css",
  generateCSS({
    classPrefix: options.classPrefix,
    variables: options.CSSVariables,
    minify: options.minify,
  }),
  "utf8"
);

fs.writeFileSync(
  "./output/compiled.html",
  generateHTML({
    classPrefix: options.classPrefix,
    infinite: options.infinite,
    minify: options.minify,
    slides,
  }),
  "utf8"
);

fs.writeFileSync(
  "./output/preview.html",
  prettier.format(
    /* html */ `
    <html>
      <head>
        <title>Pure CSS Slider Preview</title>
        <style>
          ${generateCSS({
            classPrefix: options.classPrefix,
            variables: options.CSSVariables,
            minify: options.minify,
          })}
        </style>
      </head>
      <body>
        ${generateHTML({
          classPrefix: options.classPrefix,
          infinite: options.infinite,
          minify: options.minify,
          slides,
        })}
      </body>
    </html>`,
    { parser: "html" }
  ),
  "utf8"
);

console.log(`CSS ${getFileSizeKB("./output/compiled.css")} KB`);
console.log(`HTML ${getFileSizeKB("./output/compiled.html")} KB`);
console.log(`Preview "./output/preview.html"`);

function getFileSizeKB(path: string) {
  return (fs.statSync(path).size / 1024).toPrecision(2);
}
