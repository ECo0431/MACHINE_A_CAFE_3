//MENU BOISSSONS
const NOMBOISSONS = [
  "Expresso",
  "Allongé",
  "Cappuccino",
  "Noisette",
  "Thé",
  "Potage",
];
const BTNEXPRESSO = document.querySelector("#bouton-expresso");
const BTNALLONGE = document.querySelector("#bouton-allonge");
const BTNCAPPUCCINO = document.querySelector("#bouton-cappuccino");
const BTNNOISETTE = document.querySelector("#bouton-noisette");
const BTNTHE = document.querySelector("#bouton-the");
const BTNPOTAGE = document.querySelector("#bouton-potage");
const ALLBTNBOISSONS = [
  BTNEXPRESSO,
  BTNALLONGE,
  BTNCAPPUCCINO,
  BTNNOISETTE,
  BTNTHE,
  BTNPOTAGE,
];
const PRIXBOISSONS = [1.1, 1.3, 1.5, 1.4, 1.2, 1];

//MENU PIECES
const VALEURSPIECES = [2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01];
const BTNDEUXEUROS = document.querySelector("#deux-euros");
const BTNUNEURO = document.querySelector("#un-euro");
const BTNCINQUANTECENTIMES = document.querySelector("#cinquante-centimes");
const BTNVINGTSCENTIMES = document.querySelector("#vingts-centimes");
const BTNDIXCENTIMES = document.querySelector("#dix-centimes");
const BTNCINQUECENTIMES = document.querySelector("#cinque-centimes");
const BTNDEUXCENTIMES = document.querySelector("#deux-centimes");
const BTNUNCENTIME = document.querySelector("#un-centime");
const ALLBTNPIECES = [
  BTNDEUXEUROS,
  BTNUNEURO,
  BTNCINQUANTECENTIMES,
  BTNVINGTSCENTIMES,
  BTNDIXCENTIMES,
  BTNCINQUECENTIMES,
  BTNDEUXCENTIMES,
  BTNUNCENTIME,
];
// Variables Fonctions
let prixBoisson = 0;
let valeurPiece = 0;
let total = 0;
let totaux = 0;
// Ecran Machine à café
const ECRAN = document.querySelector("#ecran");
// Café avec animation
const CAFE = document.querySelector("#cafe");
const CAFELIQUIDE = document.querySelector("#cafe-liquide");
//Remboursement
const PIECEREMBOURSEMENT1 = document.querySelector("#piece-remboursement-1");
const PIECEREMBOURSEMENT2 = document.querySelector("#piece-remboursement-2");
// Fonction qui arrondi
function round(num) {
  var m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
}
// BRUITAGES
const SONCLICBOUTON = new Audio("./son/clic_bouton.mp3");
SONCLICBOUTON.loop = false;
SONCLICBOUTON.playbackRate = 1;
const SONINSEREPIECE = new Audio("./son/insere_piece.mp3");
SONINSEREPIECE.loop = false;
SONINSEREPIECE.playbackRate = 1;
const SONCAFEENCOURS = new Audio("./son/cafe_en_cours.mp3");
SONCAFEENCOURS.loop = false;
SONCAFEENCOURS.playbackRate = 1;
const SONREMBOURSEMENT = new Audio("./son/remboursement_pieces.mp3");
SONREMBOURSEMENT.loop = false;
SONREMBOURSEMENT.playbackRate = 1;
const SONREMBOURSEMENTUNEPIECE = new Audio("./son/remboursement_une_piece.mp3");
SONREMBOURSEMENTUNEPIECE.loop = false;
SONREMBOURSEMENTUNEPIECE.playbackRate = 1;
const SONBOIRE = new Audio("./son/boire.wav");
SONBOIRE.loop = false;
SONBOIRE.playbackRate = 1;
//Fonction Choix de la boisson retourne le prix de la boisson choisi
function choixBoisson() {
  for (let i = 0; i < ALLBTNBOISSONS.length; i++) {
    ALLBTNBOISSONS[i].addEventListener("click", () => {
      SONCLICBOUTON.play();
      prixBoisson = PRIXBOISSONS[i];
      console.log("Prix boisson " + prixBoisson);
      ECRAN.innerHTML = `
      <p>${NOMBOISSONS[i]} à ${prixBoisson} €</p>
    `;
      calculPiecesInsere(prixBoisson, valeurPiece);
    });
  }
  return prixBoisson;
}

choixBoisson();
//Fonction Choix de la pièce retourne la valeur de la pièce choisi
function choixPieces() {
  for (let i = 0; i < ALLBTNPIECES.length; i++) {
    ALLBTNPIECES[i].addEventListener("click", () => {
      SONINSEREPIECE.play();
      valeurPiece = VALEURSPIECES[i];
      console.log("Pièce choisi " + valeurPiece);
      calculPiecesInsere(prixBoisson, valeurPiece);
    });
  }
  return valeurPiece;
}

choixPieces();
//Fonction calcul retour pièces prend en argument la valeur de la pièce et le prix de la boisson retourne le prix de la boisson - la valeur de la pièce
function calculPiecesInsere() {
  total = valeurPiece;
  totaux = total + totaux;
  prixBoisson -= total;
  console.log("Total " + total);
  console.log("Totaux " + totaux);
  console.log("Prix boisson moins pièce inseré " + round(prixBoisson));
  if (round(prixBoisson) == 0 || round(prixBoisson) < 0) {
    animCafeEnCours();
    setTimeout(affichageRemboursement, 5000);
    //Function qui affiche le remboursement selon certaines conditions
    function affichageRemboursement() {
      if (
        round(prixBoisson) == -2 ||
        round(prixBoisson) == -1 ||
        round(prixBoisson) == -0.5 ||
        round(prixBoisson) == -0.2 ||
        round(prixBoisson) == -0.1 ||
        round(prixBoisson) == -0.05 ||
        round(prixBoisson) == -0.02
      ) {
        SONREMBOURSEMENTUNEPIECE.play();
        PIECEREMBOURSEMENT1.classList.remove("none");
      } else if (round(prixBoisson) == 0) {
      } else {
        SONREMBOURSEMENT.play();
        PIECEREMBOURSEMENT1.classList.remove("none");
        PIECEREMBOURSEMENT2.classList.remove("none");
      }
      ECRAN.innerHTML = `
      <p>Remboursement de ${Math.abs(round(prixBoisson))}€</p>
      `;
    }
  } else {
    ECRAN.innerHTML = `
    <p>Reste à payer ${round(prixBoisson)}€</p>
    `;
  }
  return totaux;
}

function animCafeEnCours() {
  if (round(prixBoisson) == 0 || prixBoisson < 0) {
    SONCAFEENCOURS.play();
    CAFELIQUIDE.classList.remove("none");
    CAFE.classList.remove("none");
    ECRAN.innerHTML = `
    <p>Boisson en cours</p>
    `;
  }
}

CAFE.addEventListener("click", () => {
  const RECHARGEPAGE = setTimeout(rechargePage, 5000);
  function rechargePage() {
    location.reload();
  }
  SONBOIRE.play();
  CAFE.classList.add("none");
  CAFELIQUIDE.classList.add("none");
});

//test git hub
