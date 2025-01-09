import { CellType, ColorMap } from "./app.colorsCellTypes";


export class Cell {
    private color : String = "rgb(0,0,0)";  
    constructor(readonly xPos : number, readonly yPos : number, public type : CellType){
        this.color = ColorMap.getColor(type); 
    }

    getColor() : string {
        if (this.color == undefined){
            throw new Error("Color Undefined error"); 
        }
        return "rgb(" + this.color[0] + "," + this.color[1] + "," + this.color[2] + ")";  
    }

    updateType(cellType : CellType ) : void {
        this.color = ColorMap.getColor(cellType);
        this.type  = cellType; 
    }
}