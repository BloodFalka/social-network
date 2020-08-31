export const updateObjectInArray = (
	items: Array<any>,
	itemId: number,
	objectPropName: string,
	newObjProps: any
) => {
	return items.map((item) => {
		if (item[objectPropName] === itemId) {
			return { ...item, ...newObjProps }
		}
		return item
	})
}
