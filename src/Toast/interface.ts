interface ToastProp {
    type: string;
    message: string;
    duration: number;
    cssClass: string;
    sustain: number;
    animeDuration: number;
    control: null|undefined|Control;
    context: Context;
    attachment: string|HTMLElement;
}
  
interface DefaultToastProp {
    type?: string;
    message?: string;
    duration?: number;
    cssClass?: string;
    sustain?: number;
    animeDuration?: number;
    control?: null|undefined|Control;
    attachment?: string|HTMLElement;
    [propName: string]: any;
}
  
interface Control {
    (param: ControlParam): any;
}
  
interface ControlParam {
    goto: (progress:string) => Promise<any>;
    delay: (millisecond:number) => Promise<any>;
    set: (payload:DefaultToastProp) => void;
}

interface Context {
    goto: (progress:string) => Promise<any>;
    delay: (millisecond:number) => Promise<any>;
    set: (payload:DefaultToastProp) => void;
}

interface ToastWrapper {
    (options: string|DefaultToastProp): void;
    create: (options: string|DefaultToastProp) => Context;
}
