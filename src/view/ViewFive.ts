import * as PIXI from 'pixi.js'
import { Graphics } from 'pixi.js';
import { BaseView2D } from "./BaseView2D";

export class ViewFive extends BaseView2D {

	graphics: PIXI.Graphics;


	constructor(model: any, app: PIXI.Application) {
		super(model, app)

		this.graphics = new Graphics()

		this.graphics.beginFill(0xcd4395)

		this.graphics.drawCircle(100, 100, 50)

		this.scene.addChild(this.graphics)
	}

	update(): void {
		
	}
}