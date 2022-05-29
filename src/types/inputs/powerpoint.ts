import { VideoInput } from "./video"

/**
 * Powerpoint
 * (extends regular video input)
 */
export type PowerpointInput = VideoInput & {
	currentSlideNumber: number
}
