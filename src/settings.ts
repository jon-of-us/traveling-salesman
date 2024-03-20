import { CssValue } from "./generic_utils/css";

// visual global
export let backgroundColor = getComputedStyle(document.body).getPropertyValue(
    "background-color"
);
export let fontColorTransparent = (alpha: number) =>
    `rgba(220, 220, 220, ${alpha})`;
export let fontColor = fontColorTransparent(1);

// visual canvas
/**how many of the previous data states are shown*/
export const dataTrace = 1;
export const traceFade = 3.5;
export const radius = 5;
export const lineWidth = 2;

// input
export const maxNodes = 80;
export const inputWidth = new CssValue(245);
/** min 4 for next neighbor */
export const minPoints = 4;

// stack visual
export const buttonColor = "#353535";
export const buttonHeight = new CssValue(20);
export const buttonMargin = new CssValue(2);
export const squareButtonSize = new CssValue(40);
export const activeBarColor = "#00df16";
export const inactiveBarColor = buttonColor;

// stack
export const maxStackLen = 5;
export const scrollSpeed = 0.05;

//development
export const debug = true;
