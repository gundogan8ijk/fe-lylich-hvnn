export const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export function getYear(date: string | Date): string {
    return new Date(date).getFullYear().toString();
}