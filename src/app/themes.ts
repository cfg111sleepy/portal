export interface Theme {
    name: string;
    properties: any;
  }
  
  export const theme1: Theme = {
    name: 'light',
    properties: {
      '--color-option-1': 'rgb(161,180,190)',
      '--color-option-2': 'rgb(199,209,216)',
      '--color-option-3': 'rgb(0,89,168)',
      '--color-option-4': 'rgb(69,149,52)',
      '--color-option-5': 'rgb(155,23,45)',
      '--color-option-6': '#cfd9de',
      
      '--color-option-7': '#e8e9e3',

      //add gpa resource 2023-06-22
      '--color-option-8': 'rgb(232, 233, 227)',
      '--color-option-9': 'rgb(180, 218, 137)',
      '--color-option-10': 'rgb(75, 149, 52)',
      '--color-option-11': 'rgb(255, 89, 9)',
      '--color-option-12': 'rgb(244, 219, 199)',
      '--color-option-13': 'rgb(255, 219, 9)',
      '--color-option-14': 'rgb(0, 0, 0)',

      '--text-color': 'black',
      '--button-background': 'var(--color-option-3)',
    },
  };
  
  export const theme2: Theme = {
    name: 'dark',
    properties: {
      '--color-option-1': 'rgb(161,180,190)',
      '--color-option-2': 'rgb(72,93,104)',
      '--color-option-3': 'rgb(11,187,239)',
      '--color-option-4': 'rgb(146,208,80)',
      '--color-option-5': 'rgb(255,215,68)',
      '--color-option-6': '#6b7e87',

      '--color-option-7': 'rgb(161,180,190)',

            //add gpa resource 2023-06-22
            '--color-option-8': 'rgb(232, 233, 227)',
            '--color-option-9': 'rgb(180, 218, 137)',
            '--color-option-10': 'rgb(75, 149, 52)',
            '--color-option-11': 'rgb(255, 89, 9)',
            '--color-option-12': 'rgb(244, 219, 199)',
            '--color-option-13': 'rgb(255, 219, 9)',
            '--color-option-14': 'rgb(0, 0, 0)',
      

      '--text-color': 'white',
      '--button-background': 'var(--color-option-3)',
    },
  };
  

  