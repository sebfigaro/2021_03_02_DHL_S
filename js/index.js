function jsLoaded() {
    // chargement dans une variable de la balise <div id="jsLoaded">...</div>
    var jsloaded = document.querySelector('#jsLoaded');

    // Mise à jour du fond en vert
    jsloaded.style.backgroundColor = 'rgba(153, 255, 0, 0.6)';

    // Mise à jour du texte affiché
    jsloaded.innerText = 'JS Chargé';

    console.log('Chargemnt du JS terminé')
}

/**
 * Method test pour remplir automatiquement le formulaire
 */
function remplirFormulaire() {
    var form = document.forms['mon-form']
    if (form['form-titre'].value == '') {
        form['form-titre'].value = 'Test';
        form['form-auteur'].value = 2;
        form['form-date'].value = '2021-03-03';
        form['form-time'].value = '15:22';
        form['form-email'].value = 'ss@ss.ss';
        form['form-adresse'].value = '10 rue Anywhere 78000';
        form['form-description'].value = 'Desc test';
        console.log('Remplissage de texte de test terminé');
    }
    else {
        console.log('Auteur rempli, pas de remplissage automatique!');
    }
}

function logFormulaire() {
    var form = document.forms['mon-form']
    console.log('Titre :', form['form-titre'].value);
    console.log('Auteur :', form['form-auteur'].value);
    console.log('Date :', form['form-date'].value);
    console.log('Heure :', form['form-time'].value);
    console.log('Email :', form['form-email'].value);
    console.log('Adresse :', form['form-adresse'].value);
    console.log('Description :', form['form-description'].value);
}

/**
 * @return Un tableau avec le contenu du formulaire
 */
function getFormulaire() {
    var form = document.forms['mon-form']
    var unPostIt = {
        titre: form['form-titre'].value,
        auteur: form['form-auteur'].value,
        date: form['form-date'].value,
        heure: form['form-time'].value,
        email: form['form-email'].value,
        adresse: form['form-adresse'].value,
        description: form['form-description'].value
    }
    console.log(unPostIt)
    return unPostIt
}

/**
 * @return False quand au moins une des entrées et vide
 */
function isFormFullFill() {
    var allInputFilled = true
    for (var element of document.forms['mon-form']) {
        if (element.localName !== 'button' && element.value === '') {
            element.style.backgroundColor = 'red';
            allInputFilled = false;
        } else if (element.classList.contains("btn") != true) {
            element.style.backgroundColor = '';
        }
    }

    return allInputFilled
}

function makePostIt(postitValues) {
    // Duplication du premier post it pour créer un nouveau
    var postitNode = document.querySelector('.post-it').cloneNode(true);
    postitNode.querySelector('.post-it-titre').innerText = postitValues.titre
    postitNode.querySelector('.post-it-auteur').innerText = postitValues.auteur
    postitNode.querySelector('.post-it-date').innerText = 'Le: ' + postitValues.date + ' à ' + postitValues.heure
    postitNode.querySelector('.post-it-mail').innerText = postitValues.email
    postitNode.querySelector('.post-it-adresse').innerText = postitValues.adresse
    postitNode.querySelector('.post-it-description').innerText = postitValues.description
    return postitNode
}

function onformsubmit(evt) {
    evt.preventDefault();
    console.log(evt);
    logFormulaire();
    if (isFormFullFill() === true) {
        newpostit = makePostIt(getFormulaire());
        document.querySelector('#post-it-liste').append(newpostit)
        console.log('Ajout du nouveau post it terminé');
        evt.target.reset();
        console.log('Ajout du nouveau post it terminé');
    }
}

function getTemplateView(templateFileName, callback) {
    // 1 - XMLHttpRequest instance
    var xhr=new XMLHttpRequest(); 
    // 2 - Preparation de la requête
    xhr.open('GET', 'vues/' + templateFileName); // 
    // 3 - Contenu a exécuter pour chaque changement d'état
    xhr.onreadystatechange = function (evt) {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status !== 200){
            console.log('Err XHR'+xhr.responseURL+'-->'+xhr.status+':'+xhr.statusText)
            return;
        } 
        console.log(evt.target)           
        callback(xhr.responseXML)
    }
    // 4 - 
    xhr.send();
}

document.forms['mon-form'].addEventListener('submit', onformsubmit)

/** --- Automatic test call --- */
// setTimeout(jsLoaded, 3210)
// setTimeout(remplirFormulaire, 5000)
// setTimeout(logFormulaire, 6000)
// setTimeout(getFormulaire, 7000)
/** --------------------------- */

getTemplateView('postit.xhtml',
                function (response) {console.log(response)})

