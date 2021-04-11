import { PlayableInput } from '.'

/**
 * Title input type
 * (GT or XAML) specific attributes
 */
export type TitleInput = PlayableInput & {
	// selectedIndex: number // Select index (if title preset is selected)

	fields: TitleField[]
}

/**
 * Title field type
 */
export type TitleField = {
	index: number
	type: TitleFieldType
	name: string
	value: string
}

/**
 * Title field type
 */
export type TitleFieldType = 'image' | 'text'
