
export enum InputType {
    Text = 0,
    Check = 1
}

export interface AddPopupFormat {
    type: InputType;
    label: string; 
    value: any;
}
