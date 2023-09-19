export function calculateAge(birthdate: string | Date) {
	const currentDate = fixTimezoneOffset(new Date());
	const birthDate = fixTimezoneOffset(new Date(birthdate));

	let age = currentDate.getFullYear() - birthDate.getFullYear();

	if (
		currentDate.getMonth() < birthDate.getMonth() ||
		(currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
	) {
		age--;
	}

	return age;
}

function fixTimezoneOffset(date: Date) {
	return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
}
