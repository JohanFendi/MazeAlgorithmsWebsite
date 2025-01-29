import { Component, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { Algorithm } from '../../algorithms/algorithm';
import { Maze } from '../../datastructures/maze';
import { Kruskals } from '../../algorithms/kruskals';
import { Prims } from '../../algorithms/prims';


@Component({
  selector: 'app-header',
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})


export class HeaderComponent {
  protected readonly websiteTitle : string = "MAZE IT!"

  //We store the selected algorithm as the constructor of said algorithm.
  protected readonly Kruskals : new (maze : Maze) => Algorithm = Kruskals; 
  protected readonly Prims :  new (maze : Maze) => Algorithm = Prims; 

  private _showMenu : boolean = false; 
 
  protected toggleShowMenu() : void{
    this._showMenu = !this._showMenu; 
  }

  get showMenu():boolean{
    return this._showMenu; 
  }

  set algorithm(algo : new (maze : Maze) => Algorithm){
    this.toggleShowMenu(); 
    this.algorithmChoosen.emit(algo); 
  }

  @Output() algorithmChoosen = new EventEmitter<new (maze : Maze) => Algorithm>();   
}
