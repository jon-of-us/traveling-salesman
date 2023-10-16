export function mod(n: number, modulo: number) {
    return (n % modulo + modulo) % modulo
}