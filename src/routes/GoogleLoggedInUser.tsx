import { auth } from "../firebase/firebaseConfig";
import { LogOutFromGoogleButton } from "../components/Components";
import {
  LinkToSubscriptionPage,
  LinkToVideoFromCameraPage,
  LinkToPhotosPage,
} from "../components/Links";

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

  //if (loading) return <Loading />;

  return (
    <div>
      <h2>GoogleLoggedInUser</h2>
      {/*currentUser ? (
        <>
          <h2>user: {currentUser.displayName}</h2>
          <hr />

          <LinkToSubscriptionPage />
          <hr />
          <p>{currentUser.email}</p>
          <img src={currentUser.photoURL ?? ""} alt="user photo" />
          <hr />
          <div className="column">
            <LogOutFromGoogleButton />
            <LinkToVideoFromCameraPage />
            <LinkToPhotosPage />
          </div>
        </>
      ) : (
        <h2>No user</h2>
      )*/}
      <>
          <h2>user: DisplayName</h2>
          <hr />

          <LinkToSubscriptionPage />
          <hr />
          <p>Email</p>
          <img src={/*currentUser.photoURL ?? ""*/ "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"} alt="user photo" />
          <hr />
          <div className="column">
            <LogOutFromGoogleButton />
            <LinkToVideoFromCameraPage />
            <LinkToPhotosPage />
          </div>
        </>
    </div>
  );
}
