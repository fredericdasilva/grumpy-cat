import github from "../../assets/img/github-1-24.png";
import linkedin from "../../assets/img/linkedin-3-24.png";
import "../../style/css/footer.css";

export const Footer = ({ props }) => {
  return (
    <>
      <div className="flex-center-column gap-md h-sm">
        <span className="footer">
          {new Date().toLocaleString("default", {
            month: "long",
          })}{" "}
          {new Date().getFullYear()} ©Grumpy Cat
        </span>

        <span className="icon">
          <a href="https://github.com/fredericdasilva">
            <img
              src={github}
              aria-label="github-icon"
              style={{ padding: "7px" }}
            />
          </a>
          <a href="https://www.linkedin.com/in/fr%C3%A9d%C3%A9ric-da-silva-2bb20678/">
            <img
              src={linkedin}
              aria-label="linkedin-icon"
              style={{ padding: "7px" }}
            />
          </a>
        </span>
      </div>
    </>
  );
};
