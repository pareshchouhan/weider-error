import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-first-app';
  allowAdd = false;
  serverStatus = "hiii"
  constructor() {
    setTimeout(() => this.allowAdd = true, 2000)
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker('./web-workers/utility.worker', { type: 'module' });
      worker.onmessage = ({ data }) => {
        console.log(`page got message: ${data}`);
      };
      console.log(worker);
      worker.postMessage('hello');
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
      console.log('Not supported');
    }
  }

  onCreateServer () {
    this.serverStatus = "Creating..."
  }

  onMouseEnter() {
    this.serverStatus = 'Loading.....'
  }

}