import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor, NgStyle } from '@angular/common';
import { Maze } from './algorithms/app.maze';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'maze-generation-visualizer';
  maze : Maze = new Maze(10,10); 

  ngOnInit():void{
    this.maze.logMaze(); 
    console.log(this.maze.getVector()); 
  }
}
