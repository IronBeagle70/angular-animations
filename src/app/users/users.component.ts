import { Component, HostBinding, OnInit } from '@angular/core';
import { routeFadeStateTrigger, routeSlideStateTrigger } from '../shared/route-animations';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [
    routeFadeStateTrigger({startOpacity: 0 , duration: '500ms'}),
    routeSlideStateTrigger
  ]
})
export class UsersComponent implements OnInit {
  @HostBinding('@routeFadeState') routeAnimation = true;
  // @HostBinding('@routeSlideState') routeAnimation = true;


  constructor() { }

  ngOnInit() {
  }

}
