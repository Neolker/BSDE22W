// Hlavni funkce, ktera prevede desitkove cislo [number] na cislo o pozadovanem zakladu [base]
function convert(number, base) {

    // Kontrolu vstupu (number: pouze prirozena cisla mensi nez 2^53, base: pouze prirozena cisla v rozsahu 2 az 36)
    if (!(Number.isSafeInteger(number) && number > 0 && Number.isInteger(base) && base >= 2 && base <= 36)) {
        console.log("Chyba: Vstupni cislo neni prirozene cislo mensi nez 2^53 nebo zaklad neni prirozene cislo v rozsahu <2 az 36>!");
        return null;
    }

    let result = "";      // Inicializace a deklarace prazdne promenne typu String
    let reminder = 0;     // Inicializace a deklarace promenne pro ukladani zbytku po deleni (modulo)

    while (number !== 0) {
        reminder = number % base;                     // Hodnota zbytek na dane pozici
        number = parseInt(number / base);             // Pro posun pozice o rad zakladu
        result = numberToASCII(reminder) + result;    // Pridani znaku ze zbytku vlevo k vyledku
    }
    return result;
}

// Pomocna funkce: prevede cislo na znak ASCII
function numberToASCII(code) {
    if (code < 10) {
        return String.fromCharCode(code + 48);    // Plati pro (0 az 9)
    } else {
        return String.fromCharCode(code + 55);    // Plati pro (A az Z)
    }
}

// Vysledky z vystupu v komentarich
console.log(convert(5, 2));       // 101
console.log(convert(7, 2));       // 111
console.log(convert(42, 2));      // 101010
console.log(convert(10, 8));      // 12
console.log(convert(10, 16));     // A
console.log(convert(15, 16));     // F
console.log(convert(42, 16));     // A2
console.log(convert(500, 36));    // DW
