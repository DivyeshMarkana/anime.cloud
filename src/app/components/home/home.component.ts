import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { collection, Firestore, onSnapshot, deleteDoc, updateDoc, doc, where, getDocs, query } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ThemeHelpersService, getMobile } from 'src/app/shared/theme-helpers.service';
import { MatDrawer } from '@angular/material/sidenav';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AddGroupComponent } from '../shared/add-group/add-group.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @ViewChild('drawer') public drawer: MatDrawer

  showFiller = false;
  groups: any = [];
  loading = true;

  getMobile = getMobile;
  tabs: any = [
  ]

  constructor(
    private API: ApiService,
    private firestore: Firestore,
    private _change: ChangeDetectorRef,
    private _router: Router,
    private themeHelper: ThemeHelpersService,
    private _bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    this.getGroups();
  }
  
  getGroups() {
    // const databaseInstance = collection(this.firestore, 'categories');

    // // const query = query()

    // onSnapshot(databaseInstance, snapshot => {
    //   let data: any[] = []
    //   snapshot.forEach(doc => {
    //     data.push({ ...doc.data(), id: doc.id })
    //     this.groups = data;
    //     // console.log(this.categories);
    //   });
    // })

    // this.loading = true;
    const list = collection(this.firestore, "expense-groups")
    const q = query(list, where("userIds", "array-contains", localStorage.getItem('userId')));

    getDocs(q).then((snapshot) => {
      let data: any[] = []
      snapshot.forEach(doc => {
        data.push({ ...doc.data(), id: doc.id })
        this.groups = data;
      });
      
      // this.dataSource = new MatTableDataSource(this.products);
      // console.log(this.groups);
      // this.tabs[0]['subGroups'] = this.groups;

      if (this.groups.length > 0) {
        this.tabs = [
          {
            tabType: 'multi',
            tabName: 'Dashboard',
            isExpanded: true,
            subGroup: this.groups,
            icon: 'grid_view'
          },
          {
            tabType: 'normal',
            tabName: 'Invite Friends',
            icon: 'person_add'

          },
        ]
      } else {
        this.tabs = [
          {
            tabType: 'multi',
            tabName: 'Dashboard',
            isExpanded: true,
            subGroup: [],
            icon: 'grid_view'
          },
          {
            tabType: 'normal',
            tabName: 'Invite Friends',
            icon: 'person_add'

          },
        ]
      }
      this.loading = false;
      this._change.detectChanges();
    })
  }

  addGroup(): void {
    const sheetRef = this._bottomSheet.open(AddGroupComponent);

    sheetRef.afterDismissed().subscribe(data => {
      this.getGroups();
    });
  }


  navigate(tab) {
    this._router.navigate(['/group/' + tab.groupId]);
  }

  toggle() {
    this.drawer.toggle();
    this.themeHelper.updateListener('drawer:state', false);
  }

  logout() {
    this.API.logout();
  }

}
