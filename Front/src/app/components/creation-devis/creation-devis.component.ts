import { Component, OnInit } from '@angular/core';
import { Gamme } from 'src/app/class/Gamme';
import { GammeService } from 'src/app/services/gamme.service';

@Component({
  selector: 'app-creation-devis',
  templateUrl: './creation-devis.component.html',
  styleUrls: ['./creation-devis.component.css']
})
export class CreationDevisComponent implements OnInit {

  public gammes:Gamme[] = [];

  isLoading = false;

  constructor(private gammeService: GammeService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getGammes();
    this.isLoading = false;
  }

  async getGammes()
  {
    this.gammes = await this.gammeService.syncGetGammes();
    console.log(this.gammes);

  }

}
