import { OnDestroy, Directive } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export class ComponentDestroy implements OnDestroy {
  public destroy$: Subject<void> = new Subject<void>();

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
