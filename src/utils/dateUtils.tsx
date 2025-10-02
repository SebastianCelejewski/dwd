function dateToString(date) {
    return Intl
        .DateTimeFormat(undefined, {dateStyle: "full", timeStyle: "short"})
        .format(Date.parse(date))
}

export { dateToString };