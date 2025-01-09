

export enum CellType{
    PATH, 
    UNDECIDED, 
    WALL
}

export class ColorMap {
    private static table : Map<CellType, [number, number, number]> = 
                            new Map<CellType,[number, number, number]>(); 

    static {
        ColorMap.table.set(CellType.PATH, [255,0,0]); 
        ColorMap.table.set(CellType.UNDECIDED, [0,255,0]);
        ColorMap.table.set(CellType.WALL, [0,0,255]);
    }

    static getColor(cellType : CellType) : string {
        const rgb : [Number, Number, Number] = ColorMap.table.get(cellType)!; 
        const rgbString = "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")"; 
        return rgbString; 
    }
}