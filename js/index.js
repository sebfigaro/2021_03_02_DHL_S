function une_fonction()
{
    // chargement dans une variable de la balise <div id="jsLoaded">...</div>
    var jsloaded=document.querySelector("#jsLoaded");

    // Mise à jour du fond en vert
    jsloaded.style.backgroundColor="green";

    // Mise à jour du texte affiché
    jsloaded.innerText="JS Chargé";
}

setTimeout(une_fonction, 3210)

console.log("Chargemnt du JS terminé")