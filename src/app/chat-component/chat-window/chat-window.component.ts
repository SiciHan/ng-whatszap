import { Component, Inject, Output, EventEmitter, OnInit, ViewChild, ChangeDetectionStrategy,
  ChangeDetectorRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../model/chat-message';
import { PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent implements OnInit{
  name: string;
  chats: ChatMessage[] = [];
  public disabled: boolean = false;
  public type: string = 'component';
  public config: PerfectScrollbarConfigInterface = {};

  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild('chatPS') chatPS?: PerfectScrollbarComponent;
  @Output() nameEvent = new EventEmitter<string>();
  constructor(public dialog: MatDialog, 
    private chatSvc: ChatService,
    private cd: ChangeDetectorRef) { }

  ngOnInit(){
    this.chatSvc.getAllChatMessages().subscribe((results)=>{
      setTimeout(()=>{
        this.chats = results;
        this.cd.detectChanges();
        this.chatPS.directiveRef.scrollToBottom(0, 300);
      }, 1100);
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        height: '400px',
        width: '600px',
        data: {name: this.name}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.name = result;
        this.nameEvent.emit(this.name)
        console.log('The dialog was closed ' + this.name);
      });
    });
  }

  onScrollEvent(event){}
}


@Component({
  selector: 'user-dialog',
  templateUrl: 'dialog-name.html',
  styleUrls: ['./chat-window.component.css']
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
