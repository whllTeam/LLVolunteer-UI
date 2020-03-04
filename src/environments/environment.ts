// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/**
 * user: admin
 * pwd: W520++wch
 */

export const environment = {
  production: false,
  isOpenIdentity: true,
  apis: {
    'userManagerGateway': 'http://localhost:5018/api',
    'schoolManagerGateway': 'http://localhost:5019/api',
    'authApi': 'http://localhost:4000/api',
    'noAuthApi': 'http://localhost:4000/api',
    'spaClient': 'http://localhost:4200',
    'identity': 'http://localhost:5005',
    'apiGateway': 'http://localhost:5000',
    'volunteerApi': 'http://localhost:4000/api/',
    'fileUrl': 'http://localhost:4000',
    'userManager':  'http://localhost:5018/api/',
    'schoolManager': 'http://localhost:5019/api/'
  },
  imgPath: {
    'page': 'Page_Img',
    'org': 'Org_Img'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
