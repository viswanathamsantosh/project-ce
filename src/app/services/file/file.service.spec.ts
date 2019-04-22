import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { FileService } from './file.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('FileService', () => {
  let injector: TestBed;
  let service: FileService;
  let httpMock: HttpTestingController;
  const files = ['file1', 'file2'];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FileService]
    });
    injector = getTestBed();
    service = injector.get(FileService);
    httpMock = injector.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('getFileByFileId should be defined', () => {
    expect(service.getFileByFileId).toBeTruthy();
  });
  it('getFiles should be defined', () => {
    expect(service.getFiles).toBeTruthy();
  });
  it('uploadFile should be defined', () => {
    expect(service.uploadFile).toBeTruthy();
  });
  it('should get files', () => {
    service.getFiles('testId').subscribe(data => {
      expect(data[0]).toEqual(files[0]);
      expect(data).toEqual(files);
    });
    const req = httpMock.expectOne(`${service.env.serviceIp}/folders/testId/contents`);
    expect(req.request.method).toBe('GET');
    req.flush(files);

    httpMock.verify();
  });
  it('should upload files', () => {
    const form = new FormData();
    const response = {
      'createdDate': '2019-04-22T12:47:43.440Z',
      'directory': true,
      'id': 'string',
      'modifiedDate': '2019-04-22T12:47:43.440Z',
      'name': 'string',
      'path': 'string',
      'size': 0,
      'tags': [
        'string'
      ],
      'properties': {
        '<field_key>': 'string'
      }
    };
    service.uploadFile(form, 'file1.png', '/path').subscribe(data => {
      expect(data).toEqual(response);
    });
    const req = httpMock.expectOne(`${service.env.serviceIp}/files?path=/path/file1.png`);
    expect(req.request.method).toBe('POST');
    req.flush(response);

    httpMock.verify();
  });
  it('should get a file', () => {
    const form = new FormData();
    const response = new Blob();
    service.getFileByFileId('/file1.png').subscribe(data => {
      expect(data).toEqual(response);
    });
    const req = httpMock.expectOne(`${service.env.serviceIp}/files?path=/file1.png`);
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('blob');
    req.flush(response);
    httpMock.verify();
  });
});
