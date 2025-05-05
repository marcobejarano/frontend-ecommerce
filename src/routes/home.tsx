import { useNavigate } from "@solidjs/router";

const Home = () => {
  const navigate = useNavigate();

  navigate("/", { replace: true });
};

export default Home;
