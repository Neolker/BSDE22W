// Vstupni objekt s parametry pro funkci main()
const dtoIn = {
  count: 20,
  age: {
    min: 20,
    max: 60
  }
};

// Hlavni funkce
function main(dtoIn) {
  const employeeList = generateEmployeeList(dtoIn); // Nejprve vygeneruji seznam zamestnancu pomoci Domaciho ukolu 3

  // Pomocna pole pro rozdeleni zamestnancu dle zadani
  const all = [];
  const male = [];
  const female = [];
  const femalePartTime = [];
  const maleFullTime = [];

  for (let i = 0; i < employeeList.length; i++) {
    all.push(employeeList[i].name);  // Vsichni zamestnanci

    // Switch pro zjisteni pohlavi
    switch (employeeList[i].gender) {
      case "male":
        male.push(employeeList[i].name);  // Vsechny muzi
        if (employeeList[i].workload === 40) {
          maleFullTime.push(employeeList[i].name);  // Vsichni muzi, co maji plny uvazek
        }
        break;

      case "female":
        female.push(employeeList[i].name);  // Vsechny zeny
        if (employeeList[i].workload !== 40) {
          femalePartTime.push(employeeList[i].name);  // Vsechny zeny, co nemaji plny uvazek
        }
        break;
    }
  }

  // Inicializace a deklarace vystupniho objektu ve formatu podle zadani, ktery budu plnit vysledky
  const dtoOut = {
    names: {
      all: namesOccurence(all),
      male: namesOccurence(male),
      female: namesOccurence(female),
      femalePartTime: namesOccurence(femalePartTime),
      maleFullTime: namesOccurence(maleFullTime)
    },
    chartData: {
      all: chartDataFormat(all),
      male: chartDataFormat(male),
      female: chartDataFormat(female),
      femalePartTime: chartDataFormat(femalePartTime),
      maleFullTime: chartDataFormat(maleFullTime)
    }
  };

  console.log("--------| Zacatek vypisu pro kontrolu |--------");
  console.dir(dtoOut, { depth: null });  // Konstrola vystupu hlavni funkce main, aby slo videt i pole ojektu
  console.log("--------|  Konec vypisu pro kontrolu  |--------");

  return dtoOut;  // Vystup hlavni funkce main
}

// Pomocna funkce pro zjiisteni cetnosti prvku ve vstupnim poli
function namesOccurence(list) {
  const counter = {};
  for (const element of list) {
    if (counter[element]) {
      counter[element] += 1;  // Pokud jiz existuje, pricti ke jmenu +1
    } else {
      counter[element] = 1;  // Pokud neexistuje, pridej jmeno s hodnotou 1
    }
  }
  return counter;  // Vraci objekt
}

// Pomocna promena pro formatovani casti ChartData
function chartDataFormat(list) {
  // Inicializace a deklarace konstant a poli
  const result = [];
  const names = Object.entries(namesOccurence(list)); // Prevod entries z objektu do 2D pole
  for (let i = 0; i < names.length; i++) {  // For cyklus pro projiti vsech vlastnosti objektu
    let tempObject = { label: names[i][0], value: names[i][1] };
    result.push(tempObject);  // Pridani objektu z iterace na konec pole objektu result
  }
  return result.sort((a, b) => b.value - a.value);  // Sestupne serazeni pole podle prikladu ze zadani
}

// Volani hlavni funkce
console.log(main(dtoIn));

// =======| KONEC KODU Z DOMACIHO UKOLU 5 |=======

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

  const nameMaleList = ["Jiri", "Jan", "Petr", "Josef", "Pavel"];  // ZKRACENO na 6 jmen pro castejsi vyskyt a snazsi debug //, "Martin", "Tomáš", "Miroslav",  "Jaroslav", "Zdeněk", "František", "Václav", "Michal", "Milan", "Karel", "Jakub", "Lukáš", "David", "Vladimír", "Ondřej", "Ladislav", "Roman", "Stanislav", "Marek", "Daniel", "Radek", "Antonín", "Vojtěch", "Filip", "Adam", "Matěj", "Miloslav", "Aleš", "Jaromír", "Dominik", "Libor", "Patrik", "Vlastimil", "Jindřich", "Miloš", "Oldřich", "Lubomír", "Rudolf", "Ivan", "Štěpán", "Luboš", "Robert", "Radim", "Richard", "Matyáš"];
  const nameFemaleList = ["Marie", "Jana", "Eva", "Hana", "Anna"];  // ZKRACENO na 6 jmen pro castejsi vyskyt a snazsi debug //, "Lenka", "Kateřina", "Věra", "Lucie", "Alena", "Petra", "Jaroslava", "Veronika", "Martina", "Tereza", "Jitka", "Michaela", "Helena", "Ludmila", "Zdeňka", "Ivana", "Monika", "Jarmila", "Zuzana", "Markéta", "Jiřina", "Eliška", "Barbora", "Marcela", "Dagmar", "Dana", "Kristýna", "Vlasta", "Božena", "Adéla", "Irena", "Pavla", "Miroslava", "Libuše", "Andrea", "Marta", "Šárka", "Klára", "Nikola", "Iveta", "Pavlína", "Olga", "Karolína", "Blanka", "Růžena"];

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
