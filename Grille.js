let Grille = function (largeur){
    this.largeur = largeur;
    this.number = [];
    this.count = 0;
    this.choose = [];
    this.same = [];
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
            slot.style.color = "white";
            this.slot.push(slot)
            ligne.append(slot);
        }
        this.grille.append(ligne);
    }
    document.body.append(this.grille)
}

Grille.prototype.event = function (){
    let _this =  this
    this.slot.forEach(elem => {
        elem.addEventListener("click",function (){
            if(this.style.color === "white"){
                _this.count++;
                _this.retourner(this);
            }
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
    let countIndex = 0;
    for(let i = 0; i < array.length; i++){
        if(array[i] === item){
            countIndex++;
        }
    }
    return countIndex;
}

Grille.prototype.chooseRandomNumber = function (max){
    return Math.trunc(Math.random() * max);
}

Grille.prototype.reset = function (){
    if(this.count === 3){
        this.choose = [];
        for(let i of this.slot){
            if(this.same.includes(i)){
                continue;
            }
            else{
                i.style.color = "white";
            }
        }
        this.count = 0;
    }
    console.log(this.choose)
}

Grille.prototype.retourner = function(elem){
    elem.style.color = "black";
    this.choose.push(elem);
    if(this.count === 2){
        this.checkSame();
    }
    this.reset();
}

Grille.prototype.checkSame = function (){
    if(this.choose[0].innerHTML === this.choose[1].innerHTML){
        this.same.push(this.choose[0]);
        this.same.push(this.choose[1]);
        console.log("same")
    }
}


export {Grille};