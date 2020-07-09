import {Session} from "./session";
import {User} from "../../src/app/model/User";
import {Usuario} from "./usuario-model";

class SessionStore {
  private sessions: { [key: string]: Session } = {};

  createSession(sessionId: string, user: User) {
    this.sessions[sessionId] = new Session(sessionId, user);
  }

  async findUserBySessionId(sessionId: string) {
    const session = this.sessions[sessionId];
    if (this.isSessionValid(sessionId)) {

      const userMongo = await Usuario.findOne({email: session.user.email})
      session.user.nombre = userMongo.nombre;
      session.user.apellidoPaterno = userMongo.apellidoPaterno;
      session.user.apellidoMaterno = userMongo.apellidoMaterno;
      session.user._id  = userMongo._id;
      return session.user;
    } else {
      return undefined;
    }
  }

  isSessionValid(sessionId: string): boolean {
    const session = this.sessions[sessionId];
    return session && session.isValid();
  }

  destroySession(sessionId: string) {
    delete this.sessions[sessionId];
  }
}


export const sessionStore = new SessionStore();
