import 'moment/locale/ru';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhoneInputComponent } from './components/phone-input/phone-input.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MomentModule } from 'ngx-moment';
import { NumberInputComponent } from './components/number-input/number-input.component';
import { InputNumberModule } from 'primeng/inputnumber';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
    declarations: [PhoneInputComponent, NumberInputComponent],
    imports: [
        CommonModule,
        TableModule,
        CardModule,
        ButtonModule,
        InputMaskModule,
        FormsModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        MomentModule,
        InputNumberModule,
        ProgressSpinnerModule
    ],
    exports: [
        TableModule,
        CardModule,
        ButtonModule,
        InputMaskModule,
        FormsModule,
        ReactiveFormsModule,
        PhoneInputComponent,
        ConfirmDialogModule,
        MomentModule,
        NumberInputComponent,
        InputNumberModule,
        ProgressSpinnerModule
    ],
    providers: [ConfirmationService],
})
export class SharedModule {}
