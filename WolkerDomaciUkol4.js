// Vstupni objekt s parametry pro funkci main()
const dtoIn = {
  count: 10,
  age: {
    min: 20,
    max: 60
  }
};

// Hlavni funkce
function main(dtoIn) {
  let employeeList = generateEmployeeList(dtoIn); // Nejprve vygeneruji seznam zamestnancu pomoci Domaciho ukolu 3

  // Inicializace a deklarace vystupniho objektu ve formatu podle zadani, ktery budu plnit vysledky
  const dtoOut = {
    total: employeeList.length,  // Pocet zamestnancu muzeme zjistit hned bez prochazeni seznamu
    workload10: 0, workload20: 0, workload30: 0, workload40: 0,
    averageAge: 0, minAge: 0, maxAge: 0, medianAge: 0,
    medianWorkload: 0, averageWomenWorkload: 0,
    sortedByWorkload: employeeList.sort((a, b) => a.workload - b.workload)  // A rovnou si zamestnance seradim podle uvazku, to se bude hodit pro vypocet medianu pozdeji
  };

  let sumAge = 0; // Pomocna promenna pro nasledny vypocet prumerneho veku

  // Deklarace pomocnych promennych pro MIN a MAX
  let minAge = +Infinity;  // Nekonecna zde pouzivam jako trik pro porovnani veku
  let maxAge = -Infinity;  // pozdeji pri prochazeni seznamu zamestnancu

  // Pomocne pole pro vypocty medianu
  const ageListUnsorted = [];
  const workloadListSorted = [];  // Protoze jsem si seradil zamestnance hned na zacatku 

  // Pomocne promenne pro vypocet prumerneho uvazku zen
  let sumWomanWorkload = 0;  // Soucet vsech uvazku zen
  let countWomen = 0;  // Soucet vsech zen ze seznamu

  // Hlavni smycka pro prochazeni vsech zamestnancu ze seznamu
  for (let i = 0; i < dtoOut.total; i++) {

    // Pocitani jednotlivych uvazku
    switch (employeeList[i].workload) {
      case 10:
        dtoOut.workload10++;
        break;  // Aby se nepokracovalo na dalsi case

      case 20:
        dtoOut.workload20++;
        break;

      case 30:
        dtoOut.workload30++;
        break;

      case 40:
        dtoOut.workload40++;
        break;  // Just in case :)
    }

    let age = getAge(employeeList[i].birthdate);  // Pomocna lokalni promenna pro zjisteni veku zamestnance z datumu narozeni

    // Pokud je vek zamesntance z aktualni iterace mensi nez minAge, tak ho prirad jako nejmensi do minAge
    if (age < minAge) {  // Protoze jsem si deklarovan do minAge +Nekonecno, tak se pri prvnim iteraci smycky vzdy priradi aktualni vek
      minAge = age;
    }

    // Obdobne pro maximalni vek
    if (age > maxAge) {
      maxAge = age;
    }

    sumAge += age;  // Zaroven si scitam jednotlive veky pro pozdejsi vypocet prumerneho veku

    ageListUnsorted.push(age);  // Pro pozdejsi vypocet medianu veku (pozor, pole veku neni serazeny pro vypocet medianu)
    workloadListSorted.push(employeeList[i].workload);  // Obdobne plnim i pole pro vypocet medianu uvazku, ktere bude uz serazene

    // Nakonec potrebuji jeste zjistit dva udaje ciste pro zeny pro vypocet jejich prumerneho uvazku
    if (employeeList[i].gender === "female") {
      sumWomanWorkload += employeeList[i].workload;  // Postupny soucet vsech uvazku zen
      countWomen++;  // Zvys pocet zen o +1
    }
  }  // Konec hlavni for smycky pro prochazeni zamestnancu

  dtoOut.averageAge = parseFloat((sumAge / dtoOut.total).toFixed(1));  // Prumerny vek zaokrouhleny na jedno desetinne misto (.toFixed(1) vraci String, proto bylo potreba opet prevest na Float)

  dtoOut.minAge = minAge;  // Prirazeni min. veku do vystupniho objektu
  dtoOut.maxAge = maxAge;  // Prirazeni max. veku
  
  const ageListSorted = ageListUnsorted.sort((a, b) => a - b);  // Pro vypocet medianu veku je potreba seznam nejprve seradit
  dtoOut.medianAge = getMedian(ageListSorted);  // Vypocet medianu pomoci funkce ze serazeneho pole veku
  
  dtoOut.medianWorkload = getMedian(workloadListSorted);  // Median uvazku (zde mam uz jisotu serazeni pole ze serazeneho seznamu zamestnancu, takze usetrim jedno serazeni pole :) )

  dtoOut.averageWomenWorkload = Math.round(sumWomanWorkload / countWomen);  // Zaokrouhleny prumerny uvazek zen na cele cislo

  return dtoOut;  // Vystup hlavni funkce main
}

// Volani hlavni funkce
console.log(main(dtoIn));

// Pomocna funkce pro ziskani veku z datumu narozeni s presnosti na den
function getAge(dateISOString) {
  const today = new Date();  // Dnesni datum
  const birthdate = new Date(dateISOString);  // Prevod z ISO String formatu, aby se s datumem lepe pracovalo

  let age = today.getFullYear() - birthdate.getFullYear();  // Ziska priblizny vek odectenim roku

  // Jeste je potreba osetrit, jestli uz letos zamestnanec slavil narozeniny nebo ne:
  const monthDiff = today.getMonth() - birthdate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
    age--;  // Pokud zamestnanec letos jeste nemel narozeniny, tak odecteme 1 rok z veku
  }

  return age;  // Navratova hodnota pomocne funkce (cele cislo)
}

// Vypocet medianu ze SERAZENEHO listu - zde vyzivam toho, ze jsem si hned na zacatku seradil zamestnance podle workloadu
function getMedian(listSorted) {
  const middle = Math.floor(listSorted.length / 2);  // Index prostredniho prvku pole (nebo o jeden vice u sudeho poctu)
  if (listSorted.length % 2) {  // Podminka plati jen pro lichou velikost pole (napr. 3 % 2 = 1)
    return listSorted[middle];  // Pokud je lichy pocet prvku, tak vrati prostredni prvek ze serazeneho pole
  }
  return (listSorted[middle - 1] + listSorted[middle]) / 2; // Pripadne pro sudy pocet prvku se vrati aritmeticky prumer dvou prvku uprostred pole
}

// =======| KONEC KODU Z DOMACIHO UKOLU 4 |=======

// Pomocna funkce pro generovani zamestancu z Domaciho Ukolu 3
function generateEmployeeList(dtoIn) {
  // Nejprve validace vstupnich parametru z objektu [dtoIn]:
  if (!(Number.isInteger(dtoIn.count) && dtoIn.count > 0)) {  // Validace vstupniho parametru [count] ze je prirozene cislo
    console.log("Chyba: Vstupni parametr @count neni prirozene cislo!");
    return null;  // Vrati null a ukonci funkci/program

  } else if (!(Number.isInteger(dtoIn.age.min) && dtoIn.age.min > 0)) {  // Validace vstupniho parametru [age.min] ze je prirozene cislo
    console.log("Chyba: Vstupni parametr [age.min] neni prirozene cislo!");
    return null;  // Vrati null a ukonci funkci/program

  } else if (!(Number.isInteger(dtoIn.age.max) && dtoIn.age.max > 0)) {  // Validace vstupniho parametru [age.max] ze je prirozene cislo
    console.log("Chyba: Vstupni parametr [age.max] neni prirozene cislo!");
    return null;  // Vrati null a ukonci funkci/program

  } else if (dtoIn.age.max > 100) {  // Validace vstupniho parametru [age.max] ze je mensi nebo rovno 100 - komu by se chtelo delat po 100 :)
    console.log("Chyba: Vstupni parametr [age.max] je vetsi nez 100!");
    return null;  // Vrati null a ukonci funkci/program

  } else if (dtoIn.age.min > dtoIn.age.max) {  // Validace vstupnich parametru ze plati [age.min] < [age.max]
    console.log("Chyba: Vstupni parametr [age.min] neni mensi nez [age.max]!");
    return null;  // Vrati null a ukonci funkci/program
  }

  // Nasleduji pole statickych dat pro nahodne generovani udaju zamestnancu
  const genderList = ["male", "female"];

  const nameMaleList = ["Jiří", "Jan", "Petr", "Josef", "Pavel", "Martin", "Jaroslav", "Tomáš", "Miroslav", "Zdeněk", "František", "Václav", "Michal", "Milan", "Karel", "Jakub", "Lukáš", "David", "Vladimír", "Ondřej", "Ladislav", "Roman", "Stanislav", "Marek", "Daniel", "Radek", "Antonín", "Vojtěch", "Filip", "Adam", "Matěj", "Miloslav", "Aleš", "Jaromír", "Dominik", "Libor", "Patrik", "Vlastimil", "Jindřich", "Miloš", "Oldřich", "Lubomír", "Rudolf", "Ivan", "Štěpán", "Luboš", "Robert", "Radim", "Richard", "Matyáš"];
  const nameFemaleList = ["Marie", "Jana", "Eva", "Hana", "Anna", "Lenka", "Kateřina", "Věra", "Lucie", "Alena", "Petra", "Jaroslava", "Veronika", "Martina", "Tereza", "Jitka", "Michaela", "Helena", "Ludmila", "Zdeňka", "Ivana", "Monika", "Jarmila", "Zuzana", "Markéta", "Jiřina", "Eliška", "Barbora", "Marcela", "Dagmar", "Dana", "Kristýna", "Vlasta", "Božena", "Adéla", "Irena", "Pavla", "Miroslava", "Libuše", "Andrea", "Marta", "Šárka", "Klára", "Nikola", "Iveta", "Pavlína", "Olga", "Karolína", "Blanka", "Růžena"];

  const surnameMaleList = ["Novák", "Svoboda", "Novotný", "Dvořák", "Černý", "Procházka", "Kučera", "Veselý", "Horák", "Němec", "Marek", "Pospíšil", "Pokorný", "Hájek", "Král", "Jelínek", "Růžička", "Beneš", "Fiala", "Sedláček", "Doležal", "Zeman", "Kolář", "Navrátil", "Čermák", "Urban", "Vaněk", "Blažek", "Kříž", "Kovář", "Kratochvíl", "Bartoš", "Vlček", "Polák", "Kopecký", "Musil", "Šimek", "Konečný", "Malý", "Štěpánek", "Čech", "Holub", "Staněk", "Kadlec", "Dostál", "Šťastný", "Soukup", "Mareš", "Vávrová", "Moravec"];
  const surnameFemaleList = ["Nováková", "Svobodová", "Novotná", "Dvořáková", "Černá", "Procházková", "Kučerová", "Veselá", "Horáková", "Krejčí", "Marková", "Němcová", "Pokorná", "Pospíšilová", "Hájková", "Králová", "Jelínková", "Růžičková", "Benešová", "Fialová", "Sedláčková", "Doležalová", "Zemanová", "Kolářová", "Navrátilová", "Čermáková", "Vaňková", "Urbanová", "Kratochvílová", "Blažková", "Šimková", "Křížová", "Kopecká", "Kovářová", "Vlčková", "Bartošová", "Poláková", "Konečná", "Malá", "Musilová", "Čechová", "Staňková", "Štěpánková", "Holubová", "Kadlecová", "Dostálová", "Šťastná", "Soukupová", "Marešová", "Sýkorová"];

  const workloadList = [10, 20, 30, 40];

  // Inicializace prazdneho vystupniho pole (do ktereho budu pripojovat objekty z hlavni smycky nize)
  const dtoOut = [];

  // Hlavni smycka
  for (let i = 0; i < dtoIn.count; i++) {
    const employee = { gender: "", birthdate: "", name: "", surname: "", workload: 0 };  // Inicializace pomocneho prazdneho objektu pro danou iteraci smycky

    employee.gender = getRandomItem(genderList);  // Prirazeni nahodneho pohlavi
    employee.birthdate = getRandomBirthdate(dtoIn.age.min, dtoIn.age.max);  // Datumu narozeni v danem rozsahu viz pomocna funkce na konci

    // Aby vysledek nevypadal divne, tak prirazuji jmena a prijmeni odpovidajici pohlavi zamestnance
    switch (employee.gender) {
      case "female":
        employee.name = getRandomItem(nameFemaleList);
        employee.surname = getRandomItem(surnameFemaleList);
        break;  // Aby se nepokracovalo na dalsi case

      case "male":
        employee.name = getRandomItem(nameMaleList);
        employee.surname = getRandomItem(surnameMaleList);
        break;  // Just in case :)
    }

    employee.workload = getRandomItem(workloadList);  // Nakonec nahodny uvazek zamestnance
    dtoOut.push(employee);  // Pridani objektu z iterace na konec pole objektu dtoOut
  }

  return dtoOut;  // Vystup pomocne funkce pro generovani seznamu zamestnancu
}

// Pomocna funkce, ktera vrati nahodny prvek z pole
function getRandomItem(list) {
  return list[Math.floor((Math.random() * list.length))];
}

// Pomocna funkce, ktera vrati datum v rozsahu veku
function getRandomBirthdate(min, max) {
  let startDate = new Date();  // Aktualni datum
  let endDate = new Date();  // Aktualni datum

  startDate.setFullYear(startDate.getFullYear() - max);  // Od aktualniho roku odectu max. vek a tim dostanu zacatek pozadovaneho rozsahu
  endDate.setFullYear(endDate.getFullYear() - min);  // Od aktualniho roku odectu min. vek a tim dostanu konec kozadovaneho rozsahu

  let randomDifference = Math.random() * (endDate.getTime() - startDate.getTime());  // Datumy prevedu na milisekundy od 1 January 1970 UTC, aby se jednoduseji pocital nahodny rozdil
  let randomDate = new Date(startDate.getTime() + randomDifference);  // K zacatku rozsahu potom prictu nahodny rozdil a vytvorim novy datum v pozadovanem rozsahu

  return randomDate.toISOString().slice(0, 10) + "T00:00:00.000Z";  // Formatovani vystupu dle zadani
}
