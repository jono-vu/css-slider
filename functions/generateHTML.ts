import prettier from "prettier";

interface GenerateHTMLInput {
  slides: string[];
  minify?: boolean;
  infinite?: boolean;
  classPrefix: string;
}

function generateHTML(input: GenerateHTMLInput) {
  const infinite = input.infinite;
  const classPrefix = input.classPrefix;
  const slides = input.slides;

  const HTML = /* html */ `
    <div class="${classPrefix}slider-window">
      <div class="${classPrefix}slides">
        ${
          infinite /* html */
            ? `<label for="${slides.length}" class="${classPrefix}arrow"></label>`
            : ""
        }

        ${slides
          .map((slide, i) => {
            return /* html */ `
              <input 
                type="radio" 
                class="${classPrefix}thumb" 
                id="${i + 1}" 
                name="${classPrefix}thumb-track" 
                ${i === 0 ? "checked" : ""} 
              />
              <label 
                for="${i + 1}" 
                class="${classPrefix}arrow"></label>
              <div class="${classPrefix}slide">
                ${slide}
              </div>
          `;
          })
          .join("")}

        ${
          infinite /* html */
            ? `<input class="${classPrefix}thumb" hidden /><label for="1" class="${classPrefix}arrow"></label>`
            : ""
        }
      </div>
    </div>
  `;

  return input.minify
    ? minifyHTML(HTML)
    : prettier.format(HTML, { parser: "html" });
}

export { generateHTML };
export type { GenerateHTMLInput };

function minifyHTML(html: string) {
  return html
    .replace(/\>[\r\n ]+\</g, "><")
    .replace(/(<.*?>)|\s+/g, (m, $1) => ($1 ? $1 : " "))
    .trim();
}
