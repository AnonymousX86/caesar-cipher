document.getElementById('cipher-submit').addEventListener('click', cipher);
document.getElementById('cipher-switch').addEventListener('click', cipherSwitch);

var cipherState = 'encrypt';

function cipherSwitch() {
    let cipherSubmitInfo = document.getElementById('cipher-submit');
    if (cipherState == 'encrypt') {
        cipherState = 'decrypt';
        cipherSubmitInfo.textContent = 'Deszyfruj!';
        console.log('Now decrypting');
        return;
    } else {
        cipherState = 'encrypt';
        cipherSubmitInfo.textContent = 'Szyfruj!';
        console.log('Now encrypting');
        return;
    };
};



function cipher() {

    var cipherError = 'Nieznany błąd!';

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
        closeButton.setAttribute('aria-label', 'Zamknij');
        closeButton.innerHTML = '&times;';
        newError.appendChild(closeButton);

        let errorText1 = document.createElement('strong');
        errorText1.textContent = 'Uwaga! ';
        newError.appendChild(errorText1)

        let errorText2 = document.createElement('span');
        errorText2.textContent = cipherError;
        newError.appendChild(errorText2);

        document.getElementById('alerts').appendChild(newError);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    let alfabeth = [
        'A',
        'Ą',
        'B',
        'C',
        'Ć',
        'D',
        'E',
        'Ę',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'Ł',
        'M',
        'N',
        'Ń',
        'O',
        'Ó',
        'P',
        'Q',
        'R',
        'S',
        'Ś',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        'Ź',
        'Ż'
    ];

    cipherInputBox.classList.remove('wrong');
    cipherNumberBox.classList.remove('wrong');

    // jest puste
    if ((cipherInput == '') || (cipherInput == ' ')) {
        cipherInputBox.classList.add('wrong');
        cipherError = 'Pole tekstowe nie może być puste!';
        showError();
        return;
    };

    // zaczyna się spacją
    if ((cipherInput.charAt(0) == ' ')) {
        cipherInputBox.classList.add('wrong');
        cipherError = 'Pole tekstowe nie może zaczynać się spacją!';
        showError();
        return;
    }

    cipherInput = cipherInput.toUpperCase();

    // zawiera cyfry
    for (let i = 0; i < cipherInput.length; i++) {
        if (cipherInput.charAt(i) == ' ') {
            continue;
        } else if (!(alfabeth.includes(cipherInput.charAt(i)))) {
            cipherInputBox.classList.add('wrong');
            cipherError = 'Pole tekstowe zawiera niedozwolone znaki!';
            showError();
            return;
        };
    };

    // kończy się spacją
    if (cipherInput.charAt((cipherInput.length - 1)) == ' ') {
        cipherInputBox.classList.add('wrong');
        cipherError = 'Pole tekstowe nie może kończyć się spacją!';
        showError();
        return;
    };

    //nie zawiera liczby
    if (isNaN(cipherNumber)) {
        cipherNumberBox.classList.add('wrong');
        cipherError = 'Nie podano liczby!';
        showError();
        return;
    };

    // jest zbyt duża lub zbyt mała
    if ((cipherNumber < 1) || (cipherNumber > 35)) {
        cipherNumberBox.classList.add('wrong');
        cipherError = 'Podana liczba jest spoza zakresu!';
        showError();
        return;
    };

    console.log('Processing text  - ' + cipherInput);
    console.log('With number      - ' + cipherNumber);
    console.log('Type             - ' + cipherState);

    // deszyfrowanie
    if (cipherState == 'decrypt') {
        cipherNumber = 35 - cipherNumber;
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