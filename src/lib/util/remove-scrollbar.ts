export const removeScrollbar = (el: HTMLElement | null) => {
	if (el) {
		document.body.style.overflow = 'hidden';
	} else {
		document.body.style.overflow = 'auto';
	}
};
