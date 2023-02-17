import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import ToDoList from "./components/ToDoList";
import { AnimatePresence, motion, useMotionValue, useTransform, useViewportScroll } from "framer-motion"
import { useRef, useState } from "react";


// const GlobalStyle = createGlobalStyle`
// @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
// html, body, div, span, applet, object, iframe,
// h1, h2, h3, h4, h5, h6, p, blockquote, pre,
// a, abbr, acronym, address, big, cite, code,
// del, dfn, em, img, ins, kbd, q, s, samp,
// small, strike, strong, sub, sup, tt, var,
// b, u, i, center,
// dl, dt, dd, menu, ol, ul, li,
// fieldset, form, label, legend,
// table, caption, tbody, tfoot, thead, tr, th, td,
// article, aside, canvas, details, embed,
// figure, figcaption, footer, header, hgroup,
// main, menu, nav, output, ruby, section, summary,
// time, mark, audio, video {
//   margin: 0;
//   padding: 0;
//   border: 0;
//   font-size: 100%;
//   font: inherit;
//   vertical-align: baseline;
// }
// /* HTML5 display-role reset for older browsers */
// article, aside, details, figcaption, figure,
// footer, header, hgroup, main, menu, nav, section {
//   display: block;
// }
// /* HTML5 hidden-attribute fix for newer browsers */
// *[hidden] {
//     display: none;
// }
// body {
//   font-weight: 300;
//   font-family: 'Source Sans Pro', sans-serif;
//   background-color:${(props) => props.theme.bgColor};
//   color:${(props) => props.theme.textColor}
//   color:${(props) => props.theme.textColor};
//   line-height: 1.2;
// }
// menu, ol, ul {
//   list-style: none;
// }
// blockquote, q {
//   quotes: none;
// }
// blockquote:before, blockquote:after,
// q:before, q:after {
//   content: '';
//   content: none;
// }
// table {
//   border-collapse: collapse;
//   border-spacing: 0;
// }
// * {
//   box-sizing: border-box;
// }
// body {
//   font-family: 'Source Sans Pro', sans-serif;
//   background-color:${(props) => props.theme.bgColor};
//   color:${(props) => props.theme.textColor}
// }
// a {
//   text-decoration:none;
//   color:inherit;
// }
// `;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Grid = styled.div`
  display: grid;
  width: 50vw;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
`;

const Button = styled.div`
grid-area: footer;
`;

const Box = styled(motion.div)`
background-color: rgba(255, 255, 255, 0.5);
border-radius: 40px;
height: 200px;
box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
display : flex;
justify-content: center;
align-items: center;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(motion.div)`
  background-color: #FFFFFF;
  height: 70px;
  width: 70px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  border-radius: 50px;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const box = {
  hover: (location:string)=>(
    {
      originX: location ==="2" || location ==="4" ? 0 : 1,
      originY: location ==="1" || location ==="2" ? 1 : 0,
      scale:1.1,
      bounce:0
    }
  )
};

function App() {
  const [id, setId] = useState<null | string>(null);
  const [clicked, setClicked] = useState(true);
  const toggleClicked = () => setClicked((prev) => !prev);
  return (
    // <>
    //   <GlobalStyle />
    //   <ToDoList />
    // </>
    <Wrapper>
      <Grid>
        {["1", "2", "3", "4"].map((n) => (
          <Box
            onClick={() => setId(n)}
            key={n}
            layoutId={n}
            variants={box}
            whileHover="hover"
            custom={n}>
            {n === "2" ? (clicked ? <Circle layoutId="circle" /> : null) : null}
            {n === "3" ? (!clicked ? <Circle layoutId="circle" /> : null) : null}
          </Box>
        ))}
      </Grid>

      <AnimatePresence>
        {id ? (
          <Overlay
            variants={overlay}
            onClick={() => setId(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box
              layoutId={id}
              style={{ width: 300, height: 200, backgroundColor: "#FFFFFF" }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
      <button onClick={toggleClicked} style={{marginTop:50}}>Switch</button>
    </Wrapper>
  );
}

export default App;