export function firstLettersUpperCase(str: string): string {
    /* Makes first letter in every word of string upper case */
    return str.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
}