import { loginAssertions } from './login.assertions';
import { LiveDarshanAssertions } from './LiveDarshan.assertions';
import { EncMediaAssertions } from './encMedia.assertions';
import { ProductAssertions } from './product.assertions';
import { ProvidersAssertions } from './Providers.assertions';

export const assertions = {
  ...loginAssertions,
  ...LiveDarshanAssertions,
  ...EncMediaAssertions,
  ...ProductAssertions,
  ...ProvidersAssertions,
};