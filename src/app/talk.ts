export class Talk {
    code: string;
    title: string;
    speaker: string;
    date: string;
    time: string;

    constructor(obj: Partial<Talk>) {
        Object.assign(this, obj);
    }
}
