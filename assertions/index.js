import { loginAssertions } from './login.assertions';
import { LiveDarshanAssertions } from './LiveDarshan.assertions';
import { EncMediaAssertions } from './encMedia.assertions';

export const assertions = {
  ...loginAssertions,
  ...LiveDarshanAssertions,
  ...EncMediaAssertions
};