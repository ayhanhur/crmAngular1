export interface IDashboard {
    id: number,
    title: string,
    callData: {
        total: number
        incoming: number,
        outgoing: number,
    }
}