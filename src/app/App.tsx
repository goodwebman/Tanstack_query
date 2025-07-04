import { Login } from "../modules/auth/login";
import { LogoutButton } from '../modules/auth/logoutButton'
import { useUser } from "../modules/auth/useUser";
import TodoList from "../modules/todo-list/todo-list";

function App() {
  const user = useUser();
  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  if (user.data) {
    return <>
      <LogoutButton />
      <TodoList />;
    </>
  }
  return <Login />;
}

export default App;
