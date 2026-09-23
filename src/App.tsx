import AppRoutes from "./routes/AppRoutes"
import Authenticator from "./features/Authenticator"

function App() {
  return (
    <Authenticator>
      <AppRoutes />
    </Authenticator >
  )
}

export default App
