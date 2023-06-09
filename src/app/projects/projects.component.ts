import { Component, OnInit, HostBinding } from '@angular/core';
import { AnimationEvent } from '@angular/animations'

import { Project } from './project.model';

import { ProjectsService } from './projects.service';
import { markedTrigger, itemStateTrigger, slideStateTrigger, listStateTrigger } from './animations';
import { routeFadeStateTrigger, routeSlideStateTrigger } from '../shared/route-animations';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [
    markedTrigger,
    itemStateTrigger,
    slideStateTrigger,
    // routeFadeStateTrigger,
    routeSlideStateTrigger,
    listStateTrigger
  ]
})
export class ProjectsComponent implements OnInit {
  // @HostBinding('@routeFadeState') routeAnimation = true;
  @HostBinding('@routeSlideState') routeAnimation = true;

  projects: Project[];
  markedPrjIndex = 0;
  progress = 'progressing';
  createNew = false;

  constructor(private prjService: ProjectsService) {
    this.projects= []
  }

  ngOnInit() {
    this.prjService.loadProjects()
      .subscribe(
        (prj: Project[]) => {
          this.progress = 'finished';
          this.projects = prj;
        }
      );
  }

  onStatusUpdated(newStatus: string, id: number) {
    this.projects[id].status = newStatus;
  }

  onProjectDeleted(index: number) {
    this.projects.splice(index, 1);
  }

  onProjectCreated(project: Project) {
    this.createNew = false;
    // this.projects.push(project);
    setTimeout(() => {
      this.projects.unshift(project);
    }, 300);
  }

  // onItemAnimate(animationEvent: AnimationEvent, lastPrjId: number){
  //   if(animationEvent.fromState != 'void'){
  //     return;
  //   };
  //   if(this.projects.length > lastPrjId + 1){
  //     this.displayedProjects.push(this.projects[lastPrjId + 1]);
  //   } else {
  //     this.projects = this.displayedProjects;
  //   }
  // }
}
