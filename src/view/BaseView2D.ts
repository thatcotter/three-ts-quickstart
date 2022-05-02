import * as PIXI from "pixi.js";

import { BaseView } from "./BaseView";


export class BaseView2D extends BaseView {

	scene: PIXI.Container

	constructor(model: any, app: PIXI.Application) {
		super(model)

		this.scene = new PIXI.Container()

		app.stage.addChild(this.scene)
	}

	update(): void {
		
	}

}