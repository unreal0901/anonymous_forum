import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();
  let currentLink = "";
  console.log(location);
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;
      if (crumb.length > 10) {
        crumb = crumb.slice(0, 10);
      }

      return (
        <div className="crumb" key={crumb}>
          <Link to={currentLink}>{crumb}</Link>
        </div>
      );
    });
  return (
    <>
      <div className="breadcrumbs mt-10 ml-10">{crumbs}</div>
    </>
  );
}
