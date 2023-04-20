

export interface handler {
    ReportSucess(message: string): void;
    ReportError(message: string): void;
}