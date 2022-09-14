export const generateCardNumber = (num) => {
    let arr = [];
    while(arr.length < num){
        const val = Math.floor(Math.random() *  100) + 1;
        if(arr.indexOf(val) === -1) arr.push(val);
    }
    return arr;
}

export const generateCardNumberPairs = (num) => {
    const cardNumArr = generateCardNumber(num);
    let duplicateNumArr = [...cardNumArr, ...cardNumArr];
    duplicateNumArr.sort(() => 0.5 - Math.random());
    return duplicateNumArr.map((item, index) => ({ value: item, id: index}));
}