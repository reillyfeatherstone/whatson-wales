export default function formatDate(date: string, includeYear = true): string {
  const d = new Date(date)

  const options: Intl.DateTimeFormatOptions = includeYear
  ? { day: 'numeric', month: 'long', year: 'numeric' }
  : { day: 'numeric', month: 'long' }

  return new Intl.DateTimeFormat('en-GB', options).format(d)
}



/*const formatDate = (date: string, includeYear = true): string => {
  const d = new Date(date)

  const options: Intl.DateTimeFormatOptions = includeYear
  ? { day: 'numeric', month: 'long', year: 'numeric' }
  : { day: 'numeric', month: 'long' }

  return new Intl.DateTimeFormat('en-GB', options).format(d)
}*/
