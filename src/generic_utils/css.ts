export class CssValue {
    private value: number;

    constructor(value: number) {
        this.value = value;
    }

    add(value: number | CssValue): CssValue {
        if (value instanceof CssValue) {
            return new CssValue(this.value + value.value);
        }
        return new CssValue(this.value + value);
    }

    subtract(value: number | CssValue): CssValue {
        if (value instanceof CssValue) {
            return new CssValue(this.value - value.value);
        }
        return new CssValue(this.value - value);
    }

    multiply(value: number | CssValue): CssValue {
        if (value instanceof CssValue) {
            return new CssValue(this.value * value.value);
        }
        return new CssValue(this.value * value);
    }

    divide(value: number | CssValue): CssValue {
        if (value instanceof CssValue) {
            return new CssValue(this.value / value.value);
        }
        return new CssValue(this.value / value);
    }

    px() {
        return `${this.value}px`;
    }
    percent() {
        return `${this.value}%`;
    }
    rem() {
        return `${this.value}rem`;
    }
}
