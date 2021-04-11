import { PlayableInput } from ".";

/**
 * Image input type
 */
export type ImageInput = PlayableInput

/**
 * Image sequence input type
 */
export type ImageSequenceInput = ImageInput

/**
 * Photos (slideshow) input type
 */
export type PhotosInput = ImageInput & {
	numberOfPhotos: number
	currentPhotoIndex: number
}
