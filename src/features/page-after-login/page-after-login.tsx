import './page-after-login.css';

function PageAfterLogin() {
  return (
    <>
      <div className="image-container">
        <img src="src/assets/rene-magritte.png" />
      </div>
      <div className="centered-text">
        This is a page after login. To log out click on the top right logout
        icon.
      </div>
    </>
  );
}

export default PageAfterLogin;
