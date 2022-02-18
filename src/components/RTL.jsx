import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import PropTypes from "prop-types";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function RTL(props) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}

RTL.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RTL;
