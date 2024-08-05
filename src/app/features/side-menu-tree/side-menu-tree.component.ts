import { Input, Component,  OnInit, Output, EventEmitter} from '@angular/core';
import { TreeMenuNode } from './tree-menu-node.model';

@Component({
  selector: 'app-side-menu-tree',
  templateUrl: './side-menu-tree.component.html',
  styleUrls: ['./side-menu-tree.component.scss']
})
export class SideMenuTreeComponent implements OnInit {

  @Input() rootnode: TreeMenuNode[] =[];
  @Input() nested: boolean = false;
  @Input() active: boolean = false;
  @Input() isroot: boolean = true;

  @Output() change: EventEmitter<TreeMenuNode> = new EventEmitter<TreeMenuNode>();

  constructor() { 
  }

  ngOnInit(): void {
  }
    
  leafClick(node:TreeMenuNode) {
    this.change.emit(node);
    //console.log("Menu click", node);
  }
}
