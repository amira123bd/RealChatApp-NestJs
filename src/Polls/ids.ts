import { customAlphabet,nanoid } from "nanoid";
import { Socket } from "socket.io";

export const createPollID= customAlphabet(
    '123456789ABCDEFGIJKLMNOPQRST',7
)

export const createUserID=()=>nanoid();
export const createNominationID=()=>nanoid(8);

// guard types
type AuthPayload = {
    userID: string;
    pollID: string;
    name: string;
  };
  
  export type RequestWithAuth = Request & AuthPayload;
  export type SocketWithAuth = Socket & AuthPayload;
