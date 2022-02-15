import { IbackendErrors } from 'src/app/models/backend-errors.interface';
import { IcurrentUser } from 'src/app/models/current-user.interface';

export interface IauthState {
  isSubmitting: boolean;
  isLoading: boolean;
  currentUser: IcurrentUser | null;
  isLoggingIn: boolean | null;
  validationErrors: IbackendErrors | null;
}
