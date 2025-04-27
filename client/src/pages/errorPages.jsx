import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex justify-center min-h-screen items-center flex-col">
      <h1 className="text-3xl font-bold">OOps !</h1>
      <h3 className="my-5 text-xl">Sorry, an unexpected error has occured</h3>
      <p>{error.statusText || error.message}</p>
    </div>
  );
};

export default ErrorPage;
