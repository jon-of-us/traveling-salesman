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
export let dataTrace = 3;
export const radius = 5;
export const lineWidth = 2;

// input
export const maxPoints = 50;
/** min 4 for next neighbor */
export const minPoints = 4;

// stack visual
export const buttonColor = "#353535";
export const stackHeight = new CssValue(40);
export const buttonMargin = new CssValue(5);
export const green = "#00df16";

// stack
export const maxStackLen = 5;
