let baseUri = ''

if (process.env.NODE_ENV === 'production') {
    baseUri = '/api'
} else {
    baseUri = 'http://127.0.0.1:8081'
}

export { baseUri }
