export interface CheckResponse {
  statusCode: number;
  statusMessage: string;
  body: {
    isAvailable: boolean;
  };
}
