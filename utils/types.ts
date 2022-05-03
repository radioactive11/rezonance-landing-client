export interface OverlayProps {
	visible: boolean;
}

export interface VideoTextProps {
	ready?: boolean;
	position: number[];
	fontSize?: number;
	color?: string;
}

export interface IntroProps {
	start: boolean;
	set: (start: boolean) => void;
}

export interface CountdownRenderer {
	completed?: boolean;
	days?: number;
	hours?: number;
	minutes?: number;
	seconds?: number;
	position: number[];
	rotation?: number[];
}
