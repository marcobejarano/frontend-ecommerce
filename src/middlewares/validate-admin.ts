import { verifyToken } from "@/lib/auth/token";
import { redirect } from "@solidjs/router";
import { createMiddleware } from "@solidjs/start/middleware";
import { getCookie } from "vinxi/http";

const validateAdmin = createMiddleware({
  onRequest: (event) => {
    const url = new URL(event.request.url);
    const { pathname } = url;

    console.log("Pathname is:", pathname);

    const token = getCookie(event.nativeEvent, "token");

    if (pathname.includes("/admin")) {
      if (!token) {
        return redirect("/home");
      }

      const payload = verifyToken(token);

      if (payload.role !== "admin") {
        return redirect("/home")
      }
    }
  },
});

export default validateAdmin;
