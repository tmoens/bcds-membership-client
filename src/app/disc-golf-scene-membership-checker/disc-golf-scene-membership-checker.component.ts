import { Component, OnInit } from '@angular/core';
import {AppStateService} from '../app-state.service';
import {ParsingOptions, WorkBook, WorkSheet} from 'xlsx';
import * as XLSX from 'xlsx';
import {MembershipService} from '../membership/membershipService';
import { lastValueFrom} from 'rxjs';

@Component({
  selector: 'app-disc-golf-scene-membership-checker',
  templateUrl: './disc-golf-scene-membership-checker.component.html',
  styleUrls: ['./disc-golf-scene-membership-checker.component.scss']
})
export class DiscGolfSceneMembershipCheckerComponent implements OnInit {

  selectedFile: File | null = null;
  canSelectFile = true;
  problems: string[] = [];
  notes: string[] = [];
  currentlyImporting: string | null = null;
  total: number = 0;
  done: number = 0;
  progress: number = 0;
  constructor(
    public appState: AppStateService,
    private service: MembershipService,
  ) {
    this.appState.setActiveTool('disc_golf_scene');
  }

  ngOnInit(): void {
  }

  /* Note to future self that cost me about three hours 2018-10-05.
   * This next bit is a work-around for the fact that angular buttons do not
   * mix well with <input type=file>, so the html has an angular button and
   * a hidden <input type=file>. When the button is pushed it calls this
   * function which programmatically clicks the file chooser which results
   * in the file chooser showing up.
   * Further note to self - if the Angular button label uses the
   * label-for="fileToUpload" attribute, then the Chrome browser is smart
   * enough to know what you are trying to do and it automatically pops up the
   * file chooser - meaning that it shows up twice.  Firefox is not so smart.
   * So do not use the label-for and both browsers work.
   */
  openFileChooser() {
    document.getElementById('fileToImport')?.click();
  }

  async fileSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    if (element.files) {
      const files: FileList = element.files;
      this.selectedFile = files[0];
      this.problems = [];
      this.notes = [];
      this.notes.push(`File selected: ${this.selectedFile.name}`)
      this.currentlyImporting = null;
      this.selectedFile = files[0];
    }
  }

  async importWorkbook() {
    this.canSelectFile = false;
    // const fileContent = await readFileAsArrayBuffer(this.selectedFile);
    const options: ParsingOptions = {type: 'array'};
    if (!this.selectedFile) { return }
    const fileContent = await readFileAsArrayBuffer(this.selectedFile);
    const importWb = XLSX.read(fileContent, options);
    if (!importWb) {
      this.problems.push(`Could not read workbook.`);
      this.canSelectFile = true;
      return;
    }


    const resultWb: WorkBook = XLSX.utils.book_new();
    const now = new Date().toISOString();
    const importSheetName: string = importWb.SheetNames[0];
    const importWorksheet: WorkSheet = importWb.Sheets[importSheetName];

    if (!importWorksheet) {
      this.problems.push(`Could not find worksheet: ${importSheetName}.`);
    } else {
      XLSX.utils.book_append_sheet(resultWb, await this.importSheet(importWorksheet));
    }

    this.canSelectFile = true;
    if (resultWb.SheetNames.length > 0) {
      XLSX.writeFile(resultWb, `ImportResults-${now}.xlsx`);
    } else {
      this.problems.push('No imports')
    }
  }

  async importSheet(ws: WorkSheet): Promise<WorkSheet> {
    this.notes.push(`Importing worksheet...`)
    const dtos: any[] = XLSX.utils.sheet_to_json(ws);
    this.total = dtos.length;
    this.done = 0;
    var errorCount = 0;
    for (const dto of dtos) {
      console.log(dto['PDGA#']);
      const response: any = await lastValueFrom(this.service.getMembershipByPdgaNumber(dto['PDGA#']));
      console.log(JSON.stringify(response));
      this.done = this.done + 1;
      this.progress = this.done / this.total * 100;
    }
    this.notes.push(`Done ${this.done}. Number Errors: ${errorCount}`)
    return XLSX.utils.json_to_sheet(dtos);
  }
}

const readFileAsArrayBuffer = (inputFile: File) => {
  const temporaryFileReader = new FileReader();

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(temporaryFileReader.error);
    };

    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result);
    };
    temporaryFileReader.readAsArrayBuffer(inputFile);
  });
}


