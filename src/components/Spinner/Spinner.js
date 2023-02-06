import { ThreeDots } from "react-loader-spinner";

export const Spinner = ({ visible }) => {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#808B96"
      ariaLabel="three-dots-loading"
      visible={visible}
    />
  );
};
