export function padStart(number:number, padValue ? : string, times ? : number){
    return number.toString().padStart(times || 1,padValue || '0');
}