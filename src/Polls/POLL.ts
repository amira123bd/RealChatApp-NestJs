
  
  export interface POLL{
    id: string;
    topic: string;
    votesPervoter: number;
   
    AdminID:string;
    hasStarted: boolean;
    //nominations: Nominations;
    // rankings: Rankings;
    // results: Results;
    participants:string[];
  
  }