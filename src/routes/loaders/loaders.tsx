// loader for displaing error message from route /error/:errorMessage

export interface ErrorLoaderParams {
  params: { errorMessage: string };
}

export function errorPageLoader({ params }: ErrorLoaderParams) {
  const errorMessage = params.errorMessage;
  return { errorMessage };
}
