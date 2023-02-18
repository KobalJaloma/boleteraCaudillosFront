import { AuthProvider } from "./auth";
import { AppRouter } from "./router";


function CaudillosTicket() {

  return (
    <AuthProvider>
      <AppRouter />

    </AuthProvider>
  )
}

export default CaudillosTicket;
