const arbreCliquable = document.querySelector('.arbrePrincipal');
       //ARGENT
const portemonnaie = document.querySelector('.portemonnaie')
const portebillets = document.querySelector('.portebillets')
let points = 0;
let billets = 0;

      //EASTER EGG
const bonusTerre = document.querySelector('.bonus1')
let intervalId;
let tauxGenerationAuto;

// VARIABLES DES BOUTONS
const btnSoleil = document.querySelector('#btn-soleil');

// VARIABLES DES POUVOIRS
const soleil = {
  "cout": 10,
  "temps": 60,
  "ptsGen": 10,
};

const feuille = {
  "cout": 100,
  "temps": "",
  "ptsGen": ""
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
  points++;
  mettreAJourPorteMonnaie();
}

function gererClicBonusTerre() {
  billets++;
  mettreAJourPorteBillets();
}


// ----- FONCTIONS AUTOMATIQUES
   function ajouterPointsAutomatiquement() {  // POINTS AUTOMATIQUES TOUTES LES 5 secondes(5000 millisecondes)
      points++;
      mettreAJourPorteMonnaie(); 
}
   //déclare 
 setInterval(ajouterPointsAutomatiquement, 5000);



//ACHAT DE POUVOIRS AUTO
function acheterPouvoirAutomatique(cout,tempsEntrePoints,pointsParGeneration){
  if(points >= soleil.cout){
        points -= cout; 

    // VARIABLES : Augmente  prix et capacité de génération
    cout += 10; // Augmente le prix de 10 à chaque achat
    soleil.cout = soleil.cout + 10;

    // Augmente le pts de 10 par min
    pointsParGeneration += 10; 

    tauxGenerationAuto = pointsParGeneration;
    mettreAJourPorteMonnaie();


     // Affiche la valeur de ptsGen avant et après l'augmentation
     console.log("Valeur de ptsGen avant l'augmentation :", soleil.ptsGen);
     soleil.ptsGen = pointsParGeneration; // Met à jour la valeur de ptsGen
     console.log("Valeur de ptsGen après l'augmentation :", soleil.ptsGen);

    // Déclenche génération auto de pts en fonction du tps entre chaque génération
     if (!intervalId) {
      intervalId = setInterval(function() {
        points += pointsParGeneration;
        mettreAJourPorteMonnaie();
    }, tempsEntrePoints * 1000); // Convertit secondes en millisecondes
}

    // Mettre à jour le taux de génération affiché sous l'icône du soleil
    const tauxGenerationSoleil = document.getElementById('taux-generation-soleil');
    tauxGenerationSoleil.textContent = `Génère: ${soleil.ptsGen}🪙/min`;


    afficherLicornePopover("Pouvoir acheté !");
} else {
    afficherLicornePopover("Tu n'as pas assez de pièces.. Continues de cliquer !");
  }}

// BULLE DE DIALOGUE
      function afficherLicornePopover(message) {
        const licornePopover = document.getElementById('licornePopover');
        const licorneMessage = document.getElementById('licorneMessage');

        licorneMessage.textContent = message;
        licornePopover.classList.remove('d-none');

        // Masquer la bulle de dialogue après quelques secondes
        setTimeout(function() {
          licornePopover.classList.add('d-none');
        }, 5000); // Durée en millisecondes (5 secondes dans cet exemple)
      }

      // Fonction pour fermer la bulle de dialogue de la licorne
      function fermerLicornePopover() {
        const licornePopover = document.getElementById('licornePopover');
        licornePopover.classList.add('d-none');
      }

//-------  LOCAL STORAGE ----------

// DESCRIPTION POUVOIR AU SURVOL  
  let popovers = document.querySelectorAll('[data-bs-toggle="popover"]');
  popovers.forEach(function (popover) {
    new bootstrap.Popover(popover);
  });

//-------  INITIALISATION APP ----------

function  initialiserApp() {
  btnSoleil.addEventListener('click', function() {
    acheterPouvoirAutomatique(soleil.cout, soleil.temps,soleil.ptsGen);

    btnSoleil.innerText = ((soleil.cout) + '🪙'); // Ajouter 10 au prix total pour refléter l'augmentation du prix
  });  
}

initialiserApp();