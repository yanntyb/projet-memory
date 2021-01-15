let Grille = function () {
    this.number = [];
    this.count = 0;
    this.choose = [];
    this.same = [];
    this.tabImg = [];
}

Grille.prototype.theme = function (){
    let _this = this;
    Grille = document.getElementById("valid").addEventListener("click",function(){
        if(document.getElementById("largeur").value !== ""){
            _this.largeur = document.getElementById("largeur").value * 2;
            _this.theme = document.getElementById("theme").value;
            _this.afficher();
            _this.event();
            _this.selectIcone();
            _this.initTabImg();
            document.body.removeChild(document.getElementById("action"));
            document.getElementById("load").style.display = "flex";
            return _this;
        }
    })
}

Grille.prototype.afficher = function () {
    this.slot = [];
    this.grille = document.createElement("div");
    this.grille.id = "grille";
    for (let i = 0; i < this.largeur; i++) {
        let ligne = document.createElement("div");
        ligne.className = "ligne";
        ligne.style.height = 100 / this.largeur + "%"
        for (let j = 0; j < this.largeur; j++) {
            let div = document.createElement("div");
            div.className = "slotDiv";
            div.style.width = 100 / this.largeur + "%"
            let slot = document.createElement("img");
            slot.className = "slot";
            slot.style.display = "none"
            div.append(slot)
            this.slot.push(div)
            ligne.append(div);
        }
        this.grille.append(ligne);
    }
    document.getElementById("global").append(this.grille)
}

Grille.prototype.event = function () {
    let _this = this
    this.slot.forEach(elem => {
        elem.addEventListener("click", function () {
            if (this.children[0].style.display === "none") {
                _this.count++;
                _this.retourner(this);
                _this.checkWin();
            }
        })
    })
}

Grille.prototype.selectIcone = function () {
    this.slotWithInner = [];
    let len = this.slot.length;
    for (let i = 0; i < this.largeur * this.largeur / 2; i++) {
        this.number.push(i);
        this.number.push(i);
    }
    while (this.slotWithInner.length !== len) {
        let random = this.chooseRandomNumber(this.largeur * this.largeur);
        if (this.number[random] !== undefined) {
            if (countIterationInArray(this.number[random], this.slotWithInner) < 2) {
                this.slotWithInner.push(this.number[random]);
            }
        }
    }
    for (let i = 0; i < this.slotWithInner.length; i++) {
        this.slot[i].children[0].alt = this.slotWithInner[i];
    }
}

function countIterationInArray(item, array) {
    let countIndex = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === item) {
            countIndex++;
        }
    }
    return countIndex;
}

Grille.prototype.chooseRandomNumber = function (max) {
    return Math.trunc(Math.random() * max);
}

Grille.prototype.reset = function () {
    if (this.count === 3) {
        this.choose = [];
        for (let i of this.slot) {
            if (this.same.includes(i.children[0])) {
                continue;
            } else {
                i.children[0].style.display = "none";
            }
        }
        this.count = 0;
    }
}

Grille.prototype.retourner = function (elem) {
    elem.children[0].style.display = "block";
    this.choose.push(elem);
    if (this.count === 2) {
        this.checkSame();
    }
    this.reset();
}

Grille.prototype.checkSame = function () {
    if (this.choose.length > 1) {
        if (this.choose[0].children[0].alt === this.choose[1].children[0].alt) {
            this.same.push(this.choose[0].children[0]);
            this.same.push(this.choose[1].children[0]);
        }
    }
}

Grille.prototype.initTabImg = function () {
    let _this = this;
    for (let i = 0; i < (this.largeur ** 2); i++) {
        let req = new XMLHttpRequest();
        req.open("get", "https://loremflickr.com/320/240/" + this.theme + "?random=1", true);
        req.responseType = 'blob';
        req.send();
        req.onload = function () {
            if (req.status === 200) {
                let reponse = URL.createObjectURL(req.response);
                if (_this.tabImg.includes(reponse)) {
                    i--
                } else {
                    _this.tabImg.push(reponse)
                }
            }
            if (_this.tabImg.length === _this.largeur ** 2) {
                _this.displayImg();
                console.log("ready")
                document.getElementById("load").style.display = "none";
            }
        }
    }
    this.tabImg = _this.tabImg;
}

Grille.prototype.displayImg = function () {
    let _this = this;
    for (let i = 0; i < _this.slot.length; i++) {
        _this.slot[i].children[0].style.display = "none";
        _this.slot[i].children[0].src = _this.tabImg[_this.slot[i].children[0].alt];
    }
    //_this.debug();
    this.slot = _this.slot;

}

Grille.prototype.checkWin = function () {
    let win = true;
    for (let i of this.slot) {
        if (i.children[0].style.display === "none") {
            win = false;
            break;
        }
    }
    if (win) {
        this.afficherWin()
    }
}

Grille.prototype.afficherWin = function () {
    let divWin = document.createElement("div");
    divWin.id = "win";
    divWin.innerHTML = "Vous avez Gagné !";
    document.body.append(divWin);
}

Grille.prototype.debug = function () {
    this.slot.forEach(elem => {
        elem.children[0].style.display = "block";
    })
}

export {Grille};