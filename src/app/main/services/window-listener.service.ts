import { Injectable } from "@angular/core";
import { fromEvent, Subscription, Observable, Subject, BehaviorSubject } from "rxjs";
import { debounceTime, map, distinctUntilChanged, startWith, shareReplay, tap } from "rxjs/operators";


@Injectable({
    providedIn: "root"
})
export class WindowListenerService {
    constructor() { }

    private windowWidth: number = window.innerWidth;
    private windowWidthTracker: Subscription;
    private _mobileMode = new BehaviorSubject<boolean>(this.toggleMobileMode());

    get mobileMode(): Observable<boolean> {
        return this._mobileMode.asObservable()
            .pipe(
                tap(() => console.log("shareReply test")),
                shareReplay(1)
            );
    }

    private resize$ = fromEvent(window, "resize")
        .pipe(
            debounceTime(200),
            map(() => window.innerWidth),
            distinctUntilChanged(),
            startWith(window.innerWidth)
        );

    toggleMobileMode(): boolean {
        return !(this.windowWidth > 768);
    }

    startCheckingWindowWidth(): void {
        this.windowWidthTracker = this.resize$.subscribe(width => {
            this.windowWidth = width;
            this._mobileMode.next(this.toggleMobileMode());
            console.log(`Window width in sub: ${this.windowWidth};`);
        });
    }

    stopCheckingWindowWidth(): void {
        this.windowWidthTracker.unsubscribe();
    }
}
