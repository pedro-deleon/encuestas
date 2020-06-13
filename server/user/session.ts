import {Moment} from "moment";
import {User} from "../../src/app/model/User";
import moment = require("moment");

export class Session {
  static readonly VALIDITY_MINUTES = 60;
  private readonly validUntil: Moment;
  constructor(public sessionId:string, public user: User){

    this.validUntil = moment().add(Session.VALIDITY_MINUTES, 'minutes');
  }


  isValid(){
    return moment().diff(this.validUntil, 'minutes') <= 0;
  }


}
