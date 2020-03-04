import { NotifyMessageModule } from './notify-message.module';

describe('NotifyMessageModule', () => {
  let notifyMessageModule: NotifyMessageModule;

  beforeEach(() => {
    notifyMessageModule = new NotifyMessageModule();
  });

  it('should create an instance', () => {
    expect(notifyMessageModule).toBeTruthy();
  });
});
