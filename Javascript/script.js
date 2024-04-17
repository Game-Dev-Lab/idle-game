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
  if(points >= cout){  
    points -= cout; 
    mettreAJourPorteMonnaie();  
    tauxGenerationAuto = pointsParGeneration;
    // Déclenche génération auto de pts en fonction du tps entre chaque génération
     if (!intervalId) {
      intervalId = setInterval(function() {
        points += pointsParGeneration;
        mettreAJourPorteMonnaie();
    }, tempsEntrePoints * 1000); // Convertit secondes en millisecondes
}
    afficherLicornePopover("Pouvoir acheté !");
} else {
    afficherLicornePopover("Pas assez de sous frero  ");
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
  var popovers = document.querySelectorAll('[data-bs-toggle="popover"]');
  popovers.forEach(function (popover) {
    new bootstrap.Popover(popover);
  });
