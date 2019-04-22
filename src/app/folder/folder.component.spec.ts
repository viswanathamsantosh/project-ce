import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderComponent } from './folder.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FileService } from '../services/file/file.service';
import { UtilService } from '../common/util/util.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
describe('FolderComponent', () => {
  let component: FolderComponent;
  let fixture: ComponentFixture<FolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FolderComponent],
      imports: [MatToolbarModule,
        MatGridListModule,
        MatCardModule,
        MatIconModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule,
        RouterTestingModule],
      providers: [FileService, UtilService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('files should be defined with []', () => {
    expect(component.files).toBeDefined();
    expect(component.files).toEqual([]);
  });
  it('folderPath should be defined', () => {
    expect(component.folderPath).toBeDefined();
    expect(component.folderPath).toEqual('/cloud-elements');
  });
  it('showSpinner should be defined', () => {
    expect(component.showSpinner).toBeDefined();
    expect(component.showSpinner).toBeTruthy();
  });
  it('fileChange method should be defined', () => {
    expect(component.fileChange).toBeTruthy();
  });
  it('onClickFileItem method should be defined', () => {
    expect(component.onClickFileItem).toBeTruthy();
  });
  it('getFilesAndFolders method should be defined', () => {
    expect(component.getFilesAndFolders).toBeTruthy();
  });
  it('uploadFile method should be defined', () => {
    expect(component.uploadFile).toBeTruthy();
  });
  it('getFileById method should be defined', () => {
    expect(component.getFileById).toBeTruthy();
  });
  it('goBack method should be defined', () => {
    expect(component.goBack).toBeTruthy();
  });
  it('onClickFileItem method', () => {
    const item = {
      directory: false,
      path: '/path'
    };
    const val = component.onClickFileItem(item);
    expect(component.getFileById).toHaveBeenCalledWith(item.path);
  });
});
