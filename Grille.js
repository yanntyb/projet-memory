let Grille = function (largeur){
    this.largeur = largeur;
    this.number = [];
    this.count = 0;
    this.choose = [];
    this.same = [];
    this.tabImg = [];
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
            let div = document.createElement("div");
            div.className = "slotDiv";
            div.style.width = 100/ this.largeur + "%"
            let slot = document.createElement("img");
            slot.className = "slot";
            div.append(slot)
            this.slot.push(div)
            ligne.append(div);
        }
        this.grille.append(ligne);
    }
    document.getElementById("global").append(this.grille)
}

Grille.prototype.event = function (){
    let _this =  this
    this.slot.forEach(elem => {
        elem.addEventListener("click",function (){
            if(this.children[0].style.display === "none"){
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
        this.slot[i].alt = this.slotWithInner[i];
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
                i.children[0].style.display = "none";
            }
        }
        this.count = 0;
    }
    console.log(this.choose)
}

Grille.prototype.retourner = function(elem){
    elem.children[0].style.display = "block";
    this.choose.push(elem);
    if(this.count === 2){
        this.checkSame();
    }
    this.reset();
}

Grille.prototype.checkSame = function (){
    if(this.choose[0].children[0].alt === this.choose[1].children[0].alt){
        this.same.push(this.choose[0]);
        this.same.push(this.choose[1]);
    }
}

Grille.prototype.initTabImg = function(){
    let _this = this;
    for(let i = 0; i< (this.largeur**2); i++){
        let req = new XMLHttpRequest();
        req.open("get",`https://loremflickr.com/320/240/bird?random=1`, true);
        req.responseType = 'blob';
        req.send();
        req.onload = function(){
            if(req.status === 200){
                let reponse = URL.createObjectURL(req.response);
                if(_this.tabImg.includes(reponse)){
                    i--
                }else{
                    _this.tabImg.push(reponse)
                }
            }
            if(_this.tabImg.length === _this.largeur**2){
                _this.displayImg()
            }
        }
    }
    this.tabImg = _this.tabImg;
}

Grille.prototype.displayImg = function(){
    let _this = this;
    setTimeout(function(){
        console.log(_this.tabImg.length);
        for(let i = 0;i < _this.slot.length; i++){

            console.log("i" + i + " alt :" + _this.tabImg[_this.slot[i].alt]);
            _this.slot[i].children[0].src = _this.tabImg[_this.slot[i].alt];
            _this.slot[i].children[0].style.display = "none"
        }
    },2000)
}

export {Grille};