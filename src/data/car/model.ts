export enum Make {
    Honda,
    Toyota,
    Tesla,
    PORSCHE,
    KIA,
    TESLA,
    MAZDA,
    TOYOTA,
    HONDA,
    JAGUAR,
    MITSUBISHI,
    VOLVO,
    LEXUS,
    PEUGEOT,
    SKODA,
    MERCEDES,
    SEAT,
    HYUNDAI,
    VOLKSWAGEN,
    NISSAN,
    MINI,
    RENAULT
}

export enum Color {
    WHITE,
    BLACK,
    SILVER,
    GREEN,
    YELLOW,
    BRONZE,
    PURPLE,
    MULTI_COLOUR,
    GOLD,
    TURQUOISE,
    PINK,
    MAROON,
    CREAM
}

export type Car = {
    id?: string
    make: Make
    model: string
    color: Color
    year: number
}

