import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {OverlayContainer} from '@angular/cdk/overlay';
import {MatDialog, MatSnackBar} from '@angular/material';

import {CoreModule} from '../../../../../core/core.module';
import {SharedModule} from '../../../../../shared/shared.module';
import {NotificationService} from '../../../../../core/service/notification.service';
import {
  PontuacaoServiceMock
} from '../../../../../../mocks/modules/configuracao/pontuacao/service/pontuacao.service.mock';
import {MatDialogConfirmTrueMock} from '../../../../../../mocks/dialog/mat-dialog-confirm-true.mock';
import {PontuacaoShowMock1} from '../../../../../../mocks/modules/configuracao/pontuacao/pontuacao-show.mock';

import {PontuacaoService} from '../../service/pontuacao.service';
import { ListComponent } from './list.component';

describe('Component Listar: Pontuacao', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let dialog: MatDialogConfirmTrueMock;
  let snackBar: MatSnackBar;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CoreModule,
        SharedModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [ ListComponent ],
      providers: [
        NotificationService,
        {provide: PontuacaoService, useClass: PontuacaoServiceMock },
        {provide: MatDialog, useClass: MatDialogConfirmTrueMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    dialog = TestBed.get(MatDialog);
    fixture.detectChanges();
  });

  beforeEach(inject([MatSnackBar, OverlayContainer], (sb: MatSnackBar, oc: OverlayContainer) => {
    snackBar = sb;
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  it('Verifica a criação do Component Listar: Pontuacao', () => {
    expect(component).toBeTruthy();
  });

  it('Verifica a função on Remove', () => {
    const modal = spyOn(dialog, 'open').and.callThrough();
    expect(() => {
      component.onRemove(PontuacaoShowMock1);
      fixture.detectChanges();
      expect(modal).toHaveBeenCalled();
    }).not.toThrow();
  });

  it('Verifica a função onRemove() -> exception', () => {
    const data = JSON.parse(JSON.stringify(PontuacaoShowMock1));
    data.id = -1;
    expect(() => {
      spyOn(dialog, 'open').and.callThrough();
      component.onRemove(data);
      fixture.detectChanges();
    }).not.toThrow();
  });
});
