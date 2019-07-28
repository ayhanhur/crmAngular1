// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  name: 'api',
  production: false,
  api: {
    host: 'http://junocrm.opusits.com/api/juno/', //https://59a6774b9f381700111bcd7d.mockapi.io"
    mock: 'https://59a6774b9f381700111bcd7d.mockapi.io',
    mockLead: 'https://59bbfee51707760011379dc3.mockapi.io/v1',
    mockCustomer: 'http://59e5ec7ef99ad900122682e2.mockapi.io/'
  }
};
