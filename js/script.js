const articles = document.getElementById("articles");
const form = document.querySelector("#form");
const desc_err = document.querySelector("#desc_err");
const titre_err = document.querySelector("#titre_err");
const demandes = document.querySelector("#demandes");
const titre = form.elements["titre"];
const categorie = form.elements["categorie"];
const priorite = form.elements["priorite"];
const description = form.elements["description"];
const table = document.querySelector("#table");
const t_body = document.querySelector("#t_body");
const carte_btn = document.querySelector("#carte-btn");
const list_btn = document.querySelector("#list-btn");

let lists = [
  {
    id: 1,
    titre: "Connexion Wi-Fi instable",
    categorie: "Réseau",
    priorite: "Haute",
    description: "Le réseau se déconnecte régulièrement.",
},
{
  id: 2,
  titre: "Installation d’un logiciel",
  categorie: "Logiciel",
  priorite: "Normale",
  description: "Installer un logiciel sur le poste.",
},
{
  id: 3,
  titre: "Clavier défectueux",
  categorie: "Matériel",
  priorite: "Basse",
  description: "Certaines touches ne fonctionnent plus.",
},
];

if (localStorage.getItem("demandes"))
  lists = JSON.parse(localStorage.getItem("demandes"));
else
  localStorage.setItem("demandes", JSON.stringify(lists));

if (lists.length === 0)
    counter = 1;
else
    counter = lists[lists.length - 1].id + 1;
let check = 0;

afficher();

function parse_titre(titre) {
  if (titre.trim() == "" || titre.length < 2 || titre.length >= 60) return true;
  return false;
}

function parse_desc(description) {
  if (
    description.trim() == "" ||
    description.length < 2 ||
    description.length >= 160
  )
    return true;
  return false;
}
function modifier(dmd){
    const check_mod= confirm(
        "Voulez-vous vraiment modifier cette demande ?"
    );
    if(check_mod){
      titre.value = dmd.titre;
      categorie.value = dmd.categorie;
      description.value = dmd.description;
      priorite.value = dmd.priorite;
      check = dmd.id;
      form.scrollIntoView(true);
    }
}
function delete_card(carte){
  const check_delete= confirm(
        "Voulez-vous vraiment supprimer cette demande ?"
    );
    if (check_delete) {
      lists = lists.filter(item => item.id !== carte.id);
      localStorage.setItem("demandes", JSON.stringify(lists));
      afficher();
    }
}
function afficher() {
    articles.textContent="";
    lists = JSON.parse(localStorage.getItem("demandes"));
    demandes.className = "bg-[#EBEFF4] text-[#5C697B] text-[11px] py-2.5 px-3 ml-2 rounded-2xl";
    demandes.textContent = `${lists.length} demandes`;
  for (let i = 0; i < lists.length; i++) {
    const article = document.createElement("article");
    article.className = "w-full p-5 bg-[#FFFFFF] my-4 rounded-2xl md:w-[350px] xl:w-[450px]";

    const div_1 = document.createElement("div");
    div_1.className = "flex justify-between";

    const img = document.createElement("img");
    img.src = "assets/images/card_img.png";
    img.alt = "card-img";
    img.className = "w-15";

    const p = document.createElement("p");
    p.className = "text-[11px] text-[#99A4B2] mt-4.5";
    p.textContent = `HD-${String(lists[i].id).padStart(3, "0")}`;

    div_1.append(img, p);

    const h2 = document.createElement("h2");
    h2.className = "text-[#243143] text-[16px] py-2.5 font-bold";
    h2.textContent = `${lists[i].titre}`;

    const p_2 = document.createElement("p");
    p_2.className = "text-[#8D99A8] text-[11px]";
    p_2.textContent = `${lists[i].description}`;

    const div_2 = document.createElement("div");
    div_2.className = "flex gap-2 text-[11px] font-bold my-7";

    const p_3 = document.createElement("p");
    p_3.className = "bg-[#F0F3F7] text-[#64748B] px-5 py-1 rounded-xl";
    p_3.textContent = `${lists[i].categorie}`;

    const p_4 = document.createElement("p");
    if(lists[i].priorite == "Haute")
        p_4.className = "bg-[#FFF0E8] text-[#BA6444] px-5 py-1 rounded-xl";
    else if(lists[i].priorite == "Normale")
        p_4.className = "bg-[#FFF5DF] text-[#A67A2B] px-5 py-1 rounded-xl";
    else
        p_4.className = "bg-[#E8F6EE] text-[#388867] px-5 py-1 rounded-xl";
    p_4.textContent = `${lists[i].priorite}`;

    div_2.append(p_3);
    div_2.append(p_4);

    const div_3 = document.createElement("div");
    div_3.className ="flex justify-end text-[13px] gap-3 border-t pt-3 border-[#EDF0F3]";

    const btn_1 = document.createElement("button");
    btn_1.className = "text-[#617084]";
    btn_1.id = "edit-btn";
    btn_1.textContent = "✎ Modifier";
    btn_1.addEventListener("click", function () {
        modifier(lists[i]);
    });

    const btn_2 = document.createElement("button");
    btn_2.className = "text-[#CC626A]";
    btn_2.id = "delete-btn";
    btn_2.textContent = "♜ Supprimer";
    btn_2.addEventListener("click",function(){
      delete_card(lists[i]);
    })

    div_3.append(btn_1, btn_2);

    article.append(div_1, h2, p_2, div_2, div_3);
    articles.append(article);
  }
  afficher_tableau();
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  titre_err.classList.add("hidden");
  desc_err.classList.add("hidden");

  if (parse_titre(titre.value) || parse_desc(description.value)) {
    if (parse_titre(titre.value) && parse_desc(description.value)) {
      titre_err.classList.remove("hidden");
      desc_err.classList.remove("hidden");
      return;
    } else if (parse_titre(titre.value)) {
      titre_err.classList.remove("hidden");
      return;
    } else {
      desc_err.classList.remove("hidden");
      return;
    }
  }
  if(check === 0){
  const demande = {
    id: counter,
    titre: titre.value,
    categorie: categorie.value,
    priorite: priorite.value,
    description: description.value,
  };
  counter++;
  lists.push(demande);
  }
  else{
    for (let i = 0; i < lists.length; i++) {

            if (lists[i].id === check) {
                lists[i].titre = titre.value;
                lists[i].categorie = categorie.value;
                lists[i].priorite = priorite.value;
                lists[i].description = description.value;
                break;
            }
        }
      check = 0;
  }
  localStorage.setItem("demandes", JSON.stringify(lists));
  afficher();
  form.reset();
});
carte_btn.addEventListener("click", function () {
    articles.classList.remove("md:hidden");
    carte_btn.className = "px-2 bg-[#FFFFFF] text-xs text-[#202A38] rounded-xl font-bold";
    table.classList.add("hidden");
    list_btn.className ="px-2 text-[#202A38] text-xs";
});

list_btn.addEventListener("click", function () {
    articles.classList.add("md:hidden");
    list_btn.className = "px-2 bg-[#FFFFFF] text-xs text-[#202A38] rounded-xl font-bold";
    table.classList.remove("hidden");
    carte_btn.className ="px-2 text-[#202A38] text-xs";
});

function afficher_tableau() {
    t_body.textContent = "";

    for (let i = 0; i < lists.length; i++) {
        const tr = document.createElement("tr");
        tr.className = "border-b border-[#EDF0F3]";

        const td_id = document.createElement("td");
        td_id.className = "py-5 px-5 font-bold";
        td_id.textContent =`HD-${String(lists[i].id).padStart(3, "0")}`;

        const td_titre = document.createElement("td");

        const title = document.createElement("h3");
        title.className = "font-bold text-[#263441]";
        title.textContent = lists[i].titre;

        const desc = document.createElement("p");
        desc.className = "text-[#99A4B2]";
        desc.textContent = lists[i].description;

        td_titre.append(title, desc);

        const td_categorie = document.createElement("td");

        const category = document.createElement("span");
        category.className = "bg-[#F0F3F7] text-[#64748B] px-5 py-1 rounded-xl";
        category.textContent = lists[i].categorie;
        td_categorie.append(category);

        const td_priorite = document.createElement("td");
        const priority = document.createElement("span");
        if (lists[i].priorite == "Haute")
            priority.className = "bg-[#FFF0E8] text-[#BA6444] px-5 py-1 rounded-xl";
        else if (lists[i].priorite == "Normale")
            priority.className = "bg-[#FFF5DF] text-[#A67A2B] px-5 py-1 rounded-xl";
        else
          priority.className = "bg-[#E8F6EE] text-[#388867] px-5 py-1 rounded-xl";

        priority.textContent = lists[i].priorite;
        td_priorite.append(priority);
        const td_action = document.createElement("td");

        const edit_btn = document.createElement("button");
        edit_btn.className = "text-[#617084] mr-5";
        edit_btn.textContent = "✎";
        edit_btn.addEventListener("click", function () {
            modifier(lists[i]);
        });

        const delete_btn = document.createElement("button");
        delete_btn.className = "text-[#CC626A]";
        delete_btn.textContent = "♜";
        delete_btn.addEventListener("click", function () {
            delete_card(lists[i]);
        });

        td_action.append(edit_btn, delete_btn);
        tr.append(td_id,td_titre,td_categorie,td_priorite,td_action);
        t_body.append(tr);
    }
}