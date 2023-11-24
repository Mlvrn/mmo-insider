export const formatRelativeTime = (dateString) => {
  const currentDate = new Date();
  const inputDate = new Date(dateString);

  const timeDifference = currentDate - inputDate;
  const secondsDifference = Math.floor(timeDifference / 1000);

  if (secondsDifference < 60) {
    return `${secondsDifference} second${secondsDifference === 1 ? '' : 's'}`;
  } else if (secondsDifference < 3600) {
    const minutesDifference = Math.floor(secondsDifference / 60);
    return `${minutesDifference} minute${minutesDifference === 1 ? '' : 's'}`;
  } else if (secondsDifference < 86400) {
    const hoursDifference = Math.floor(secondsDifference / 3600);
    return `${hoursDifference} hour${hoursDifference === 1 ? '' : 's'}`;
  } else {
    const daysDifference = Math.floor(secondsDifference / 86400);
    return `${daysDifference} day${daysDifference === 1 ? '' : 's'}`;
  }
};
