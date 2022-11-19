import prettier from "prettier";

interface GenerateCSSInput {
  minify?: boolean;
  classPrefix: string;
  variables?: {
    ["color-primary"]: string;
    ["margin"]: string;
    ["thumb-size"]: string;
    ["fade-duration"]: string;
  };
}

function generateCSS(input: GenerateCSSInput) {
  const classPrefix = input.classPrefix;

  const variables = {
    ["color-primary"]: "black",
    ["margin"]: "10px",
    ["thumb-size"]: "20px",
    ["fade-duration"]: "0.5s",
    ...input.variables,
  };

  const varIdentifiers = {
    ["--color-primary"]: `--${classPrefix}color-primary`,
    ["--margin"]: `--${classPrefix}margin`,
    ["--thumb-size"]: `--${classPrefix}thumb-size`,
    ["--transition"]: `--${classPrefix}transition`,

    ["--slider-width"]: `--${classPrefix}slide-width`,
    ["--slider-height"]: `--${classPrefix}slider-height`,
  };

  const styles = /* css */ `
  :root {
    ${varIdentifiers["--color-primary"]}: ${variables["color-primary"]};

    ${varIdentifiers["--margin"]}: ${variables["margin"]};
    ${varIdentifiers["--thumb-size"]}: ${variables["thumb-size"]};

    ${varIdentifiers["--transition"]}: transform ${variables["fade-duration"]} ease-out;

    /* private vars */
    ${varIdentifiers["--slider-width"]}: 100%;
    ${varIdentifiers["--slider-height"]}: 100%;
  }

  .${classPrefix}slider-window {
    position: relative;
    overflow: hidden;

    width: var(${varIdentifiers["--slider-width"]});
    height: var(${varIdentifiers["--slider-height"]});
  }

  .${classPrefix}slider-window > .${classPrefix}slides {
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: var(${varIdentifiers["--thumb-size"]});
  }

  .${classPrefix}slider-window > .${classPrefix}slides > .${classPrefix}slide {
    position: absolute;
    transform: translateX(-100%);
    z-index: -1;

    width: var(${varIdentifiers["--slider-width"]});
    height: var(${varIdentifiers["--slider-height"]});

    display: inline-flex;
    justify-content: center;
    align-items: center;

    transition: var(${varIdentifiers["--transition"]});
  }

  .${classPrefix}slider-window > .${classPrefix}slides > .${classPrefix}thumb {
    all: unset;
    z-index: 1;
    position: relative;

    height: var(${varIdentifiers["--thumb-size"]});
    width: var(${varIdentifiers["--thumb-size"]});

    margin-bottom: var(${varIdentifiers["--thumb-size"]});
  }

  .${classPrefix}slider-window > .${classPrefix}slides > .${classPrefix}thumb::after {
    content: "";
    display: block;
    position: absolute;

    height: 100%;
    width: 100%;

    box-sizing: border-box;
    background: var(${varIdentifiers["--color-primary"]});
    border-radius: 100%;

    opacity: 0.2;
    transition: opacity 0.1s ease;
  }

  .${classPrefix}slider-window > .${classPrefix}slides > .${classPrefix}thumb:checked::after {
    opacity: 1;
  }

  .${classPrefix}slider-window > .${classPrefix}slides > .${classPrefix}thumb:checked ~ .${classPrefix}slide {
    transform: translateX(100%);
  }

  .${classPrefix}slider-window > .${classPrefix}slides > .${classPrefix}thumb:checked + .${classPrefix}arrow + .${classPrefix}slide {
    transform: translateX(0%);
  }

  .${classPrefix}slider-window > .${classPrefix}slides > .${classPrefix}arrow {
    position: absolute;

    display: flex;
    justify-content: center;
    align-items: center;

    left: 0;
    padding: 0 var(${varIdentifiers["--margin"]});

    height: 100%;
  }

  .${classPrefix}slider-window > .${classPrefix}slides > .${classPrefix}arrow:hover::before {
    content: "";
    position: absolute;

    width: 100%;
    height: 100%;

    background: var(${varIdentifiers["--color-primary"]});
    opacity: 0.1;
  }

  .${classPrefix}slider-window > .${classPrefix}slides > .${classPrefix}thumb:checked ~ .${classPrefix}arrow {
    display: none;
  }

  .${classPrefix}slider-window > .${classPrefix}slides > .${classPrefix}thumb:focused + .${classPrefix}arrow {
    display: none;
  }

  .${classPrefix}slider-window
    > .${classPrefix}slides
    > .${classPrefix}thumb:checked
    + .${classPrefix}arrow
    + .${classPrefix}slide
    + .${classPrefix}thumb
    + .${classPrefix}arrow {
    left: auto;
    display: flex;

    right: 0;
  }

  .${classPrefix}slider-window > .${classPrefix}slides > .${classPrefix}arrow::after,
  .${classPrefix}slider-window
    > .${classPrefix}slides
    > .${classPrefix}thumb:checked
    + .${classPrefix}arrow
    + .${classPrefix}slide
    + .${classPrefix}thumb
    + .${classPrefix}arrow::after {
    padding: var(${varIdentifiers["--margin"]});
    color: var(${varIdentifiers["--color-primary"]});
  }

  .${classPrefix}slider-window > .${classPrefix}slides > .${classPrefix}arrow::after {
    font-size: var(${varIdentifiers["--thumb-size"]});

    content: "◀";
  }

  .${classPrefix}slider-window
    > .${classPrefix}slides
    > .${classPrefix}thumb:checked
    + .${classPrefix}arrow
    + .${classPrefix}slide
    + .${classPrefix}thumb
    + .${classPrefix}arrow::after {
    content: "▶";
  }
`;

  return input.minify
    ? minifyCSS(styles)
    : prettier.format(styles, { parser: "css" });
}

export { generateCSS };
export type { GenerateCSSInput };

function minifyCSS(css: string) {
  return css
    .replace(/([^0-9a-zA-Z\.#])\s+/g, "$1")
    .replace(/\s([^0-9a-zA-Z\.#]+)/g, "$1")
    .replace(/;}/g, "}")
    .replace(/\/\*.*?\*\//g, "");
}
