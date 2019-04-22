import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

// Config
import { environment } from '../../environments/environment';

// Services
import { FileService } from '../services/file/file.service';
import { UtilService } from '../common/util/util.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {
  @ViewChild('file') fileInput: ElementRef;
  files: any = [];
  env = environment;
  folderId = '';
  folderPath =  '/cloud-elements';
  showSpinner = true;
  constructor(private fileService: FileService,
    private router: Router,
    private route: ActivatedRoute,
    private util: UtilService,
    private location: Location) {
    this.route.paramMap.subscribe(data => {
      const folderId = data['params'].id;
      if (typeof folderId === 'undefined') {
        this.router.navigateByUrl(`folders/${this.env.folderId}`);
      } else {
        this.getFilesAndFolders(folderId);
        this.folderId = folderId;
      }
    });
  }

  ngOnInit() {

  }

  // Event handler when file is selected
  fileChange(event: EventTarget): void {
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    const files: FileList = target.files;
    const formData: FormData = new FormData();
    formData.append('file', files[0]);
    this.uploadFile(formData, files[0].name, this.folderPath);
    this.fileInput.nativeElement.value = '';
  }

  // on click of any card item
  onClickFileItem(item: any): void {
    if (!item.directory) {
      this.getFileById(item.path);
    } else {
      this.folderId = item.id;
      this.folderPath = item.path;
      this.router.navigateByUrl(`folders/${item.id}`);
    }
  }

  // Get folders, files list for a particular folder id
  getFilesAndFolders(id: string): void {
    this.showSpinner = true;
    this.fileService.getFiles(id).subscribe(data => {
      this.showSpinner = false;
      this.files = data;
      if (this.files.length === 0) {
        this.util.showAlert('', 'Selected folder is empty', 'warning');
      }
    }, error => {
      this.showSpinner = false;
      this.util.showAlert('', error.message, 'error');
    });
  }

  // Upload a file
  uploadFile(formData: FormData, name: string, filePath: string): void {
    this.showSpinner = true;
    this.fileService.uploadFile(formData, name, filePath).subscribe(data => {
      this.showSpinner = false;
      this.getFilesAndFolders(this.folderId);
      this.util.showAlert('', 'File uploaded succesfully', 'success');
    }, error => {
      this.showSpinner = false;
      this.util.showAlert('', error.message, 'error');
    });
  }

  // Get a file from a path
  getFileById(path: string): void {
    this.showSpinner = true;
    this.fileService.getFileByFileId(path).subscribe(data => {
      this.showSpinner = false;
      this.util.downloadFile(data, data.type);
    }, error => {
      this.showSpinner = false;
      this.util.showAlert('', error.message, 'error');
    });
  }
  goBack() {
    this.location.back();
    this.folderPath = '/cloud-elements';
  }
}
