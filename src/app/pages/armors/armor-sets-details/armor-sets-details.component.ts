import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArmorSets } from 'src/app/models/armor-sets.model';
import { Armor } from 'src/app/models/armor.model';
import { ArmorSetsService } from 'src/app/services/armorSets/armor-sets.service';

@Component({
  selector: 'app-armor-sets-details',
  templateUrl: './armor-sets-details.component.html',
  styleUrls: ['./armor-sets-details.component.css']
})
export class ArmorSetsDetailsComponent implements OnInit {
  // PROPERTIES
  armorSets$?: Promise<ArmorSets>;
  loading: boolean = true;

  // CONSTRUCTOR
  constructor(
    private armorSetsService: ArmorSetsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // ON INIT
  ngOnInit(): void {
    const id= this.route.snapshot.paramMap.get('id');

    if (id) {
      this.armorSets$ = this.armorSetsService.getById(parseInt(id));
    }
    else {
      this.router.navigateByUrl('/not-found');
    }
  }

}
