import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, query, where } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ApiService } from 'src/app/shared/api.service';
import { Guid } from "guid-typescript";
import { getStorage } from '@angular/fire/storage';

@Component({
  selector: 'add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {

  members: any = [];
  selectedMembers: any = [];
  isMemberShow = false;
  isMemberSelected = false;
  loginUserId = localStorage.getItem('userId');

  private GUID;
  STORAGE = getStorage();

  form = new FormGroup({
    groupName: new FormControl('New Group', [Validators.required]),
    groupId: new FormControl('4')
  })

  constructor(
    private _fb: FormBuilder,
    private api: ApiService,
    private firestore: Firestore,
    private _change: ChangeDetectorRef,
    private _bottomSheetRef: MatBottomSheetRef<AddGroupComponent>

  ) {
    this.GUID = Guid.create();
  }


  ngOnInit(): void {
    this.getMembers(this.loginUserId);
  }

  // formGroups(): FormGroup {
  //   return this._fb.group({
  //     name: new FormControl('0'),
  //     id: new FormControl('0'),
  //   });
  // }

  getMembers(id) {
    const q = query(collection(this.firestore, "members"), where("memberOf", "array-contains", id.toString()));

    (() => {
      getDocs(q).then((snapshot) => {
        let data: any[] = []
        snapshot.forEach(doc => {
          data.push({ ...doc.data(), id: doc.id })
        });

        this.members = data;
        const loginUser = this.members.find(member => member.userId === this.loginUserId);
        
        if (loginUser) {
          loginUser['isMemberSelected'] = true;
          this.selectedMembers.push(loginUser)
          this._change.detectChanges();
        }
      })
    })();
  }

  getName() {
    return this.form.value.groupName.trim();
  }

  updateMemberSelection(event, member) {

    // member['isMemberSelected'] = event.checked;

    // const isSelected = this.members.find(member => member['isMemberSelected'] && member['isMemberSelected'] === true);

    // if(isSelected){
    //   this.isMemberSelected = true;
    //   this.selectedMembers.push(member);
    // } else {
    //   this.isMemberSelected = false;

    //   if (this.selectedMembers.contains(member)) {
    //     const index = this.selectedMembers.indexOf(member)
    //     this.selectedMembers.slice(index, 1);
    //   }
    // }


    if (event.checked === true) {
      member['isMemberSelected'] = event.checked;
      const isSelected = this.members.find(member => member['isMemberSelected'] && member['isMemberSelected'] === true);
      if(isSelected){
        this.isMemberSelected = true;
        this.selectedMembers.push(member);
      }
    } else {
      if (this.selectedMembers.includes(member)) {
        member['isMemberSelected'] = event.checked;
        const index = this.selectedMembers.indexOf(member)
        this.selectedMembers.splice(index, 1);
      }
    }
  }

  close(type) {
    if (type === 'GROUP') {
      this._bottomSheetRef.dismiss();
    }
  }

  saveMembers() {
    this.isMemberShow = false
  }

  saveGroup() {

    if(this.getName() === ''){
      alert('Please add group name');
      return
    }

    if(this.selectedMembers.length === 1){
      alert('Please add members for create group');
      return
    }

    let userIds = this.selectedMembers.map(x => x['userId']);

    const params = {
      groupName: this.form.value.groupName,
      id: this.GUID.value,
      userIds: userIds
    }

    const databaseInstance = collection(this.firestore, 'expense-groups');

    addDoc(databaseInstance, params).then(() => {
      this._bottomSheetRef.dismiss();
    }).catch((err) => {
      alert(err.message)
    })
  }

}
