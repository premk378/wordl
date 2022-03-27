export class Letter {
    text: string;
    active: boolean;
    color: string;
    type: string;
    fill: boolean;

    constructor(text?, active?, color?, type?, fill?) {
        this.text = text;
        this.active = active;
        this.color = color;
        this.type = type;
        this.fill = fill;
    }

}