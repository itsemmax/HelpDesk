const form = document.querySelector("#form");
const desc_err = document.querySelector("#desc_err");
const titre_err = document.querySelector("#titre_err");

const lists=[{id:1,titre:"Connexion Wi-Fi instable",categorie:"Réseau",priorite:"Haute",description:"Le réseau se déconnecte régulièrement."},
{id:2,titre:"Installation d’un logiciel",categorie:"Logiciel",priorite:"Normale",description:"Installer un logiciel sur le poste."},
{id:3,titre:"Clavier défectueux",categorie:"Matériel",priorite:"Basse",description:"Certaines touches ne fonctionnent plus."}
];


function parse_titre(titre){
    if(titre.trim() == "" || titre.length < 2 || titre.length >= 60)
        return true;
    return false;
}
function parse_desc(description){
    if(description.trim() == "" || description.length < 2 || description.length >= 160)
        return true;
    return false;
}
form.addEventListener("submit",function(event) {
    event.preventDefault();

    const titre = form.elements["titre"].value;
    const categorie = form.elements["categorie"].value;
    const priorite = form.elements["priorite"].value;
    const description = form.elements["description"].value;
    titre_err.classList.add("hidden");
    desc_err.classList.add("hidden");

    if (parse_titre(titre) || parse_desc(description)) {
        if(parse_titre(titre) && parse_desc(description)){
        titre_err.classList.remove("hidden");
        desc_err.classList.remove("hidden");
        }
        else if (parse_titre(titre)) {
        titre_err.classList.remove("hidden");
        return;
        }
        else{
            desc_err.classList.remove("hidden");
            return;
        }
        return;
    }
    const demande = {id:lists.length + 1,titre,categorie,priorite,description};

    lists.push(demande);
    form.reset();
});