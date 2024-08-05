import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from '@angular/router';
import { TreeMenuNode } from '../tree-menu-node.model';

@Component({
  selector: 'app-side-menu-tree-node',
  templateUrl: './side-menu-tree-node.component.html',
  styleUrls: ['./side-menu-tree-node.component.scss']
})
export class SideMenuTreeNodeComponent implements OnInit {
  @Input() node: TreeMenuNode;
  @Output() change: EventEmitter<TreeMenuNode> = new EventEmitter<TreeMenuNode>();

  constructor() { 
    this.node = {
      childNodes:[],
      name:"",
      icon:"",
      payload:{},
      expanded:false
    };

  }

  ngOnInit(): void {
  }


  expanderClick(node:TreeMenuNode){
    node.expanded = !node.expanded;
  }

  leafClick(node: TreeMenuNode) {
    //e.stopPropagation();
    this.change.emit(node);
    //console.log("leaf click", this.node);
  }
  
}
