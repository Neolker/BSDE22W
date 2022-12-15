// Vstupni objekt s parametry pro funkci main()
const dtoIn = {
  count: 50,
  age: {
    min: 19,
    max: 35
  }
};

// Hlavni funkce
function main(dtoIn) {
  let employeeList = generateEmployeeList(dtoIn);

  // Inicializace a deklarace vystupni promenne podle zadani
  const dtoOut = {
    total: 0,
    workload10: 0, workload20: 0, workload30: 0, workload40: 0,
    averageAge: 0, minAge: 0, maxAge: 0, medianAge: 0,
    medianWorkload: 0, averageWomenWorkload: 0,
    sortedByWorkload: []
  };

  dtoOut.total = employeeList.length;

  let countWorkload10 = 0;
  let countWorkload20 = 0;
  let countWorkload30 = 0;
  let countWorkload40 = 0;

  let workloadList = [];

  let sumWomanWorkload = 0;
  let countWomen = 0;

  for (let i = 0; i < dtoOut.total; i++) {
    switch (employeeList[i].workload) {
      case 10:
        countWorkload10++;
        break;
      case 20:
        countWorkload20++;
        break;
      case 30:
        countWorkload30++;
        break;
      case 40:
        countWorkload40++;
        break;
    }

    workloadList.push(employeeList[i].workload);

    if (employeeList[i].gender === "female") {
      sumWomanWorkload += employeeList[i].workload;
      countWomen++;
    }


  }

  dtoOut.workload10 = countWorkload10;
  dtoOut.workload20 = countWorkload20;
  dtoOut.workload30 = countWorkload30;
  dtoOut.workload40 = countWorkload40;

  dtoOut.averageWomenWorkload = Math.round(sumWomanWorkload / countWomen);

  //dtoOut.sortedByWorkload = employeeList.sort((a, b) => a.workload - b.workload);

  console.log(workloadList);

  console.log(Math.max(...workloadList));

  return dtoOut;  // Vystup hlavni funkce main
}

// Volani hlavni funkce
console.log(main(dtoIn));

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
        break;
    }

    employee.workload = getRandomItem(workloadList);  // Nakonec nahodny uvazek zamestnance
    dtoOut.push(employee);  // Pridani objektu z iterace na konec pole objektu dtoOut
  }

  return dtoOut;  // Vystup pomocne funkce
}

// Pomocna funkce, ktera vrati nahodny prvek z pole
function getRandomItem(list) {
  return list[Math.floor((Math.random() * list.length))];
}

// Pomocna funkce, ktera vrati datum v rozsahu veku
function getRandomBirthdate(min, max) {
  let startDate = new Date();  // Aktualni datum
  let endDate = new Date();  // Aktualni datum

  startDate.setFullYear(startDate.getFullYear() - max);  // Od aktualniho roku odecteme max. vek a tim dostaneme zacatek pozadovaneho rozsahu
  endDate.setFullYear(endDate.getFullYear() - min);  // Od aktualniho roku odecteme min. vek a tim dostaneme konec kozadovaneho rozsahu

  let randomDifference = Math.random() * (endDate.getTime() - startDate.getTime());  // Datumy prevedeme na milisekundy od 1 January 1970 UTC, aby se jednoduseji pocital nahodny rozdil
  let randomDate = new Date(startDate.getTime() + randomDifference);  // K zacatku rozsahu potom pricteme nahodny rozdil a vytvorime novy datum v pozadovanem rozsahu

  return randomDate.toISOString().slice(0, 10) + "T00:00:00.000Z";  // Formatovani vystupu dle zadani
}
