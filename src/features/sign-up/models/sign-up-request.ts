export interface SignUpRequest {
  email: string;
  password: string;
  businessName?: string;
  businessAddress?: string;
  businessCity?: string;
  businessState?: string;
  businessZipCode?: string;
  businessPrimaryManagerName?: string;
  mobileAppLogin?: {
    email: string;
    password: string;
  };
}
