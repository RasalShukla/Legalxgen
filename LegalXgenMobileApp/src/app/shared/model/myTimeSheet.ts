export class MyTimeSheet
{
    constructor(
        public matterId:number,
        public matter: string,
        public client: string, 
        public t: number,
        public b: number,
        public nb: number,){  
        }
    static fromJson({ matterId, matter, client, t, b, nb}) {
    return new MyTimeSheet(matterId, matter, client, t, b, nb);
  }
}    