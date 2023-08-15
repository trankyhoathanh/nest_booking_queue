interface Booking {
    id: string,
    code: string
    name: string
    executed: boolean
}

interface BookingQueue {
    id: string,
    code: string
    name: string
    executed: boolean
}

export { Booking, BookingQueue }