export function isValidArray(input: any): input is any[] {
    return Array.isArray(input) && input != null;
}
