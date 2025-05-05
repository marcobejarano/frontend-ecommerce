import { A } from "@solidjs/router";
import { NavigationLinkProps } from "@/types/navigation-link-props"

const joinLinkText = (linkText: string) => {
  return linkText.split(" ").join("-").toLowerCase();
}

const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const capitalizeWords = (words: string) => {
  return words.split(" ").map(capitalize).join(" ");
};

const NavLink = ({ linkText }: NavigationLinkProps) => {
  return (
    <A
      href={ `/${ joinLinkText(linkText) }` }
      class="hover:text-green-600 active:text-green-800"
    >
      { capitalizeWords(linkText) }
    </A>
  );
};

export default NavLink;
