import prettier from "prettier";

import {
  generateCSS,
  GenerateCSSInput,
  generateHTML,
  GenerateHTMLInput,
} from "../functions";

type GeneratePreviewInput = Pick<
  GenerateCSSInput,
  "classPrefix" | "variables"
> &
  Pick<GenerateHTMLInput, "slides" | "infinite">;

function generatePreview({
  classPrefix,
  variables,
  infinite,
  slides,
}: GeneratePreviewInput) {
  return prettier.format(
    /* html */ `
    <html>
      <head>
        <title>Pure CSS Slider Preview</title>
        <style>
          ${generateCSS({
            classPrefix,
            variables,
            minify: false,
          })}
        </style>
      </head>
      <body>
        ${generateHTML({
          classPrefix,
          infinite,
          minify: false,
          slides,
        })}
      </body>
    </html>`,
    { parser: "html" }
  );
}

export { generatePreview };
