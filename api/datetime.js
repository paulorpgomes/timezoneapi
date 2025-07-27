// api/datetime.js

export default function handler(request, response) {
    const now = new Date();
  
    const options = {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
      hour12: false
    };
  
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(now);
  
    let year, month, day, hours, minutes, seconds;
  
    for (const part of parts) {
      switch (part.type) {
        case 'year': year = parseInt(part.value); break;
        case 'month': month = parseInt(part.value); break;
        case 'day': day = parseInt(part.value); break;
        case 'hour': hours = parseInt(part.value); break;
        case 'minute': minutes = parseInt(part.value); break;
        case 'second': seconds = parseInt(part.value); break;
      }
    }
  
    
    const localizedForNames = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const dayOfWeek = localizedForNames.getDay();
  
    
    const millis = now.getMilliseconds();
  
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
  
    const result = {
      dayofweek: dayOfWeek,
      dayofweekName: dayNames[dayOfWeek],
      day: day,
      month: month,
      monthName: monthNames[month - 1],
      year: year,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      millis: millis,
      fulldate: localizedForNames.toString(),
      timezone: 'America/Sao_Paulo',
      status: 'ok'
    };
  
    response.status(200).json(result);
  }