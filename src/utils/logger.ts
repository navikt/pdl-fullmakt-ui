const { frontendlogger } = window as any;

export const logApiError = (url: string, err: any) => {
  const error = `Feil ved henting av data: ${url} - ${err.code} ${err.text}`;

  const title = 'pdl-fullmakt-ui.apiclient.error';
  const tags = {};
  const fields = {
    status: err.code || JSON.stringify(err),
    statusText: err.text || JSON.stringify(err),
    url
  };

  if (frontendlogger) {
    frontendlogger.error(error);
    frontendlogger.event(title, fields, tags);
  }
};
