export class Talk {
    id: number;
    code: string;
    title: string;
    speaker: string;
    date: string;
    time: string;

    constructor(obj: Partial<Talk>) {
        Object.assign(this, obj);
    }
}
