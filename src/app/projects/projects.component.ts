import { Component, OnInit } from '@angular/core';
import { AnimationEvent } from '@angular/animations'

import { Project } from './project.model';

import { ProjectsService } from './projects.service';
import { markedTrigger, itemStateTrigger } from './animations';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [
    markedTrigger,
    itemStateTrigger
  ]
})
export class ProjectsComponent implements OnInit {
  projects!: Project[];
  displayedProjects: Project[] = [];
  markedPrjIndex = 0;
  progress = 'progressing';
  createNew = false;

  constructor(private prjService: ProjectsService) { }

  ngOnInit() {
    this.prjService.loadProjects()
      .subscribe(
        (prj: Project[]) => {
          this.progress = 'finished';
          this.projects = prj;
          if(this.projects.length >= 1){
            this.displayedProjects.push(this.projects[0]);
          }
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
    this.projects.unshift(project);
  }

  onItemAnimate(animationEvent: AnimationEvent, lastPrjId: number){
    if(animationEvent.fromState != 'void'){
      return;
    };
    if(this.projects.length > lastPrjId + 1){
      this.displayedProjects.push(this.projects[lastPrjId + 1]);
    } else {
      this.projects = this.displayedProjects;
    }
  }
}
