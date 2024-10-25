import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PlyrComponent } from 'ngx-plyr';
import { HlsjsPlyrDriver } from 'src/app/hlsjs-plyr-driver';
import { ApiService } from 'src/app/shared/api.service';
import { ThemeHelpersService } from 'src/app/shared/theme-helpers.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  data = null;
  @ViewChild('plyrElement', { static: true }) plyrElement: PlyrComponent;

  loading = true;
  player: Plyr[] = [];
  playingId: any;
  videoPlayerOptions = {
    autoplay: true,
    autopause: false,
    // seekTime: 15,
    controls: ['play-large', 'rewind', 'play', 'fast-forward', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen', 'custom-button'],
    settings: ['captions', 'quality', 'speed', 'loop'],
    quality: { default: 720, options: [1440, 1080, 720, 576] },
    captions: { active: true, update: true, language: 'en' },
    resetOnEnd: true,
    tooltips: {
      controls: true
    }
  };

  hlsDriver = new HlsjsPlyrDriver(true)

  vidSrc = [
    {
      src: "",
      type: 'video',
      fileId: ''
    }
  ]

  constructor(
    private api: ApiService,
    private firestore: Firestore,
    private _change: ChangeDetectorRef,
    private _route: ActivatedRoute,
    private _router: Router,
    // private _dialofRef: MatDialogRef<VideoComponent>,
    private themeHelper: ThemeHelpersService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    if (this.data) {
      this.vidSrc[0]['src'] = this.data['url'];
      this.vidSrc[0]['fileId'] = this.data['fileId'];

      setTimeout(() => {
          this.loading = false;          
          this._change.detectChanges();
      }, 2500);
    }
  }

  @HostListener('window:keyup', ['$event'])
  onkeyUp(event) {
    event.preventDefault();
    // console.log(this.player);

    if (this.plyrElement && this.plyrElement.player) {
      switch (event.keyCode) {
        case 32: // Space key
          this.togglePlayPause();
          event.preventDefault(); // Prevent the default spacebar action (page scroll)
          break;
        // Add more cases for other keys if needed
      }
    }

    if (event.keyCode == 27) {
      event.preventDefault();
    }

    if (event.keyCode == 39) {
      if (this.player[this.playingId]) {
        this.player[this.playingId].currentTime = this.player[this.playingId].currentTime + 10;
      }
    } else if (event.keyCode == 37) {
      if (this.player[this.playingId]) {
        this.player[this.playingId].currentTime = this.player[this.playingId].currentTime - 10;
      }
    }
  }


  private initializePlyr() {
    // Ensure Plyr is ready before interacting with it
    if (this.plyrElement && this.plyrElement.player) {
      this.plyrElement.player.on('ready', event => {
        const player = event.detail.plyr;
        // Request fullscreen mode
        // player.fullscreen.enter();

        // Optionally, you can play the video automatically
      });
    } else {
      console.error('Plyr video component not initialized properly');
    }
  }

  played(e, id) {
    this.playingId = id;
    let videos: any = document.getElementsByClassName("feed-player") as HTMLCollection;

    for (const i of videos) {
      if (i['data-id'] === this.playingId) {
        // if (!this.isInViewport(i)) {
        this.player[this.playingId].pause();
      }
    }
  }

  togglePlayPause() {
    const player = this.plyrElement.player;
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  }

  onPlyrInit(event: Plyr) {
    console.log('plyr init callsss');
    this.player[this.vidSrc[0]['fileId']] = event;

    // event.toggleControls(true)

    // event.fullscreen.toggle();
    // this.player[this.vidSrc[0]['fileId']].fullscreen = true;

    // console.log(this.player[this.vidSrc[0]['fileId']].fullscreen);
    // this.player[this.vidSrc[0]['fileId']].fullscreen = true;

    // console.log();
    
    // setTimeout(() => {
      this.loading = false;

      // document.getElementById('feed-gallery-video')
      this._change.detectChanges();
    // }, 2500);
    // this.player[file.video[0]['fileId']].on('enterfullscreen', this.onEnterFullscreen.bind(this));
    // this.player[file.video[0]['fileId']].on('exitfullscreen', this.onExitFullscreen.bind(this));
  }

  close(){
    // this._dialofRef.close();
    const queryParams = { code: null };
      this._router.navigate(
        [],
        {
          relativeTo: this._route,
          queryParams: queryParams,
        });
  }


}
