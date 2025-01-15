// chrome://flags  -> 카메라, 마이크 임시 권한해제 사이트
// Insecure origins treated as secure     입력하기
// http://192.168.56.1:5500
// 보안이 없는 환경(HTTP)**에서 실행되는 웹사이트를 **보안이 있는 환경(HTTPS)**처럼 취급하고 있다는 의미

; (() => {
  'use strict'

  const get = (target) => document.querySelector(target);
  const allowUser = {
    audio: true,
    video: true,
  }


  class WebRTC {
    constructor() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {

        console.log("Media stream obtained:");
        alert("현재 브라우저는 getUserMedia API를 지원하지 않습니다. 사이트 방문- [  chrome://flags  ] ");
        return;
      }

      this.media = new MediaSource()
      this.recorder
      this.blobs = [];
      this.playedVideo = get('video.played')
      this.recordVideo = get('video.record')
      this.btnDownload = get('.btn_download')
      this.btnRecord = get('.btn_record')
      this.btnPlay = get('.btn_play')
      this.container = get('.webrtc')
      this.events()
      navigator.mediaDevices.getUserMedia(allowUser).then((videoAudio) => {
        this.success(videoAudio)
      })
    };


    events() {
      this.btnRecord.addEventListener('click', this.toggleRecord.bind(this))
      this.btnPlay.addEventListener('click', this.play.bind(this))
      this.btnDownload.addEventListener('click', this.download.bind(this))
    }

    success(audioVideo) {
      this.btnRecord.removeAttribute('disabled');
      window.stream = audioVideo
      if (window.URL) {
        this.playedVideo.setAttribute(
          'src',
          window.URL.createObjectURL(audioVideo)
        )
      } else {
        this.playedVideo.setAttribute('src', audioVideo)
      }
    }

    pushBlobData(event) {
      if (!event.data || event.data.size < 1) {
        return
      }
      this.blobs.push(event.data)
    }

    toggleRecord() {
      if ('녹화' === this.btnRecord.textContent) {
        this.startRecord()
      } else {
        this.btnPlay.removeAttribute('disabled')
        this.btnDownload.removeAttribute('disabled')
        this.btnRecord.textContent = '녹화'
        this.stopRecord()
      }
    }
    startRecord() {
      let type = { mimeType: 'video/webm;codecs=vp9' }
      this.blobs = []
      if (!MediaRecorder.isTypeSupported(type.mimeType)) {
        type = { mimeType: 'video/webm' }
      }
      this.recorder = new MediaRecorder(window.stream, type)
      this.btnRecord.textContent = '중지'
      this.btnPlay.setAttribute('disabled', true)
      this.btnDownload.setAttribute('disabled', true)
      this.recorder.ondataavailable = this.pushBlobData.bind(this)
      this.recorder.start(20)
    }

    stopRecord() {
      this.recorder.stop()
      this.recordVideo.setAttribute('controls', true)
    }

    play() {
      this.recordVideo.src = window.URL.createObjectURL(
        new Blob(this.blobs, { type: 'video/webm' })
      )
    }

    download() {
      const videoFile = new Blob(this.blobs, { type: 'video/webm' })
      const url = window.URL.createObjectURL(videoFile)
      const downloader = document.createElement('a')
      downloader.style.display = 'none'
      downloader.setAttribute('href', url)
      downloader.setAttribute('download', 'test_video.webm')
      this.container.appendChild(downloader)
      downloader.click()
      setTimeout(() => {
        this.container.removeChild(downloader)
        window.URL.revokeObjectURL(url)
      }, 100)
    }

  };

  new WebRTC();

})()



// ; (() => {
//   'use strict';

//   const get = (target) => document.querySelector(target);
//   const allowUser = { audio: true, video: true };

//   class WebRTC {
//     constructor() {
//       // if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//       //   console.log("Media stream obtained:");

//       //   alert("현재 브라우저는 getUserMedia API를 지원하지 않습니다.");
//       //   return;
//       // }

//       this.blobs = [];
//       this.recorder = null;
//       this.playedVideo = get('video.played');
//       this.recordVideo = get('video.record');
//       this.btnDownload = get('.btn_download');
//       this.btnRecord = get('.btn_record');
//       this.btnPlay = get('.btn_play');
//       this.container = get('.webrtc');
//       this.events();

//       navigator.mediaDevices.getUserMedia(allowUser)

//         .then((stream) => {
//           this.success(stream);
//         })
//         .catch((err) => {
//           console.error("Media access denied:", err);
//           alert("카메라 또는 마이크 접근이 차단되었습니다.");
//         });
//     }


//     events() {
//       this.btnRecord.addEventListener('click', this.toggleRecord.bind(this));
//       this.btnPlay.addEventListener('click', this.play.bind(this));
//       this.btnDownload.addEventListener('click', this.download.bind(this));
//     }

//     success(stream) {
//       this.btnRecord.removeAttribute('disabled');
//       this.playedVideo.srcObject = stream; // 스트림 바로 설정
//       window.stream = stream;
//     }

//     pushBlobData(event) {
//       if (event.data && event.data.size > 0) {
//         this.blobs.push(event.data);
//       }
//     }

//     toggleRecord() {
//       if (this.btnRecord.textContent === '녹화') {
//         this.startRecord();
//       } else {
//         this.stopRecord();
//         this.btnPlay.removeAttribute('disabled');
//         this.btnDownload.removeAttribute('disabled');
//         this.btnRecord.textContent = '녹화';
//       }
//     }

//     startRecord() {
//       const options = { mimeType: 'video/webm;codecs=vp9' };
//       if (!MediaRecorder.isTypeSupported(options.mimeType)) {
//         options.mimeType = 'video/webm';
//       }
//       this.recorder = new MediaRecorder(window.stream, options);
//       this.recorder.ondataavailable = this.pushBlobData.bind(this);
//       this.recorder.start(20);
//       this.btnRecord.textContent = '중지';
//       this.btnPlay.setAttribute('disabled', true);
//       this.btnDownload.setAttribute('disabled', true);
//     }

//     stopRecord() {
//       this.recorder.stop();
//       this.recordVideo.setAttribute('controls', true);
//     }

//     play() {
//       const videoBlob = new Blob(this.blobs, { type: 'video/webm' });
//       this.recordVideo.src = window.URL.createObjectURL(videoBlob);
//     }

//     download() {
//       const videoBlob = new Blob(this.blobs, { type: 'video/webm' });
//       const url = window.URL.createObjectURL(videoBlob);
//       const downloader = document.createElement('a');
//       downloader.style.display = 'none';
//       downloader.href = url;
//       downloader.download = 'recorded_video.webm';
//       this.container.appendChild(downloader);
//       downloader.click();
//       setTimeout(() => {
//         this.container.removeChild(downloader);
//         window.URL.revokeObjectURL(url);
//       }, 100);
//     }
//   }

//   document.addEventListener("DOMContentLoaded", () => {
//     new WebRTC();
//   });
// })();
