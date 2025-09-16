import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {CommonModule} from '@angular/common'; // Import NgIf

@Component({
  selector: 'app-alert-component',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './alert-component.html',
  styleUrl: './alert-component.css'
})
export class AlertComponent implements OnInit {
	
	messageTitle: string;
	messageText: string;
	messageStatus: number; // 0 - green, 1 - yellow, 2 - alert, 3 or more - red

	constructor(
	    private dialogRef: MatDialogRef<AlertComponent>,
	    @Inject(MAT_DIALOG_DATA) data) {

	    this.messageTitle = data.messageTitle;
	    this.messageText = data.messageText;
	    this.messageStatus = data.messageStatus;
	}

	ngOnInit() {
	}

	close() {
	    this.dialogRef.close();
	}

}
