import NavLink from "./NavLink";

const Nav = () => {
  const links = ["home", "products", "cart", "gallery", "contact"];

  return (
    <nav class="flex justify-center items-center gap-8 p-4 text-white">
      { links.map((link) => (
        <NavLink
          linkText={link}
        />
      ))}
    </nav>
  );
};

export default Nav;
