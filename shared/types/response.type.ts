export interface ICheckResponse {
  statusCode: number;
  statusMessage: string;
  body: {
    isAvailable: boolean;
  };
}
