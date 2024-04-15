// SELECTIONNER PERSO + PORTE MONNAIE + L'INITALISE A 0
const arbreCliquable = document.querySelector('.arbrePrincipal');
const portemonnaie = document.querySelector('.portemonnaie')
let points = 0;


    //AJOUTER EVENEMENT CLIC SUR LA LICORNE
  arbreCliquable.addEventListener ('click', () => {
    //INCREMENTER LES POINTS
    points++;
    portemonnaie.textContent = `Porte-monnaie : ${points}`;
});