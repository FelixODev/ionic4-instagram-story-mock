import { Component, OnInit } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-story',
  templateUrl: './story.page.html',
  styleUrls: ['./story.page.scss'],
  providers: [
    CameraPreview,
    Camera
  ],
})
export class StoryPage implements OnInit {

  selectedFilter = null;
  image = '';
  level = 1;
  result: HTMLElement;
  
  // picture options
  pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 85
  }

  canvas: any;
  context: any;

  snapped: boolean = false;
  filtering: boolean = false;
  pickingEmojis: boolean = false;

  constructor(
  private cameraPreview: CameraPreview,
  private camera: Camera
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










   
  // imageLoaded(e) {
  //   // Grab a reference to the canvas/image
  //   this.result = e.detail.result;
  // }
 
  // captureImage() {
  //   // Use with a local asset for testing
  //   // this.image = 'assets/imgs/mallorca.jpg';
  //   // this.filter(null, 1);
 
  //   // Real usage with Camera
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     sourceType: this.camera.PictureSourceType.CAMERA,
  //     correctOrientation: true
  //   }
 
  //   this.camera.getPicture(options).then((imageData) => {
  //     this.image = 'data:image/jpeg;base64,' + imageData;
  //     this.filter(null, 1);
  //   });
  // }
 
  // filter(selected, level?) {
  //   this.selectedFilter = selected;
  //   this.level = level ? level : 1;
  // }
 
  // saveImage() {
  //   if (!this.selectedFilter) {
  //     // Use the original image!
  //   } else {
  //     let canvas = this.result as HTMLCanvasElement;
  //     // export as dataUrl or Blob!
  //     let base64 = canvas.toDataURL('image/jpeg', 1.0);
  //     // Do whatever you want with the result!
  //   }
  // }










  setCanvas(){
    let canvas = <HTMLCanvasElement> document.getElementById('viewport'),
    context = canvas.getContext('2d'),
    base_image = new Image();

    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;

    base_image.src = this.image;
    base_image.onload = function(){
      context.drawImage(base_image, 0, 0, window.innerWidth, window.innerHeight);
    }
  }
  clearCanvas(){
    let canvas = <HTMLCanvasElement> document.getElementById('viewport'),
    context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  }










  hideEmojiPicker(){
    this.pickingEmojis = false;
  }
  showEmojiPicker(){
    this.pickingEmojis = true;
  }










  showFilters(){
    this.filtering = true;
  }










  unsnap(){
    this.image = null;
    this.clearCanvas();
    this.snapped = false;
  }










  snap(){
    // take a snap shot
    this.cameraPreview.takeSnapshot(this.pictureOpts).then((imageData) => {
      this.image = 'data:image/jpeg;base64,' + imageData;
      this.snapped = true;
      this.setCanvas();
    }, (err) => {
      console.log(err);
    });
  }










  

  // takePicture(){
  //   // take a picture
  //   this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
  //     this.image = 'data:image/jpeg;base64,' + imageData;
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }










  switch(){
    this.cameraPreview.switchCamera();
  }










  setEffect(color:string){
    color = (color)?color:'NONE';

    this.filtering = false;

    this.cameraPreview.setColorEffect(
      this.cameraPreview.COLOR_EFFECT[color]
    );
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
