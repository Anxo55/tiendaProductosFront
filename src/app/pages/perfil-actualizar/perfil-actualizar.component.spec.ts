import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilActualizarComponent } from './perfil-actualizar.component';

describe('PerfilActualizarComponent', () => {
  let component: PerfilActualizarComponent;
  let fixture: ComponentFixture<PerfilActualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilActualizarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
