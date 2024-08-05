export interface TreeMenuNode {
    name: string;
    icon?: string;
    childNodes: TreeMenuNode[];
    payload?: any;
    expanded: boolean;
    selected?: boolean; 
  }