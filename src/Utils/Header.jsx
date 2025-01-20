import { Typography } from "neetoui";
// eslint-disable-next-line import/extensions

const Header = ({ text }) => (
  <div>
    <Typography className="py-2 text-4xl font-semibold" style="h1">
      {text}
    </Typography>
    <hr className="border-2 border-black" />
  </div>
);

export default Header;
