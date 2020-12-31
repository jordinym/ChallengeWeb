import { ɵAnimationRendererFactory } from '@angular/platform-browser/animations';

export module SharedConstants {

    export const FilesTypesNoAccept = {
        video: ["video/mp4","application/x-msdownload", "video/mov", "video/avi", "video/mkv", "video/flv", "video/swf", "video/m4v", "video/x-matroska", "video/quicktime", "video/ogg", "video/webm","video/mpeg","video/3gpp", "audio/mpeg","video/x-ms-wmv"],
        audio: "audio/mpeg",
        images: ["image/png", "image/jpeg"]
    }

    export const FilesTypeSupport = {
        files: ["ppt","pptx","doc","docx","xls","xlsx","txt","pdf","tiff","pages","ai","psd","dxf","jpg","png","jpeg"]
    }

    export const TamanioMaximoAdjuntar = 30;


}
