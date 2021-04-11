import { BaseInput } from '.'

/**
 * Title input type
 * (GT or XAML) specific attributes
 */
export type TitleInput = BaseInput & {
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

export type TitleFieldType = 'image' | 'text'
