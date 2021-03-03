function jsLoaded() {
    // chargement dans une variable de la balise <div id="jsLoaded">...</div>
    var jsloaded=document.querySelector("#jsLoaded");

    // Mise à jour du fond en vert
    jsloaded.style.backgroundColor="rgba(153, 255, 0, 0.6)";

    // Mise à jour du texte affiché
    jsloaded.innerText="JS Chargé";

    console.log("Chargemnt du JS terminé")
}


function remplirFormulaire() {
    var form = document.forms["mon-form"]
    if (form["form-titre"].value == "") {
        form["form-titre"].value = "Test";
        form["form-auteur"].value = 2;
        form["form-date"].value = "2021-03-03";
        form["form-time"].value = "15:22";
        form["form-email"].value = "ss@ss.ss";
        form["form-adresse"].value = "anywhere";
        form["form-description"].value = "Desc test";
        console.log("Remplissage de texte de test terminé");
    }
    else {
        console.log("Auteur rempli, pas de remplissage automatique!");
    }
}

function logFormulaire() {
    var form = document.forms["mon-form"]
    console.log("Titre :", form["form-titre"].value);
    console.log("Auteur :", form["form-auteur"].value);
    console.log("Date :", form["form-date"].value);
    console.log("Heure :", form["form-time"].value);
    console.log("Email :", form["form-email"].value);
    console.log("Adresse :", form["form-adresse"].value);
    console.log("Description :", form["form-description"].value);
}

function getFormulaire() {
    var form = document.forms["mon-form"]
    var unPostIt={
        titre:form["form-titre"].value,
        auteur:form["form-auteur"].value, 
        date:form["form-date"].value, 
        heure:form["form-time"].value,
        email:form["form-email"].value, 
        adresse:form["form-adresse"].value,
        description:form["form-description"].value
    }
    console.log(unPostIt)
    return unPostIt
}

setTimeout(jsLoaded, 3210)
setTimeout(remplirFormulaire, 5000)
setTimeout(logFormulaire, 6000)
setTimeout(getFormulaire, 7000)
