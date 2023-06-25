class Field{
    block;
    constructor(){
        this.piece = null;
    }

    reset(){
        this.game = this.getEmptyField();
    }

    getEmptyField(){
        return FIELD;
    }
}