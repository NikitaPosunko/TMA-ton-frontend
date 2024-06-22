// enum for subscription status
export enum SubscriptionStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

// create response dto
export interface SubscriptionResponseDto {
  status: SubscriptionStatus;
  endDate?: Date;
}
