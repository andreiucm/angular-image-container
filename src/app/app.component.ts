import { Component,ViewChild,
    ElementRef, } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild("imageTag") imageTag: ElementRef;
  naturalWidth: number;
  naturalHeight: number;
  name = 'Angular';
  optimalSize = 200;
  cropData = {
    cropX: 908,
    cropY: 2331,
    cropHeight: 3184,
    cropWidth: 3184
  }
  image = {
    url: "https://developchat.s3.amazonaws.com/3d34e6e5-5a60-4ad8-9562-98928b77b5a0.jpeg",
    cropX: 0,
    cropY: 0,
    cropWidth: undefined,
    cropHeight: undefined,
    imageInstances: [
      {
      url: "https://developchat.s3.amazonaws.com/6a93b400-d7b6-4d31-9e99-adb222fbdaba.jpeg",
      width: 100,
      height: 100,
      sizeKB: 6
    }, {
      url: "https://developchat.s3.amazonaws.com/bb72951e-1816-4866-a59e-2fb715d8460b.jpeg",
      width: 250,
      height: 250,
      sizeKB: 18
    }, {
      url: "https://developchat.s3.amazonaws.com/8a039dcb-9401-44a0-814c-111211166636.jpeg",
      width: 500,
      height: 500,
      sizeKB: 57
    }, {
      url: "https://developchat.s3.amazonaws.com/8e9b96be-172f-4544-967b-c209a0b9200e.jpeg",
      width: 1000,
      height: 1000,
      sizeKB: 204
    }, {
      url: "https://developchat.s3.amazonaws.com/4b8eae68-5bdd-40d4-82df-b34524f27414.jpeg",
      width: 1500,
      height: 1500,
      sizeKB: 436
    }, {
      url: "https://developchat.s3.amazonaws.com/2e3bbda6-4049-4584-a290-8695d925b993.jpeg",
      width: 2000, height: 2000, sizeKB: 746
    }, {
      url: "https://developchat.s3.amazonaws.com/cecad9c8-342a-4b13-a1d9-38aa88ff2af9.jpeg",
      width: 2500,
      height: 2500,
      sizeKB: 1129
    }, {
      url: "https://developchat.s3.amazonaws.com/804566f6-02aa-449e-bab4-d17b7034008c.jpeg",
      width: 3000,
      height: 3000,
      sizeKB: 1566
    }, {
      url: "https://developchat.s3.amazonaws.com/8dc82b8c-3154-405c-9872-0fae840abca5.jpeg",
      width: 3184,
      height: 3184,
      sizeKB: 1771
    }, 
    {
      isOriginal: true,
      url: "https://developchat.s3.amazonaws.com/3d34e6e5-5a60-4ad8-9562-98928b77b5a0.jpeg",
      width: 6000,
      height: 4000,
      sizeKB: 6527
    }
    ]

  }
  optimalImage: any; 

  constructor() {}

  ngOnInit() {
    this.image.imageInstances.sort((x, y) => x.width - y.width);
    let indexx = -1;
    this.image.imageInstances.findIndex(i => {
      indexx++;
      return i.width > this.optimalSize
    });
  this.optimalImage = indexx > 0 && indexx < this.image.imageInstances.length-1 ? this.image.imageInstances[indexx-1] : this.image.imageInstances[indexx];
  }

  ngAfterViewInit(){
    this.naturalWidth = this.imageTag.nativeElement.naturalWidth;
    this.naturalHeight = this.imageTag.nativeElement.naturalHeight;
  }

  resetComponentSize(newSize) {
    this.optimalSize = newSize;
    let indexx = -1;
    this.image.imageInstances.findIndex(i => {
        indexx++;
        return i.width > this.optimalSize;
      });
  this.optimalImage = indexx > 0 && indexx < this.image.imageInstances.length-1 ? this.image.imageInstances[indexx-1] : this.image.imageInstances[indexx];
  }

  cropImage() {
    this.image.cropX = this.cropData.cropX;
    this.image.cropY = this.cropData.cropY;
    this.image.cropWidth = this.cropData.cropWidth;
    this.image.cropHeight = this.cropData.cropHeight; 
  }

  resetCropData() {
    this.image.cropX = undefined;
    this.image.cropY = undefined;
    this.image.cropWidth = undefined;
    this.image.cropHeight = undefined;
  }

  removeOptimalInstance() {
    this.optimalImage = undefined;
  }

  get imageWrapperStyle() {
    return {
      width: this.isOriginal ? this.cropWidth : this.imageWidth,
      height: this.isOriginal ? this.cropHeight : this.imageHeight
    };
  }

  get imageStyle() {
    return this.isOriginal && this.isCroped ? {
      "width": this.imageWidth,
      "height": this.imageHeight,
      "left": `-${this.image.cropX*this.scaleX}px`,
      "right": `-${this.image.cropY*this.scaleY}px`, 
    } : {
      "max-width": "100%",
      "max-height": "100%"
    };
  }

  get isOriginal() {
    return this.optimalImage && this.optimalImage.isOriginal;
  }

  get isCroped() {
    return !!this.image.cropWidth;
  }
  get scaleX() {
    return this.optimalImage.width > this.optimalSize ? this.optimalSize / this.optimalImage.width : 1; 
  }

  get scaleY() {
    return this.optimalImage.height > this.optimalSize ? this.optimalSize / this.optimalImage.height : 1; 
  }

  get imageWidth() {
    return this.optimalImage ? `${this.optimalImage.width*this.scaleX}px` : "100%";
  }

  get imageHeight() {
    return this.optimalImage ? `${this.optimalImage.height*this.scaleY}px` : "100%";
  }

  get cropWidth() {
    return this.image.cropWidth ? `${this.image.cropWidth*this.scaleX}px` : "100%"
  }

  get cropHeight() {
    return this.image.cropHeight ? `${this.image.cropHeight*this.scaleY}px` : "100%"
  }

}
