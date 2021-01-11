let count = 0;

let Grille = function (largeur){
    this.largeur = largeur;
    this.number = [];
}

Grille.prototype.afficher = function (){
    this.slot = [];
    this.grille = document.createElement("div");
    this.grille.id = "grille";
    for(let i=0;i<this.largeur;i++){
        let ligne = document.createElement("div");
        ligne.className = "ligne";
        ligne.style.height = 100/this.largeur + "%"
        for(let j=0;j<this.largeur;j++){
            let slot = document.createElement("div");
            slot.className = "slot";
            slot.style.width = 100/this.largeur + "%"
            this.slot.push(slot)
            ligne.append(slot);
        }
        this.grille.append(ligne);
    }
    document.body.append(this.grille)
}

Grille.prototype.event = function (){
    this.slot.forEach(elem => {
        elem.addEventListener("click",function (){
            retourner(elem)
        })
    })
}

Grille.prototype.selectIcone = function (){
    this.slotWithInner = [];
    let len = this.slot.length;
    for(let i = 0; i < this.largeur * this.largeur / 2; i++){
        this.number.push(i);
        this.number.push(i);
    }
    while (this.slotWithInner.length !== len ){
        let random = this.chooseRandomNumber(this.largeur * this.largeur );
        if(this.number[random] !== undefined){
            if(countIterationInArray(this.number[random], this.slotWithInner) < 2){
                this.slotWithInner.push(this.number[random]);
            }
        }
    }
    for(let i=0;i<this.slotWithInner.length;i++){
        this.slot[i].innerHTML = this.slotWithInner[i];
    }
}

function countIterationInArray(item, array){
    let count = 0;
    for(let i = 0; i < array.length; i++){
        if(array[i] === item){
            count++;
        }
    }
    return count;
}

Grille.prototype.chooseRandomNumber = function (max){
    return Math.trunc(Math.random() * max);
}

Grille.prototype.reset

function retourner(elem){
    elem.style.color = "black";
    count++;
}

export {Grille};