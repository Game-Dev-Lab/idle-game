const arbreCliquable = document.querySelector('.arbrePrincipal');
       //ARGENT
const portemonnaie = document.querySelector('.portemonnaie')
const portebillets = document.querySelector('.portebillets')
let points = 0;
let billets = 0;

      //EASTER EGG
const bonusTerre = document.querySelector('.bonus1')

let intervalId;
let intervalIdFeuille;

let tauxGenerationAuto = 0;

// VARIABLES BOUTIQUE (bouton,texte)
let btnSoleil = document.querySelector('#btn-soleil');
let btnFeuille = document.querySelector('#btn-feuille');
let btnPapillon = document.querySelector('#btn-papillon');

let tauxGenerationFeuille = document.getElementById('taux-generation-feuille');
let tauxGenerationSoleil = document.getElementById('taux-generation-soleil');
let tauxGenerationPapillon = document.getElementById('taux-generation-papillon');

// VARIABLES DES POUVOIRS
let soleil = {
  "cout": 10,
  "temps": 30,
  "ptsGen": 10,
};

let feuille = {
  "cout":150 ,
  "temps":60,
  "ptsGen": 100,
};

let papillon = {
  "cout":100,
  "clic":1,
};

// -----------------FONCTIONS----------------------- 

    function mettreAJourPorteMonnaie() {
    portemonnaie.textContent = `🪙 : ${points}`;
    }

    function mettreAJourPorteBillets() {
      portebillets.textContent = `💵 : ${billets}`;
      }


  //SCRIPT evenement clics
arbreCliquable.addEventListener('click', gererClicArbre);
bonusTerre.addEventListener('click', gererClicBonusTerre);


// FONCTIONS AU CLIC
function gererClicArbre() { 
  points += papillon.clic;
    mettreAJourPorteMonnaie();
  sauvegarderProgression();
}

function gererClicBonusTerre() {
  billets++;
  mettreAJourPorteBillets();
  sauvegarderProgression();

}

//ACHAT DE POUVOIRS AUTO
function acheterPouvoirAutomatique(pouvoir,cout,tempsEntrePoints,pointsParGeneration){
  if (points >= soleil.cout && pouvoir === 'soleil') {
    points -= cout; 

    // VARIABLES : Augmente  prix et capacité de génération
    cout += 10; 
    soleil.cout = soleil.cout + 10;

    // Augmente les pts de 10 par min
    pointsParGeneration += 10; 

         // Affiche la valeur de ptsGen avant et après l'augmentation
     console.log("Valeur de ptsGen avant l'augmentation :", soleil.ptsGen);
     soleil.ptsGen = pointsParGeneration; // Met à jour la valeur de ptsGen
     console.log("Valeur de ptsGen après l'augmentation :", soleil.ptsGen);
    tauxGenerationAuto = pointsParGeneration;
    console.log("tauxGenerationAuto:", tauxGenerationAuto);

    mettreAJourPorteMonnaie();
    sauvegarderProgression();

   // POUVOIR SOLEIL
if (!intervalId) {
  intervalId = setInterval(function () {
    console.log('soleil.ptsGen:', soleil.ptsGen);
    console.log('tauxGenerationAuto:', tauxGenerationAuto);
    points += soleil.ptsGen;
    mettreAJourPorteMonnaie();
  }, tempsEntrePoints * 1000); // 
}

    // MAJ texte du taux de génération 
    tauxGenerationSoleil.textContent = `Génère: ${soleil.ptsGen}🪙/0.30s`;
    afficherLicorneDialogue("Pouvoir acheté !");

  } else if (points >= feuille.cout && pouvoir === 'feuille') {
    points -= cout;
    //VARIABLES
    cout += 50; //augmente cout de 50pcs par achat
    feuille.cout = feuille.cout + 50;

    pointsParGeneration +=100;
    console.log("Valeur de ptsGen FEUILLLE avant l'augmentation :", feuille.ptsGen);
    feuille.ptsGen = pointsParGeneration; // Met à jour la valeur de ptsGen
    
    console.log("Valeur de ptsGen FEUIILLLE après l'augmentation :", feuille.ptsGen);
    tauxGenerationAuto = pointsParGeneration;
    console.log("tauxGenerationAuto:", tauxGenerationAuto);
      
    mettreAJourPorteMonnaie();
    sauvegarderProgression();


    //POUVOIR FEUILLES
    if (!intervalIdFeuille) {
      intervalIdFeuille = setInterval(function () {
        console.log('feuille.ptsGen:', feuille.ptsGen);
        console.log('tauxGenerationAuto:', tauxGenerationAuto);
        points += feuille.ptsGen;
        mettreAJourPorteMonnaie();
        sauvegarderProgression();

      }, tempsEntrePoints * 1000); // 1mn
    }
      //MAJ du p qui affiche le taux
      tauxGenerationFeuille.textContent = `Génère: ${feuille.ptsGen}🪙/min`;

      afficherLicorneDialogue("Pouvoir acheté !");
    } else {
      afficherLicorneDialogue("Tu n'as pas assez de pièces.. Continues de cliquer !");
    }
  }

// ACHAT DE POUVOIRS AU CLIC
function acheterPouvoirClic (pouvoir, cout, clic) {
  if (points >= cout && pouvoir === 'papillon') {
    points -= cout;

    //augmente cout de 30
    cout+=30;
    papillon.cout += 30;

    papillon.clic++;


    // Met à jour le texte du taux de génération du papillon
    tauxGenerationPapillon.textContent = `+${papillon.clic}🪙/clic`;

    // Met à jour le porte-monnaie
    mettreAJourPorteMonnaie();
    sauvegarderProgression();

    console.log("Prix après achat :", cout);

    afficherLicorneDialogue("Pouvoir acheté !");
  } else {
    afficherLicorneDialogue("Tu n'as pas assez de pièces.. Continues de cliquer !");
  }
}




// BULLE DIALOGUE DE LA LICORNE
function afficherLicorneDialogue(message) {
  const licorneDialogue = document.getElementById('licorneDialogue');
  const licorneMessage = document.getElementById('licorneMessage');

  licorneMessage.textContent = message;
  licorneDialogue.classList.remove('d-none');

  // masquer bulle après 5secondes
  setTimeout(function() {
    licorneDialogue.classList.add('d-none');
  }, 5000); // 5secondes
}
function fermerLicorneDialogue() {
  const licorneDialogue = document.getElementById('licorneDialogue');
  licorneDialogue.classList.add('d-none');
}
//-------  LOCAL STORAGE ----------
function sauvegarderProgression() {
  localStorage.setItem("points", points.toString());
  localStorage.setItem("billets", billets.toString());
    //pouvoirs auto
  localStorage.setItem("soleil", JSON.stringify(soleil)); 
  localStorage.setItem("feuille", JSON.stringify(feuille));
  localStorage.setItem("papillon", JSON.stringify(papillon));


  localStorage.setItem("btnSoleilText", btnSoleil.innerText);
  localStorage.setItem("btnFeuilleText", btnFeuille.innerText);
  localStorage.setItem("btnPapillonText", btnPapillon.innerText);


  localStorage.setItem("tauxGenerationSoleil", tauxGenerationSoleil.textContent);
  localStorage.setItem("tauxGenerationFeuille", tauxGenerationFeuille.textContent);
  localStorage.setItem("tauxGenerationPapillon", tauxGenerationPapillon.textContent);


}
function chargerProg() {
  //recup les données et les convertit soit en nb entier soit JSON
    if (localStorage.getItem("points")) {
      points = parseInt(localStorage.getItem("points"));
      mettreAJourPorteMonnaie();
    }
    if (localStorage.getItem("billets")) {
      billets = parseInt(localStorage.getItem("billets"));
      mettreAJourPorteBillets();
    }
    if (localStorage.getItem("soleil")) {
      soleil = JSON.parse(localStorage.getItem("soleil"));
    }
    if (localStorage.getItem("feuille")) {
      feuille = JSON.parse(localStorage.getItem("feuille"));
    }
    if (localStorage.getItem("papillon")) {
      papillon = JSON.parse(localStorage.getItem("papillon"));
    }

    if (localStorage.getItem("btnSoleilText")) {
      let btnSoleilText = localStorage.getItem("btnSoleilText");
      btnSoleil.innerText = btnSoleilText;
    }
    if (localStorage.getItem("btnFeuilleText")) {
      let btnFeuilleText = localStorage.getItem("btnFeuilleText");
      btnFeuille.innerText = btnFeuilleText;
    }
    if (localStorage.getItem("btnPapillonText")) {
      let btnPapillonText = localStorage.getItem("btnPapillonText");
      btnPapillon.innerText = btnPapillonText;
    }

    if (localStorage.getItem("tauxGenerationSoleil")) {
      let tauxGenerationSoleilText = localStorage.getItem("tauxGenerationSoleil");
      tauxGenerationSoleil.textContent = tauxGenerationSoleilText;
    }
    if (localStorage.getItem("tauxGenerationFeuille")) {
      let tauxGenerationFeuilleText = localStorage.getItem("tauxGenerationFeuille");
      tauxGenerationFeuille.textContent = tauxGenerationFeuilleText;
    }
    if (localStorage.getItem("tauxGenerationPapillon")) {
      let tauxGenerationPapillonText = localStorage.getItem("tauxGenerationPapillon");
      tauxGenerationPapillon.textContent = tauxGenerationPapillonText;
    }

  }
//-------  INITIALISATION APP ----------

function initialiserApp() {
  chargerProg();
  btnSoleil.addEventListener('click', function() {
    acheterPouvoirAutomatique('soleil', soleil.cout, soleil.temps, soleil.ptsGen);
    btnSoleil.innerText = ((soleil.cout) + '🪙'); 
    sauvegarderProgression();
  });

  btnFeuille.addEventListener('click', function() {
    acheterPouvoirAutomatique('feuille',feuille.cout, feuille.temps, feuille.ptsGen);
    btnFeuille.innerText = ((feuille.cout) + '🪙'); 
    sauvegarderProgression();
  });
            //pouvoirs clic
  btnPapillon.addEventListener('click', function() {
    acheterPouvoirClic('papillon',papillon.cout, papillon.clic,);
    btnPapillon.innerText = papillon.cout + '🪙';
        sauvegarderProgression();
  });
}

initialiserApp();
