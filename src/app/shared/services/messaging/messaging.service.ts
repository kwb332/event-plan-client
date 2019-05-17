import { Injectable } from "@angular/core";
import{Subject, Observable} from 'rxjs';

@Injectable()
export class MessagingService
{
    public onTabChange$ = new Subject<any>();
    private subject = new Subject<string>();
    private objectSubject = new Subject<any>();

    sendMessage(message : string)
    {
        this.subject.next(message);
        console.log(message);
    }
    sendObject(payload : any)
    {
        this.objectSubject.next(payload);

    }
    clearMessage()
    {
        this.subject.next();
    }
    getObject(): Observable<any>
    {
        return this.objectSubject.asObservable();
    }
    getMessage(): Observable<any>
    {
        return this.subject.asObservable();
    }
    constructor()
    {

    }
    tabChanged()
    {
        this.onTabChange$.next();
    }
} 