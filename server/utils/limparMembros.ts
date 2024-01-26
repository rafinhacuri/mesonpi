export default (grupo: string[]): string[] => {
	return grupo.map((member) => {
		const uidEntry = member.split(',')[0].replace('uid=', '')
		return uidEntry
	})
}
