export enum ApiPath {
  InformationTypePath = '/backend/informationtype',
  PolicyForInformationTypePath = '/policy/policy'
}

export interface ApiError {
  readonly message: string;
}
