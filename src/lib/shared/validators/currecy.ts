type CurrencyFormatOptions = {
    locale?: string | string[];
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
};

const formatCache = new Map<string, Intl.NumberFormat>();

function getFormatter(options: CurrencyFormatOptions = {}) {
    const locale = options.locale ?? 'en-US';
    const currency = options.currency ?? 'USD';
    const minimumFractionDigits = options.minimumFractionDigits ?? 2;
    const maximumFractionDigits = options.maximumFractionDigits ?? 2;

    const cacheKey = JSON.stringify({
        locale,
        currency,
        minimumFractionDigits,
        maximumFractionDigits,
    });

    const cached = formatCache.get(cacheKey);
    if (cached) return cached;

    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits,
        maximumFractionDigits,
    });

    formatCache.set(cacheKey, formatter);
    return formatter;
}

export function formatCurrency(value: number, options: CurrencyFormatOptions = {}) {
    return getFormatter(options).format(value);
}