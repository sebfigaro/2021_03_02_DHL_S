function jsLoaded() {
    // chargement dans une variable de la balise <div id="jsLoaded">...</div>
    var jsloaded=document.querySelector("#jsLoaded");

    // Mise à jour du fond en vert
    jsloaded.style.backgroundColor="rgba(153, 255, 0, 0.6)";

    // Mise à jour du texte affiché
    jsloaded.innerText="JS Chargé";

    console.log("Chargemnt du JS terminé")
}

setTimeout(jsLoaded, 3210)
