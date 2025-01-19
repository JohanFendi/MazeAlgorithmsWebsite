
export type Edge = [Cell, Cell, Cell, number]; //Current cell, edge cell, next cell, weight (random number 0-1)


export class Cell {
    private _color : String;   
    constructor(readonly xPos : number, readonly yPos : number, public type : CellType){
        this._color = ColorMap.getColor(type); 
    }

    get color() : string {
        if (this._color == undefined){
            throw new Error("Color Undefined error"); 
        }
        return "rgb(" + this._color[0] + "," + this._color[1] + "," + this._color[2] + ")";  
    }

    public updateType(cellType : CellType ) : void {
        this._color = ColorMap.getColor(cellType);
        this.type  = cellType; 
    }
}


export enum CellType{
    PATH, 
    UNDECIDED, 
    WALL,
    BEINGDECIDED
}


export class ColorMap {
    private static readonly constructorError : string = "Colormap can not be instantiated."
    private static readonly table : Map<CellType, [number, number, number]> = 
                            new Map<CellType,[number, number, number]>(); 


    private constructor(){
        throw new Error(ColorMap.constructorError); 
    }


    static {
        ColorMap.table.set(CellType.PATH, [255,255,255]); 
        ColorMap.table.set(CellType.UNDECIDED, [125,125,125]);
        ColorMap.table.set(CellType.WALL, [0,0,0]);
        ColorMap.table.set(CellType.BEINGDECIDED, [100,0,0]);
    }

    
    public static getColor(cellType : CellType) : string {
        const rgb : [Number, Number, Number] = ColorMap.table.get(cellType)!; 
        const rgbString = "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")"; 
        return rgbString; 
    }
}