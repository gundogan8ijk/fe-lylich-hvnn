export {
  getInitials, getYear, getDateOnly,formatDateForInput,formatDate

}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

function getYear(date: string | Date): string {
  return new Date(date).getFullYear().toString();
}

function getDateOnly(dateInput: string | Date): string {
  const date = new Date(dateInput);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function formatDateForInput(date?: string): string {

    if (!date) return ''

    const parts = date.split('/')

    if (parts.length !== 3) return ''

    const [day, month, year] = parts

    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

function formatDate(dateStr: string): string {
    if (!dateStr) return '—'
    const [y, m, d] = dateStr.split('-')
    return `${d}/${m}/${y}`
}
