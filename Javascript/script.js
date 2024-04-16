// SELECTIONNER PERSO + PORTE MONNAIE + L'INITALISE A 0
const arbreCliquable = document.querySelector('.arbrePrincipal');
const portemonnaie = document.querySelector('.portemonnaie')
let points = 0;

    function mettreAJourPorteMonnaie() {
    portemonnaie.textContent = `Porte-monnaie : ${points}`;
    }


// FONCTIONS AU CLIC
    function gererClicArbre() { 
        points++;
        mettreAJourPorteMonnaie();
    }
    
    //ajouter clic sur l'arbre + incrémenter points
    arbreCliquable.addEventListener ('click', () => {
});




// ----- FONCTIONS AUTOMATIQUES
   function ajouterPointsAutomatiquement() {  // POINTS AUTOMATIQUES TOUTES LES 5 secondes(5000 millisecondes)
      points++;
      mettreAJourPorteMonnaie(); 
}
    setInterval(ajouterPointsAutomatiquement, 5000);