import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/shared/api.service';
import { collection, Firestore, onSnapshot, deleteDoc, updateDoc, doc, getDocs, where, query } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeHelpersService } from 'src/app/shared/theme-helpers.service';
import { getMobile } from 'src/app/shared/theme-helpers.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

// import { SwiperConfigInterface, SwiperDirective } from "ngx-swiper-wrapper";
import { animate, style, transition, trigger } from '@angular/animations';
import { PlayerComponent } from 'src/app/common/player/player.component';

interface Slide {
  title: string;
  subtitle: string;
  info: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
})
export class ProductCategoryComponent implements OnInit, AfterViewInit {

  // @ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;
  categories: any = [];
  groupId: any = null;
  getMobile = getMobile;
  isOpen = false;
  recommendationList: any = [];
  latestList: any = [];
  popularList: any = [];
  sectionAnime: any = null;

  loadingLatest = true;
  loadingRecommed = true;
  loadingPopular = true;

  swiperIndex = 1;
  movies: any[] = [];
  sectionEpisodes: any[] = [];
  sectionSeasons: any[] = [];

  selectedSeason: any = null
  selectedSeasonNumber = '-1';

//   swiperConfigCarouselWeb: SwiperConfigInterface = {
//     slidesPerView: 1.3,
//     centeredSlides: true,
//     spaceBetween: -50,
//     navigation: true,
//     loop: true,
//     speed: 1500,
//     pagination: { clickable: true },
//     autoplay: {
//       delay: 3500,
//       disableOnInteraction: false
//     }
//   };

//   swiperConfigCarouselMob: SwiperConfigInterface = {
//     slidesPerView: 1,
//     centeredSlides: true,
//     spaceBetween: 0,
//     navigation: true,
//     loop: true,
//     speed: 1500,
//     pagination: { clickable: true },
//     autoplay: {
//       delay: 3500,
//       disableOnInteraction: false
//     }
//   };

//   public swiperSlidesConfig: SwiperConfigInterface = {
//     slidesPerView: 'auto',
//     spaceBetween: 10,
//     centeredSlides: false,
//     direction: 'horizontal',
// };


  //  *********************************************
  //  *********************************************
  // TODO ******** T O P - C A R O U S E L ********
  //  *********************************************
  //  *********************************************

  slides: Slide[] = [
    {
      title: 'Itachi Uchiha',
      subtitle: 'Dream is Real',
      info: '2010 | Sci-Fi, Action | 4K HDR | 5.1',
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
      imageUrl: 'assets/posters/itachi-uchiha.jpg'
    },
    {
      title: 'Naruto',
      subtitle: 'King of Monsters',
      info: '2023 | Action | 4K HDR | 5.1',
      description: 'The colossal spectacle throws terrifying monsters, including Godzilla, Mothra, and King Ghidorah into an epic battle that threatens the very existence of humanity. As these ancient super-species rise again, they all vie for supremacy, leaving humanity\'s fate hanging in the balance.',
      imageUrl: 'assets/posters/naruto.jpg'
    },
    {
      title: 'Tokyo Ghoul',
      subtitle: 'Endgame',
      info: '2019 | Action, Adventure | 4K HDR | 5.1',
      description: 'After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.',
      imageUrl: 'assets/posters/ken kaneki.jpg'
    },
    {
      title: 'Wind Braker',
      subtitle: 'Dream is Real',
      info: '2010 | Sci-Fi, Action | 4K HDR | 5.1',
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
      imageUrl: 'assets/posters/wind-braker-poster.jpeg'
    },
  ];

  currentIndex = 0;
  animationState: 'next' | 'prev' | null = null;
  private autoplayInterval: any;

  @ViewChild('swiperContainer', { static: true }) swiperContainer!: ElementRef;

  get currentSlide(): Slide {
    return this.slides[this.currentIndex];
  }

  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ApiService,
    private firestore: Firestore,
    private dialog: MatDialog,
    private _change: ChangeDetectorRef,
    private _route: ActivatedRoute,
    private _router: Router,
    private _bottomSheet: MatBottomSheet,
    private themeHelper: ThemeHelpersService
  ) { }

  ngOnInit(): void {
    this.startAutoplay();
    this.getSectionAnime();
    this.getRecommendations();
    this.getMovies();
    this.getLatests();
    this.getPopularsAnime();
  }


  ngOnDestroy() {
    this.stopAutoplay();
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  nextSlide() {
    this.animationState = 'next';
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    setTimeout(() => this.animationState = null, 300);
  }

  prevSlide() {
    this.animationState = 'prev';
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    setTimeout(() => this.animationState = null, 300);
  }


  //  *********************************
  //  *********************************
  // TODO ******** L A T E S T ********
  //  *********************************
  //  *********************************

  getLatests() {
    this.loadingLatest = true;
    const q = query(collection(this.firestore, "anime"), where("groups", "array-contains", 'Latest'));

    (() => {
      getDocs(q).then((snapshot) => {
        let data: any[] = []
        snapshot.forEach(doc => {
          data.push({ ...doc.data(), id: doc.id })
        });

        this.latestList = data;
        this.loadingLatest = false;
        console.log(this.latestList);
        this._change.detectChanges();
      })
    })();
  }


  //  ***************************************************
  //  ***************************************************
  // TODO ******** R E C O M M E N D A T I O N S ********
  //  ***************************************************
  //  ***************************************************

  getRecommendations() {
    this.loadingRecommed = true;
    const q = query(collection(this.firestore, "anime"), where("groups", "array-contains", 'Recommendation'));

    (() => {
      getDocs(q).then((snapshot) => {
        let data: any[] = []
        snapshot.forEach(doc => {
          data.push({ ...doc.data(), id: doc.id })
        });

        this.recommendationList = data;
        console.log(this.recommendationList);
        this.loadingRecommed = false;
        this._change.detectChanges();
      })
    })();
  }


  //  *********************************************
  //  *********************************************
  // TODO ******** M O S T - P O P U L A R ********
  //  *********************************************
  //  *********************************************

  getPopularsAnime() {
    this.loadingPopular = true;
    const q = query(collection(this.firestore, "anime"), where("groups", "array-contains", 'Most Popular'));

    (() => {
      getDocs(q).then((snapshot) => {
        let data: any[] = []
        snapshot.forEach(doc => {
          data.push({ ...doc.data(), id: doc.id })
        });

        this.popularList = data;
        console.log(this.popularList);
        this.loadingPopular = false;
        this._change.detectChanges();
      })
    })();
  }


  //  ***********************************************
  //  ***********************************************
  // TODO ******** S E C T I O N - A N I M E ********
  //  ***********************************************
  //  ***********************************************

  getSectionAnime() {
    const q = query(collection(this.firestore, "anime"), where("groups", "array-contains", 'Landing Page'));

    (() => {
      getDocs(q).then((snapshot) => {
        let data: any = null;
        snapshot.forEach(doc => {
          data = { ...doc.data(), id: doc.id }
        });

        this.sectionAnime = data;
        this.getSeasons(this.sectionAnime.id);
        this._change.detectChanges();
      })
    })();
  }

  getSeasons(id) {
    // this.loading = true;
    const list = collection(this.firestore, "seasons");
    const q = query(list, where("masterId", "==", id));

    getDocs(q).then((snapshot) => {
      let data: any[] = [];
      snapshot.forEach(doc => {
        data.push({ ...doc.data(), id: doc.id });
        data.sort((a, b) => a.season - b.season);
        this.sectionSeasons = data;
        this.selectedSeason = data[0];
        this.selectedSeasonNumber = data[0].season.toString();
        this.sectionEpisodes = data[0].episodes.splice(0, 7);
        console.log(this.sectionEpisodes);
        
      });
    })
  }

  selectSeason(s) {
    const season = this.sectionSeasons.find(x => x.season == s.season);
    this.selectedSeason = season;
    this.selectedSeasonNumber = s.season;
    this.sectionEpisodes = season['episodes'];
    this._change.detectChanges();
  }

  viewEpisode(episode, type) {
    const dialogRef = this.dialog.open(PlayerComponent, {
      id: 'cloud-plyr-idx',
      width: '100vw',
      maxWidth: '100vw',
      maxHeight: '100vh',
      disableClose: true
    });

    if (type == 'play') {
      const queryParams = { season: this.selectedSeasonNumber, ep: episode.episodeNumber };
      this._router.navigate(
        [],
        {
          relativeTo: this._route,
          queryParams: queryParams,
        });
      dialogRef.componentInstance.data = episode;
    }
  }




  onIndexChange(index: number): void {
    this.swiperIndex = index;
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  getMovies() {
    const databaseInstance = collection(this.firestore, 'anime');

    onSnapshot(databaseInstance, snapshot => {
      let data: any[] = []
      snapshot.forEach(doc => {
        data.push({ ...doc.data(), id: doc.id })
        this.movies = data;
      });
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
}