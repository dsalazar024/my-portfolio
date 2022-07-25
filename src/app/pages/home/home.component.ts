import { Component, HostListener, OnInit } from '@angular/core';
import { InformationService } from '../../services/information.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  skills: any;
  featuredProjects: any;
  workExperience: any;
  profile: any;

  showMobileImages = false;

  @HostListener('window:resize', ['$event'])
  onresize(event: any): void {
    console.log('WINDOW_RESIZE_EVENT', event);
    this.checkWindowSize();
  }

  private checkWindowSize(): void {
    window.innerWidth <= 768
      ? this.showMobileImages = true
      : this.showMobileImages = false;
  }

  constructor(public data: InformationService) { }

  ngOnInit(): void {
    this.checkWindowSize();
    this.getInformation();
  }

  async getInformation(){
    this.profile = await this.data.getProfile();
    console.log('PROFILE', this.profile);
  }

  async downloadResume(): Promise<void> {
    const pdf: any =  await this.data.getBase64CV();
    const byteCharacters = atob(pdf.resume);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const file = new Blob([byteArray], { type: 'application/pdf;base64' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.setAttribute('download', `${this.profile.name} CV.pdf`.replace(/\s/g, ''));
    a.click();
  }

}
