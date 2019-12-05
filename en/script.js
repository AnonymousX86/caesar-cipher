document.getElementById('cipher-submit').addEventListener('click', cipher);
document.getElementById('cipher-switch').addEventListener('click', cipherSwitch);

var cipherState = 'encrypt';

function cipherSwitch() {
    let cipherSubmitInfo = document.getElementById('cipher-submit');
    if (cipherState == 'encrypt') {
        cipherState = 'decrypt';
        cipherSubmitInfo.textContent = 'Decrypt!';
        console.log('Now decrypting');
        return;
    } else {
        cipherState = 'encrypt';
        cipherSubmitInfo.textContent = 'Encrypt!';
        console.log('Now encrypting');
        return;
    };
};



function cipher() {

    var cipherError = 'Unknown error!';

    let cipherOutput = document.getElementById('cipher-output');
    let cipherInput = document.getElementById('cipher-input').value;
    let cipherInputBox = document.getElementById('cipher-input');
    let cipherNumber = parseInt(document.getElementById('cipher-number').value, 10);
    let cipherNumberBox = document.getElementById('cipher-number');

    function showError() {
        let newError = document.createElement('div');
        newError.classList = 'd-block my-alert absolute-top alert alert-danger';

        let closeButton = document.createElement('a');
        closeButton.setAttribute('href', '#');
        closeButton.classList = 'close';
        closeButton.setAttribute('data-dismiss', 'alert');
        closeButton.setAttribute('aria-label', 'Close');
        closeButton.innerHTML = '&times;';
        newError.appendChild(closeButton);

        let errorText1 = document.createElement('strong');
        errorText1.textContent = 'Warning! ';
        newError.appendChild(errorText1)

        let errorText2 = document.createElement('span');
        errorText2.textContent = cipherError;
        newError.appendChild(errorText2);

        document.getElementById('alerts').appendChild(newError);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    let alfabeth = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
    ];

    cipherInputBox.classList.remove('wrong');
    cipherNumberBox.classList.remove('wrong');

    // is empty
    if ((cipherInput == '') || (cipherInput == ' ')) {
        cipherInputBox.classList.add('wrong');
        cipherError = 'Text area can\'t be empty!';
        showError();
        return;
    };

    // starts with space
    if ((cipherInput.charAt(0) == ' ')) {
        cipherInputBox.classList.add('wrong');
        cipherError = 'Text area can\'t start with space!';
        showError();
        return;
    }

    cipherInput = cipherInput.toUpperCase();

    // contains not specified characters
    for (let i = 0; i < cipherInput.length; i++) {
        if (cipherInput.charAt(i) == ' ') {
            continue;
        } else if (!(alfabeth.includes(cipherInput.charAt(i)))) {
            cipherInputBox.classList.add('wrong');
            cipherError = 'Text area contains unexpected characters!';
            showError();
            return;
        };
    };

    // end with space
    if (cipherInput.charAt((cipherInput.length - 1)) == ' ') {
        cipherInputBox.classList.add('wrong');
        cipherError = 'Text area can\'t end with space!';
        showError();
        return;
    };

    // does not containt number
    if (isNaN(cipherNumber)) {
        cipherNumberBox.classList.add('wrong');
        cipherError = 'No number provided!';
        showError();
        return;
    };

    // number out of range
    if ((cipherNumber < 1) || (cipherNumber > 26)) {
        cipherNumberBox.classList.add('wrong');
        cipherError = 'Number is out of specified index!';
        showError();
        return;
    };

    console.log('Processing text  - ' + cipherInput);
    console.log('With number      - ' + cipherNumber);
    console.log('Type             - ' + cipherState);

    // decrypt
    if (cipherState == 'decrypt') {
        cipherNumber = 26 - cipherNumber;
    };

    let cipherAlfabeth = alfabeth.slice();

    let temp;
    for (let i = 1; i <= cipherNumber; i++) {
        temp = cipherAlfabeth[0];
        cipherAlfabeth.splice(0, 1);
        cipherAlfabeth.push(temp);
    };
    temp = '';

    let cipherOutputText = '';
    let cipherCharIndex = 0;
    for (let i = 0; i < cipherInput.length; i++) {
        if (cipherInput.charAt(i) == ' ') {
            cipherOutputText += ' ';
        } else {
            cipherCharIndex = alfabeth.indexOf(cipherInput.charAt(i));
            cipherOutputText += cipherAlfabeth[cipherCharIndex];
        };
    };
    cipherOutput.textContent = cipherOutputText;
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
};