import { Component, OnInit } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';

@Component({
  selector: 'app-story',
  templateUrl: './story.page.html',
  styleUrls: ['./story.page.scss'],
  providers: [
    CameraPreview
  ],
})
export class StoryPage implements OnInit {
  
  // picture options
  pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 85
  }

  picture: any;

  constructor(
  private cameraPreview: CameraPreview
  ) {
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: 'rear',
      tapPhoto: false,
      previewDrag: false,
      toBack: true,
      alpha: 1
    }

    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res)
        this.cameraPreview.show()
      },
      (err) => {
        console.log(err)
      });
  }

  ngOnInit() {
  }










  snap(){

    // take a picture
    // this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
    //   this.picture = 'data:image/jpeg;base64,' + imageData;
    // }, (err) => {
    //   console.log(err);
    //   this.picture = 'assets/img/test.jpg';
    // });

    // take a snap shot
    this.cameraPreview.takeSnapshot(this.pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
      this.picture = 'assets/img/test.jpg';
    });
  }










  switch(){
    this.cameraPreview.switchCamera();
  }










  setEffect(){
    this.cameraPreview.setColorEffect('negative');
  }









  stop(){
    this.cameraPreview.stopCamera();
  }










  flash(){
    this.cameraPreview.getFlashMode()
    .then((currentFlashMode)=>{
      if(currentFlashMode == 'OFF'){
        this.cameraPreview.setFlashMode(this.cameraPreview.FLASH_MODE.ON);
      } else {
        this.cameraPreview.setFlashMode(this.cameraPreview.FLASH_MODE.OFF);
      }
    });
  }

}
