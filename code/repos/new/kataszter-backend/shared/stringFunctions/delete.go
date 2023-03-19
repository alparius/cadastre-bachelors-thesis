package stringFunctions

func RemoveString(s []string, element string) []string {
	index := 0
	for index < len(s) {
		if s[index] != element {
			index++
		}
	}
	if index == len(s) {
		return nil
	} else {
		return append(s[:index], s[index+1:]...)
	}
}
