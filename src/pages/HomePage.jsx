import useUserActions from "../actions/useUserActions";

function HomePage() {
  const { logout } = useUserActions();
  return <button onClick={logout}>logout</button>;
}

export default HomePage;
