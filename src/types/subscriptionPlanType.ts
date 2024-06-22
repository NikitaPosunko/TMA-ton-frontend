export interface SubscriptionPlan {
  title: string;
  description: string;
  priceInNanotonCoins: string;
  durationInSeconds: number;
}

export interface SubscriptionPlanArray {
  subscriptionPlans: SubscriptionPlan[];
}
