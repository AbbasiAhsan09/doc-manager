export function generateRandomString(length : number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
                                             charactersLength));
    }
    return result;
}

export function addLeadingZeros(zeros:number, num:number) {
  return num.toString().padStart(zeros+1, '0');
}