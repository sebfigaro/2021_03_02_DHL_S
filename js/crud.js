/**
 * Objet de manipulation de donne avec REST
 * @param {URL} adresseSrv Adresse de base du serveur REST
 */
function Crud(adresseSrv){
    /**
     * Pour lire des information
     * @param {String} ressource Adresse de la ressource (/postits ou postits/1)
     * @param {Function} callback function
     */
    this.get=function(ressource, callback) {
        callXhr('GET',ressource, callback)
    }
    /**
     * Pour ajouter une entree
     * @param {String} ressource Adresse de la ressource (/postits ou postits/1)
     * @param {Function} callback function
     * @param {String} body String Json 
     */
    this.post=function(ressource, callback, body) {
        callXhr('POST',ressource, callback, body)
    }
    /**
     * 
     * @param {String} ressource Adresse de la ressource (/postits ou postits/1)
     * @param {Function} callback function
     * @param {String} body String Json 
     */
    this.put=function(ressource, callback, body) {
        callXhr('PUT',ressource, callback, body)
    }
    /**
     * 
     * @param {String} ressource Adresse de la ressource (/postits ou postits/1)
     * @param {Function} callback function
     * @param {String} body String Json 
     */
    this.patch=function(ressource, callback, body) {
        callXhr('PATCH',ressource, callback, body)
    }
    /**
     * 
     * @param {String} ressource Adresse de la ressource (/postits ou postits/1)
     * @param {Function} callback function
     */
    this.remove=function(ressource, callback) {
        callXhr('DELETE',ressource, callback)
    }

    /**
     * Methode pour manipuler de maniere generique 
     * @param {String} method Methode HTTP (GET, POST, PUT, PATCH, DELETE)
     * @param {String} ressource Adresse de la ressource (/postits ou postits/1)
     * @param {Function} callback function
     * @param {String?} body (facultatif) String Json
     */
    function callXhr(method, ressource, callback, body) {
        console.log('callXhr appele\nMethod:' + method + '\nRessource:' + ressource)
        var xhr = new XMLHttpRequest();
        xhr.open(method, adresseSrv+ressource);
        // contenu envoye
        xhr.setRequestHeader('Content-Type', 'application/json');
        // contenu accepte en retour
        xhr.setRequestHeader('Accept', 'application/json');
        // Gestion de l'evenement changement d'etat
        xhr.onreadystatechange=function(evt){
            // Requete est elle en cours ?
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            // Requete en erreur ?
            if (xhr.status !== 200 && xhr.status !== 201) return;
            // Requete terminee sans erreur
            callback(xhr.response);
        }
        // Envoi du contenu, si body n'est pas fournis il est undefined
        xhr.send(body);
    }
}

var crud = new Crud('http://localhost:5629');
