import { PlayableInput } from "."
import { GenericAudioInput } from "./audio"

/**
 * Video input
 */
export type VideoInput = PlayableInput & GenericAudioInput

/**
 * Video list input type
 * (extends playable input)
 */
export type VideoListInput = VideoInput & {
	selectedIndex: number
	list?: string[]
}
