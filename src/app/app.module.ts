import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes} from '@angular/router';

// Angular Material modules/dependencies
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

// Components
import { AppComponent } from './app.component';
import { FolderComponent } from './folder/folder.component';

// Services
import { UtilService } from './common/util/util.service';
import { FileService } from './services/file/file.service';

const appRoutes: Routes = [
  { path: 'folders/:id', component: FolderComponent },
  {
    path: 'folders',
    component: FolderComponent,
  },
  { path: '',
    redirectTo: 'folders',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    FolderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: true }
    )
  ],
  providers: [FileService, UtilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
