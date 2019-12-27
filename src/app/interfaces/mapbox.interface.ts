export interface MapboxOutput {
	attribution: string;
	features: Feature[];
	query: [];
}

export interface Feature {
	place_name: string;
	center: number[];
	context: any;
}
