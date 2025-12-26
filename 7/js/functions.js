
const checkStringLength = (str, maxLength) => str.length <= maxLength;

const isPalindrome = (str) => {
  const normalized = str.toLowerCase();
  const reversed = normalized.split('').reverse().join('');
  return normalized === reversed;
};

function isMeetingWithinWorkHours(workStart, workEnd, meetingStart, meetingDuration) {
  function timeToMinutes(timeStr) {
    const parts = timeStr.split(':');
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1] || '0', 10);
    return hours * 60 + minutes;
  }

  const workStartMinutes = timeToMinutes(workStart);
  const workEndMinutes = timeToMinutes(workEnd);
  const meetingStartMinutes = timeToMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return meetingStartMinutes >= workStartMinutes && meetingEndMinutes <= workEndMinutes;
}

window.isMeetingWithinWorkHours = isMeetingWithinWorkHours;


checkStringLength('проверяемая строка', 20);
checkStringLength('проверяемая строка', 18);
checkStringLength('проверяемая строка', 10);

isPalindrome('топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');


