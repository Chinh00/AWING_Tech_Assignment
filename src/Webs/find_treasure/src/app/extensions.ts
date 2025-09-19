export interface Pagination {
    page: number;
    pageSize: number;
}
export interface ListSuccessResponse<T> { items: T[], totalCount: number, page: number, pageSize: number }
export function formatDateTimeVi(date: string | null): string {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    })
    
}