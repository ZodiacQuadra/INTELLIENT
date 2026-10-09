// The illustration components were authored as Framer code components. Outside Framer the
// property-control API is unused, and the page is never a static canvas render.
export const addPropertyControls = () => {};
export const ControlType = new Proxy({}, { get: (_, key) => String(key) });
export const useIsStaticRenderer = () => false;
