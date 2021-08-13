const firstRow = prompt('Введите первую фразу');
const secondRow = prompt('Введите вторую фразу');
const char = prompt('Введите искомый символ');

function getRow(firstRow, secondRow, char) {
    const getRowCharQuantity = function(row) {
        let charQuantity = 0;
        for (let i = 0; i < row.length; i++) {
            if (row.charAt(i) == char) {
                charQuantity++;
            }
        }
        return charQuantity;
    };
    const maxCharRow = 
    getRowCharQuantity(firstRow) < getRowCharQuantity(secondRow) 
    ? 
    secondRow
    : 
    firstRow;
    let result = 'Наибольшее количество символов "' + char + '" во фразе "' + maxCharRow + '" и составляет ' + getRowCharQuantity(maxCharRow);
    alert(result)

    return result
}

function formattedPhone(phone) {
    if (typeof phone == 'number' || typeof phone == 'string') {
        phone = String(phone);
        if (phone.length > 9 && phone.length < 13) {
            let countryCode = '+7'
            if (phone.length == 10) {
                phone = countryCode + phone;
            }
            if (phone.indexOf('8') == 0) {
                phone = phone.replace('8',countryCode);
            }
            let operatorCode = phone.substring(countryCode.length,countryCode.length + 3);
            let clientNumber = phone.replace(countryCode + operatorCode, '');
            let clientNumberFirstPart = clientNumber.substring(0,3);
            let clientNumberSecondPart = clientNumber.substring(3,5);
            let clientNumberThirdPart = clientNumber.substring(5,8);
            let result = 
            countryCode + ' ' 
            + '(' + operatorCode + ')' 
            + ' ' + clientNumberFirstPart 
            + '-' + clientNumberSecondPart 
            + '-' + clientNumberThirdPart;
            console.log(result);
            return result;
        } else {            
            console.log('phone length should be less than 13 and more than 9');
            return false
        }        
    } else {
        console.log('phone should be a "string" or a "number"');
        return false
    }
    
}



window.onload = () => {
    formattedPhone('81234567890');
    formattedPhone('54353');
    formattedPhone('+791234567kk890');
    formattedPhone('+79143326720');
    let result = document.createElement('p');
    result.textContent = getRow(firstRow, secondRow, char);
    document.body.appendChild(result);
}