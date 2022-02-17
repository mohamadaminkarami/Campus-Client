// import * as React from "react";
// import PropTypes from "prop-types";
// import ButtonUnstyled, {
//   buttonUnstyledClasses,
// } from "@mui/base/ButtonUnstyled";
// import { styled } from "@mui/system";
// import { Button } from "@mui/material";

// const ButtonRoot = React.forwardRef(function ButtonRoot(props, ref) {
//   const { children, ...other } = props;
//   console.log({ props });
//   const height = other.height || 50;
//   const width = other.width || 150;
//   return (
//     <svg
//       width={width}
//       height={height}
//       {...other}
//       // eslint-disable-next-line react/prop-types
//       onClick={props.onClick}
//       ref={ref}
//     >
//       <polygon
//         points={`0,${other.height} 0,0 ${width},0 ${width},${height}`}
//         className="bg"
//       />
//       <polygon
//         points={`0,${other.height} 0,0 ${width},0 ${width},${height}`}
//         className="borderEffect"
//       />
//       <foreignObject x="0" y="0" width={width} height={height}>
//         <div className="content">{children}</div>
//       </foreignObject>
//     </svg>
//   );
// });

// ButtonRoot.propTypes = {
//   children: PropTypes.node,
//   width: PropTypes.number,
//   height: PropTypes.number,
// };

// const blue = {
//   50: "#F0F7FF",
//   100: "#C2E0FF",
//   200: "#99CCF3",
//   400: "#3399FF",
//   500: "#007FFF",
//   600: "#0072E5",
//   800: "#004C99",
//   900: "#003A75",
// };

// const CustomButtonRoot = styled(ButtonRoot)(
//   ({ theme }) => `
//   overflow: visible;
//   cursor: pointer;
//   --main-color: ${theme.palette.mode === "light" ? blue[600] : blue[100]};
//   --hover-color: ${theme.palette.mode === "light" ? blue[50] : blue[900]};
//   --active-color: ${theme.palette.mode === "light" ? blue[100] : blue[800]};

//   & polygon {
//     fill: transparent;
//     transition: all 800ms ease;
//     pointer-events: none;
//   }

//   & .bg {
//     stroke: var(--main-color);
//     stroke-width: 1;
//     filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1));
//     fill: transparent;
//   }

//   & .borderEffect {
//     stroke: var(--main-color);
//     stroke-width: 2;
//     stroke-dasharray: 150 600;
//     stroke-dashoffset: 150;
//     fill: transparent;
//   }

//   &:hover,
//   &.${buttonUnstyledClasses.focusVisible} {
//     .borderEffect {
//       stroke-dashoffset: -600;
//     }

//     .bg {
//       fill: var(--hover-color);
//     }
//   }

//   &:focus,
//   &.${buttonUnstyledClasses.focusVisible} {
//     outline: 2px solid ${theme.palette.mode === "dark" ? blue[400] : blue[200]};
//     outline-offset: 2px;
//   }

//   &.${buttonUnstyledClasses.active} {
//     & .bg {
//       fill: var(--active-color);
//       transition: fill 300ms ease-out;
//     }
//   }

//   & foreignObject {
//     pointer-events: none;

//     & .content {
//       height: 100%;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       color: var(--main-color);
//       border-radius: 10px;
//     }

//     & svg {
//       margin: 0 5px;
//     }
//   }`
// );

// // const SvgButton = React.forwardRef(function SvgButton(props, ref) {
// //   console.log({ props, ref });
// //   // eslint-disable-next-line react/prop-types
// //   return <Button onClick={props.onSubmit}>sdf</Button>;
// //   //   return <ButtonUnstyled {...props} component={CustomButtonRoot} ref={ref} />;
// // });

// export default CustomButtonRoot;
