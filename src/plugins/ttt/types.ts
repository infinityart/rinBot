enum sign {
    "cross",
    "circle"
}

export enum possibleMove {
    a1 = "a1",
    a2 = "a2",
    a3 = "a3",
    b1 = "b1",
    b2 = "b2",
    b3 = "b3",
    c1 = "c1",
    c2 = "c2",
    c3 = "c3"
}

export type SymbolOption = keyof typeof sign;
export type PossibleMoveOption = keyof typeof possibleMove;