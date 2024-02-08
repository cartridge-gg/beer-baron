export const FIXED_SIZE: bigint = 42535295865117307932921825928971026432n; // 2^125
export const ONE: bigint = 18446744073709551616n; // 2^61
export const PRIME: bigint = 3618502788666131213697322783095070105623107215331596699973092056135872020481n;
export const PRIME_HALF: bigint = PRIME / 2n;

// Converts to a felt representation
export const toFelt = (num: number | bigint): bigint => BigInt(num);

// Converts to Cairo 64.61 representation
export const toFixed = (num: number | bigint): bigint => {
    const res: bigint = BigInt(num) * ONE;
    if (res > FIXED_SIZE || res <= FIXED_SIZE * -1n) throw new Error('Number is out of valid range');
    return toFelt(res);
};

// Negative values are returned by Starknet so no need to wrap
export const fromFixed = (num: bigint): number => {
    let res: bigint = BigInt(num);
    res = res > PRIME_HALF ? res - PRIME : res;
    const int: number = Number(res / ONE);
    const frac: number = Number(res % ONE) / Number(ONE);
    return int + frac;
};

export class Fixed {
    mag: number;
    sign: number;
    size: number;

    constructor(mag: number, sign: number, size: number = 64) {
        if (![64, 128].includes(size)) throw new Error('Invalid size. Must be 64 or 128');
        this.mag = mag;
        this.sign = Number(sign);
        this.size = size;
    }

    static toFixed(input: number | [number, number], size: number = 64): Fixed {
        if (Array.isArray(input)) return new Fixed(input[0], input[1], size);
        return new Fixed(input, 0, size); // Here I've assumed sign as 0, you might need to change this based on your actual requirements.
    }

    valueOf(): number {
        const _value: number = this.mag / 2 ** (this.size === 64 ? 32 : 64);
        return this.sign ? -_value : _value;
    }
}

export default {
    FIXED_SIZE,
    ONE,
    PRIME,
    PRIME_HALF,
    Fixed,
    toFelt,
    toFixed,
    fromFixed,
};
