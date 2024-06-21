import { auth } from "../firebase/firebaseConfig";
import { LogOutFromGoogleButton } from "../components/Components";
import {
  LinkToSubscriptionPage,
  LinkToVideoFromCameraPage,
  LinkToPhotosPage,
} from "../components/Links";
import { webApp } from "../telegram/webApp";
import { GOOGLE_USER_ROUTE } from "../static/routes";

export function GoogleLoggedInUser() {
  //const [loading, setLoading] = useState(true);

  // // error handling
  // const errorContext = useErrorContext();
  // const navigate = useNavigate();

  // const handleError = useCallback(
  //   (error: { message: string }) => {
  //     errorContext.setError(error.message);
  //     console.log(errorContext.errorMessage);
  //     navigate(ERROR_ROUTE, { replace: true });
  //   },
  //   [errorContext, navigate]
  // );

  // main part

  const currentUser = auth.currentUser;

  console.log(auth.currentUser);

  webApp?.BackButton.hide();

  //if (loading) return <Loading />;

  return (
    <div className="page">
      <h2>GoogleLoggedInUser</h2>
      {currentUser ? (
        <>
          <h2>user: {currentUser.displayName}</h2>
          <hr />

          <LinkToSubscriptionPage lastPage={GOOGLE_USER_ROUTE} />
          <hr />
          <p>{currentUser.email}</p>
          <img src={currentUser.photoURL ?? ""} alt="user photo" />
          <hr />
          <div className="column">
            <LogOutFromGoogleButton />
            <LinkToVideoFromCameraPage lastPage={GOOGLE_USER_ROUTE}/>
            <LinkToPhotosPage lastPage={GOOGLE_USER_ROUTE} />
          </div>
        </>
      ) : (
        <h2>No user</h2>
      )}
    </div>
  );
}
