import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SearchComponent } from './search.component';

describe('SearchComponet', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSearch when enter is pressed', () => {
    spyOn(component, 'onSearch');

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = 'Test search';
    inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    
    expect(component.onSearch).toHaveBeenCalled();
  });

  it('should emit searchEvent with input value when enter is pressed', () => {
    spyOn(component.searchEvent, 'emit');

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = 'Test search';
    inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    
    expect(component.searchEvent.emit).toHaveBeenCalledWith('Test search');
  });
});
