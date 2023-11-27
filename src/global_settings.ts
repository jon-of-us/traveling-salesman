export let backgroundColor = getComputedStyle(document.body).getPropertyValue(
    "background-color"
);

export let fontColorTransparent = (alpha: number) =>
    `rgba(220, 220, 220, ${alpha})`;
export let fontColor = fontColorTransparent(1);

/**how many of the previous data states are shown*/
export let dataTrace = 3;
