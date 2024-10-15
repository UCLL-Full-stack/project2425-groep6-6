export class Reservation {

    private date: Date;

    constructor(Reservation: { date: Date }){
        this.date = Reservation.date;
    }
    getDate(): Date {
        return this.date;
    }


}