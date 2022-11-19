 ______  ______  ______       ______  __      __  _____   ______  ______    
/\  ___\/\  ___\/\  ___\     /\  ___\/\ \    /\ \/\  __-./\  ___\/\  == \   
\ \ \___\ \___  \ \___  \    \ \___  \ \ \___\ \ \ \ \/\ \ \  __\\ \  __<   
 \ \_____\/\_____\/\_____\    \/\_____\ \_____\ \_\ \____-\ \_____\ \_\ \_\ 
  \/_____/\/_____/\/_____/     \/_____/\/_____/\/_/\/____/ \/_____/\/_/ /_/ 
                                                                            
                                                                            
Utility for producing pure CSS sliders.
The slider will stretch to fit its parent container.

Modify `/input.ts`    to override default parameters.

Run `yarn`            to install dev dependencies + prettier.
Run `yarn start`      to compile to /output folder.

options {
  classPrefix         prefix every class name to uniq-ify them.
  CSSVariables
    color-primary     color of all UI elements.
    margin            space between arrow and thumb track elements.
    thumb-size        size of thumbs and gap between thumbs.
    fade-duration     length of slide transition in seconds.
  minify              whether or not to minify the css + html outputs. They will be prettified by default.
  infinite            whether or not the slides loop infinitely.
}