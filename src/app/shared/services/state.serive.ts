import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export class StateService<T> {
    private state$: BehaviorSubject<T>;
    state: Observable<T>

    constructor(initialState: T) {
        this.state$ = new BehaviorSubject<T>(initialState);
        this.state = this.state$.asObservable();
    }

    protected select<K>(mapFn: (state: T) => K): Observable<K> {
        return this.state$.asObservable().pipe(
            map((state: T) => mapFn(state)),
            distinctUntilChanged()
        );
    }

    protected selectSnapshot<K extends keyof T>(key: K): T[K] {
        return this.state$.getValue()[key];
    }

    protected setNewState(newState: T) {
        this.state$.next(newState);
    }

    protected setState(newState: Partial<T>) {
        const value = this.state$.getValue();
        this.state$.next({
            ...value,
            ...newState,
        });
    }
}
