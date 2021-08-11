import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const SearchMenu = ({ categories }) => {
  const [clicked, setClicked] = useState(false);
  const [title, setTitle] = useState("");
  const options = categories.map((item, index) => {
    return (
      <Option
        whileHover={{ backgroundColor: "#f7f5f5" }}
        whileTap={{ backgroundColor: "#e7e7e7" }}
        noBorder={index === categories.length - 1}
        onClick={() => {
          setClicked(false);
          setTitle(item);
        }}
      >
        {item}
      </Option>
    );
  });

  return (
    <DropdownContainer>
      <TitleContainer
        onClick={() => {
          setClicked(!clicked);
        }}
      >
        <div>{title}</div>
        <motion.div
          initial={{ y: -2 }}
          animate={clicked ? { rotateZ: 180, y: 1.25 } : { rotateZ: 0, y: -2 }}
        >
          <svg
            width="13"
            height="7"
            viewBox="0 0 13 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.86543 0.373845C0.55918 0.680095 0.55918 1.17385 0.86543 1.4801L6.05918 6.67385C6.30293 6.9176 6.69668 6.9176 6.94043 6.67385L12.1342 1.4801C12.4404 1.17385 12.4404 0.680095 12.1342 0.373845C11.8279 0.067595 11.3342 0.067595 11.0279 0.373845L6.49668 4.89885L1.96543 0.367595C1.66543 0.0675955 1.16543 0.067595 0.86543 0.373845Z"
              fill="black"
              fill-opacity="0.54"
            />
          </svg>
        </motion.div>
      </TitleContainer>
      <OptionsContainer
        initial={{ height: 0 }}
        animate={clicked ? { height: "auto" } : { height: 0 }}
      >
        {options}
      </OptionsContainer>
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  width: 115px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100px;
`;

const TitleContainer = styled.div`
  width: 100%;
  min-height: 20px;
  height: auto;
  padding: 0.335rem 0.5rem;
  background-color: #ffffff;
  border: 0.5px solid #c4c4c4;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const OptionsContainer = styled(motion.div)`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  width: 115px;
  width: 112.5%;
  flex-direction: column;
  border-radius: 7px;
  overflow: hidden;
`;

const Option = styled(motion.div)`
  height: auto;
  background-color: #ffffff;
  padding: 0.5rem 0.5rem;
  border-bottom: ${(props) => (props.noBorder ? "0px" : "1px solid #e7e7e7")};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

export default SearchMenu;
