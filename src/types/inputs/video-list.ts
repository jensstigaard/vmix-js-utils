import { VideoInput } from "./video"

/**
 * Video list input type
 * (extends regular video input)
 */
export type VideoListInput = VideoInput & {
	selectedIndex: number
	list?: VideoListItem[]
}

export type VideoListItem = {
	filePath: string
	selected: boolean // Is the currently selected item in the list?
}