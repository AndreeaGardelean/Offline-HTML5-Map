import $ from 'jquery';
window.$ = $;

/**
 * Updates the clock from the panel every 60 seconds.
 */
export const updateClock = () => {
	const now = new Date();
	const hour = now.getHours().toString().padStart(2, '0');
	const minute = now.getMinutes().toString().padStart(2, '0');

	$('#clock').text(`${hour} : ${minute}`);
};

export const interval = setInterval(updateClock, 60000);
updateClock();
