import * as CORE from '../core';

export class ViewSetupHints implements CORE.ViewSetupHints {
    public spacesVisible: boolean;

    public spaceBoundariesVisible: boolean;

    public openingsVisible: boolean;

    constructor() {
        this.spacesVisible = true;
        this.spaceBoundariesVisible = true;
        this.openingsVisible = true;
    }

    public fromJSON(json: CORE.ViewSetupHints): void {
        Object.assign(this, json);
    }

    public toJSON(): CORE.ViewSetupHints {
        return {
            spacesVisible: this.spacesVisible,
            spaceBoundariesVisible: this.spaceBoundariesVisible,
            openingsVisible: this.openingsVisible,
        };
    }
}
