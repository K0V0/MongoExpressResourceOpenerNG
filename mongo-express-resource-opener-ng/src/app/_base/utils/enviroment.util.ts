///<reference types="chrome"/>


export class EnviromentUtil {

    public static runningAt() : any {
        let getBackgroundPage = chrome?.extension?.getBackgroundPage;
        if (getBackgroundPage){
            return getBackgroundPage() === window ? RuntimeEnviroment.BACKGROUND : RuntimeEnviroment.POPUP;
        }
        return chrome?.runtime?.onMessage ? RuntimeEnviroment.CONTENT : RuntimeEnviroment.WEB;
    }

}

export enum RuntimeEnviroment {
    BACKGROUND,
    POPUP,
    CONTENT,
    WEB
}