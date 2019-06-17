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

  emojis = [
    '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😗', '😙', '😚', '🙂', '🤗', '🤩', '🤔', '🤨', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '😴', '😌', '😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🙃', '🤑', '😲', '🙁', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😰', '😱', '😳', '🤪', '😵', '😡', '😠', '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😇', '🤠', '🤡', '🤥', '🤫', '🤭', '🧐', '🤓', '😈', '👿', '👹', '👺', '💀', '👻', '👽', '🤖', '💩', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'
    ];
  smileys = [];

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
    this.canvas = <HTMLCanvasElement> document.getElementById('viewport'),
    this.context = this.canvas.getContext('2d');

    this.context.canvas.width = screen.availWidth;
    this.context.canvas.height = screen.availHeight;
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
    let base_image = new Image();

    base_image.src = this.image;
    base_image.onload = () => {
      this.context.drawImage(base_image, 0, 0, this.canvas.width, this.canvas.height);
      //this.addEmoji();
    }
  }
  clearCanvas(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }










  hideEmojiPicker(){
    this.pickingEmojis = false;
  }
  showEmojiPicker(){
    this.pickingEmojis = true;
  }
  addEmoji(emoji){
    this.smileys.push(emoji);
  }
  writeEmoji(smiley, x, y){
    this.context.font = '50px HelveticaNeue';
    this.context.fillText( smiley, x, y );
  }










  showFilters(){
    this.filtering = true;
  }










  unsnap(){
    this.image = null;
    this.smileys = [];
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
