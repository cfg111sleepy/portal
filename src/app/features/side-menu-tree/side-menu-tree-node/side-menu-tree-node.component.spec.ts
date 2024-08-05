import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuTreeNodeComponent } from './side-menu-tree-node.component';

describe('SideMenuTreeNodeComponent', () => {
  let component: SideMenuTreeNodeComponent;
  let fixture: ComponentFixture<SideMenuTreeNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideMenuTreeNodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideMenuTreeNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
