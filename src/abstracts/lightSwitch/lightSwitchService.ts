interface LightSwitchService {
    checkLightState(): boolean;
    setState(state: boolean): boolean;
}