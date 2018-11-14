export class Instance {
    idVumark: string;
    imgUrl: string;
    stickerState: number;
    shareCount: number;
    readers: Array<any>;
    _id: string;
    stickerset: string;
    owner: {
        user?: string;
        email?: string;
    };
}

/*
{
"stickerState": 0,
"readers":[],
"_id": "5bd48361f3f10722c5cabb0e",
"idVumark": "o0sprjnmnk",
"stickerset": "5bd2170e772ba90b34debc49",
"owner":{}
},
el owner tiene
email
user

const States = Object.freeze({
   Empty: 0,
   Open: 1,
   Sticked: 2,
});
*/
