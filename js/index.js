function jsLoaded() {
    // chargement dans une variable de la balise <div id="jsLoaded">...</div>
    var jsloaded = document.querySelector('#jsLoaded');

    // Mise à jour du fond en vert
    jsloaded.style.backgroundColor = 'rgba(153, 255, 0, 0.6)';

    // Mise à jour du texte affiché
    jsloaded.innerText = 'JS Chargé';

    console.log('Mise à jour de jsLoaded terminée')
}

/**
 * Method test pour remplir automatiquement le formulaire
 */
function testTemplirFormulaire() {
    var form = document.forms['mon-form']
    if (form['form-titre'].value == '') {
        form['form-titre'].value = 'Test';
        form['form-auteur'].value = 2;
        form['form-date'].value = '2021-03-03';
        form['form-time'].value = '15:22';
        form['form-email'].value = 'ss@ss.ss';
        form['form-adresse'].value = '10 rue Anywhere 78000';
        form['form-description'].value = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.';
        form['form-description'].value += 'Facere libero quas, quaerat molestiae, unde eius culpa dicta labore provident';
        form['form-description'].value += 'enim consectetur fugit aliquam assumenda incidunt nemo fuga deserunt rerum dolorem.';
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
        auteur: form['form-auteur'][form['form-auteur'].value].innerText,
        auteurID: form['form-auteur'].value,
        date: form['form-date'].value,
        heure: form['form-time'].value,
        email: form['form-email'].value,
        adresse: form['form-adresse'].value,
        description: form['form-description'].value
    }
    // console.log(unPostIt)
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

/**
 * Clone d'un modèle post it avec remplissage des valeurs à partir de postitValues
 * @param {Document} postitDOM 
 * @param {Postit} postitValues 
 */
function addPostIt(postitDOM, postitValues) {
    var postitNode = document.createElement('div')  // Nouveau document temporaire
    postitNode.innerHTML = postitDOM.firstChild.outerHTML;  // Nouveau document temporaire
    postitNode.querySelector('.post-it-titre').innerHTML = postitValues.titre;
    postitNode.querySelector('.post-it-auteur').innerHTML = postitValues.auteur;
    postitNode.querySelector('.post-it-date').innerHTML = 'Le: ' + postitValues.date + ' à ' + postitValues.heure;
    postitNode.querySelector('.post-it-mail').innerHTML = postitValues.email;
    postitNode.querySelector('.post-it-adresse').innerHTML = postitValues.adresse;
    postitNode.querySelector('.post-it-description').innerHTML = postitValues.description;
    console.log(postitDOM.querySelector('.post-it'))
    document.querySelector('#post-it-liste').append(postitNode.firstChild)
}

function onformsubmit(evt) {
    evt.preventDefault();
    console.log(evt);
    // logFormulaire();
    if (isFormFullFill() === true) {
        var postitValues = getFormulaire();
        getTemplateView('postit.xhtml',
            function (responseDocument) {
                addPostIt(responseDocument, postitValues);
            });
        evt.target.reset();
    }
}

function getTemplateView(templateFileName, callback) {
    // 1 - XMLHttpRequest instance
    var xhr = new XMLHttpRequest();
    // 2 - Preparation de la requête
    xhr.open('GET', 'vues/' + templateFileName); // 
    // 3 - Contenu a exécuter pour chaque changement d'état
    xhr.onreadystatechange = function (evt) {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status !== 200) {
            console.log('Err XHR' + xhr.responseURL + '-->' + xhr.status + ':' + xhr.statusText);
            return;
        }
        console.log(evt.target);

        // Solution 1
        callback(xhr.responseXML);

        // Solution 2
        /**var postitDocParser = new DOMParser();
        var postitDoc = postitDocParser.parseFromString(xhr.responseText, 'application/xml')
        callback(postitDoc)*/
    }
    // 4 - 
    xhr.send();
}

document.forms['mon-form'].addEventListener('submit', onformsubmit)

/** --- Automatic test call --- */
setTimeout(jsLoaded, 2123)
setTimeout(testTemplirFormulaire, 4000)
// setTimeout(logFormulaire, 6000)
// setTimeout(getFormulaire, 7000)
/** --------------------------- */

getTemplateView('postit.xhtml',
    function (response) { console.log(response) })

