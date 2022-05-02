
export class BaseView {
	model: any;

	constructor(model: any) {
		this.model = model
	}

	update(clock?: THREE.Clock) {}
}