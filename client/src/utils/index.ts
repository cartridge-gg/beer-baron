export function isValidArray(input: any): input is any[] {
    return Array.isArray(input) && input != null;
}

export const localStartTime = (time: number) => {
    return new Date(time * 1000).toLocaleString();
}