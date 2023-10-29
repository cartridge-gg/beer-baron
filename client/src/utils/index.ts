export function isValidArray(input: any): input is any[] {
    return Array.isArray(input) && input != null;
}

export const localStartTime = (time: number) => {
    return new Date(time * 1000).toLocaleString();
}

export const getSeedValue = (seed: number, min: number, max: number) => {
    return Math.floor(seed * (max - min + 1) + min);
}

export const starting_seed = 17231239131471;

export function createArrayFromEnum(e: any): Array<{ type: any }> {
    return Object.keys(e)
        .filter(key => !isNaN(Number(e[key]))) // Filter out reverse mappings
        .map(key => ({ type: e[key] }));
}

export function shortenHex(hexString: string, numDigits = 6) {
    if (hexString?.length <= numDigits) {
        return hexString;
    }

    const halfDigits = Math.floor(numDigits / 2);
    const firstHalf = hexString.slice(0, halfDigits);
    const secondHalf = hexString.slice(-halfDigits);
    return `${firstHalf}...${secondHalf}`;
}

export function generateRandomRecipe(seed: string, offset: string) {

    const getValue = (off: string) => {
        return (BigInt(seed) * BigInt(offset) * BigInt(off)) % BigInt(50)
    }

    return {
        101: getValue('17'), 102: getValue('23'), 103: getValue('67'), 104: getValue('123'), 105: getValue('89'), 106: getValue('45')
    };
}