
export enum CellType{
    PATH, 
    UNDECIDED, 
    WALL
}

export class Cell {
    private static colorMap : Map<CellType, [number, number, number]> = 
                            new Map<CellType,[number, number, number]>(); 

    static {
        Cell.colorMap.set(CellType.PATH, [255,0,0]); 
        Cell.colorMap.set(CellType.UNDECIDED, [0,255,0]);
        Cell.colorMap.set(CellType.WALL, [0,0,255]);
    }
     
    private color : [number, number, number] | undefined = [0,0,0]; 
    constructor(readonly xPos : number, readonly yPos : number, public type : CellType){
        this.color = Cell.colorMap.get(type); 
    }

    getColor() : string {
        if (this.color == undefined){
            throw new Error("Color Undefined error"); 
        }
        return "rgb(" + this.color[0] + "," + this.color[1] + "," + this.color[2] + ")";  
    }

    setColor(color : [number, number, number]) : void {
        this.color = color; 
    }
}