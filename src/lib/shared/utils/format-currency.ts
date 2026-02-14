export function formatNumber(
  value: number | string,
  currency?: string
): string {
  const number = typeof value === 'string' ? Number(value) : value;

  if (!Number.isFinite(number)) return '0';

  const localeMap: Record<string, string> = {
    IDR: 'id-ID',
    USD: 'en-US',
    EUR: 'de-DE',
    GBP: 'en-GB',
    SGD: 'en-SG',
    MYR: 'ms-MY',
  };

  const locale = currency ? localeMap[currency] || 'en-US' : 'id-ID';

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(number));
}
