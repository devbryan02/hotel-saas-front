export interface DashboardStatsResponse {
    totalRooms: number
    availableRooms: number
    occupiedRooms: number
    maintenanceRooms: number
    cleaningRooms: number
    activeOccupations: number
    checkInsToday: number
    checkOutsToday: number
    revenueToday: number
    revenueThisMonth: number
}