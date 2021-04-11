/**
 * Array wrap
 * @param input
 * @returns 
 */
export function arrayWrap<Type>(input: Type): Type[] {
	return Array.isArray(input) ? input : [input]
}
