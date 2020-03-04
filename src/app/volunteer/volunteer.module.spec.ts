import { VolunteerModule } from './volunteer.module';

describe('VolunteerModule', () => {
  let volunteerModule: VolunteerModule;

  beforeEach(() => {
    volunteerModule = new VolunteerModule();
  });

  it('should create an instance', () => {
    expect(volunteerModule).toBeTruthy();
  });
});
