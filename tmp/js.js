var buttonEnvoyer = document.querySelector('.buttonEnvoyer')
var buttonReset = document.querySelector('.buttonReset')

// initialisation du nombre mystere
setNbMystere();

buttonEnvoyer.addEventListener('click', () => {
  setEssai();
})

buttonReset.addEventListener('click', () => {
  setNbMystere()
})

////////////////////////////// LE JEU //////////////////////////////////////////////

  // le joueur fait son essai
  async function setEssai(){
    let essai = document.getElementById('essai').value;
    if (isNaN (essai) || essai < 1 || essai > 100) return // sortir pour éviter l'incrémentation du nombre de coup sur valeurs invalides

    let response, data, nbMystere, nbCoup;
    
    // récupération du nombre mystere dans la bdd
    response = await fetch('http://localhost/ajax/php/php.php?action=setEssai')
    if(response.ok){
      data = await response.json()
      nbMystere = (data.nbMystere);
    }

    // incrémentation et récupération du nombre de coup
    response = await fetch('http://localhost/ajax/php/php.php?action=setNbCoup')
    if(response.ok) {
      data = await response.json()
      nbCoup = data.nbCoup;
    }

    // affichage du résultat
    if (essai < nbMystere) {document.getElementById('resultat').innerHTML = "essai " + nbCoup +  ": Trop petit"}
    else if (essai > nbMystere) {document.getElementById('resultat').innerHTML =  "essai " + nbCoup +  ": Trop grand"}
    else if (essai == nbMystere) {document.getElementById('resultat').innerHTML = "essai " + nbCoup +  ": Gagné !!!"}
  }


  //////////////////////////// INITIALISATION DU JEU //////////////////////////////////////////

  // initialisation du nombre mystere et de l'affichage
  async function setNbMystere(){
    document.getElementById('essai').value="";
    document.getElementById('resultat').innerHTML = "";

    // générateur aléatoire [1-100]
    let data = {nbMystere: Math.floor((Math.random() * 100) + 1)};
    let request = new Request('http://localhost/ajax/php/php.php?action=setNbMystere', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    await fetch(request)
  }
