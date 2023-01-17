export type createPollFields={

    topic:string;
    votesPervoter : number;
    name:string;
    
};

export type joinPollFields={
    PollID:string;
    name:string;
};

export type rejoinPollFields={
    pollID:string;
    userID:string;
    name:string;
};