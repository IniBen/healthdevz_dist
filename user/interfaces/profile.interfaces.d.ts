import { OnboardingLevel } from '../core/enum/onboarding';
import { Role } from '../core/enum/roles';
export interface IUpdateProfile {
    lastname?: string;
    firstname?: string;
    email?: string;
    bio?: string;
    role?: Role;
    onboardingLevel?: OnboardingLevel;
    country?: string;
    city?: string;
    address?: string;
    phone?: string;
}
