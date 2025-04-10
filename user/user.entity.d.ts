import { OnboardingLevel } from './core/enum/onboarding';
import { Role } from './core/enum/roles';
export declare class User {
    id: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    bio: string;
    city: string;
    address: string;
    phone: string;
    country: string;
    isVerified: boolean;
    onBoarding: boolean;
    resetpwdtoken: string | null;
    token: string | null;
    resetpwdtokenexp: Date | null;
    role: Role;
    disabled: boolean;
    Enabledtwofactor: boolean;
    TwofactorSecret: string | null;
    psalt: string | null;
    onboardingLevel: OnboardingLevel;
}
