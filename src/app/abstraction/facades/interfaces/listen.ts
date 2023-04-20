import { Subject } from "rxjs";


export interface listen{
    ListenFeedBack():Subject<string>;
}