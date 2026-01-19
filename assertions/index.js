import { loginAssertions } from './login.assertions';
import { LiveDarshanAssertions } from './LiveDarshan.assertions';

export const assertions = {
  ...loginAssertions,
  ...LiveDarshanAssertions
};