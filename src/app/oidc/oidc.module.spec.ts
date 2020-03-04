import { OidcModule } from './oidc.module';

describe('OidcModule', () => {
  let oidcModule: OidcModule;

  beforeEach(() => {
    oidcModule = new OidcModule();
  });

  it('should create an instance', () => {
    expect(oidcModule).toBeTruthy();
  });
});
