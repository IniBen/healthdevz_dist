export interface IaResponse<T> {
    successful: boolean;
    message: string;
    data: T;
}
