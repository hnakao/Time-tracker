export class Sticker {
    _id: string;
    eventName: string;
    eventUrl: string;
    instanceCount: number;
    shareCount: number;
    logoBase64: string;

    constructor(eventName: string, instanceCount: number, logoBase64: string) {
        this.eventName = eventName;
        this.instanceCount = instanceCount;
        this.logoBase64 = logoBase64;
        this.eventUrl = '';
        this.shareCount = 0;
    }
}

/*
eventName:"firstSticker"
eventUrl:""
idLength:10
instanceCount:1
logoBase64:"..."
status:0
__v:0
_id:"5bd4ad25fc79c267ac15f960"
 */
